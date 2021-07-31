import axios from "axios";
import {dvApiUrl} from "./../Constants";

export const putCompanyInfo = async (userAccessToken, updatedInfo) => {
  const res = await axios.put(`${dvApiUrl}/programs/dashboard/settings/company-info`, updatedInfo, {
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
    },
  });
  return res;
};

export const getCompanyPolicy = async (userAccessToken) => {
  const res = await axios.get(`${dvApiUrl}/programs/dashboard/settings/company-policy`, {
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
    },
  });
  return res;
};

export const putCompanyPolicy = async (userAccessToken, updatedPolicy) => {
  const res = await axios.put(`${dvApiUrl}/programs/dashboard/settings/company-policy`, updatedPolicy, {
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
    },
  });
  return res;
};

export const getCompanyRewards = async (userAccessToken) => {
  const res = await axios.get(`${dvApiUrl}/programs/dashboard/settings/rewards`, {
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
    },
  });
  return res;
};
