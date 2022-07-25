import cookie from "cookie";
import { ApiFree } from "../../../../utils/apiCall";
import multiparty from "multiparty";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  if (req.method === "POST") {
    let form = new multiparty.Form();
    const data = await new Promise((resolve, reject) => {
      form.parse(req, function (err, fields, files) {
        if (err) reject({ err });
        resolve({ fields, files });
      });
    });
    const formData = JSON.stringify(data);

    const cookies = cookie.parse(req.headers.cookie ?? null);
    const access = cookies.access ?? null;

    const config = {
      headers: {
        Authorization: `JWT ${access}`,
      },
    };
    if (access) {
      try {
        const todo_grp_res = await ApiFree().post(
          "/api/v2/tasks/add-todo-group/",
          formData,
          config
        );
        if (todo_grp_res.status === 200) {
          return res.status(200).json({
            success: "Success",
            data: todo_grp_res.data,
          });
        } else {
          return res
            .status(404)
            .json({ error: "Resource Not Found" });
        }
      } catch (error) {
        return res
          .status(500)
          .json({ error: "Internal server error" });
      }
    } else {
      return res
        .status(401)
        .json({ error: "Invalid client login credentials" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `method ${req.method} not allowed` });
  }
};
