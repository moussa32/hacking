import axios from 'axios';
import { dvApiUrl } from './Constants';

export const getHackerReports = async (token) => {
  const res = await axios.get(`${dvApiUrl}/hackers/dashboard/reports-levels`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return res
}
