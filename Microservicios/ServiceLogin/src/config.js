function getConfig() {
  return {
    port: Number(process.env.PORT || 3002),
    jwtSecret: process.env.JWT_SECRET || 'change-me-now',
    authMode: (process.env.AUTH_MODE || 'api').toLowerCase(),
    apiBaseUrl: process.env.API_BASE_URL || '',
    apiToken: process.env.API_TOKEN || '',
    monolithLoginUsersUrl: process.env.MONOLITH_LOGIN_USERS_URL || '',
    monolithLoginPatientsUrl: process.env.MONOLITH_LOGIN_PATIENTS_URL || '',
    mysqlHost: process.env.MYSQL_HOST || 'localhost',
    mysqlPort: Number(process.env.MYSQL_PORT || 3306),
    mysqlUser: process.env.MYSQL_USER || 'root',
    mysqlPassword: process.env.MYSQL_PASSWORD || '',
    mysqlDatabase: process.env.MYSQL_DATABASE || 'administracion',
  };
}

module.exports = { getConfig };
