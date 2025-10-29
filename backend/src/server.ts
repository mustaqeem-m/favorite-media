import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth';
import entriesRouter from './routes/entries';
import rateLimit from 'express-rate-limit';

const app = express();

// Trust the first proxy
app.set('trust proxy', 1);

// Middlewares
app.use(cookieParser());
app.use(
  cors({
    origin: 'https://favorite-media-beta.vercel.app',
    credentials: true,
  })
);
app.use(express.json());
const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: 'Too many requests' },
});
// Routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/entries', entriesRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default app;
