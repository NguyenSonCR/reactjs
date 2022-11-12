import { createContext, useReducer } from 'react';
import axios from 'axios';
import { postReducer } from '~/reducers/postReducer';
import { apiUrl, POSTS_LOADED_SUCCESS, POSTS_LOADED_FAIL, FIND_POST } from './constants';

export const PostContext = createContext();
function PostContextProvider({ children }) {
  const [postsState, dispatch] = useReducer(postReducer, {
    post: null,
    postLoading: true,
    posts: [],
    postsLoading: true,
  });

  // get all posts
  const getPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts`);
      if (response.data.success) {
        dispatch({ type: POSTS_LOADED_SUCCESS, payload: response.data.posts });
      }
    } catch (error) {
      dispatch({ type: POSTS_LOADED_FAIL });
    }
  };

  // find one post when user click
  const findPost = (slug) => {
    const post = postsState.posts.find((post) => post.slug === slug);
    dispatch({ type: FIND_POST, payload: post });
  };

  // get one post with slug

  const getPost = async (slug) => {
    try {
      const response = await axios.get(`${apiUrl}/posts/${slug}`);
      if (response.data.success) {
        dispatch({ type: FIND_POST, payload: response.data.post });
        return response.data.post;
      }
    } catch (error) {
      dispatch({ type: POSTS_LOADED_FAIL });
    }
  };

  const postContextData = {
    postsState,
    getPosts,
    findPost,
    getPost,
  };

  return <PostContext.Provider value={postContextData}>{children}</PostContext.Provider>;
}

export default PostContextProvider;
