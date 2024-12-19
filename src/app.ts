import express, { Application, Request, Response } from 'express';
import cookiePerser from 'cookie-parser';
import cors from 'cors';
import { UserRouter } from './app/modules/User/user.route';
import { AuthRouter } from './app/modules/Auth/auth.route';
import { BlogRouter } from './app/modules/Blog/blog.router';

const app: Application = express();

app.use(express.json());
app.use(cookiePerser());
app.use(cors({ origin: ['http://localhost:5173'] }));

// Application routes

app.use('/api/', UserRouter);
app.use('/api/', AuthRouter);
app.use('/api/', BlogRouter);

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.send({ status: 200, message: 'Hello world!' });
});

export default app;
