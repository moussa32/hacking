import {
  GET_PROGRAM_INFO,
} from '../actions/type';

const initialState = {
  programInfo: {}
};

export default function program(state = initialState, action) {
  switch (action.type) {
    case GET_PROGRAM_INFO:
      return {
        ...state,
        programInfo: { ...action.programInfo },
      };
    default:
      return state;
  }
}
