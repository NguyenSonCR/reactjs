import { POSTS_LOADED_FAIL, POSTS_LOADED_SUCCESS, FIND_POST } from '~/contexts/constants';

export const postReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case POSTS_LOADED_SUCCESS:
      return {
        ...state,
        posts: payload,
        postsLoading: false,
      };

    case POSTS_LOADED_FAIL:
      return {
        ...state,
        post: [],
        posts: [],
        postsLoading: false,
      };

    case FIND_POST:
      return {
        ...state,
        post: payload,
        postLoading: false,
        postsLoading: false,
      };
    default:
      return state;
  }
};
