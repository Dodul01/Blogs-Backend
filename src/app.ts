import express, { Application, Request, Response } from 'express';
import cookiePerser from 'cookie-parser';
import cors from 'cors';
import { UserRouter } from './app/modules/User/user.route';
import { AuthRouter } from './app/modules/Auth/auth.route';
import { BlogRouter } from './app/modules/Blog/blog.router';
import { AdminRouter } from './app/modules/Admin/admin.route';
import notFound from './app/middlewares/notFound';

const app: Application = express();

app.use(express.json());
app.use(cookiePerser());
app.use(cors({ origin: ['http://localhost:5173'] }));

// Application routes

app.use('/api/', UserRouter);
app.use('/api/', AuthRouter);
app.use('/api/', BlogRouter);
app.use('/api/admin', AdminRouter);

// Health check
app.get('/', (req: Request, res: Response) => {
  res.send({ status: 200, message: 'Server is running' });
});

app.use(notFound);

export default app;
