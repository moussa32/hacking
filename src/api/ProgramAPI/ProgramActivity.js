import axios from 'axios';
import { dvApiUrl } from './../Constants';

export const getProgramActivity = async (token) => {
  const res = await axios.get(`${dvApiUrl}/programs/dashboard/user-activity`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return res
}