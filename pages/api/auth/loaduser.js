import cookie from "cookie";
import { ApiFree } from "../../../utils/apiCall";

export default async (req, res) => {
  console.log("call all users");
  if (req.method === "GET") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? null;
    const refresh = cookies.refresh ?? null;
    const config = {
      headers: {
        Authorization: `JWT ${access}`,
      },
    };
    if (access) {
      try {
        const user = await ApiFree().get(
          `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/auth/users/me/`,
          config
        );
        if (user.status === 200) {
          return res.status(200).json({
            user: user.data,
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
    }
    if (refresh) {
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
