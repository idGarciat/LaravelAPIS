const { MongoClient } = require('mongodb');

class MongoConnection {
  constructor({ mongoUri, mongoDbName, mongoCollectionName }) {
    this.mongoUri = mongoUri;
    this.mongoDbName = mongoDbName;
    this.mongoCollectionName = mongoCollectionName;
    this.client = null;
    this.collection = null;
  }

  async connect() {
    if (this.collection) {
      return this.collection;
    }

    this.client = new MongoClient(this.mongoUri);
    await this.client.connect();
    const db = this.client.db(this.mongoDbName);
    this.collection = db.collection(this.mongoCollectionName);
    await this.collection.createIndex({ medico_id: 1, paciente_id: 1, fecha_cita: 1, hora_cita: 1 });
    return this.collection;
  }

  async close() {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.collection = null;
    }
  }
}

module.exports = { MongoConnection };
