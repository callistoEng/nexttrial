import { FaFacebookF, FaTwitter, FaCopyright } from "react-icons/fa";
import { useEffect, useState, Fragment } from "react";
import { userFeedback, userSubscribe } from "../../state/actionCreators/auth";
import { subscriptionFail } from "../../state/estateSlices/authSlices";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { SpinMadoido } from "../../components/Spinners/Spinner";
function Footer() {
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [feedbackDetails, setFeedbackDetails] = useState("");
  const [challenges, setChallenges] = useState("");
  const [challengesErr, setChallengesErr] = useState("");
  const [feedbackDetailsErr, setFeedbackDetailsErr] = useState("");
  const [openFeedbackModal, setOpenFeedbackModal] = useState(false);
  const message = useSelector((state) => state.auth.subscriptionMessages);
  const loadinRequest = useSelector((state) => state.auth.loadinRequest);
  const requestingProperty = useSelector(
    (state) => state.auth.requestingProperty
  );
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(subscriptionFail());
    };
  }, [dispatch]);
  const onSubscription = (e) => {
    e.preventDefault();
    if (email) {
      dispatch(userSubscribe(email));
    }
    setEmail("");
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setEmailErr("This field is required");
      return;
    }
    if (!feedbackDetails) {
      setFeedbackDetailsErr("This field is required");
      return;
    }
    if (!challenges) {
      setChallengesErr("This field is required");
      return;
    }
    setEmailErr("");
    setFeedbackDetailsErr("");
    setChallengesErr("")
    const formData = new FormData();
    formData.append("email", email);
    formData.append("features", feedbackDetails);
    formData.append("challenges", challenges);
    dispatch(userFeedback(formData));
    setFeedbackDetails("");
    setEmail("");
  };
  return (
    <section className="pt-5 mt-0 bg-cloud-theme-bg text-white">
      <div className="grid grid-cols-1 md:grid-cols-3 px-3 gap-5">
        <div className="flex col-span-2 gap-3 p-4 w-full">
          <div className="">
            <h4 className="font-medium text-xl">CONTACT</h4>
            <div>
              <ul className="w-full">
                <li className="py-1" translate="no">
                  EstateCloud Kenya{" "}
                </li>
                <li className="py-1" translate="no">
                  {`${process.env.REACT_APP_DJANGO_SEMIBASE_URL}`}
                </li>
                <li className="py-1">
                  The Leading Platform for Property Listings, News, Research and
                  Data.
                </li>
                <li className="text-cloud-theme-blue text-left underline font-semibold py-1">
                  Email us: <br />
                  <button
                    translate="no"
                    type="button"
                    className=" outline-none border-none"
                    onClick={() =>
                      (window.location = "mailto:info@estatecloud.co.ke")
                    }
                  >
                    info@estatecloud.co.ke
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-0">
            <h4 className="font-medium text-xl">CONNECT</h4>
            <ul className="flex flex-col content-center items-center">
              <li className="mb-0 mt-2 bg-twitter-blue p-2">
                <a href="https://twitter.com/EstateCloudKe">
                  <FaTwitter />
                </a>
              </li>
              <li className="mb-0.5 mt-2 bg-fb-color p-2">
                <FaFacebookF className="" />
              </li>
              <li className="mt-2 bg-cloud-theme-gold px-1.5 py-0.5 shadow-md rounded-sm">
                <button
                  type="button"
                  className="text-xs"
                  onClick={() => setOpenFeedbackModal(true)}
                >
                  Feedback
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center p-4 content-center justify-around w-full">
          <div className="mb-3 text-white border-cloud-theme-blue pb-2 text-center">
            <h4 className="font-medium text-xl">SUBSCRIBE</h4>
            <p className="text-sm">
              Subscribe to get the latest industry content
            </p>
          </div>
          <form className="w-full" onSubmit={onSubscription}>
            {message && (
              <div className="mb-1">
                <p className="text-cloud-theme-gold text-xs">{message}</p>
              </div>
            )}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="email@someemail.com"
                className="bg-gray-50 outline-none rounded-xl text-gray-900 text-sm ring-white focus:border-cloud-theme-gold block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="text-cloud-theme-blue block bg-white hover:text-white hover:bg-gray-500 focus:ring-2 focus:ring-blue-300 font-medium rounded-xl text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="w-full mx-auto bg-black mt-10 text-white">
        <div className="px-5 xs-l:px-16 py-4 flex items-center content-center justify-between">
          <div className="flex justify-start xs-1:justify-between items-center content-center">
            <div className="flex items-center content-center justify-start xs-1:justify-center text-center md:text-base text-sm">
              <FaCopyright className="mr-1" />
              <p className="xs-l:block hidden" translate="no">
                2022 Estate Cloud Limited. All rights reserved
              </p>
              <p className="xs-l:hidden block text-xxs" translate="no">
                2022 Estate Cloud. All rights reserved
              </p>
            </div>
          </div>
          <div className="flex items-center content-center justify-center text-center md:text-base text-sm">
            <ul className="flex">
              <li className="mr-3 md:block hidden">Welcome Home</li>
              <li className="mr-3 md:block hidden">Listings</li>
              <li className="md:mr-3 mr-1">Privacy</li>
              <li className="">Terms</li>
            </ul>
          </div>
        </div>
      </div>
      <FeedBack
        onSubmit={onSubmit}
        setEmail={setEmail}
        email={email}
        requestingProperty={requestingProperty}
        loadinRequest={loadinRequest}
        feedbackDetailsErr={feedbackDetailsErr}
        emailErr={emailErr}
        feedbackDetails={feedbackDetails}
        setFeedbackDetails={setFeedbackDetails}
        openFeedbackModal={openFeedbackModal}
        setOpenFeedbackModal={setOpenFeedbackModal}
        challenges={challenges}
        setChallenges={setChallenges}
        challengesErr={challengesErr}
      />
    </section>
  );
}
function FeedBack({
  openFeedbackModal,
  email,
  challenges,
  challengesErr,
  setChallenges,
  loadinRequest,
  setEmail,
  onSubmit,
  emailErr,
  requestingProperty,
  feedbackDetailsErr,
  feedbackDetails,
  setFeedbackDetails,
  setOpenFeedbackModal,
}) {
  return (
    <Transition appear show={openFeedbackModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-1010 overflow-y-auto"
        onClose={() => setOpenFeedbackModal(true)}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 backdrop-blur-sm bg-blue-100/30" />
          </Transition.Child>
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block mt-[2rem] w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6text-lg text-gray-900 mt-0"
              >
                Give us a feedback on our services.
              </Dialog.Title>
              <form className="mt-3" onSubmit={onSubmit}>
                <div className="relative z-0 mb-6 w-full">
                  <div className="relative z-0 mb-3 w-full group">
                    <input
                      type="email"
                      id="email"
                      className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0
                border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 
                dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-cloud-theme-blue peer"
                      placeholder=" "
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label
                      htmlFor="Email"
                      className="absolute text-base text-gray-500 dark:text-gray-400 duration-300 
                transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 
                peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Your Email
                    </label>
                    {emailErr && (
                      <p className="mb-2 text-red-500 text-xxs">{emailErr}</p>
                    )}
                  </div>
                  <div className="relative z-0 mb-6 w-full group">
                    <div className="mb-1.5">
                      <p className="text-blue-600 font-semibold text-sm">
                        What other features would you like to see in this platform?
                      </p>
                      {feedbackDetailsErr && (
                        <p className="text-red-600 font-semibold text-xs">
                          {feedbackDetailsErr}
                        </p>
                      )}
                    </div>
                    <textarea
                      id="overview"
                      value={feedbackDetails}
                      onChange={(e) => setFeedbackDetails(e.target.value)}
                      maxLength={240}
                      rows="4"
                      className="block p-2.5 w-full text-sm outline-none text-gray-900 bg-gray-50 rounded-sm border border-gray-300 
            focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                      placeholder="What other features would you like to see in this platform"
                    />
                  </div>
                  <div className="relative z-0 mb-4 w-full group">
                    <div className="mb-1.5">
                      <p className="text-blue-600 font-semibold text-sm">
                        Did you experience challenges using our platfom?
                      </p>
                      {challengesErr && (
                        <p className="text-red-600 font-semibold text-xs">
                          {challengesErr}
                        </p>
                      )}
                    </div>
                    <textarea
                      id="overview"
                      value={challenges}
                      onChange={(e) => setChallenges(e.target.value)}
                      maxLength={240}
                      rows="4"
                      className="block p-2.5 w-full text-sm outline-none text-gray-900 bg-gray-50 rounded-sm border border-gray-300 
            focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                      placeholder="Please describe challenges if any"
                    />
                  </div>
                </div>
                {requestingProperty ? (
                  <p className="text-red-600">
                    Feedback has been sent.Thank you ❤✔.
                  </p>
                ) : (
                  ""
                )}
                <div className="mt-5 flex items-center content-center justify-center w-full">
                  {loadinRequest ? (
                    <SpinMadoido />
                  ) : (
                    <div className="grid grid-cols-2 gap-3 w-full">
                      <button
                        onClick={() => {
                          setOpenFeedbackModal(false);
                        }}
                        type="button"
                        className="outline-none border-none px-10 rounded-md py-3 bg-cloud-theme-blue text-white font-semibold"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="outline-none border-none px-10 rounded-md py-3 bg-cloud-theme-gold text-white font-semibold"
                      >
                        Send
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Footer;
