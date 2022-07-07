import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";

import { loadUsers, login } from "../../state/actionCreators/auth";
import { SpinOne } from "../../components/Spinners/Spinner";
// import { TrackpageView } from "../GAnalytics";
import { FaArrowLeft, FaEyeSlash, FaEye } from "react-icons/fa";

const UserLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailFocus = useRef(null);
  const [seePass, setSeePass] = useState(false);
  const logingIn = useSelector((state) => state.auth.logingIn);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loginerror = useSelector((state) => state.auth.loginerror);
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    emailFocus.current.focus();
    dispatch(loadUsers());
    // if (isAuthenticated) {
    //   router.push("/");
    // }
    // TrackpageView("/auth/login")
  }, [isAuthenticated, dispatch]);
  // useEffect(async () => {
  // await fetch("/api/auth/loaduser", {
  //   method: "GET",
  //   headers:{
  //     "Accept":"application/json"
  //   }
  // });

  // },[]);
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  if (typeof window !== "undefined" && isAuthenticated) {
    router.push("/");
  }
  return (
    <section className="xs-l:p-8 p-4 xs-l:w-[25rem] w-full mx-auto">
      <div className="mt-[4.8rem]">
        <Link href="/">
          <a className="text-lg  flex justify-start content-center items-center">
            <FaArrowLeft className="text-base mr-4" /> back to homepage
          </a>
        </Link>
        <p className="text-center font-bold md:text-xl text-lg md:mt-5 mt-3">
          Join the best real estate platform
        </p>
        <img
          className="rounded-full md:h-20 h-16 w-16 md:w-20 m-auto md:mt-6 mt-4"
          src=""
          alt=""
        />
      </div>
      <div className="flex justify-between mt-5">
        <Link
          href="/auth/login"
          className="font-bold mb:border-b-4 border-b-2 text-sm rounded-lg  border-cloud-theme-blue text-gray-400 md:text-base"
        >
          <a>LOGIN</a>
        </Link>
        <Link href="/auth/signup" className="font-bold text-sm md:text-base">
          <a>SIGN UP</a>
        </Link>
      </div>
      <form className="md:mt-7 mt-5" onSubmit={onSubmit}>
        <div className="mb-5">
          {loginerror ? (
            <div className="flex justify-between mb-1.5">
              <p className="font-semibold italic text-sm text-red-600">
                Invalid login credentials
              </p>
            </div>
          ) : (
            ""
          )}

          <div className="flex justify-between mb-1.5">
            <p className="font-semibold text-sm text-blue-600">Email</p>
          </div>
          <div className="shadow-lg w-full">
            <input
              type="email"
              value={email}
              ref={emailFocus}
              placeholder="estate@somemail.com"
              className="
              w-full
              text-gray-900
              md:px-3
              p-2
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
          <div className="flex justify-between mb-1.5">
            <p className="text-blue-600 font-semibold text-sm">Password</p>
          </div>
          <div className="shadow-lg w-full relative">
            <input
              type={seePass ? "text" : "password"}
              placeholder="*************"
              value={password}
              className="
              w-full
              text-gray-900
              md:px-3
              p-2
              ring-1
              outline-none
              border-none
              ring-red-300
              "
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              onClick={() => setSeePass(!seePass)}
              className="
                  absolute h-full w-10 flex justify-center items-center content-center top-0 right-0 py-0.5 bg-blue-200"
            >
              {seePass ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>
        <Link
          href="/auth/reset-password"
          className="text-cloud-theme-blue underline"
        >
          <a>Forgot you password?</a>
        </Link>
        {logingIn ? (
          <SpinOne />
        ) : (
          <div className="mb-5">
            <div className="flex content-center mt-5">
              <input
                type="submit"
                value="Login"
                className="
                px-20
                py-1.5
                outline-none
                border-none
                bg-cloud-theme-blue
                text-white
                m-auto
                text-lg
                rounded-md
              "
              />
            </div>
          </div>
        )}
      </form>
    </section>
  );
};

export default UserLogin;
