import cookie from "cookie";
import { ApiFree } from "../../../utils/apiCall";

export default async (req, res) => {
  if (req.method === "POST") {
    const { currentPage } = req.body ?? null;
    console.log("bodiesz", req.body);
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? null;
    const config = {
      headers: {
        Authorization: `JWT ${access}`,
      },
    };
    if (access) {
      try {
        const posts = await ApiFree().get(
          `/api/v2/contents/no-thumbs/?page=${currentPage}`,
          config
        );
        return res.status(200).json({
          posts: posts.data,
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
    return res.status(405).json({ error: `method ${req.method} not allowed` });
  }
};
