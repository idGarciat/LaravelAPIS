require('dotenv').config();

const { getConfig } = require('./config');
const { createApp } = require('./app');
const { MongoConnection } = require('./db/mongo');
const { CitaRepository } = require('./data/citaRepository');

async function bootstrap() {
  const config = getConfig();
  const mongo = new MongoConnection(config);
  const collection = await mongo.connect();
  const repository = new CitaRepository(collection);
  const app = createApp({ repository });

  app.listen(config.port, () => {
    console.log(`ServiceCitas listening on http://localhost:${config.port}`);
  });
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
