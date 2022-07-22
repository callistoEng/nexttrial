import cookie from "cookie";
import { ApiFree } from "../../../../utils/apiCall";

export default async (req, res) => {
  if (req.method === "GET") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? null;
    const config = {
      headers: {
        Authorization: `JWT ${access}`,
      },
    };
    if (access) {
      try {
        const data = await ApiFree().get("api/v2/users/analytics/", config);
        return res.status(200).json({
          data: data.data,
        });
      } catch (error) {
        console.log("some", error);
        return res.status(500).json({
          error: "Internal server error!",
        });
      }
    } else {
      return res.status(401).json({
        error: "Unauthorised!",
      });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `method ${req.method} not allowed` });
  }
};
