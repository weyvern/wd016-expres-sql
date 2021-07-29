import 'dotenv/config.js';
import express from 'express';
import postRouter from './routes/postRouter.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use('/blog/posts', postRouter);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
