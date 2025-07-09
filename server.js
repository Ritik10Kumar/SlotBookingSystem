require('dotenv').config();
const express = require('express');
const app = express();
const { sequelize } = require('./models');
const routes = require('./routes/index.js');
const logger = require('./middlewares/logger');

app.use(logger);
app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }).then(() => {
  console.log('DB synced');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('DB Connection Failed:', err));
