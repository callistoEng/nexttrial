import cookie from "cookie";
import { ApiFree } from "../../../../utils/apiCall";

export default async (req, res) => {
  if (req.method === "POST") {
    const { groupName } = req.body;
    const cookies = cookie.parse(req.headers.cookie ?? null);
    const access = cookies.access ?? null;
    console.log('name', groupName )
    const config = {
      headers: {
        Authorization: `JWT ${access}`,
      },
    };
    if (access) {
      try {
        const data = await ApiFree().get(
          `/api/v2/tasks/?group_name=${groupName}`,
          config
        );
        console.log("gropups", data.data);
        return res.status(200).json({
          data: data.data,
        });
      } catch (error) {
        return res.status(500).json({
          error: error,
        });
      }
    } else {
      return res.status(401).json({
        error: "Unauthorised!",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      error: `method ${req.method} not allowed`,
    });
  }
};
