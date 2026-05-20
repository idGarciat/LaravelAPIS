const fs = require('fs/promises');
const path = require('path');

class MedicoRepository {
  constructor({ dataFile, monolithMedicosUrl = '', monolithAuthToken = '' }) {
    this.dataFile = dataFile;
    this.monolithMedicosUrl = monolithMedicosUrl;
    this.monolithAuthToken = monolithAuthToken;
  }

  async list(filters = {}, authToken = '') {
    if (this.monolithMedicosUrl) {
      return this.#remoteRequest('GET', this.monolithMedicosUrl, null, authToken, filters);
    }

    const medicos = await this.#readLocal();
    return this.#applyFilters(medicos, filters);
  }

  async getById(id, authToken = '') {
    if (this.monolithMedicosUrl) {
      return this.#remoteRequest('GET', `${this.monolithMedicosUrl}/${id}`, null, authToken);
    }

    const medicos = await this.#readLocal();
    return medicos.find((medico) => String(medico.id) === String(id)) || null;
  }

  async create(payload, authToken = '') {
    if (this.monolithMedicosUrl) {
      return this.#remoteRequest('POST', this.monolithMedicosUrl, payload, authToken);
    }

    const medicos = await this.#readLocal();
    const nextId = medicos.length ? Math.max(...medicos.map((medico) => Number(medico.id) || 0)) + 1 : 1;
    const now = new Date().toISOString();
    const medico = {
      id: nextId,
      nombre_completo: payload.nombre_completo,
      especialidad_id: Number(payload.especialidad_id),
      especialidad_nombre: payload.especialidad_nombre || null,
      telefono: payload.telefono || '',
      email: payload.email || '',
      estado: payload.estado || 'Activo',
      created_at: now,
      updated_at: now,
    };

    medicos.push(medico);
    await this.#writeLocal(medicos);
    return medico;
  }

  async update(id, payload, authToken = '') {
    if (this.monolithMedicosUrl) {
      return this.#remoteRequest('PUT', `${this.monolithMedicosUrl}/${id}`, payload, authToken);
    }

    const medicos = await this.#readLocal();
    const index = medicos.findIndex((medico) => String(medico.id) === String(id));
    if (index === -1) {
      return null;
    }

    const current = medicos[index];
    const updated = {
      ...current,
      nombre_completo: payload.nombre_completo ?? current.nombre_completo,
      especialidad_id: payload.especialidad_id !== undefined ? Number(payload.especialidad_id) : current.especialidad_id,
      especialidad_nombre: payload.especialidad_nombre ?? current.especialidad_nombre ?? null,
      telefono: payload.telefono ?? current.telefono,
      email: payload.email ?? current.email,
      estado: payload.estado ?? current.estado,
      updated_at: new Date().toISOString(),
    };

    medicos[index] = updated;
    await this.#writeLocal(medicos);
    return updated;
  }

  async delete(id, authToken = '') {
    if (this.monolithMedicosUrl) {
      return this.#remoteRequest('DELETE', `${this.monolithMedicosUrl}/${id}`, null, authToken);
    }

    const medicos = await this.#readLocal();
    const index = medicos.findIndex((medico) => String(medico.id) === String(id));
    if (index === -1) {
      return null;
    }

    const [removed] = medicos.splice(index, 1);
    await this.#writeLocal(medicos);
    return removed;
  }

  async #readLocal() {
    await fs.mkdir(path.dirname(this.dataFile), { recursive: true });
    try {
      const content = await fs.readFile(this.dataFile, 'utf8');
      const parsed = JSON.parse(content || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      if (error.code === 'ENOENT') {
        await this.#writeLocal([]);
        return [];
      }
      throw error;
    }
  }

  async #writeLocal(medicos) {
    await fs.mkdir(path.dirname(this.dataFile), { recursive: true });
    await fs.writeFile(this.dataFile, `${JSON.stringify(medicos, null, 2)}\n`, 'utf8');
  }

  #applyFilters(medicos, filters) {
    const search = String(filters.search || '').trim().toLowerCase();
    const estado = String(filters.estado || '').trim().toLowerCase();
    const especialidad = String(filters.especialidad || '').trim().toLowerCase();

    return medicos.filter((medico) => {
      const matchesSearch = !search || [medico.nombre_completo, medico.email, medico.telefono, medico.especialidad_nombre]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(search));

      const matchesEstado = !estado || String(medico.estado || '').toLowerCase() === estado;
      const matchesEspecialidad = !especialidad || String(medico.especialidad_nombre || '').toLowerCase().includes(especialidad);

      return matchesSearch && matchesEstado && matchesEspecialidad;
    });
  }

  async #remoteRequest(method, url, body, authToken, query = {}) {
    const remoteUrl = new URL(url);
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && String(value).trim() !== '') {
        remoteUrl.searchParams.set(key, value);
      }
    });

    const headers = {
      'Content-Type': 'application/json',
    };

    const token = authToken || this.monolithAuthToken;
    if (token) {
      headers.Authorization = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    }

    const response = await fetch(remoteUrl, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const responseText = await response.text();
    let parsedBody = null;
    if (responseText) {
      try {
        parsedBody = JSON.parse(responseText);
      } catch {
        parsedBody = responseText;
      }
    }

    if (!response.ok) {
      const error = new Error(parsedBody?.message || `Monolith request failed with status ${response.status}`);
      error.status = response.status;
      error.details = parsedBody;
      throw error;
    }

    return parsedBody;
  }
}

module.exports = { MedicoRepository };
