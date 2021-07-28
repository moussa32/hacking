import axios from 'axios';
import { dvApiUrl } from './Constants';

export const getAvailablePrograms = async () => {
  const res = await axios.get(`${dvApiUrl}/hackers/dashboard/discovery`)
  return res
}

export const getAvailableProgramsByPram = async (productType, status = '') => {
  const res = await axios.get(`${dvApiUrl}/hackers/dashboard/discovery?program_assets__type=${productType}&status=${status}`)
  return res
}