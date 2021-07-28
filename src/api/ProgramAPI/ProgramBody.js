import axios from "axios";
import {dvApiUrl} from "../Constants";

export const getProgramBody = async () => {
  const res = await axios.get(`${dvApiUrl}/programs/9/`);
  return res;
};
