import pool from '../db/pg.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const getAllPosts = asyncHandler(async (req, res) => {
  const { rowCount: total, rows: posts } = await pool.query('SELECT * FROM recipes;');
  res.status(200).json({ total, posts });
});

export const getSinglePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { rows, rowCount } = await pool.query('SELECT * FROM recipes WHERE id=$1;', [id]);
  if (!rowCount) throw new Error(`Post with id of ${id} doesn't exist`);
  res.status(200).json(rows[0]);
});

export const createPost = asyncHandler(async (req, res) => {
  const { name, description, imgurl, instructions, ingredients } = req.body;
  if (!name || !description || !imgurl || !instructions || !ingredients)
    throw Error('All fields are required');
  const { rowCount: found } = await pool.query('SELECT * FROM recipes WHERE name=$1', [name]);
  if (found) throw Error('Recipe already exists');
  const values = [name, description, imgurl, instructions, ingredients];
  const { rows } = await pool.query(
    'INSERT INTO recipes(name, description, imgurl, instructions, ingredients) VALUES($1, $2, $3, $4, $5) RETURNING *',
    values
  );
  res.status(201).json(rows[0]);
});

export const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { rowCount: found } = await pool.query('SELECT * FROM recipes WHERE id=$1', [id]);
  if (!found) throw new Error(`Post with id of ${id} doesn't exist`);
  const { name, description, imgurl, instructions, ingredients } = req.body;
  if (!name || !description || !imgurl || !instructions || !ingredients)
    throw Error('All fields are required');
  const values = [name, description, imgurl, instructions, ingredients, id];
  const { rows } = await pool.query(
    'UPDATE recipes SET name=$1, description=$2, imgurl=$3, instructions=$4, ingredients=$5 WHERE id=$6 RETURNING *',
    values
  );
  res.status(200).json(rows[0]);
});

export const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { rowCount: found } = await pool.query('SELECT * FROM recipes WHERE id=$1', [id]);
  if (!found) throw new Error(`Post with id of ${id} doesn't exist`);
  const { rowCount: deleted } = await pool.query('DELETE FROM recipes WHERE id=$1 RETURNING *', [
    id
  ]);
  if (deleted)
    res.status(200).json({ success: true, message: `Post with id of ${id} was deleted` });
});
