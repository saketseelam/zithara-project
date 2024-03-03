import express from 'express';
import cookieParser from 'cookie-parser';
import customerRouter from './routes/customerRoutes.js';

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Cookie parser middleware
app.use(cookieParser());

app.use('/customers',customerRouter);

app.listen(port, () => console.log(`server is running on port ${port}`));