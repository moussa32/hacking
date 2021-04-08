import axios from 'axios';
import { dvApiUrl } from './Constants';

export const postNewUser = (userInfo) => axios.post(`${dvApiUrl}/auth/hackers/signup/`, userInfo);
