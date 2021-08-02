import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const create = async (token, blogPost) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.post(baseUrl, blogPost, config);
  return res.data;
};

const like = async (token, blog) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const updatedBlog = {
    ...blog,
    likes: blog.likes + 1,
  };

  const res = await axios.put(`${baseUrl}/${blog.id}`, updatedBlog, config);
  console.log(res.data);
  return res.data;
};

const remove = async (token, blog) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.delete(`${baseUrl}/${blog.id}`, config);
  return res.data;
};

export default { getAll, create, like, remove };
