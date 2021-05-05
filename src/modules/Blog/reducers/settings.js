import {
  GET_USER_INFO,
} from '../actions/types';

const initialState = {
  userAvatar: 'Yes',
};

export default function settings(state = initialState, action) {
  switch (action.type) {
    case "GET_USER_INFO":
      return {
        ...state,
        info: [...action.blogs]
      }
  }
  return state
}