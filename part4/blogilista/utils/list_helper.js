const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);
  const mostLikesIndex = likes.indexOf(Math.max.apply(Math, likes));
  const favoriteBlog = blogs[mostLikesIndex];

  return {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes,
  };
};

const mostBlogs = (blogs) => {
  const authors = blogs.map((blog) => blog.author);
  const uniqueAuthors = [...new Set(authors)];
  const blogAmounts = uniqueAuthors.map(
    (author) => blogs.filter((blog) => blog.author === author).length
  );
  const mostBlogsIndex = blogAmounts.indexOf(Math.max.apply(Math, blogAmounts));

  return {
    author: uniqueAuthors[mostBlogsIndex],
    blogs: blogAmounts[mostBlogsIndex],
  };
};

const mostLikes = (blogs) => {
  const authors = blogs.map((blog) => blog.author);
  const uniqueAuthors = [...new Set(authors)];
  const likeAmounts = uniqueAuthors.map((uniqueAuthor) =>
    blogs
      .filter((blog) => blog.author === uniqueAuthor)
      .reduce((sum, blog) => sum + blog.likes, 0)
  );

  const mostLikesIndex = likeAmounts.indexOf(Math.max.apply(Math, likeAmounts));

  return {
    author: uniqueAuthors[mostLikesIndex],
    likes: likeAmounts[mostLikesIndex],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
