import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from "./routes/authRoutes.js";

import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
import connectDB from './config/db.js';

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth' , authRoutes);

connectDB();

app.get('/', (req, res) => res.send('API running'));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));