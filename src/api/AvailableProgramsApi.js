import axios from 'axios';
import { dvApiUrl } from './Constants';

export const getAvailablePrograms = async (token) => {
  const res = await axios.get(`${dvApiUrl}/hackers/dashboard/discovery`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return res
}
