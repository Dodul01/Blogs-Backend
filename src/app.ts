import express, { Application, Request, Response } from 'express';
import cookiePerser from 'cookie-parser';
import cors from 'cors';

const app: Application = express();

app.use(express.json());
app.use(cookiePerser());
app.use(cors({ origin: ['http://localhost:5173'] }));

app.get('/health', (req: Request, res: Response) => {
  res.send({ status: 200, message: 'Hello world!' });
});

export default app;