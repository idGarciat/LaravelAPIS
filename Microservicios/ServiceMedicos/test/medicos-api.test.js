const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const request = require('supertest');

const { createApp } = require('../src/app');

async function createTempRepositoryFile(initialData = []) {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'service-medicos-'));
  const dataFile = path.join(tempDir, 'medicos.json');
  await fs.writeFile(dataFile, `${JSON.stringify(initialData, null, 2)}\n`, 'utf8');
  return dataFile;
}

function makeApp(dataFile) {
  return createApp({
    jwtSecret: 'test-secret',
    apiUser: 'admin',
    apiPassword: 'admin123',
    dataFile,
    monolithMedicosUrl: '',
    monolithAuthToken: '',
  });
}

test('login returns JWT token', async () => {
  const dataFile = await createTempRepositoryFile();
  const app = makeApp(dataFile);

  const response = await request(app)
    .post('/auth/login')
    .send({ username: 'admin', password: 'admin123' });

  assert.equal(response.status, 200);
  assert.equal(response.body.token_type, 'Bearer');
  assert.ok(response.body.token);
});

test('protected endpoints require JWT', async () => {
  const dataFile = await createTempRepositoryFile();
  const app = makeApp(dataFile);

  const response = await request(app).get('/medicos');

  assert.equal(response.status, 401);
});

test('CRUD flow works with JWT', async () => {
  const dataFile = await createTempRepositoryFile([
    {
      id: 1,
      nombre_completo: 'Laura Hernández',
      especialidad_id: 1,
      especialidad_nombre: 'Medicina General',
      telefono: '555-100-0001',
      email: 'laura.hernandez@example.com',
      estado: 'Activo',
      created_at: '2026-05-19T00:00:00.000Z',
      updated_at: '2026-05-19T00:00:00.000Z',
    },
  ]);
  const app = makeApp(dataFile);

  const login = await request(app)
    .post('/auth/login')
    .send({ username: 'admin', password: 'admin123' });
  const token = login.body.token;

  const created = await request(app)
    .post('/medicos')
    .set('Authorization', `Bearer ${token}`)
    .send({
      nombre_completo: 'Ana Torres',
      especialidad_id: 2,
      especialidad_nombre: 'Cardiología',
      telefono: '555-200-0001',
      email: 'ana.torres@example.com',
      estado: 'Activo',
    });

  assert.equal(created.status, 201);
  assert.equal(created.body.nombre_completo, 'Ana Torres');

  const updated = await request(app)
    .put(`/medicos/${created.body.id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      estado: 'Inactivo',
    });

  assert.equal(updated.status, 200);
  assert.equal(updated.body.estado, 'Inactivo');

  const list = await request(app)
    .get('/medicos')
    .set('Authorization', `Bearer ${token}`)
    .query({ search: 'Ana' });

  assert.equal(list.status, 200);
  assert.equal(list.body.length, 1);

  const deleted = await request(app)
    .delete(`/medicos/${created.body.id}`)
    .set('Authorization', `Bearer ${token}`);

  assert.equal(deleted.status, 204);
});
