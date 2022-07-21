import cookie from "cookie";
import { ApiFree, ApiFreeNoBase } from "../../../utils/apiCall";
console.log("next");
export default async (req, res) => {
  if (req.method === "POST") {
    const { myPostNext } = req.body ?? null;
    console.log("bodiesz myPostNext", myPostNext);
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? null;
    const config = {
      headers: {
        Authorization: `JWT ${access}`,
      },
    };
    if (access) {
      try {
        const posts = await ApiFreeNoBase().get(myPostNext, config);
        console.log("new things", posts.data);
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
