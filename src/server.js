const app = require('./app');
const env = require('./config/env');
const pool = require('./config/db');
const logger = require('./Utils/logger');

async function startServer() {
  try {
    const connection = await pool.getConnection();
    connection.release();

    app.listen(env.port, () => {
      logger.info(`Server running on http://localhost:${env.port}`);
    });
  } catch (error) {
    logger.error('Database connection failed:', error.message);
    process.exit(1);
  }
}

startServer();
