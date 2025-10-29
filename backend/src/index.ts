import app from './server';
import dotenv from 'dotenv';
dotenv.config();

const DEFAULT_PORT = 4000;
const rawPort = process.env.PORT;
const PORT: number = rawPort ? Number(rawPort) : DEFAULT_PORT;
if (Number.isNaN(PORT)) {
  throw new Error(`Invalid PORT value: ${rawPort}`);
}

const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
