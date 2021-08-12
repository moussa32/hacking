import axios from "axios";
import { dvApiUrl } from "./Constants";

export const getAvailablePrograms = async () => {
  const res = await axios.get(`${dvApiUrl}/hackers/dashboard/discovery`);
  return res;
};

export const getAvailableProgramsByPram = async path => {
  const res = await axios.get(`${dvApiUrl}/hackers/dashboard/discovery?${path}`);
  return res;
};

export const getAvailableProgramAds = async () => {
  const res = await axios.get(`${dvApiUrl}/ads/`);
  return res;
};
