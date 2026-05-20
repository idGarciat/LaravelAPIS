const express = require('express');
const jwt = require('jsonwebtoken');

function createAuthRouter({ jwtSecret, repository }) {
  const router = express.Router();

  router.post('/login', async (req, res, next) => {
    try {
      const { identifier, password } = req.body || {};

      if (!identifier || !password) {
        return res.status(400).json({ message: 'identifier y password son obligatorios' });
      }

      const user = await repository.findUserByCredentials(identifier, password);
      if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      const token = jwt.sign(
        {
          sub: String(user.id),
          name: user.name,
          email: user.email,
          role: user.role,
          source: user.source,
        },
        jwtSecret,
        { expiresIn: '8h' }
      );

      return res.json({
        token,
        token_type: 'Bearer',
        expires_in: 8 * 60 * 60,
        user,
      });
    } catch (error) {
      return next(error);
    }
  });

  return router;
}

module.exports = { createAuthRouter };
