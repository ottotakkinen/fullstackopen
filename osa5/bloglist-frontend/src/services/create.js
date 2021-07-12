import axios from 'axios';
const URL = '/api/blogs';

const create = async (token, blogPost) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.post(URL, blogPost, config);
  return res.data;
};

export default create;
