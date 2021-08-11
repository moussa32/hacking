import axios from "axios";
import { dvApiUrl } from "./Constants";

export const getHackerAvatar = async token => {
  const res = await axios.get(`${dvApiUrl}/hackers/dashboard/settings/set-avater/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const putHackerAvatar = async (token, newHackerAvatar) => {
  const res = await axios.put(`${dvApiUrl}/hackers/dashboard/settings/set-avater/`, newHackerAvatar, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const getHackerInfo = async token => {
  const res = await axios.get(`${dvApiUrl}/hackers/dashboard/settings/profile/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const putHackerInfo = async (token, newHackerInfo) => {
  const res = await axios.put(`${dvApiUrl}/hackers/dashboard/settings/profile/`, newHackerInfo, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const getHackerSkills = async token => {
  const res = await axios.get(`${dvApiUrl}/hackers/dashboard/settings/skills/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const putHackerSkills = async (token, newHackerSkill) => {
  const res = await axios.put(`${dvApiUrl}/hackers/dashboard/settings/skills/`, newHackerSkill, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
