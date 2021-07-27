import pool from '../db/pg.js';

export const getAllPosts = async (req, res) => {
  try {
    const { rowCount: total, rows: posts } = await pool.query('SELECT * FROM recipes;');
    res.status(200).json({ total, posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getSinglePost = (req, res) => res.send('hello');
export const createPost = (req, res) => res.send('hello');
export const updatePost = (req, res) => res.send('hello');
export const deletePost = (req, res) => res.send('hello');
