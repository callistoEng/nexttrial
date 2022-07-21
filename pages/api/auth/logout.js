import cookie from "cookie";
import { ApiFree } from "../../../utils/apiCall";

export default async (req, res) => {
  if (req.method === "POST") {
    res.setHeader("Set-Cookie", [
      cookie.serialize("access", "", {
        httpOnly: true,
        secure: false,
        expires: new Date(0),
        sameSite: "strict",
        path: "/api/",
      }),
      cookie.serialize("refresh", "", {
        httpOnly: true,
        secure: false,
        expires: new Date(0),
        sameSite: "strict",
        path: "/api/",
      }),
    ]);
    return res.status(200).json({
      success: "Logged out",
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `method ${req.method} not allowed` });
  }
};
