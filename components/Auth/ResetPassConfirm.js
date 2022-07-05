import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset_password_confirm } from "../../state/actionCreators/auth";

const ResetPasswordConfirm = () => {
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });
  const { new_password, re_new_password } = formData;
  const dispatch = useDispatch();
  const error = useSelector((state)=>state.auth.error)
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };
  const {uid, token} = useParams()
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(reset_password_confirm(uid, token, new_password, re_new_password));

    setRequestSent(true);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // if (!error) {
  //   return <Navigate to="/auth/login" />;
  // }
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
          <h3 className="font-bold">Fill the form to reset your password</h3>
        </div>
        <form className="mt-9" onSubmit={onSubmit}>
          {error?
          <div>
            <p className="text-sm">The password entered is too common oor too short.Should be atleast 8 characters</p>
          </div>
          :""}
          <div className="mb-5">
            <div className="flex justify-between mb-3">
              <p className="font-semibold text-lg text-blue-600">
                New Password
              </p>
            </div>
            <div className="shadow-lg w-full">
              <input
                type="password"
                name="new_password"
                onChange={(e) => onChange(e)}
                value={new_password}
                placeholder="new password"
                minLength="6"
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
                Confirm Password
              </p>
            </div>
            <div className="shadow-lg w-full">
              <input
                type="password"
                name="re_new_password"
                value={re_new_password}
                onChange={(e) => onChange(e)}
                required
                minLength="6"
                placeholder="confirm password"
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
                value="Reset Password"
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

export default ResetPasswordConfirm;
