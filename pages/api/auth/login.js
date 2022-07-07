import cookie from "cookie";
import { ApiFree } from "../../../utils/apiCall";
console.log("hit ladn call 1");
export default async (req, res) => {
  console.log("call 1");
  if (req.method === "POST") {
    const { email, password } = req.body;
    const body = JSON.stringify({
      email,
      password,
    });
    try { 
      const auth_res = await ApiFree().post("/api/auth/jwt/create/", body);       
      // const auth_res = await fetch(
      //   `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/auth/jwt/create/`,
      //   {
      //     method: "POST",
      //     headers: {
      //       Accept: "application/json",
      //       "Content-Type": "application/json",
      //     },
      //     body:body 
      //   },
      // ); 
      if (auth_res.status === 200) {
        console.log('found 200',auth_res.data)
        res.setHeader("Set-Cookie", [
          cookie.serialize("access", auth_res.data.access, {
            httpOnly: true,
            secure: false,
            maxAge: 240 * 60,
            sameSite: 'strict',
            path: "/api/", 
          }),
          cookie.serialize("refresh", auth_res.data.refresh, {
            httpOnly: true,
            secure: false,
            maxAge: 60 * 60 * 24 * 90,
            sameSite: 'strict',
            path: "/api/",
          }),
        ]);
        return res.status(200).json({
          success: "Authentication sucessfull",
          data: auth_res.data
        });
      } else {
        return res.status(401).json({ error: "Invalid client login credentials" });
      }
    } catch (error) {
      console.log("api error", error);
      return res.status(500).json({ error: "An error occured" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `method ${req.method} not allowed` });
  }
};
