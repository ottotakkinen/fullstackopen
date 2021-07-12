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

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create };
