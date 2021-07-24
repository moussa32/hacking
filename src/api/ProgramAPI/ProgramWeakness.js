import axios from 'axios';
import { dvApiUrl } from '../Constants';

export const getProgramWeakness = async (userAccessToken) => {
  const res = await axios.get(`${dvApiUrl}/programs/dashboard/reports-weaknesses`, {
    headers: {
      'Authorization': `Bearer ${userAccessToken}`
    }
  })
  return res
}