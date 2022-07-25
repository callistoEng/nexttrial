import cookie from "cookie";
import { ApiFree } from "../../../../utils/apiCall";
import multiparty from "multiparty";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  if (req.method === "PATCH") { 
    let form = new multiparty.Form();

    const data = await new Promise((resolve, reject) => {
      form.parse(req, function (err, fields, files) {
        if (err) reject({ err });
        resolve({ fields, files });
      });
    });
    const formData = JSON.stringify(data);  
    const todosGroup =data.fields?.todoGrpName[0]
    const cookies = cookie.parse(req.headers.cookie ?? null);
    const access = cookies.access ?? null;

    const config = {
      headers: {
        Authorization: `JWT ${access}`,
      },
    };
    if (access) {
      try {
        const todo_res = await ApiFree().patch(
          `/api/v2/tasks/?grp_name=${todosGroup}`,
          formData,
          config
        );
        if (todo_res.status === 200) {
          return res.status(200).json({
            success: "Success",
            data: todo_res.data,
          });
        } else {
          return res.status(401).json({ error: "Error" });
        }
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Internal server error!", error: error });
      }
    } else {
      return res.status(401).json({ error: "Unauthorised!" });
    }
  } else if (req.method === "DELETE") {
    let form = new multiparty.Form()
    const data = await new Promise((resolve, reject)=>{
        form.parse(req, function(err, fields, files){
            if(err)reject({err})
            resolve({fields, files})
        }) 
    })
    const todoId = data.fields?.id[0]
    console.log('dara', todoId)
    const cookies = cookie.parse(req.headers.cookie ?? null);
    const access = cookies.access ?? null;

    const config = {
      headers: {
        Authorization: `JWT ${access}`,
      },
    };
    if (access) {
      try { 
        const todo_res = await ApiFree().delete(
          `/api/v2/tasks/?task_id=${todoId}`,
          config
        );
        if (todo_res.status === 200) {
          return res.status(200).json({
            success: "Success",
            data: todo_res.data,
          });
        } else {
          return res.status(401).json({ error: "Error" });
        }
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Internal server error!", error: error });
      }
    } else {
      return res.status(401).json({ error: "Unauthorised!" });
    }
  } else {
    return res.status(405).json({ error: `method not allowed` });
  }
};
