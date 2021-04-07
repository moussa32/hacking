import axios from 'axios';
import { dvApiUrl } from './Constants';

export const getHackerInfo = () => axios.get(`${dvApiUrl}/hackers/dashboard/user-info`);
