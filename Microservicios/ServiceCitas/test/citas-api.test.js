const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');

const { createApp } = require('../src/app');

function createRepository(initial = []) {
  let data = initial.map((item) => ({ ...item }));
  let nextId = data.length ? Math.max(...data.map((item) => Number(item.id) || 0)) + 1 : 1;

  return {
    async list(filters = {}) {
      return data.filter((item) => {
        if (filters.estado && item.estado !== filters.estado) return false;
        if (filters.medico_id && String(item.medico_id) !== String(filters.medico_id)) return false;
        if (filters.paciente_id && String(item.paciente_id) !== String(filters.paciente_id)) return false;
        return true;
      });
    },
    async getById(id) {
      return data.find((item) => String(item.id) === String(id)) || null;
    },
    async create(body) {
      const now = new Date().toISOString();
      const record = {
        id: nextId++,
        medico_id: Number(body.medico_id),
        paciente_id: Number(body.paciente_id),
        fecha_cita: body.fecha_cita,
        hora_cita: body.hora_cita,
        estado: body.estado,
        observaciones: body.observaciones || '',
        costo: Number(body.costo),
        created_at: now,
        updated_at: now,
      };
      data.push(record);
      return record;
    },
    async update(id, body) {
      const index = data.findIndex((item) => String(item.id) === String(id));
      if (index === -1) return null;
      data[index] = {
        ...data[index],
        ...body,
        updated_at: new Date().toISOString(),
      };
      return data[index];
    },
    async delete(id) {
      const index = data.findIndex((item) => String(item.id) === String(id));
      if (index === -1) return null;
      const [removed] = data.splice(index, 1);
      return removed;
    },
  };
}

function makeApp(repository) {
  return createApp({ repository });
}

test('creates and lists citas', async () => {
  const repository = createRepository();
  const app = makeApp(repository);

  const created = await request(app)
    .post('/citas')
    .send({
      medico_id: 1,
      paciente_id: 2,
      fecha_cita: '2026-05-20',
      hora_cita: '10:30',
      estado: 'programada',
      observaciones: 'Primera consulta',
      costo: 450,
    });

  assert.equal(created.status, 201);
  assert.equal(created.body.estado, 'programada');

  const list = await request(app).get('/citas');
  assert.equal(list.status, 200);
  assert.equal(list.body.length, 1);
});

test('validates required cita fields', async () => {
  const repository = createRepository();
  const app = makeApp(repository);

  const response = await request(app)
    .post('/citas')
    .send({ medico_id: 1 });

  assert.equal(response.status, 400);
});

test('updates and deletes cita', async () => {
  const repository = createRepository([
    {
      id: 1,
      medico_id: 1,
      paciente_id: 2,
      fecha_cita: '2026-05-20',
      hora_cita: '10:30',
      estado: 'programada',
      observaciones: '',
      costo: 450,
      created_at: '2026-05-19T00:00:00.000Z',
      updated_at: '2026-05-19T00:00:00.000Z',
    },
  ]);
  const app = makeApp(repository);

  const updated = await request(app)
    .put('/citas/1')
    .send({ estado: 'atendida', observaciones: 'Atendida correctamente' });

  assert.equal(updated.status, 200);
  assert.equal(updated.body.estado, 'atendida');

  const deleted = await request(app).delete('/citas/1');
  assert.equal(deleted.status, 204);
});
