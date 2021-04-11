import axios from 'axios';
import { dvApiUrl } from './Constants';

export const getHackerWASP = async (token) => {
  const res = await axios.get(`${dvApiUrl}/hackers/dashboard/reports-10OWASP`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return res
}
