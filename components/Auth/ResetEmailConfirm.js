import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { reset_email_confirm } from "../../state/actionCreators/auth";
const ResetEmailConfirm = () => {
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    new_email: "",
    re_new_email: "",
  });
  const dispatch = useDispatch();
  const {uid, token} =  useParams()
  const { new_email, re_new_email } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(reset_email_confirm(uid, token, new_email, re_new_email));

    setRequestSent(true);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (requestSent) {
    return <Navigate to="/auth/login" />;
  }
  return (
    <>
      <section className="p-4 w-1/2 mx-auto">
        <div className="">
          <Link to="#" className="text-lg">
            <i className="fas fa-long-arrow-alt-left"></i> back to homepage
          </Link>
          <img className="rounded-full h-20 w-20 m-auto mt-8" src="" alt="" />
        </div>
        <div className="flex justify-between mt-5">
          <Link
            to="/auth/login"
            className="font-bold border-b-4 border-blue-600 rounded-lg text-lg"
          >
            LOGIN
          </Link>
          <Link to="/auth/signup" className="font-bold text-gray-400 text-lg">
            SIGN UP
          </Link>
        </div>
        <div className="mt-4 text-center">
          <h3 className="font-bold">Reset Email</h3>
        </div>
        <form className="mt-9" onSubmit={onSubmit}>
          <div className="mb-5">
            <div className="flex justify-between mb-3">
              <p className="font-semibold text-lg text-blue-600">New Email</p>
            </div>
            <div className="shadow-lg w-full">
              <input
                name="new_email"
                value={new_email}
                onChange={(e) => onChange(e)}
                required
                minLength="6"
                placeholder="new email"
                type="email"
                className="
                w-full
                text-gray-900 text-base
                px-3
                py-2
                ring-1
                outline-none
                border-none
                ring-red-300
              "
              />
            </div>
          </div>
          <div className="mb-5">
            <div className="flex justify-between mb-3">
              <p className="text-blue-600 font-semibold text-lg">
                Confirm Email
              </p>
            </div>
            <div className="shadow-lg w-full">
              <input
                type="text"
                onChange={(e) => onChange(e)}
                required
                minLength="6"
                placeholder="confirm email"
                name="reset_password_confirm"
                value={re_new_email}
                className="
                w-full
                text-gray-900 text-base
                px-3
                py-2
                ring-1
                outline-none
                border-none
                ring-red-300
              "
              />
            </div>
          </div>
          <div className="mb-5">
          <div className="flex content-center mt-9">
            <input
              type="submit"
              value="Request Reset"
              className="
                px-20
                py-3
                outline-none
                border-none
                bg-blue-800
                text-white
                m-auto
                text-xl
                rounded-xl
              "
            />
          </div>
        </div>
        </form>
      </section>
    </>
  );
};

export default ResetEmailConfirm;
