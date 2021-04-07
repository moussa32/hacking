import axios from 'axios';
import { apiUrl } from './Constants';

export const getHackerInfo = () => axios.get(`${apiUrl}/hackers/dashboard/user-info`);
