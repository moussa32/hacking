import axios from "axios";
import { dvApiUrl } from "./Constants";
import { Redirect } from "react-router-dom";
import { handleSetUserToken } from "../modules/Blog/actions/index";

export const getNewTokens = async oldRefreshToken => {
  const res = await axios
    .post(
      `${dvApiUrl}/auth/hackers/refresh/`,
      { refresh: oldRefreshToken },
      {
        headers: {
          Authorization: `Bearer ${oldRefreshToken}`,
        },
      }
    )
    .then(res => {
      handleSetUserToken("accessToken", res.data.access);
      handleSetUserToken("refreshToken", res.data.refresh);
      window.location.reload();
    })
    .catch(error => {
      if (error.response.status === 401) {
        localStorage.clear();
        window.location.pathname = "/login";
      }
    });

  return res;
};
