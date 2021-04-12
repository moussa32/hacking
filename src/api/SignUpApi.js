import axios from 'axios';
import { dvApiUrl } from './Constants';

export const sendUserInfo = async (userInfo) => {
  const res = await axios.post(`${dvApiUrl}/auth/hackers/signup/`, userInfo)
  return res
}
