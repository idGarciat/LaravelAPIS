const { ObjectId } = require('mongodb');

const ALLOWED_STATUS = new Set(['programada', 'atendida', 'cancelada']);

function normalizeCitaDocument(document) {
  if (!document) {
    return null;
  }

  return {
    id: document._id ? String(document._id) : document.id,
    medico_id: document.medico_id,
    paciente_id: document.paciente_id,
    fecha_cita: document.fecha_cita,
    hora_cita: document.hora_cita,
    estado: document.estado,
    observaciones: document.observaciones || '',
    costo: document.costo,
    created_at: document.created_at,
    updated_at: document.updated_at,
  };
}

function buildCitaPayload(body, partial = false) {
  const payload = {};

  if (body.medico_id !== undefined) payload.medico_id = Number(body.medico_id);
  if (body.paciente_id !== undefined) payload.paciente_id = Number(body.paciente_id);
  if (body.fecha_cita !== undefined) payload.fecha_cita = String(body.fecha_cita);
  if (body.hora_cita !== undefined) payload.hora_cita = String(body.hora_cita);
  if (body.estado !== undefined) payload.estado = String(body.estado).toLowerCase();
  if (body.observaciones !== undefined) payload.observaciones = String(body.observaciones);
  if (body.costo !== undefined) payload.costo = Number(body.costo);

  const requiredFields = ['medico_id', 'paciente_id', 'fecha_cita', 'hora_cita', 'estado', 'costo'];
  if (!partial) {
    for (const field of requiredFields) {
      if (payload[field] === undefined || payload[field] === null || Number.isNaN(payload[field])) {
        if (field === 'observaciones') continue;
      }
    }
  }

  return payload;
}

class CitaRepository {
  constructor(collection) {
    this.collection = collection;
  }

  async list(filters = {}) {
    const query = this.#buildQuery(filters);
    const citas = await this.collection.find(query).sort({ fecha_cita: 1, hora_cita: 1 }).toArray();
    return citas.map(normalizeCitaDocument);
  }

  async getById(id) {
    const cita = await this.collection.findOne({ _id: new ObjectId(id) });
    return normalizeCitaDocument(cita);
  }

  async create(body) {
    const payload = buildCitaPayload(body);
    this.#validateRequiredFields(payload);
    this.#validateBusinessRules(payload);

    const now = new Date().toISOString();
    const document = {
      ...payload,
      observaciones: payload.observaciones || '',
      estado: payload.estado,
      created_at: now,
      updated_at: now,
    };

    const result = await this.collection.insertOne(document);
    return normalizeCitaDocument({ ...document, _id: result.insertedId });
  }

  async update(id, body) {
    const existing = await this.getById(id);
    if (!existing) {
      return null;
    }

    const payload = buildCitaPayload(body, true);
    const updated = {
      ...existing,
      ...payload,
      updated_at: new Date().toISOString(),
    };

    this.#validateBusinessRules(updated);

    await this.collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          medico_id: updated.medico_id,
          paciente_id: updated.paciente_id,
          fecha_cita: updated.fecha_cita,
          hora_cita: updated.hora_cita,
          estado: updated.estado,
          observaciones: updated.observaciones || '',
          costo: updated.costo,
          updated_at: updated.updated_at,
        },
      }
    );

    return updated;
  }

  async delete(id) {
    const existing = await this.getById(id);
    if (!existing) {
      return null;
    }

    await this.collection.deleteOne({ _id: new ObjectId(id) });
    return existing;
  }

  #buildQuery(filters) {
    const query = {};

    if (filters.estado) {
      query.estado = String(filters.estado).toLowerCase();
    }

    if (filters.medico_id) {
      query.medico_id = Number(filters.medico_id);
    }

    if (filters.paciente_id) {
      query.paciente_id = Number(filters.paciente_id);
    }

    if (filters.fecha_cita) {
      query.fecha_cita = String(filters.fecha_cita);
    }

    return query;
  }

  #validateRequiredFields(payload) {
    const required = ['medico_id', 'paciente_id', 'fecha_cita', 'hora_cita', 'estado', 'costo'];
    for (const field of required) {
      if (payload[field] === undefined || payload[field] === null || payload[field] === '' || Number.isNaN(payload[field])) {
        throw Object.assign(new Error(`El campo ${field} es obligatorio`), { status: 400 });
      }
    }
  }

  #validateBusinessRules(payload) {
    if (!ALLOWED_STATUS.has(String(payload.estado).toLowerCase())) {
      throw Object.assign(new Error('estado debe ser programada, atendida o cancelada'), { status: 400 });
    }

    const costo = Number(payload.costo);
    if (Number.isNaN(costo) || costo < 0) {
      throw Object.assign(new Error('costo debe ser un número mayor o igual a 0'), { status: 400 });
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(payload.fecha_cita))) {
      throw Object.assign(new Error('fecha_cita debe tener formato YYYY-MM-DD'), { status: 400 });
    }

    if (!/^\d{2}:\d{2}$/.test(String(payload.hora_cita))) {
      throw Object.assign(new Error('hora_cita debe tener formato HH:MM'), { status: 400 });
    }
  }
}

module.exports = { CitaRepository, normalizeCitaDocument };
