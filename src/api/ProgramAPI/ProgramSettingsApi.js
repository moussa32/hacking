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

export const setCompanyRewards = async (userAccessToken, newRewards) => {
  const res = await axios.post(`${dvApiUrl}/programs/dashboard/settings/rewards`, newRewards, {
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
    },
  });
  return res;
};

export const putCompanyRewards = async (userAccessToken, updatedReward) => {
  const res = await axios.put(`${dvApiUrl}/programs/dashboard/settings/rewards`, updatedReward, {
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
    },
  });
  return res;
};

export const getCompanyAssets = async (userAccessToken) => {
  const res = await axios.get(`${dvApiUrl}/programs/dashboard/settings/assets`, {
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
    },
  });
  return res;
};

export const deleteCompanyAssets = async (userAccessToken, deletedAsset) => {
  const res = await axios.delete(`${dvApiUrl}/programs/dashboard/settings/assets/${deletedAsset}/`, {
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
    },
  });
  return res;
};

export const getCompanyAds = async (userAccessToken) => {
  const res = await axios.get(`${dvApiUrl}/programs/dashboard/settings/announcements`, {
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
    },
  });
  return res;
};

export const deleteCompanyAds = async (userAccessToken, adId) => {
  const res = await axios.delete(`${dvApiUrl}​/programs/dashboard/settings/announcements/${adId}/`, {
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
    },
  });
  return res;
};
