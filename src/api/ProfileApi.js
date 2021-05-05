import axios from 'axios';
import { dvApiUrl } from './Constants';

export const updateUserProfile = async (token, newUserProfileData) => {
  const res = await axios.post(`${dvApiUrl}/hackers/dashboard/profile/`, newUserProfileData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return res
}
