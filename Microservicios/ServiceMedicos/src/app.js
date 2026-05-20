const express = require('express');
const { createAuthMiddleware } = require('./middleware/auth');
const { createAuthRouter } = require('./routes/auth');
const { createMedicosRouter } = require('./routes/medicos');
const { MedicoRepository } = require('./data/medicoRepository');

function createApp(config) {
  const app = express();
  const repository = config.repository || new MedicoRepository({
    dataFile: config.dataFile,
    monolithMedicosUrl: config.monolithMedicosUrl,
    monolithAuthToken: config.monolithAuthToken,
  });
  const authenticate = createAuthMiddleware(config.jwtSecret);

  app.use(express.json());

  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/auth', createAuthRouter({
    jwtSecret: config.jwtSecret,
    apiUser: config.apiUser,
    apiPassword: config.apiPassword,
  }));

  app.use('/medicos', createMedicosRouter({
    repository,
    authenticate,
  }));

  app.use((error, req, res, next) => {
    if (error.status) {
      return res.status(error.status).json({
        message: error.message,
        details: error.details || null,
      });
    }

    console.error(error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  });

  return app;
}

module.exports = { createApp };
