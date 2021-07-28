import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
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
