import cookie from "cookie";
import { ApiFree } from "../../../utils/apiCall";

export default async (req, res) => {
  if (req.method === "POST") {
    const { currentPage, query } = req.body ?? null;
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? null;
    const config = {
      headers: {
        Authorization: `JWT ${access}`,
      },
    };
    if (access) {
      try {
        // const posts = await axios.get(
        //   `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/contents/my-posts/?page=${currentPage}&search=${query}`,
        //   config
        // );  
        const posts = await ApiFree().get(
          `/api/v2/contents/my-posts/?page=${currentPage}&search=${query}`,
          config
        );
        return res.status(200).json({
          posts: posts.data, 
        });
      } catch (error) {
        console.log("some", error )
        return res.status(401).json({
          error: "Unauthorised!",
        });
      }
    }
  }else{
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `method ${req.method} not allowed` });
  }
};
