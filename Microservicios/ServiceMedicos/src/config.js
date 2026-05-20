const path = require('path');

function getConfig() {
  return {
    port: Number(process.env.PORT || 3001),
    jwtSecret: process.env.JWT_SECRET || 'change-me-now',
    apiUser: process.env.API_USER || 'admin',
    apiPassword: process.env.API_PASSWORD || 'admin123',
    monolithMedicosUrl: process.env.MONOLITH_MEDICOS_URL || '',
    monolithAuthToken: process.env.MONOLITH_AUTH_TOKEN || '',
    dataFile: path.resolve(process.cwd(), process.env.DATA_FILE || './data/medicos.json'),
  };
}

module.exports = { getConfig };
