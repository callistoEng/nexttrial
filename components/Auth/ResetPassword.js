import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { reset_password } from "../../state/actionCreators/auth";
import { TrackpageView } from "../GAnalytics";
const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  useEffect(()=>{
    TrackpageView("/auth/reset-password")
  },[])
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(reset_password(email))
  };
  return (
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
        <h2 className="font-bold">Forgot Password</h2>
        <p>Enter your email address below to reset password</p>
      </div>
      <form className="mt-5" onSubmit={onSubmit}>
        <div className="mb-5">
          <div className="flex justify-between mb-3">
            <p className="font-semibold text-lg text-blue-600">Email</p>
          </div>
          <div className="shadow-lg w-full">
            <input
              type="email"
              value={email}
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
              onChange={(e) => setEmail(e.target.value)}
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
  );
};

export default ResetPassword;
