import express from 'express';
import postRouter from './routes/postRouter.js';

const app = express();
const port = process.env.PORT || 5000;

app.use('/blog/posts', postRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));