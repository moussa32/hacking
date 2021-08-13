import axios from "axios";
import { dvApiUrl } from "./Constants";

export const ResendEmailConfirmation = async userAccessToken => {
  const res = await axios.post(
    `${dvApiUrl}/auth/hackers/resend-email/`,
    { token: userAccessToken },
    {
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
    }
  );
  return res;
};
