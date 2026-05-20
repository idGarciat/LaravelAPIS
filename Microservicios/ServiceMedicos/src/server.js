require('dotenv').config();

const { getConfig } = require('./config');
const { createApp } = require('./app');

const config = getConfig();
const app = createApp(config);

app.listen(config.port, () => {
  console.log(`ServiceMedicos listening on http://localhost:${config.port}`);
});
