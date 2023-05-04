const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.post('/', async (req, res, next) => {
  const { body } = req;
  const user = await User.findById(body.userId);

  const blog = new Blog({ ...body, author: user.name, user: user.id });

  try {
    const createdBlog = await blog.save();
    user.blogs = user.blogs.concat(createdBlog._id);
    await user.save();

    res.status(201).json(createdBlog);
  } catch (e) {
    next(e);
  }
});

blogsRouter.get('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).end();
    }
  } catch (e) {
    next(e);
  }
});

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
});

blogsRouter.put('/:id', async (req, res, next) => {
  try {
    const {
      body,
      params: { id },
    } = req;

    const updatedBlog = await Blog.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
      context: 'query',
    });
    res.json(updatedBlog);
  } catch (e) {
    next(e);
  }
});

module.exports = blogsRouter;
