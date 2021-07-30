import {GET_PROGRAM_INFO} from "./type";

import {getProgram} from "../../../api/ProgramAPI/ProgramInfo";
import {getNewTokens} from "../../../api/RefreshTokenApi";

export const getProgramInfo = (info) => {
  return {
    type: GET_PROGRAM_INFO,
    programInfo: {...info},
  };
};

export const handleGetProgram = (userAccessToken) => {
  return (dispatch) => {
    return getProgram(userAccessToken)
      .then((res) => res.data)
      .then((program) => dispatch(getProgramInfo(program)))
      .catch((error) => {
        if (error.response.status == 401) {
          const reFreshtoken = localStorage.getItem("refreshToken");
          getNewTokens(reFreshtoken);
        }
      });
  };
};
