import express from 'express';
import cors from 'cors';
import entriesRouter from './routes/entries';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/entries', entriesRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default app;
