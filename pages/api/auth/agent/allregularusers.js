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
        const users = await ApiFree().get("/api/v2/users/all/", config);
        return res.status(200).json({
            users: users.data,
        });
      } catch (error) {
        console.log("some", error);
        return res.status(500).json({
          error: "Internal server error!",
        });
      }
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `method ${req.method} not allowed` });
  }
};
