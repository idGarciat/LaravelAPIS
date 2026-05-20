const express = require('express');
const { createAuthRouter } = require('./routes/auth');
const { createAuthMiddleware } = require('./middleware/auth');
const { AuthRepository } = require('./data/authRepository');

function createApp(config) {
  const app = express();
  const repository = config.repository || new AuthRepository(config, config.overrides || {});
  const authenticate = createAuthMiddleware(config.jwtSecret);

  app.use(express.json());

  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/auth', createAuthRouter({
    jwtSecret: config.jwtSecret,
    repository,
  }));

  app.get('/me', authenticate, (req, res) => {
    res.json({ user: req.user });
  });

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
