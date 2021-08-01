import axios from "axios";
import {dvApiUrl} from "./Constants";

export const getHackerNavbar = async (token) => {
  const res = await axios.get(`${dvApiUrl}/hackers/navbar/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
