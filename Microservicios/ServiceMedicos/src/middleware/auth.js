const jwt = require('jsonwebtoken');

function createAuthMiddleware(jwtSecret) {
  return function authenticate(req, res, next) {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;

    if (!token) {
      return res.status(401).json({ message: 'Token JWT requerido' });
    }

    try {
      req.user = jwt.verify(token, jwtSecret);
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Token JWT inválido' });
    }
  };
}

module.exports = { createAuthMiddleware };
