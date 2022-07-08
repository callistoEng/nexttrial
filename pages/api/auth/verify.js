import cookie from "cookie";
import { ApiFree } from "../../../utils/apiCall";

export default async (req, res) => {
  if (req.method === "GET") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? null;
    const body = JSON.stringify({ token: access });

    if (access) {
      try {
        const verified = await ApiFree().post(`/auth/jwt/verify/`, body);
        if (verified.status === 200) {
          return res.status(200).json({
            statusText: verified.statusText,
            success: "verified user",
          });
        } else {
          return res.status(404).json({
            error: "Unknown",
          });
        }
      } catch (error) {
        return res.status(error.response.status).json({
          error: error.response.data.code,
          statusText: error.response.statusText,
        });
      }
    } else {
      return res.status(401).json({
        success: "Unknown",
      });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `method ${req.method} not allowed` });
  }
};
