import axios from 'axios';
import { dvApiUrl } from './Constants';

export const getHackerActivity = async (token) => {
  const res = await axios.get(`${dvApiUrl}/hackers/dashboard/user-activity`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return res
}
