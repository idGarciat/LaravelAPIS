const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const jwt = require('jsonwebtoken');

const { createApp } = require('../src/app');

function makeRepository() {
  return {
    async findUserByCredentials(identifier, password) {
      if (identifier === 'admin@example.com' && password === 'admin123') {
        return {
          id: 1,
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin',
          source: 'admin',
        };
      }

      if (identifier === 'paciente@example.com' && password === 'patient123') {
        return {
          id: 2,
          name: 'Paciente User',
          email: 'paciente@example.com',
          role: 'patient',
          source: 'patient',
        };
      }

      return null;
    },
  };
}

function makeApp() {
  return createApp({
    jwtSecret: 'test-secret',
    authMode: 'api',
    repository: makeRepository(),
    apiBaseUrl: '',
    apiToken: '',
    monolithLoginUsersUrl: '',
    monolithLoginPatientsUrl: '',
    mysqlHost: 'localhost',
    mysqlPort: 3306,
    mysqlUser: 'root',
    mysqlPassword: '',
    mysqlDatabase: 'administracion',
  });
}

test('login returns JWT token for admin user', async () => {
  const app = makeApp();

  const response = await request(app)
    .post('/auth/login')
    .send({ identifier: 'admin@example.com', password: 'admin123' });

  assert.equal(response.status, 200);
  assert.equal(response.body.token_type, 'Bearer');
  assert.equal(response.body.user.role, 'admin');
  const decoded = jwt.verify(response.body.token, 'test-secret');
  assert.equal(decoded.role, 'admin');
});

test('login returns JWT token for patient user', async () => {
  const app = makeApp();

  const response = await request(app)
    .post('/auth/login')
    .send({ identifier: 'paciente@example.com', password: 'patient123' });

  assert.equal(response.status, 200);
  assert.equal(response.body.user.role, 'patient');
});

test('login rejects invalid credentials', async () => {
  const app = makeApp();

  const response = await request(app)
    .post('/auth/login')
    .send({ identifier: 'admin@example.com', password: 'wrong' });

  assert.equal(response.status, 401);
});

test('protected route requires JWT', async () => {
  const app = makeApp();

  const response = await request(app).get('/me');

  assert.equal(response.status, 401);
});
