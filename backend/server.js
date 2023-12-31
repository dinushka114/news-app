import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import path from "path";
import cors from "cors";
import { fileURLToPath } from 'url';

import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from "./routes/authRoutes.js";

import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
import connectDB from './config/db.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();


app.use(cors({credentials:true , origin:'http://localhost:3000'}));
app.use(
    fileUpload({
        limits: {
            fileSize: 10000000,
        },
        abortOnLimit: true,
    })
);

app.use(express.static(path.join(__dirname, 'public')));
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