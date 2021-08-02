import axios from "axios";
import { dvApiUrl } from "./../Constants";

export const getCompanyLogo = async userAccessToken => {
  const res = await axios.get(`${dvApiUrl}/programs/dashboard/settings/set-logo`, {
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
    },
  });
  return res;
};

export const putCompanyLogo = async (userAccessToken, updatedLogo) => {
  const res = await axios.put(`${dvApiUrl}/programs/dashboard/settings/set-logo`, updatedLogo, {
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
    },
  });
  return res;
};

export const getCompanyInfo = async userAccessToken => {
  const res = await axios.get(`${dvApiUrl}/programs/dashboard/settings/company-info`, {
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
    },
  });
  return res;
};

export const putCompanyInfo = async (userAccessToken, updatedInfo) => {
  const res = await axios.put(`${dvApiUrl}/programs/dashboard/settings/company-info`, updatedInfo, {
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
    },
  });
  return res;
};

export const getCompanyPolicy = async userAccessToken => {
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

export const getCompanyRewards = async userAccessToken => {
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

export const getCompanyAssets = async userAccessToken => {
  const res = await axios.get(`${dvApiUrl}/programs/dashboard/settings/assets`, {
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
    },
  });
  return res;
};

export const getCompanyAsset = async (userAccessToken, assetId) => {
  const res = await axios.get(`${dvApiUrl}/programs/dashboard/settings/assets/${assetId}/`, {
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
    },
  });
  return res;
};

export const putCompanyAssets = async (userAccessToken, assetId, updatedInfo) => {
  const res = await axios.put(`${dvApiUrl}/programs/dashboard/settings/assets/${assetId}/`, updatedInfo, {
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
    },
  });
  return res;
};

export const postCompanyAssets = async (userAccessToken, newAsset) => {
  const res = await axios.post(`${dvApiUrl}/programs/dashboard/settings/assets`, newAsset, {
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

export const getCompanyAds = async userAccessToken => {
  const res = await axios.get(`${dvApiUrl}/programs/dashboard/settings/announcements`, {
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
    },
  });
  return res;
};

export const getCompanyAd = async (userAccessToken, adId) => {
  const res = await axios.get(`${dvApiUrl}/programs/dashboard/settings/announcements/${adId}/`, {
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
    },
  });
  return res;
};

export const putCompanyAd = async (userAccessToken, adId, updatedAd) => {
  const res = await axios.put(`${dvApiUrl}/programs/dashboard/settings/announcements/${adId}/`, updatedAd, {
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
    },
  });
  return res;
};

export const postCompanyAds = async (userAccessToken, newAd) => {
  const res = await axios.post(`${dvApiUrl}/programs/dashboard/settings/announcements`, newAd, {
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
    },
  });
  return res;
};

export const deleteCompanyAds = async (userAccessToken, adId) => {
  const res = await axios.delete(`${dvApiUrl}/programs/dashboard/settings/announcements/${adId}/`, {
    headers: {
      Authorization: `Bearer ${userAccessToken}`,
    },
  });
  return res;
};
