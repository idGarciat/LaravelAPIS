const jwt = require('jsonwebtoken');
const express = require('express');

function createAuthRouter({ jwtSecret, apiUser, apiPassword }) {
  const router = express.Router();

  router.post('/login', (req, res) => {
    const { username, password } = req.body || {};

    if (username !== apiUser || password !== apiPassword) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      {
        sub: username,
        role: 'medicos-service',
      },
      jwtSecret,
      { expiresIn: '8h' }
    );

    return res.json({
      token,
      token_type: 'Bearer',
      expires_in: 8 * 60 * 60,
      user: { username },
    });
  });

  return router;
}

module.exports = { createAuthRouter };
