import axios from 'axios';
import { dvApiUrl } from '../Constants';

export const getProgramReportsLevels = async (userAccessToken) => {
  const res = await axios.get(`${dvApiUrl}/programs/dashboard/reports-levels`, {
    headers: {
      'Authorization': `Bearer ${userAccessToken}`
    }
  })
  return res
}
