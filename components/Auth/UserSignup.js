import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { isValidPhoneNumber, parsePhoneNumber } from "react-phone-number-input";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useDispatch, useSelector } from "react-redux";
// import { TrackpageView } from "../GAnalytics";
import { register } from "../../state/actionCreators/auth";
import {
  FaArrowLeft,
  FaAngleDown,
  FaAngleUp, 
  FaEyeSlash,
  FaEye,
} from "react-icons/fa";
import { SpinOne } from "../../components/Spinners/Spinner";
const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [seePass, setSeePass] = useState(false);
  const [seePassConf, setPassConf] = useState(false);
  const [user_name, setuser_name] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRePassword] = useState("");
  const [agency_name, setAgencyName] = useState("");
  const [location, setLocation] = useState("");
  const [locality, setLocality] = useState("");
  const [content_creator_name, setCreatorName] = useState("");
  const [is_content_creator, setContentCreator] = useState(false);
  const [is_regular, setRegular] = useState(true);
  const [is_investor, setInvestor] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [is_agent, setAgent] = useState(false);
  const [signupTypeHeight, setSignupTypeHeight] = useState("0px");
  const [phone, setPhone] = useState();
  const [phoneErr, setPhoneErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [agencyErr, setAgencyErr] = useState("");
  const [creatorErr, setCreatorNameErr] = useState("");
  const [locationErr, setLocationErr] = useState("");
  const [localityErr, setLocalityErr] = useState("");
  const [user_nameErr, setUsernameErr] = useState("");
  const [passErr, setPassErr] = useState("");
  const dispatch = useDispatch();
  const signupHeight = useRef();
  const registering = useSelector((state) => state.auth.registering);
  const messages = useSelector((state) => state.auth.messages);
  const registeringSuccess = useSelector((state) => state.auth.registeringSuccess);
  useEffect(() => {
    window.scrollTo(0, 0);
    // TrackpageView("/auth/signup")
  }, []);
  const onSubmit = (e) => {
    e.preventDefault();
    if (!user_name) {
      setUsernameErr("This field is required");
      return;
    }
    if (!email) {
      setEmailErr("This field is required");
      return;
    }
    if (is_content_creator && content_creator_name === "") {
      setCreatorNameErr("Field required for content creators");
      return;
    }
    if (is_agent && setLocation === "") {
      setLocationErr("Field required for agents");
      return;
    }
    if (is_agent && locality === "") {
      setLocalityErr("Field required for agents");
      return;
    }
    if (is_agent && agency_name === "") {
      setAgencyErr("Field required for agents");
      return;
    }
    if (phone) {
      if (isValidPhoneNumber(phone)) {
        const phoneParse = parsePhoneNumber(phone);
        var mobile_phone = phone;
        const country = phoneParse.country;
        setPhoneErr("");
        setLocalityErr("");
        setUsernameErr("");
        setEmailErr("");
        setCreatorNameErr("");
        setLocationErr("");
        if (password === re_password) {
          if (password.length < 6) {
            setPassErr("The password should be atleast 6 characters long");
            return;
          } else {
            setPassErr("");
          }
          dispatch(
            register(
              location,
              locality,
              user_name,
              content_creator_name,
              agency_name,
              country,
              is_agent,
              is_investor,
              is_regular,
              is_content_creator,
              mobile_phone,
              email,
              password,
              re_password
            )
          );
        } else {
          setPassErr("The two password fields didn't match.");
          return;
        }
      } else {
        setPhoneErr("Phone number is invalid");
        return;
      }
    } else {
      const country = "";
      setPhoneErr("");
      setLocalityErr("");
      setUsernameErr("");
      setEmailErr("");
      setCreatorNameErr("");
      setLocationErr("");
      dispatch(
        register(
          location,
          locality,
          user_name,
          content_creator_name,
          agency_name,
          country,
          is_agent,
          is_investor,
          is_regular,
          is_content_creator,
          mobile_phone,
          email,
          password,
          re_password
        )
      );
    }
  };
  const toggleSignup = () => {
    setOpenSignup(openSignup === false ? true : false);
    setSignupTypeHeight(
      !openSignup ? `${signupHeight.current.scrollHeight}px` : "0px"
    );
  };
  // if (registeringSuccess) {
  //   return <Navigate to="/auth/check-mail" />;
  // }
  return (
    <section className="xs-l:p-8 p-4 xs-l:w-[27rem] w-full mx-auto">
      <div className="mt-[4.8rem]">
        <Link
          href="/"
          
        >
         <a className="text-lg flex justify-start content-center items-center"><FaArrowLeft className="text-base mr-4" /> back to homepage</a> 
        </Link>
        <p className="text-center font-bold md:text-xl text-lg md:mt-5 mt-3">
          Join the leading real estate platform
        </p>
        <img
          className="rounded-full md:h-20 h-16 w-16 md:w-20 m-auto md:mt-6 mt-4"
          src=""
          alt=""
        />
      </div>
      <div className="flex justify-between mt-5">
        <Link
          href="/auth/signup"
          className="font-bold mb:border-b-4 border-b-2 text-sm rounded-lg  border-cloud-theme-blue text-gray-400 md:text-base"
        >
         <a>SIGN UP</a> 
        </Link>
        <Link href="/auth/login" className="font-bold text-sm md:text-base">
        <a>LOGIN</a> 
        </Link>
      </div>
      {messages &&(
        <div className="mt-3" >
        <p className="text-red-600 text-sm">{messages}</p>
      </div>
      )}    
      <form className="md:mt-9 mt-5" onSubmit={onSubmit}>
        <div className="mb-5">
          <div className="mb-1.5">
            <p className="font-semibold text-sm text-blue-600">Username</p>
            {user_nameErr && (
              <p className="font-semibold text-xs text-red-600">
                {user_nameErr}
              </p>
            )}
          </div>
          <div className="shadow-lg w-full">
            <input
              type="text"
              value={user_name}
              placeholder="your name"
              autoFocus={true}
              maxLength="15"
              className="
                w-full
                text-gray-900
                md:px-3
                px-2
                py-2
                ring-1
                outline-none
                border-none
                ring-red-300
              "
              onChange={(e) => setuser_name(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-5">
          <div className="mb-1.5">
            <p className="font-semibold text-sm text-blue-600">Email</p>
            {emailErr && (
              <p className="font-semibold text-xs text-red-600">{emailErr}</p>
            )}
          </div>
          <div className="shadow-lg w-full">
            <input
              type="email"
              value={email}
              placeholder="estate@somemail.com"
              className="
                w-full
                text-gray-900
                md:px-3
                px-2
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
        <div className="mb-5 overflow-hidden shadow-md ring-1 ring-red-300">
          <div
            className="flex justify-between mb-0 shadow-md px-1 ring-red-300
                py-1
                ring-1"
          >
            <button
              onClick={toggleSignup}
              type="button"
              className="flex w-full justify-between items-center mb-0 px-0 py-3"
            >
              <p className="text-blue-600 font-semibold text-sm">Signup as:</p>
              {openSignup ? <FaAngleUp /> : <FaAngleDown />}
            </button>
          </div>
          <div
            ref={signupHeight}
            style={{ maxHeight: `${signupTypeHeight}` }}
            className="flex flex-col transition-max-height ease-in duration-300"
          >
            <div className="relative flex justify-between items-center pl-1 py-2 hover:bg-blue-50">
              <div className="relative">
                <input
                  type="checkbox"
                  id="regular-user"
                  value={is_regular}
                  checked={is_regular === true}
                  onChange={() => setRegular(!is_regular)}
                  className="opacity-0 absolute h-4 w-4"
                />
                <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                    viewBox="0 0 24 24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path
                      fill="#FB911B"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                    />
                  </svg>
                </div>
              </div>
              <label
                htmlFor="regular-user"
                className="w-full md:text-sm text-xs h-full"
              >
                Regular User
              </label>
            </div>
            <div className="relative flex justify-between items-center pl-1 py-2 hover:bg-blue-50">
              <div className="relative">
                <input
                  type="checkbox"
                  id="Agent"
                  value={is_agent}
                  checked={is_agent === true}
                  onChange={() => setAgent(!is_agent)}
                  className="opacity-0 absolute h-4 w-4"
                />
                <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                    viewBox="0 0 24 24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path
                      fill="#FB911B"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                    />
                  </svg>
                </div>
              </div>
              <label
                htmlFor="Agent"
                className="w-full md:text-sm text-xs h-full"
              >
                Agent/Deveploper
              </label>
            </div>
            <div className="relative flex justify-between items-center pl-1 py-2 hover:bg-blue-50">
              <div className="relative">
                <input
                  type="checkbox"
                  id="Investor"
                  value={is_investor}
                  checked={is_investor === true}
                  onChange={() => setInvestor(!is_investor)}
                  className="opacity-0 absolute h-4 w-4"
                />
                <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                    viewBox="0 0 24 24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path
                      fill="#FB911B"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                    />
                  </svg>
                </div>
              </div>
              <label
                htmlFor="Investor"
                className="w-full md:text-sm text-xs h-full"
              >
                Investor
              </label>
            </div>
            <div className="relative flex justify-between items-center pl-1 py-2 hover:bg-blue-50">
              <div className="relative">
                <input
                  type="checkbox"
                  id="Content-Creator"
                  value={is_content_creator}
                  checked={is_content_creator === true}
                  onChange={() => setContentCreator(!is_content_creator)}
                  className="opacity-0 absolute h-4 w-4"
                />
                <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                    viewBox="0 0 24 24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path
                      fill="#FB911B"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                    />
                  </svg>
                </div>
              </div>
              <label
                htmlFor="Content-Creator"
                className="w-full md:text-sm text-xs h-full"
              >
                Content-Creator
              </label>
            </div>
          </div>
        </div>
        {is_content_creator ? (
          <div className="mb-5">
            <div className="mb-1.5">
              <p className="font-semibold  text-sm text-blue-600">
                Content Creator Name
              </p>
              {creatorErr && (
                <p className="font-semibold text-xs text-red-600">
                  {creatorErr}
                </p>
              )}
            </div>
            <div className="shadow-lg w-full">
              <input
                type="text"
                value={content_creator_name}
                className="
                w-full
                text-gray-900
                md:px-3
                px-2
                py-2
                ring-1
                outline-none
                border-none
                ring-red-300
              "
                placeholder="Name for your blog content to be identified"
                onChange={(e) => setCreatorName(e.target.value)}
              />
            </div>
          </div>
        ) : (
          ""
        )}
        {is_agent ? (
          <>
            <div className="mb-5">
              <div className="flex justify-between mb-1.5">
                <p className="font-semibold  text-sm text-blue-600">
                  Agency/Company Name
                </p>
                {agencyErr && (
                  <p className="font-semibold text-xs text-red-600">
                    {agencyErr}
                  </p>
                )}
              </div>
              <div className="shadow-lg w-full">
                <input
                  type="text"
                  value={agency_name}
                  placeholder="agency or company name"
                  className="
              w-full
              text-gray-900
              md:px-3
              px-2
              py-2
              ring-1
              outline-none
              border-none
              ring-red-300
              "
                  onChange={(e) => setAgencyName(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-5">
              <div className="mb-1.5">
                <p className="font-semibold text-sm text-blue-600">
                  Your County
                </p>
                {locationErr && (
                  <p className="font-semibold text-xs text-red-600">
                    {locationErr}
                  </p>
                )}
              </div>
              <div className="shadow-lg w-full">
                <input
                  type="text"
                  value={location}
                  className="
                w-full
                text-gray-900
                md:px-3
                py-2
                px-2
                ring-1
                outline-none
                border-none
                ring-red-300
              "
                  placeholder="your location:eg Nairobi"
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-5">
              <div className="mb-1.5">
                <p className="font-semibold text-sm text-blue-600">
                  Your Locality
                </p>
                {localityErr && (
                  <p className="font-semibold text-xs text-red-600">
                    {localityErr}
                  </p>
                )}
              </div>
              <div className="shadow-lg w-full">
                <input
                  type="text"
                  value={locality}
                  className="
                w-full
                text-gray-900
                md:px-3
                px-2
                py-2
                ring-1
                outline-none
                border-none
                ring-red-300
              "
                  placeholder="your locality:eg Kilimani"
                  onChange={(e) => setLocality(e.target.value)}
                />
              </div>
            </div>
          </>
        ) : (
          ""
        )}

        <div className="mb-5">
          <div className="mb-1.5">
            <p className="text-blue-600 font-semibold text-sm">Phone Number</p>
            {phoneErr && (
              <p className="text-red-600 font-semibold text-xs">{phoneErr}</p>
            )}
          </div>

          <div className="shadow-lg w-full">
            <PhoneInput
              value={phone}
              onChange={setPhone}
              placeholder="(optional) Phone number eg:+25471234.."
              className="w-full
              text-gray-900
              md:px-3
              px-2
              py-2
              ring-1
              outline-none
              border-none
              ring-red-300"
              withCountryCallingCode
              international
              defaultCountry="KE"
              maxLength="16"
            />
          </div>
        </div>
        <div className="mb-5">
          <div className="mb-1.5">
            <p className="text-blue-600 font-semibold text-sm">Password</p>
            {passErr && (
              <p className="text-red-600 font-semibold text-xs">{passErr}</p>
            )}
          </div>
          <div className="shadow-lg w-full relative">
            <input
              placeholder="password"
              type={seePass ? "text" : "password"}
              value={password}
              className="
              w-full
              text-gray-900
              md:pl-3
              p-2
              pr-12
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
        <div className="mb-5">
          <div className="mb-1.5">
            <p className="text-blue-600 font-semibold text-sm">
              Password Confirmation
            </p>
            {passErr && (
              <p className="text-red-600 font-semibold text-xs">{passErr}</p>
            )}
          </div>
          <div className="shadow-lg w-full relative">
            <input
              type={seePassConf ? "text" : "password"}
              value={re_password}
              placeholder="confirm password"
              className="
              w-full
              text-gray-900
              md:pl-3
              p-2
              pr-12
              ring-1
              outline-none
              border-none
              ring-red-300
              "
              onChange={(e) => setRePassword(e.target.value)}
            />
            <div
              onClick={() => setPassConf(!seePassConf)}
              className="
                  absolute h-full w-10 flex justify-center items-center content-center top-0 right-0 py-0.5 bg-blue-200"
            >
              {seePassConf ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>
        <Link href="/auth/login">
        <a className="text-blue-600 underline">Already signed up? Login</a>
        </Link>

        {registering ? (
          <SpinOne />
        ) : (
          <div className="mb-5">
            <div className="flex content-center mt-9">
              <input
                type="submit"
                value="Sign Up"
                className="
                px-20
                py-2
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

export default UserSignup;
