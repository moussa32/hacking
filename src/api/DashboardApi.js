import axios from 'axios';
import { dvApiUrl } from './Constants';

export const getHackerInfo = async (token) => {
  const res = await axios.get(`${dvApiUrl}/hackers/dashboard/user-info`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return res
}