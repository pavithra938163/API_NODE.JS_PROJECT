const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const authRoutes = require('./routes/auth.routes');
const schoolRoutes = require('./routes/school.routes');
const apiRateLimiter = require('./middlewares/rateLimit.middleware');
const errorMiddleware = require('./middlewares/error.middleware');
const notFoundMiddleware = require('./middlewares/notFound.middleware');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(apiRateLimiter);

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/schools', schoolRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
