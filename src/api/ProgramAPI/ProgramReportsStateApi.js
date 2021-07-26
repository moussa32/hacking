import axios from 'axios';
import { dvApiUrl } from '../Constants';

export const getProgramReportsStateApi = async (userAccessToken) => {
  const res = await axios.get(`${dvApiUrl}/programs/dashboard/reports-closed-state`, {
    headers: {
      'Authorization': `Bearer ${userAccessToken}`
    }
  })
  return res
}