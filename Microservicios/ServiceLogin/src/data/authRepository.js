const mysql = require('mysql2/promise');

class AuthRepository {
  constructor(config, overrides = {}) {
    this.config = config;
    this.httpClient = overrides.httpClient || fetch;
    this.mysqlPool = overrides.mysqlPool || null;
  }

  async findUserByCredentials(identifier, password) {
    if (this.config.authMode === 'mysql') {
      return this.#findUserByMysql(identifier, password);
    }

    return this.#findUserByApi(identifier, password);
  }

  async #findUserByApi(identifier, password) {
    const sources = [
      {
        role: 'admin',
        url: this.config.monolithLoginUsersUrl,
      },
      {
        role: 'patient',
        url: this.config.monolithLoginPatientsUrl,
      },
    ].filter((source) => source.url);

    for (const source of sources) {
      const response = await this.httpClient(source.url, {
        headers: this.#buildHeaders(),
      });

      if (!response.ok) {
        continue;
      }

      const payload = await response.json();
      const records = Array.isArray(payload) ? payload : payload.data || payload.users || payload.pacientes || [];
      const match = records.find((record) => this.#matchesCredential(record, identifier, password));
      if (match) {
        return this.#normalizeUser(match, source.role);
      }
    }

    return null;
  }

  async #findUserByMysql(identifier, password) {
    const pool = this.mysqlPool || mysql.createPool({
      host: this.config.mysqlHost,
      port: this.config.mysqlPort,
      user: this.config.mysqlUser,
      password: this.config.mysqlPassword,
      database: this.config.mysqlDatabase,
      waitForConnections: true,
      connectionLimit: 5,
    });

    const adminRows = await this.#queryMysql(pool, 'SELECT id, name AS name, email, password, role FROM users WHERE email = ? LIMIT 1', [identifier]);
    const patientRows = await this.#queryMysql(pool, 'SELECT id, nombre_completo AS name, email, password, tipo_paciente AS role FROM pacientes WHERE email = ? LIMIT 1', [identifier]);

    const record = adminRows[0] || patientRows[0] || null;
    if (!record) {
      return null;
    }

    if (!this.#matchesMysqlPassword(record.password, password)) {
      return null;
    }

    return this.#normalizeUser(record, record.role === 'admin' ? 'admin' : 'patient');
  }

  async #queryMysql(pool, sql, params) {
    const [rows] = await pool.execute(sql, params);
    return rows;
  }

  #matchesCredential(record, identifier, password) {
    const email = record.email || record.correo || record.username;
    const name = record.name || record.nombre || record.nombre_completo;
    const matchesIdentifier = [email, name]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase() === String(identifier).toLowerCase());

    if (!matchesIdentifier) {
      return false;
    }

    const storedPassword = record.password || record.contrasena || record.pass || record.password_hash;
    if (storedPassword === undefined || storedPassword === null) {
      return false;
    }

    return String(storedPassword) === String(password);
  }

  #matchesMysqlPassword(storedPassword, password) {
    return String(storedPassword) === String(password);
  }

  #normalizeUser(record, role) {
    return {
      id: record.id,
      name: record.name || record.nombre || record.nombre_completo || record.email,
      email: record.email || record.correo || null,
      role,
      source: role,
    };
  }

  #buildHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (this.config.apiToken) {
      headers.Authorization = this.config.apiToken.startsWith('Bearer ')
        ? this.config.apiToken
        : `Bearer ${this.config.apiToken}`;
    }

    return headers;
  }
}

module.exports = { AuthRepository };
