import axios from 'axios';
import { dvApiUrl } from './Constants';

export const getHackerInfo = async () => {
  const res = await axios.get(`${dvApiUrl}/hackers/dashboard/user-info`)
  return res
}
