const express = require('express');
const { createCitasRouter } = require('./routes/citas');

function createApp({ repository }) {
  const app = express();

  app.use(express.json());

  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/citas', createCitasRouter({ repository }));

  app.use((error, req, res, next) => {
    if (error.status) {
      return res.status(error.status).json({ message: error.message });
    }

    console.error(error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  });

  return app;
}

module.exports = { createApp };
