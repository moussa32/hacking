import axios from "axios";
import {dvApiUrl} from "./../Constants";

export const getProgramNavbar = async (token) => {
  const res = await axios.get(`${dvApiUrl}/programs/navbar/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
