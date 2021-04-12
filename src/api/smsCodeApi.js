import axios from 'axios';
import { dvApiUrl } from './Constants';

export const sendSmsCode = async (token, smsCode) => {
  const res = await axios.post(`${dvApiUrl}/auth/hackers/verify-phone-code/`, smsCode, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return res
}
