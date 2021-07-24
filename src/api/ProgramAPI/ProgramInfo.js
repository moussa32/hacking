import axios from 'axios';
import { dvApiUrl } from './../Constants';

export const getProgram = async (userAccessToken) => {
  const res = await axios.get(`${dvApiUrl}/programs/dashboard/user-info`, {
    headers: {
      'Authorization': `Bearer ${userAccessToken}`
    }
  })
  return res;
}