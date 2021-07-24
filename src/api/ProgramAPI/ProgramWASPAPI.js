import axios from 'axios';
import { dvApiUrl } from './../Constants';

export const getProgramWASP = async (userAccessToken) => {
  const res = await axios.get(`${dvApiUrl}/programs/dashboard/reports-10OWASP`, {
    headers: {
      'Authorization': `Bearer ${userAccessToken}`
    }
  })
  return res
}
