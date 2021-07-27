import { Router } from 'express';
import {
  createPost,
  deletePost,
  getAllPosts,
  getSinglePost,
  updatePost
} from '../controllers/posts.js';

const postRouter = Router();

postRouter.get('/', getAllPosts);
postRouter.get('/:id', getSinglePost);
postRouter.post('/', createPost);
postRouter.put('/:id', updatePost);
postRouter.delete('/:id', deletePost);

export default postRouter;
