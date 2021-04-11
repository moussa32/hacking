import axios from 'axios';
import { dvApiUrl } from './Constants';

export const getHackerWeaknessReports = async (token) => {
  const res = await axios.get(`${dvApiUrl}/hackers/dashboard/reports-weaknesses`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return res
}
