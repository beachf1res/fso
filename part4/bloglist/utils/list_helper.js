const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, curr) => acc + curr.likes, 0);
};

const favoriteBlog = (blogs) => {
  const [topBlog] = [...blogs].sort((a, b) => b.likes - a.likes);
  return topBlog;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
