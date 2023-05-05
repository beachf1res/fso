const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

const initialBlogs = [
  {
    title: 'First blog',
    author: 'First author',
    url: 'google.com',
    likes: 1,
  },
  {
    title: 'Second blog',
    author: 'Second author',
    url: 'facebook.com',
    likes: 2,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = initialBlogs.map((blog) => new Blog(blog));
  const promiseArr = blogObjects.map((blog) => blog.save());

  await Promise.all(promiseArr);
});

test('blogs return as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(initialBlogs.length);
});

test('blogs have id field', async () => {
  const { body } = await api.get('/api/blogs');
  const firstBlog = body[0];
  expect(firstBlog.id).toBeDefined();
});

test('blog can be created', async () => {
  const blogToPost = {
    title: 'New blog',
    author: 'New author',
    url: 'google.com',
    likes: 20,
  };

  await api
    .post('/api/blogs')
    .send(blogToPost)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const res = await api.get('/api/blogs');
  const titles = res.body.map((r) => r.title);
  expect(titles).toContain('New blog');
});

test('blog can be deleted', async () => {
  const { body: blogsBefore } = await api.get('/api/blogs');
  const blogToRemove = blogsBefore[0];

  await api.delete(`/api/blogs/${blogToRemove.id}`).expect(204);
  const { body: blogsAfterDeletion } = await api.get('/api/blogs');

  expect(blogsAfterDeletion).toHaveLength(initialBlogs.length - 1);

  const titles = blogsAfterDeletion.map((b) => b.title);
  expect(titles).not.toContain(blogToRemove.title);
});

test('blog likes can be updated', async () => {
  const { body: blogsBefore } = await api.get('/api/blogs');
  const blogToUpdate = blogsBefore[0];

  const { body: updatedBlog } = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send({
      ...blogToUpdate,
      likes: 50,
    })
    .expect(200);

  expect(updatedBlog.likes).toBe(50);
});

test('likes property defaults to 0 if not provided in request', async () => {
  const blogWithoutLikesField = {
    title: 'Blog without likes',
    author: 'Author',
    url: 'google.com',
  };

  const { body: newBlog } = await api
    .post('/api/blogs')
    .send(blogWithoutLikesField);

  expect(newBlog.likes).toBe(0);
});

test('server responds with bad request if title or url props are missing from new blog request', async () => {
  const invalidBlog = {
    author: 'Author',
  };

  await api.post('/api/blogs').send(invalidBlog).expect(400);
});

afterAll(async () => {
  await mongoose.connection.close();
});
