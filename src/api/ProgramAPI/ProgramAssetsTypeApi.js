import axios from 'axios';
import { dvApiUrl } from './../Constants';

export const getProgramAssetsTypeApi = async (userAccessToken) => {
  const res = await axios.get(`${dvApiUrl}/hackers/dashboard/discovery/program_assets__type`, {
    headers: {
      'Authorization': `Bearer ${userAccessToken}`
    }
  })
  return res
}
