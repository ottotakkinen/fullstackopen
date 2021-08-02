import blogService from '../services/blogs';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data;

    case 'NEW_BLOG':
      return [...state, action.data];

    case 'LIKE_BLOG':
      return state.map((blog) =>
        blog.id === action.data.id ? action.data : blog
      );

    case 'REMOVE_BLOG':
      return state.filter((blog) => blog.id !== action.data.id);

    default:
      return state;
  }
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({ type: 'INIT_BLOGS', data: blogs });
  };
};

export const createBlog = (token, blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(token, blog);
    dispatch({ type: 'NEW_BLOG', data: newBlog });
  };
};

export const likeBlog = (token, blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.like(token, blog);
    dispatch({ type: 'LIKE_BLOG', data: likedBlog });
  };
};

export const removeBlog = (token, blog) => {
  return async (dispatch) => {
    await blogService.remove(token, blog);
    dispatch({ type: 'REMOVE_BLOG', data: blog });
  };
};

export default reducer;
