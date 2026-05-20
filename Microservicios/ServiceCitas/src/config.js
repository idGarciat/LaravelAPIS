function getConfig() {
  return {
    port: Number(process.env.PORT || 3003),
    mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017',
    mongoDbName: process.env.MONGODB_DB || 'service_citas',
    mongoCollectionName: process.env.MONGODB_COLLECTION || 'citas',
  };
}

module.exports = { getConfig };
