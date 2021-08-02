import axios from "axios";
import { dvApiUrl } from "./Constants";

export const putHackerAvatar = async (token, newHackerAvatar) => {
  const res = await axios.put(`${dvApiUrl}/hackers/dashboard/settings/set-avater/`, newHackerAvatar, {
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
