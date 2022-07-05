import Link  from "next/link";
import { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Chart from "chart.js/auto"; 
import img from "../images/twi2.jpg";
// import { TrackpageView } from "../GAnalytics";
import { Doughnut } from "react-chartjs-2";
import { Tab } from "@headlessui/react";
import Moment from "react-moment";
import {
  MdMeetingRoom,
  MdOutlineDashboard,
  MdRateReview,
  MdWarningAmber,
} from "react-icons/md";
import { TiMessages } from "react-icons/ti";
import {
  AiOutlineAppstoreAdd,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineMenu,
} from "react-icons/ai";
import { BsTrash, BsCheck2 } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import {
  agentAddTodo,
  agentAddTodoGroup,
  agentAnalytics,
  agentGetTodos,
  agentGetTodosGroup,
  agentManageTodos,
  agentMyListings,
  agentOverview,
  getAllRegularUsers,
} from "../../state/actionCreators/auth";
import { SpinMadoido, SpinOne } from "../Spinners/Spinner";
import { Dialog, Transition } from "@headlessui/react";
import { truncateWords } from "../../utils/Truncate";
import {
  deleteListings,
  getScheduledViewing,
} from "../../state/actionCreators/listings";
import { BsClipboardCheck, BsListTask } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { MdClose } from "react-icons/md";

const DashBoard = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [residentialCategory, setResidentialCategory] = useState("For Rent");
  const [listingSlug, setSlug] = useState(null);
  const [listIndex, setListIndex] = useState(1);
  const [todoGrpName, setTodoGrpName] = useState(null);
  const [todoGrpId, setTodoGrpId] = useState(null);
  const [commercialCategory, setCommercialCategory] = useState("For Rent");
  const [landCategory, setLandCategory] = useState("For Sale");
  const [openEditDeleteModal, setOpenEditDeleteModal] = useState(false);
  const [openAddTaskModal, setOpenAddTaskModal] = useState(false);
  const [taskGroup, setTaskGroup] = useState("");
  const [taskEdit, setTaskEdit] = useState(null);
  const [taskGroupErr, setTaskGroupErr] = useState("");
  const dispatch = useDispatch();
  const overviewData = useSelector((state) => state.auth.overviewData);
  const myListingsData = useSelector((state) => state.auth.myListingsData);
  const todos = useSelector((state) => state.auth.todos);
  const gettingTodos = useSelector((state) => state.auth.gettingTodos);
  const scheduleViewings = useSelector(
    (state) => state.listings.scheduleViewings
  );
  const todosGroups = useSelector((state) => state.auth.todosGroups);
  const myAnalytics = useSelector((state) => state.auth.myAnalytics);
  const user = useSelector((state) => state.auth.user);
  const allUsers = useSelector((state) => state.auth.allUsers);
  const allSubscriberUsers = useSelector((state) => state.auth.allSubscriberUsers);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(agentOverview());
    dispatch(agentMyListings());
    dispatch(agentAnalytics());
    dispatch(getScheduledViewing());
    dispatch(getAllRegularUsers());
    // dispatch(agentGetTodos())
    dispatch(agentGetTodosGroup());
    // TrackpageView("/auth/agent/dashboard");
  }, [dispatch]);
  function showTime(time) {
    return <Moment date={time} format="YYYY/MM/DD" />;
  }
  const handleAddTaskGroup = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (!taskGroup) {
      setTaskGroupErr("This field is required");
      return;
    }
    setTaskGroupErr("");
    formData.append("group_name", taskGroup);
    dispatch(agentAddTodoGroup(formData));
  };

  if (!isAuthenticated) {
    return (
      <div className="mt-[6rem] h-screen w-full">
        <div className="sm:w-[37.5rem] mt-20 xs-l:w-[30rem] w-full px-5 xs-l:px-0 mx-auto mb-5">
          <p className="animate-pulse text-cloud-theme-blue">
            Please wait... Authenticating. This page is for those who are
            registered as agents. If it's taking too long to authenticate,
            refresh or login again
          </p>
        </div>
      </div>
    );
  }
  if (user && !user.is_agent) {
    return (
      <div className="mt-[6rem] h-screen w-full">
        <div className="sm:w-[37.5rem] mt-20 xs-l:w-[30rem] w-full px-5 xs-l:px-0 mx-auto mb-5">
          <p className="animate-pulse text-cloud-theme-blue">
            Unauthorised! This page is for those who are registered as agents.
          </p>
          <p>
            <Link className="underline text-cloud-theme-gold" href="/auth/login">
              Login
            </Link>{" "}
            first
          </p>
          <p>or</p>
          <p>
            Follow this link{" "}
            <Link
              className="underline text-cloud-theme-gold"
              href="/auth/user/my-preferences"
            >
              My Profile
            </Link>{" "}
            to update your account to agent status
          </p>
          <p>or</p>
          <p>
            If you haven't signed up{" "}
            <Link className="underline text-cloud-theme-gold" href="/auth/signup">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    );
  }
  return (
    <section className="mt-[4.95rem] md:flex block pb-10 bg-cloud-dash-body pt-0 text-white">
      <div
        className={
          openMenu
            ? `h-[100vh] fixed left-0 transition-all duration-300 backdrop-filter top-[4.8rem] backdrop-blur-lg z-30 md:sticky md:top-[4.96rem] pt-3 px-3 w-full md:w-[16rem]`
            : `h-[100vh] fixed -left-full md:sticky duration-300 transition-all top-[4.8rem] md:top-[4.96rem] pt-3 px-3 md:w-[16rem] w-full`
        }
      >
        <div className="flex justify-between items-center content-center md:w-full w-[18rem]">
          <div className="flex justify-start items-center">
            <div className="w-12 h-12 mr-3 rounded-full overflow-hidden">
              <img
                src={img}
                onClick={() => setOpenMenu(!openMenu)}
                className="w-full h-full"
                alt="agent logo"
              />
            </div>
            <div className="">
              <h5>{user?.agency_name}</h5>
            </div>
          </div>
          <div
            onClick={() => setOpenMenu(!openMenu)}
            className="p-1.5 bg-blue-400 w-8 h-8 md:hidden shadow-md flex justify-center rounded-sm"
          >
            <GrClose className="text-lg text-white" />
          </div>
        </div>
        <div className="text-sm mt-8 md:w-full w-[18rem]">
          <ul>
            <li
              className={`p-2 flex justify-start items-center hover:scale-105 duration-300 transition-all border-cloud-theme-blue
                   bg-cloud-theme-blue mb-2 rounded-md shadow-md`}
            >
              <AiOutlineAppstoreAdd className="text-2xl mr-2" />
              <Link href="/auth/agent/add-listings" className="w-full text-left">
                Add Listings
              </Link>
            </li>
            <li
              className={
                listIndex === 1
                  ? `p-2 border-r-2 flex justify-start hover:scale-105 border-b-cloud-theme-blue border-b-2 transition-all duration-300 items-center border-cloud-theme-blue bg-gray-800 mb-2 rounded-md shadow-md`
                  : `p-2 flex justify-start items-center hover:scale-105 duration-300 transition-all border-cloud-theme-blue
                   bg-gray-800 mb-2 rounded-md shadow-md`
              }
            >
              <MdOutlineDashboard className="text-2xl mr-2" />
              <button
                onClick={() => {
                  setListIndex(1);
                  setOpenMenu(!openMenu);
                }}
                type="button"
                className="w-full text-left"
              >
                Dashboard
              </button>
            </li>
            <li
              className={
                listIndex === 6
                  ? `p-2 border-r-2 flex justify-start hover:scale-105 border-b-cloud-theme-blue border-b-2 transition-all duration-300 items-center border-cloud-theme-blue bg-gray-800 mb-2 rounded-md shadow-md`
                  : `p-2 flex justify-start items-center hover:scale-105 duration-300 transition-all border-cloud-theme-blue
                   bg-gray-800 mb-2 rounded-md shadow-md`
              }
            >
              <BsListTask className="text-2xl mr-2" />
              <button
                onClick={() => {
                  setListIndex(6);
                  setOpenMenu(!openMenu);
                }}
                type="button"
                className="w-full text-left"
              >
                My Tasks
              </button>
            </li> 

            <li
              className={
                listIndex === 4
                  ? `p-2 border-r-2 flex justify-start hover:scale-105 border-b-cloud-theme-blue border-b-2 transition-all duration-300 items-center border-cloud-theme-blue bg-gray-800 mb-2 rounded-md shadow-md`
                  : `p-2 flex justify-start items-center hover:scale-105 duration-300 transition-all border-cloud-theme-blue
                   bg-gray-800 mb-2 rounded-md shadow-md`
              }
            >
              <MdWarningAmber className="text-2xl mr-2" />
              <button
                onClick={() => {
                  setListIndex(4);
                  setOpenMenu(!openMenu);
                }}
                type="button"
                className="w-full text-left"
              >
                Complaints
              </button>
            </li>
            <li
              className={
                listIndex === 2
                  ? `p-2 border-r-2 flex justify-start hover:scale-105 border-b-cloud-theme-blue border-b-2 transition-all duration-300 items-center border-cloud-theme-blue bg-gray-800 mb-2 rounded-md shadow-md`
                  : `p-2 flex justify-start items-center hover:scale-105 duration-300 transition-all border-cloud-theme-blue
                   bg-gray-800 mb-2 rounded-md shadow-md`
              }
            >
              <MdMeetingRoom className="text-2xl mr-2" />
              <button
                onClick={() => {
                  setListIndex(2);
                  setOpenMenu(!openMenu);
                }}
                type="button"
                className="w-full text-left"
              >
                Sheduled Viewing
              </button>
            </li>
            <li
              className={
                listIndex === 3
                  ? `p-2 border-r-2 flex justify-start hover:scale-105 border-b-cloud-theme-blue border-b-2 transition-all duration-300 items-center border-cloud-theme-blue bg-gray-800 mb-2 rounded-md shadow-md`
                  : `p-2 flex justify-start items-center hover:scale-105 duration-300 transition-all border-cloud-theme-blue
                   bg-gray-800 mb-2 rounded-md shadow-md`
              }
            >
              <TiMessages className="text-2xl mr-2" />
              <button
                onClick={() => {
                  setListIndex(3);
                  setOpenMenu(!openMenu);
                }}
                type="button"
                className="w-full text-left"
              >
                Chats
              </button>
            </li>
            <li
              className={
                listIndex === 5
                  ? `p-2 border-r-2 flex justify-start hover:scale-105 border-b-cloud-theme-blue border-b-2 transition-all duration-300 items-center border-cloud-theme-blue bg-gray-800 mb-2 rounded-md shadow-md`
                  : `p-2 flex justify-start items-center hover:scale-105 duration-300 transition-all border-cloud-theme-blue
                   bg-gray-800 mb-2 rounded-md shadow-md`
              }
            >
              <MdRateReview className="text-2xl mr-2" />
              <button
                onClick={() => {
                  setListIndex(5);
                  setOpenMenu(!openMenu);
                }}
                type="button"
                className="w-full text-left"
              >
                Reviews
              </button>
            </li>
            {user?.email === "jj@gmail.com" ||
            user?.email === "admin@estatecloud.co.ke" ? (
              <li
                className={
                  listIndex === 7
                    ? `p-2 border-r-2 flex justify-start hover:scale-105 border-b-cloud-theme-blue border-b-2 transition-all duration-300 items-center border-cloud-theme-blue bg-gray-800 mb-2 rounded-md shadow-md`
                    : `p-2 flex justify-start items-center hover:scale-105 duration-300 transition-all border-cloud-theme-blue
                   bg-gray-800 mb-2 rounded-md shadow-md`
                }
              >
                <BsClipboardCheck className="text-2xl mr-2" />
                <button
                  onClick={() => {
                    setListIndex(7);
                    setOpenMenu(!openMenu);
                  }}
                  type="button"
                  className="w-full text-left"
                >
                  Users
                </button>
              </li>
            ) : (
              ""
            )}
            <li
              className={
                listIndex === 8
                  ? `p-2 border-r-2 flex justify-start hover:scale-105 border-b-cloud-theme-blue border-b-2 transition-all duration-300 items-center border-cloud-theme-blue bg-gray-800 mb-2 rounded-md shadow-md`
                  : `p-2 flex justify-start items-center hover:scale-105 duration-300 transition-all border-cloud-theme-blue
                   bg-gray-800 mb-2 rounded-md shadow-md`
              }
            >
              <BsClipboardCheck className="text-2xl mr-2" />
              <button
                onClick={() => {
                  setListIndex(8);
                  setOpenMenu(!openMenu);
                }}
                type="button"
                className="w-full text-left"
              >
                Reports
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full ">
        <div className="py-4 flex px-3">
          <div className="md:hidden flex justify-center items-center content-center bg-blue-500 rounded-full p-2 mr-2">
            <button
              type="button"
              onClick={() => {
                setOpenMenu(!openMenu);
              }}
              className="text-xl"
            >
              <AiOutlineMenu />
            </button>
          </div>
          <h5 className="text-2xl">Welcome {user?.user_name}</h5>
        </div>
        <div className="gap-2 px-3 rounded-md grid grid-cols-2 sm:grid-cols-4 w-full">
          <div
            className="px-3 rounded-md hover:-translate-y-2 transition-all duration-300 py-4 flex flex-col 
          items-center bg-gray-200 content-center justify-center text-center shadow-md text-yellow-500"
          >
            <h4 className="font-semibold text-lg mb-4">Inactive Listings</h4>
            <p className="font-medium text-sm">
              {overviewData ? overviewData.inactive : 0}
            </p>
          </div>
          <div
            className="px-3 rounded-md hover:-translate-y-2 transition-all duration-300 py-4 flex flex-col 
          items-center bg-gray-200 content-center justify-center text-center shadow-md text-pink-500"
          >
            <h4 className="font-semibold text-lg mb-4">Land</h4>
            <p className="font-medium text-sm">
              {overviewData ? overviewData.land : 0}
            </p>
          </div>
          <div
            className="px-3 rounded-md hover:-translate-y-2 transition-all duration-300 py-4 flex flex-col 
          items-center bg-gray-200 content-center justify-center text-center shadow-md text-purple-500"
          >
            <h4 className="font-semibold text-lg mb-4">Commercial</h4>
            <p className="font-medium text-sm">
              {overviewData ? overviewData.commercial : 0}
            </p>
          </div>
          <div
            className="px-3 rounded-md hover:-translate-y-2 transition-all duration-300 py-4 flex flex-col 
          items-center bg-gray-200 content-center justify-center text-center shadow-md text-indigo-500"
          >
            <h4 className="font-semibold text-lg mb-4">Residental</h4>
            <p className="font-medium text-sm bg">
              {overviewData ? overviewData.residential : 0}
            </p>
          </div>
        </div>
        <div className=" mt-6 sm:mt-4 h-80vh px-3">
          {listIndex === 1 ? (
            <div>
              <div className="mb-3">
                <h4 className="font-semibold text-xl text-cloud-theme-gold">
                  My Listings
                </h4>
              </div>
              <div className="">
                <Tab.Group defaultIndex={0}>
                  <Tab.List className={`mb-5`}>
                    <Tab>
                      {({ selected }) => (
                        <div
                          className={
                            selected
                              ? `text-white bg-black transition-all duration-300 font-semibold rounded-sm shadow-md px-3 py-2 mr-2`
                              : `text-white bg-cloud-theme-blue transition-all duration-300 hover:bg-white hover:text-cloud-theme-blue font-semibold rounded-sm shadow-md px-3 py-2 mr-2`
                          }
                        >
                          Residential
                        </div>
                      )}
                    </Tab>
                    <Tab>
                      {({ selected }) => (
                        <div
                          className={
                            selected
                              ? `text-white bg-black transition-all duration-300 font-semibold rounded-sm shadow-md px-3 py-2 mr-2`
                              : `text-white bg-cloud-theme-blue transition-all duration-300 hover:bg-white hover:text-cloud-theme-blue font-semibold rounded-sm shadow-md px-3 py-2 mr-2`
                          }
                        >
                          Commercial
                        </div>
                      )}
                    </Tab>
                    <Tab>
                      {({ selected }) => (
                        <div
                          className={
                            selected
                              ? `text-white bg-black transition-all duration-300 font-semibold rounded-sm shadow-md px-3 py-2 mr-2`
                              : `text-white bg-cloud-theme-blue transition-all duration-300 hover:bg-white hover:text-cloud-theme-blue font-semibold rounded-sm shadow-md px-3 py-2 mr-2`
                          }
                        >
                          Land
                        </div>
                      )}
                    </Tab>
                  </Tab.List>
                  <Tab.Panels>
                    <Tab.Panel className={`overflow-hidden h-[40rem] `}>
                      <div className="">
                        <h4 className="font-semibold text-white mb-1.5">
                          Residential Properties
                        </h4>
                        <div className="w-full backdrop-filter backdrop-blur-lg bg-gray-900 bg-opacity-60 p-4 rounded-sm">
                          <div className=" flex items-center mb-3">
                            <div className="relative flex justify-between items-center pl-1 py-2 mr-4">
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  id="res-sale"
                                  value="For Sale"
                                  checked={residentialCategory === "For Sale"}
                                  onChange={(e) =>
                                    setResidentialCategory(e.target.value)
                                  }
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
                                htmlFor="res-sale"
                                className="w-full md:text-sm text-xs h-full"
                              >
                                For Sale
                              </label>
                            </div>
                            <div className="relative flex justify-between items-center pl-1 py-2">
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  id="res-rent"
                                  value="For Rent"
                                  checked={residentialCategory === "For Rent"}
                                  onChange={(e) =>
                                    setResidentialCategory(e.target.value)
                                  }
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
                                htmlFor="res-rent"
                                className="w-full md:text-sm text-xs h-full"
                              >
                                To Let
                              </label>
                            </div>
                          </div>
                          <div className="w-full h-[35rem] grid grid-cols-1 sm:grid-cols-2 gap-3 pb-5 overflow-y-scroll myScrollBarDash">
                            {myListingsData ? (
                              residentialCategory === "For Sale" ? (
                                myListingsData.residential_sale.length > 0 ? (
                                  myListingsData.residential_sale.flatMap(
                                    (listing, index) => (
                                      <div
                                        key={index}
                                        className="
                            flex gap-2 w-full backdrop-filter h-24 backdrop-blur-lg bg-cloud-dash-blue-card 
                            bg-opacity-30 overflow-hidden mb-3 shadow-md rounded"
                                      >
                                        <div className="h-24 w-2/6">
                                          <img
                                            className="h-full w-full object-cover"
                                            src={listing.Images?.[0]?.images}
                                            alt={listing.title.substring(0, 40)}
                                          />
                                        </div>
                                        <div className="py-2 relative w-4/6">
                                          <h6 className="font-semibold text-sm capitalize">
                                            {truncateWords(listing.title, 55)}
                                          </h6>
                                          <p className="text-xxs-s">
                                            {truncateWords(
                                              listing.location_description,
                                              28,
                                              ".."
                                            )}
                                          </p>
                                          <div className="absolute flex bottom-2 right-4">
                                            {listing.views && (
                                              <button
                                                type="button"
                                                className="text-xs flex items-center content-center shadow-md hover:text-cloud-theme-blue bg-cloud-theme-gold text-white rounded-sm px-1 py-0.5 mr-2"
                                              >
                                                <AiOutlineEye className="text-lg text-black mr-1" />{" "}
                                                {listing.views}
                                              </button>
                                            )}

                                            <Link
                                              href={`/listings/edit/${listing.slug}`}
                                              >
                                              <a
                                              className="text-xs shadow-md hover:text-cloud-theme-blue bg-cloud-theme-gold text-white rounded-sm px-1 py-0.5 mr-2"
                                              
                                              >

                                              Edit
                                              </a>
                                            </Link>
                                            <button
                                              type="button"
                                              onClick={() => {
                                                setOpenDeleteModal(true);
                                                setSlug(listing.slug);
                                              }}
                                              >
                                              <a
                                              
                                              className="text-xs shadow-md hover:text-cloud-theme-blue bg-cloud-theme-gold text-white rounded-sm px-1 py-0.5 mr-2"
                                              >

                                              {listing.is_active
                                                ? "Deactivate"
                                                : "Activate"}
                                              </a>
                                            </button>
                                            <Link
                                              href={`/listings/more-info/${listing.slug}`}
                                              >
                                              <a
                                              className="text-xs shadow-md hover:text-cloud-theme-blue bg-cloud-theme-gold text-white rounded-sm px-1 py-0.5"
                                              
                                              >

                                              View
                                              </a>
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  )
                                ) : (
                                  <h4>No items found</h4>
                                )
                              ) : myListingsData.residential_rent.length > 0 ? (
                                myListingsData.residential_rent.flatMap(
                                  (listing, index) => (
                                    <div
                                      key={index}
                                      className="
                            flex gap-2 w-full backdrop-filter h-24 backdrop-blur-lg bg-cloud-dash-blue-card 
                            bg-opacity-30 overflow-hidden mb-3 shadow-md rounded"
                                    >
                                      <div className="h-24 w-2/6">
                                        <img
                                          className="h-full w-full object-cover"
                                          src={listing.Images?.[0]?.images}
                                          alt={listing.title.substring(0, 40)}
                                        />
                                      </div>
                                      <div className="py-2 relative w-4/6">
                                        <h6 className="font-semibold text-sm capitalize">
                                          {truncateWords(listing.title, 55)}
                                        </h6>
                                        <p className="text-xxs-s">
                                          {truncateWords(
                                            listing.location_description,
                                            28,
                                            ".."
                                          )}
                                        </p>
                                        <div className="absolute flex bottom-2 right-4">
                                            {listing.views && (
                                              <button
                                                type="button"
                                                className="text-xs flex items-center content-center shadow-md hover:text-cloud-theme-blue bg-cloud-theme-gold text-white rounded-sm px-1 py-0.5 mr-2"
                                              >
                                                <AiOutlineEye className="text-lg text-black mr-1" />{" "}
                                                {listing.views}
                                              </button>
                                            )}

                                            <Link
                                              href={`/listings/edit/${listing.slug}`}
                                              >
                                              <a
                                              className="text-xs shadow-md hover:text-cloud-theme-blue bg-cloud-theme-gold text-white rounded-sm px-1 py-0.5 mr-2"
                                              
                                              >

                                              Edit
                                              </a>
                                            </Link>
                                            <button
                                              type="button"
                                              onClick={() => {
                                                setOpenDeleteModal(true);
                                                setSlug(listing.slug);
                                              }}
                                              >
                                              <a
                                              
                                              className="text-xs shadow-md hover:text-cloud-theme-blue bg-cloud-theme-gold text-white rounded-sm px-1 py-0.5 mr-2"
                                              >

                                              {listing.is_active
                                                ? "Deactivate"
                                                : "Activate"}
                                              </a>
                                            </button>
                                            <Link
                                              href={`/listings/more-info/${listing.slug}`}
                                              >
                                              <a
                                              className="text-xs shadow-md hover:text-cloud-theme-blue bg-cloud-theme-gold text-white rounded-sm px-1 py-0.5"
                                              
                                              >

                                              View
                                              </a>
                                            </Link>
                                          </div>
                                      </div>
                                    </div>
                                  )
                                )
                              ) : (
                                <h4>No items found</h4>
                              )
                            ) : (
                              <SpinOne />
                            )}
                          </div>
                        </div>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel className={`overflow-hidden h-[40rem] `}>
                      <div>
                        <h4 className="font-semibold text-white mb-1.5">
                          Commercial Properties
                        </h4>
                        <div className="w-full backdrop-filter backdrop-blur-lg bg-gray-900 bg-opacity-60 p-4 rounded-sm">
                          <div className=" flex items-center mb-3">
                            <div className="relative flex justify-between items-center pl-1 py-2 mr-4">
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  id="com-sale"
                                  value="For Sale"
                                  checked={commercialCategory === "For Sale"}
                                  onChange={(e) =>
                                    setCommercialCategory(e.target.value)
                                  }
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
                                htmlFor="com-sale"
                                className="w-full md:text-sm text-xs h-full"
                              >
                                For Sale
                              </label>
                            </div>
                            <div className="relative flex justify-between items-center pl-1 py-2">
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  id="com-rent"
                                  value="For Rent"
                                  checked={commercialCategory === "For Rent"}
                                  onChange={(e) =>
                                    setCommercialCategory(e.target.value)
                                  }
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
                                htmlFor="com-rent"
                                className="w-full md:text-sm text-xs h-full"
                              >
                                To Let
                              </label>
                            </div>
                          </div>
                          <div className="w-full h-[35rem] grid grid-cols-1 sm:grid-cols-2 gap-3 pb-5 overflow-y-scroll myScrollBarDash">
                            {myListingsData ? (
                              commercialCategory === "For Sale" ? (
                                myListingsData.commercial_sale.length > 0 ? (
                                  myListingsData.commercial_sale.flatMap(
                                    (listing, index) => (
                                      <div
                                        key={index}
                                        className="
                            flex gap-2 w-full backdrop-filter h-24 backdrop-blur-lg bg-cloud-dash-blue-card 
                            bg-opacity-30 overflow-hidden mb-3 shadow-md rounded"
                                      >
                                        <div className="h-24 w-2/6">
                                          <img
                                            className="h-full w-full object-cover"
                                            src={listing.Images?.[0]?.images}
                                            alt={listing.title.substring(0, 40)}
                                          />
                                        </div>
                                        <div className="py-2 relative w-4/6">
                                          <h6 className="font-semibold text-sm capitalize">
                                            {truncateWords(listing.title, 55)}
                                          </h6>
                                          <p className="text-xxs-s">
                                            {truncateWords(
                                              listing.location_description,
                                              28,
                                              ".."
                                            )}
                                          </p>
                                          <div className="absolute flex bottom-2 right-4">
                                            {listing.views && (
                                              <button
                                                type="button"
                                                className="text-xs flex items-center content-center shadow-md hover:text-cloud-theme-blue bg-cloud-theme-gold text-white rounded-sm px-1 py-0.5 mr-2"
                                              >
                                                <AiOutlineEye className="text-lg text-black mr-1" />{" "}
                                                {listing.views}
                                              </button>
                                            )}

                                            <Link
                                              href={`/listings/edit/${listing.slug}`}
                                              >
                                              <a
                                              className="text-xs shadow-md hover:text-cloud-theme-blue bg-cloud-theme-gold text-white rounded-sm px-1 py-0.5 mr-2"
                                              
                                              >

                                              Edit
                                              </a>
                                            </Link>
                                            <button
                                              type="button"
                                              onClick={() => {
                                                setOpenDeleteModal(true);
                                                setSlug(listing.slug);
                                              }}
                                              >
                                              <a
                                              
                                              className="text-xs shadow-md hover:text-cloud-theme-blue bg-cloud-theme-gold text-white rounded-sm px-1 py-0.5 mr-2"
                                              >

                                              {listing.is_active
                                                ? "Deactivate"
                                                : "Activate"}
                                              </a>
                                            </button>
                                            <Link
                                              href={`/listings/more-info/${listing.slug}`}
                                              >
                                              <a
                                              className="text-xs shadow-md hover:text-cloud-theme-blue bg-cloud-theme-gold text-white rounded-sm px-1 py-0.5"
                                              
                                              >

                                              View
                                              </a>
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  )
                                ) : (
                                  <h4>No items found</h4>
                                )
                              ) : myListingsData.commercial_rent.length > 0 ? (
                                myListingsData.commercial_rent.flatMap(
                                  (listing, index) => (
                                    <div
                                      key={index}
                                      className="
                            flex gap-2 w-full backdrop-filter h-24 backdrop-blur-lg bg-cloud-dash-blue-card 
                            bg-opacity-30 overflow-hidden mb-3 shadow-md rounded"
                                    >
                                      <div className="h-24 w-2/6">
                                        <img
                                          className="h-full w-full object-cover"
                                          src={listing.Images?.[0]?.images}
                                          alt={listing.title.substring(0, 40)}
                                        />
                                      </div>
                                      <div className="py-2 relative w-4/6">
                                        <h6 className="font-semibold text-sm capitalize">
                                          {truncateWords(listing.title, 55)}
                                        </h6>
                                        <p className="text-xxs-s">
                                          {truncateWords(
                                            listing.location_description,
                                            28,
                                            ".."
                                          )}
                                        </p>
                                        <div className="absolute flex bottom-2 right-4">
                                            {listing.views && (
                                              <button
                                                type="button"
                                                className="text-xs flex items-center content-center shadow-md hover:text-cloud-theme-blue bg-cloud-theme-gold text-white rounded-sm px-1 py-0.5 mr-2"
                                              >
                                                <AiOutlineEye className="text-lg text-black mr-1" />{" "}
                                                {listing.views}
                                              </button>
                                            )}

                                            <Link
                                              href={`/listings/edit/${listing.slug}`}
                                              >
                                              <a
                                              className="text-xs shadow-md hover:text-cloud-theme-blue bg-cloud-theme-gold text-white rounded-sm px-1 py-0.5 mr-2"
                                              
                                              >

                                              Edit
                                              </a>
                                            </Link>
                                            <button
                                              type="button"
                                              onClick={() => {
                                                setOpenDeleteModal(true);
                                                setSlug(listing.slug);
                                              }}
                                              >
                                              <a
                                              
                                              className="text-xs shadow-md hover:text-cloud-theme-blue bg-cloud-theme-gold text-white rounded-sm px-1 py-0.5 mr-2"
                                              >

                                              {listing.is_active
                                                ? "Deactivate"
                                                : "Activate"}
                                              </a>
                                            </button>
                                            <Link
                                              href={`/listings/more-info/${listing.slug}`}
                                              >
                                              <a
                                              className="text-xs shadow-md hover:text-cloud-theme-blue bg-cloud-theme-gold text-white rounded-sm px-1 py-0.5"
                                              
                                              >

                                              View
                                              </a>
                                            </Link>
                                          </div>
                                      </div>
                                    </div>
                                  )
                                )
                              ) : (
                                <h4>No items found</h4>
                              )
                            ) : (
                              <SpinOne />
                            )}
                          </div>
                        </div>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel className={`overflow-hidden h-[40rem] `}>
                      <div>
                        <h4 className="font-semibold text-white mb-1.5">
                          Land Properties
                        </h4>
                        <div className="w-full backdrop-filter backdrop-blur-lg bg-gray-900 bg-opacity-60 p-4 rounded-sm">
                          <div className=" flex items-center mb-3">
                            <div className="relative flex justify-between items-center pl-1 py-2 mr-4">
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  id="land-sale"
                                  value="For Sale"
                                  checked={landCategory === "For Sale"}
                                  onChange={(e) =>
                                    setLandCategory(e.target.value)
                                  }
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
                                htmlFor="land-sale"
                                className="w-full md:text-sm text-xs h-full"
                              >
                                For Sale
                              </label>
                            </div>
                            <div className="relative flex justify-between items-center pl-1 py-2">
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  id="land-rent"
                                  value="For Lease"
                                  checked={landCategory === "For Lease"}
                                  onChange={(e) =>
                                    setLandCategory(e.target.value)
                                  }
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
                                htmlFor="land-rent"
                                className="w-full md:text-sm text-xs h-full"
                              >
                                Lease
                              </label>
                            </div>
                          </div>
                          <div className="w-full h-[35rem] grid grid-cols-1 sm:grid-cols-2 gap-3 pb-5 overflow-y-scroll myScrollBarDash">
                            {myListingsData ? (
                              landCategory === "For Sale" ? (
                                myListingsData.land_sale.length > 0 ? (
                                  myListingsData.land_sale.flatMap(
                                    (listing, index) => (
                                      <div
                                        key={index}
                                        className="
                            flex gap-2 w-full backdrop-filter h-24 backdrop-blur-lg bg-cloud-dash-blue-card 
                            bg-opacity-30 overflow-hidden mb-3 shadow-md rounded"
                                      >
                                        <div className="h-24 w-2/6">
                                          <img
                                            className="h-full w-full object-cover"
                                            src={listing.Images?.[0]?.images}
                                            alt={listing.title.substring(0, 40)}
                                          />
                                        </div>
                                        <div className="py-2 relative w-4/6">
                                          <h6 className="font-semibold text-sm capitalize">
                                            {truncateWords(listing.title, 55)}
                                          </h6>
                                          <p className="text-xxs-s">
                                            {truncateWords(
                                              listing.location_description,
                                              28,
                                              ".."
                                            )}
                                          </p>
                                          <div className="absolute flex bottom-2 right-4">
                                            {listing.views && (
                                              <button
                                                type="button"
                                                className="text-xs flex items-center content-center shadow-md hover:text-cloud-theme-blue bg-cloud-theme-gold text-white rounded-sm px-1 py-0.5 mr-2"
                                              >
                                                <AiOutlineEye className="text-lg text-black mr-1" />{" "}
                                                {listing.views}
                                              </button>
                                            )}

                                            <Link
                                              href={`/listings/edit/${listing.slug}`}
                                              >
                                              <a
                                              className="text-xs shadow-md hover:text-cloud-theme-blue bg-cloud-theme-gold text-white rounded-sm px-1 py-0.5 mr-2"
                                              
                                              >

                                              Edit
                                              </a>
                                            </Link>
                                            <button
                                              type="button"
                                              onClick={() => {
                                                setOpenDeleteModal(true);
                                                setSlug(listing.slug);
                                              }}
                                              >
                                              <a
                                              
                                              className="text-xs shadow-md hover:text-cloud-theme-blue bg-cloud-theme-gold text-white rounded-sm px-1 py-0.5 mr-2"
                                              >

                                              {listing.is_active
                                                ? "Deactivate"
                                                : "Activate"}
                                              </a>
                                            </button>
                                            <Link
                                              href={`/listings/more-info/${listing.slug}`}
                                              >
                                              <a
                                              className="text-xs shadow-md hover:text-cloud-theme-blue bg-cloud-theme-gold text-white rounded-sm px-1 py-0.5"
                                              
                                              >

                                              View
                                              </a>
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  )
                                ) : (
                                  <h4>No items found</h4>
                                )
                              ) : myListingsData.land_lease.length > 0 ? (
                                myListingsData.land_lease.flatMap(
                                  (listing, index) => (
                                    <div
                                      key={index}
                                      className="
                            flex gap-2 w-full backdrop-filter h-24 backdrop-blur-lg bg-cloud-dash-blue-card 
                            bg-opacity-30 overflow-hidden mb-3 shadow-md rounded"
                                    >
                                      <div className="h-24 w-2/6">
                                        <img
                                          className="h-full w-full object-cover"
                                          src={listing.Images?.[0]?.images}
                                          alt={listing.title.substring(0, 40)}
                                        />
                                      </div>
                                      <div className="py-2 relative w-4/6">
                                        <h6 className="font-semibold text-sm capitalize">
                                          {truncateWords(listing.title, 55)}
                                        </h6>
                                        <p className="text-xxs-s">
                                          {truncateWords(
                                            listing.location_description,
                                            28,
                                            ".."
                                          )}
                                        </p>
                                        <div className="absolute flex bottom-2 right-4">
                                            {listing.views && (
                                              <button
                                                type="button"
                                                className="text-xs flex items-center content-center shadow-md hover:text-cloud-theme-blue bg-cloud-theme-gold text-white rounded-sm px-1 py-0.5 mr-2"
                                              >
                                                <AiOutlineEye className="text-lg text-black mr-1" />{" "}
                                                {listing.views}
                                              </button>
                                            )}

                                            <Link
                                              href={`/listings/edit/${listing.slug}`}
                                              >
                                              <a
                                              className="text-xs shadow-md hover:text-cloud-theme-blue bg-cloud-theme-gold text-white rounded-sm px-1 py-0.5 mr-2"
                                              
                                              >

                                              Edit
                                              </a>
                                            </Link>
                                            <button
                                              type="button"
                                              onClick={() => {
                                                setOpenDeleteModal(true);
                                                setSlug(listing.slug);
                                              }}
                                              >
                                              <a
                                              
                                              className="text-xs shadow-md hover:text-cloud-theme-blue bg-cloud-theme-gold text-white rounded-sm px-1 py-0.5 mr-2"
                                              >

                                              {listing.is_active
                                                ? "Deactivate"
                                                : "Activate"}
                                              </a>
                                            </button>
                                            <Link
                                              href={`/listings/more-info/${listing.slug}`}
                                              >
                                              <a
                                              className="text-xs shadow-md hover:text-cloud-theme-blue bg-cloud-theme-gold text-white rounded-sm px-1 py-0.5"
                                              
                                              >

                                              View
                                              </a>
                                            </Link>
                                          </div>
                                      </div>
                                    </div>
                                  )
                                )
                              ) : (
                                <h4>No items found</h4>
                              )
                            ) : (
                              <SpinOne />
                            )}
                          </div>
                        </div>
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
              <div className="mt-4 text-white">
                <div>
                  <div className="mb-3">
                    <h4 className="font-semibold text-lg">Analytics</h4>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                    <div
                      className="shadow-md p-3 flex flex-col justify-center items-center content-center
           backdrop-filter backdrop-blur-lg bg-cloud-dash-blue-an bg-opacity-60 rounded-md"
                    >
                      <p className="font-medium text-lg mb-3">Likes</p>
                      <p className="">
                        {myAnalytics ? myAnalytics.my_likes : 0}
                      </p>
                    </div>
                    <div
                      className="shadow-md p-3 flex flex-col justify-center items-center content-center
           backdrop-filter backdrop-blur-lg bg-cloud-dash-blue-an bg-opacity-60 rounded-md"
                    >
                      <p className="font-medium text-lg mb-3">Views</p>
                      <p className="">
                        {myAnalytics ? myAnalytics.total_views : 0}
                      </p>
                    </div>
                    <div
                      className="shadow-md p-3 flex flex-col justify-center items-center content-center
           backdrop-filter backdrop-blur-lg bg-cloud-dash-blue-an bg-opacity-60 rounded-md"
                    >
                      <p className="font-medium text-lg text-center mb-3">
                        Unresolved Complaints
                      </p>
                      <p className="">
                        {myAnalytics ? myAnalytics.my_complaints : 0}
                      </p>
                    </div>
                  </div>
                </div>
                <div className=" grid grid-cols-1 mt-4 xs-auth:grid-cols-2 gap-4 ">
                  <MyDoughnutChart likeData={myAnalytics?.likes} />
                  <MyDoughnutChart likeData={myAnalytics?.views} />
                </div>
              </div>
            </div>
          ) : listIndex === 2 ? (
            <div>
              <div className="mb-3">
                <h4 className="font-semibold text-xl text-cloud-theme-gold">
                  Scheduled Viewings
                </h4>
              </div>

              <div className="">
                <Tab.Group defaultIndex={0}>
                  <Tab.List className={`mb-5`}>
                    <Tab>
                      {({ selected }) => (
                        <button
                          type="button"
                          className={
                            selected
                              ? `text-white bg-black transition-all duration-300 font-semibold rounded-sm shadow-md px-3 py-2 mr-2`
                              : `text-white bg-cloud-theme-blue transition-all duration-300 hover:bg-white hover:text-cloud-theme-blue font-semibold rounded-sm shadow-md px-3 py-2 mr-2`
                          }
                        >
                          Residential
                        </button>
                      )}
                    </Tab>
                    <Tab>
                      {({ selected }) => (
                        <button
                          type="button"
                          className={
                            selected
                              ? `text-white bg-black transition-all duration-300 font-semibold rounded-sm shadow-md px-3 py-2 mr-2`
                              : `text-white bg-cloud-theme-blue transition-all duration-300 hover:bg-white hover:text-cloud-theme-blue font-semibold rounded-sm shadow-md px-3 py-2 mr-2`
                          }
                        >
                          Commercial
                        </button>
                      )}
                    </Tab>
                    <Tab>
                      {({ selected }) => (
                        <button
                          type="button"
                          className={
                            selected
                              ? `text-white bg-black transition-all duration-300 font-semibold rounded-sm shadow-md px-3 py-2 mr-2`
                              : `text-white bg-cloud-theme-blue transition-all duration-300 hover:bg-white hover:text-cloud-theme-blue font-semibold rounded-sm shadow-md px-3 py-2 mr-2`
                          }
                        >
                          Land
                        </button>
                      )}
                    </Tab>
                  </Tab.List>
                  <Tab.Panels>
                    <Tab.Panel className={`overflow-hidden h-[40rem] `}>
                      <div className="">
                        <h4 className="font-semibold text-white mb-1.5">
                          Residential Properties
                        </h4>
                        <div className="w-full backdrop-filter backdrop-blur-lg bg-gray-900 bg-opacity-60 p-4 rounded-sm">
                          <div className="w-full h-[35rem] grid grid-cols-1 sm:grid-cols-2 gap-3 pb-5 overflow-y-scroll myScrollBarDash">
                            {scheduleViewings ? (
                              scheduleViewings.residential?.length > 0 ? (
                                scheduleViewings.residential.flatMap(
                                  (listing, index) => (
                                    <div
                                      key={index}
                                      className="
                            flex gap-2 w-full backdrop-filter h-28 backdrop-blur-lg bg-cloud-dash-blue-card 
                            bg-opacity-30 overflow-hidden mb-3 shadow-md rounded"
                                    >
                                      <div className="p-2 overflow-y-scroll myScrollBarDash w-full">
                                        <h6 className="font-semibold text-sm capitalize">
                                          {truncateWords(
                                            listing.residential_listing.title,
                                            55
                                          )}
                                        </h6>
                                        <p className="text-xxs-s">
                                          {truncateWords(
                                            listing.residential_listing
                                              .location_description,
                                            28
                                          )}
                                        </p>
                                        <div className=" bg-gray-700 p-1 rounded-b-md">
                                          <p className="text-xs">
                                            <span>Viewing date: </span>
                                            {listing.date_of_viewing}
                                          </p>
                                          <p className="text-xs">
                                            <span>Sheduled Time: </span>
                                            {listing.date_of_viewing}
                                          </p>
                                          <p className="text-xs">
                                            <span>User Contact: </span>
                                            {listing.phone}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              ) : (
                                <h4>No items found</h4>
                              )
                            ) : (
                              <SpinOne />
                            )}
                          </div>
                        </div>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel className={`overflow-hidden h-[40rem] `}>
                      <div>
                        <h4 className="font-semibold text-white mb-1.5">
                          Commercial Properties
                        </h4>
                        <div className="w-full backdrop-filter backdrop-blur-lg bg-gray-900 bg-opacity-60 p-4 rounded-sm">
                          <div className="w-full h-[35rem] grid grid-cols-1 sm:grid-cols-2 gap-3 pb-5 overflow-y-scroll myScrollBarDash">
                            {scheduleViewings ? (
                              scheduleViewings.commercial?.length > 0 ? (
                                scheduleViewings.commercial.flatMap(
                                  (listing, index) => (
                                    <div
                                      key={index}
                                      className="
                            flex gap-2 w-full backdrop-filter h-24 backdrop-blur-lg bg-cloud-dash-blue-card 
                            bg-opacity-30 overflow-hidden mb-3 shadow-md rounded"
                                    >
                                      <div className="p-2 overflow-y-scroll myScrollBarDash w-full">
                                        <h6 className="font-semibold text-sm capitalize">
                                          {truncateWords(
                                            listing.commercial_listing.title,
                                            55
                                          )}
                                        </h6>
                                        <p className="text-xxs-s">
                                          {truncateWords(
                                            listing.commercial_listing
                                              .location_description,
                                            28
                                          )}
                                        </p>
                                        <div className=" bg-gray-700 p-1 rounded-b-md">
                                          <p className="text-xs">
                                            <span>Viewing date: </span>
                                            {listing.date_of_viewing}
                                          </p>
                                          <p className="text-xs">
                                            <span>Sheduled Time: </span>
                                            {listing.date_of_viewing}
                                          </p>
                                          <p className="text-xs">
                                            <span>User Contact: </span>
                                            {listing.phone}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              ) : (
                                <h4>No items found</h4>
                              )
                            ) : (
                              <SpinOne />
                            )}
                          </div>
                        </div>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel className={`overflow-hidden h-[40rem] `}>
                      <div>
                        <h4 className="font-semibold text-white mb-1.5">
                          Land Properties
                        </h4>
                        <div className="w-full backdrop-filter backdrop-blur-lg bg-gray-900 bg-opacity-60 p-4 rounded-sm">
                          <div className="w-full h-[35rem] grid grid-cols-1 sm:grid-cols-2 gap-3 pb-5 overflow-y-scroll myScrollBarDash">
                            {scheduleViewings ? (
                              scheduleViewings.land?.length > 0 ? (
                                scheduleViewings.land.flatMap(
                                  (listing, index) => (
                                    <div
                                      key={index}
                                      className="
                            flex gap-2 w-full backdrop-filter h-24 backdrop-blur-lg bg-cloud-dash-blue-card 
                            bg-opacity-30 overflow-hidden mb-3 shadow-md rounded"
                                    >
                                      <div className="p-2 overflow-y-scroll myScrollBarDash w-full">
                                        <h6 className="font-semibold text-sm capitalize">
                                          {truncateWords(
                                            listing.land.title,
                                            55
                                          )}
                                        </h6>
                                        <p className="text-xxs-s">
                                          {truncateWords(
                                            listing.land.location_description,
                                            28
                                          )}
                                        </p>
                                        <div className=" bg-gray-700 p-1 rounded-b-md">
                                          <p className="text-xs">
                                            <span>Viewing date: </span>
                                            {listing.date_of_viewing}
                                          </p>
                                          <p className="text-xs">
                                            <span>Sheduled Time: </span>
                                            {listing.date_of_viewing}
                                          </p>
                                          <p className="text-xs">
                                            <span>User Contact: </span>
                                            {listing.phone}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )
                              ) : (
                                <h4>No items found</h4>
                              )
                            ) : (
                              <SpinOne />
                            )}
                          </div>
                        </div>
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </div>
          ) : listIndex === 3 ? (
            <div>
              <h4 className="font-semibold text-xl text-cloud-theme-gold">
                Chats
              </h4>
            </div>
          ) : listIndex === 4 ? (
            <div>
              <h4 className="font-semibold text-xl text-cloud-theme-gold">
                Unresolved Complaints
              </h4>
            </div>
          ) : listIndex === 5 ? (
            <div>
              <h4 className="font-semibold text-xl text-cloud-theme-gold">
                Reviews
              </h4>
            </div>
          ) : listIndex === 6 ? (
            <div className="sm:w-[30rem] w-full">
              <div>
                <h3 className="mb-2 text-xl font-semibold text-cloud-theme-gold">
                  Tasks Manager
                </h3>
                <div className="mb-2.5">
                  <button className="text-sm" type="button">
                    Add A Task Group
                  </button>
                  <div className="">
                    <form
                      onSubmit={handleAddTaskGroup}
                      className="flex w-[19.5rem]"
                    >
                      <input
                        type="text"
                        value={taskGroup}
                        maxLength={15}
                        onChange={(e) => setTaskGroup(e.target.value)}
                        className="rounded-none rounded-l-sm dark:bg-gray-700  dark:border-cloud-theme-blue
                         dark:placeholder-gray-400 dark:text-white  bg-gray-50 border border-1 outline-none
                         border-gray-300 text-gray-900 focus:border-cloud-theme-blue block flex-1 w-full text-sm p-2"
                        placeholder="Task Group Name"
                      />
                      <span
                        className="inline-flex items-center text-sm dark:bg-gray-700 text-gray-900 bg-cloud-theme-blue
                       rounded-r-sm border border-l-0 border-gray-300 dark:border-cloud-theme-blue  focus:border-cloud-theme-blue"
                      >
                        <button className="outline-bone w-full px-2 h-full text-white border-none">
                          <IoMdAdd className="text-xl" />
                        </button>
                      </span>
                    </form>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-lg text-cloud-theme-gold">
                  My Task Groups
                </h4>
                <Tab.Group>
                  <Tab.List>
                    {todosGroups &&
                      todosGroups.flatMap((todoGroup) => (
                        <Tab>
                          {({ selected }) => (
                            <button
                              type="button"
                              onClick={() =>
                                dispatch(
                                  agentGetTodos(todoGroup.todo_group_name)
                                )
                              }
                              className={
                                selected
                                  ? `text-white bg-black transition-all duration-300 font-semibold text-xs rounded-sm shadow-md px-2 py-2 mr-2`
                                  : `text-white bg-cloud-theme-blue transition-all duration-300 hover:bg-white text-xs hover:text-cloud-theme-blue font-semibold rounded-sm shadow-md px-2 py-2 mr-2`
                              }
                            >
                              {todoGroup.todo_group_name}
                            </button>
                          )}
                        </Tab>
                      ))}
                  </Tab.List>
                  <Tab.Panels>
                    <div className="mt-3 flex">
                      <h5>My Tasks</h5>
                      <div>
                        <button
                          className="text-sm bg-cloud-theme-gold flex shadow-md ml-2.5 px-2 py-1 rounded-sm"
                          type="button"
                          onClick={() => {
                            setOpenAddTaskModal(true);
                            setOpenMenu(false);
                          }}
                        >
                          Add Task <IoMdAdd className="text-xl ml-2" />
                        </button>
                      </div>
                    </div>
                    {todosGroups &&
                      todosGroups.flatMap((todosGroup, index) => (
                        <Tab.Panel key={index} className={`mt-3`}>
                          {gettingTodos ? (
                            <SpinMadoido />
                          ) : todos ? (
                            todos.flatMap((todo) => (
                              <div
                                key={todo.id}
                                className="relative flex bg-gray-800 rounded-md shadow-lg justify-between items-center px-2 py-2 
                    hover:bg-cloud-theme-blue duration-300 transition-all mb-2"
                              >
                                <div className="items-center">{todo.task}</div>

                                <div className="flex hover:text-black">
                                  {todo.is_completed ? (
                                    <div
                                      className="bg-white rounded-sm
                                   w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        className="fill-current w-8 h-8 text-cloud-theme-gold pointer-events-none"
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M0 0h24v24H0z" fill="none" />
                                        <path
                                          fill="#FB911B"
                                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                                        />
                                      </svg>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                  <button
                                    type="button"
                                    onClick={() =>
                                      dispatch(
                                        agentManageTodos(
                                          todo.id,
                                          "delete",
                                          todosGroup.todo_group_name
                                        )
                                      )
                                    }
                                    className="mr-2"
                                  >
                                    <BsTrash className="text-white hover:text-cloud-theme-gold" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setTodoGrpName(
                                        todosGroup.todo_group_name
                                      );
                                      setTodoGrpId(todosGroup.id);
                                      setTaskEdit(todo);
                                      setOpenEditDeleteModal(true);
                                      setOpenMenu(false);
                                    }}
                                  >
                                    <AiOutlineEdit className="text-white hover:text-cloud-theme-gold" />
                                  </button>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p>No task found</p>
                          )}
                        </Tab.Panel>
                      ))}
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </div>
          ) : listIndex === 7 ? (
            <>
              <div>
                <h4>All Users</h4>
              </div>
              <div class="flex flex-col myScrollBarDash">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="overflow-hidden myScrollBarDash">
                      <table class="min-w-full text-center">
                        <thead class="border-b bg-gray-800">
                          <tr>
                            <th
                              scope="col"
                              class="text-sm font-medium text-white px-6 py-4"
                            >
                              Email
                            </th>
                            <th
                              scope="col"
                              class="text-sm font-medium text-white px-6 py-4"
                            >
                              Phone
                            </th>
                            <th
                              scope="col"
                              class="text-sm font-medium text-white px-6 py-4"
                            >
                              Country
                            </th>
                            <th
                              scope="col"
                              class="text-sm font-medium text-white px-6 py-4"
                            >
                              Agent
                            </th>
                            <th
                              scope="col"
                              class="text-sm font-medium text-white px-6 py-4"
                            >
                              Verified
                            </th>
                            <th
                              scope="col"
                              class="text-sm font-medium text-white px-6 py-4"
                            >
                              Investor
                            </th>
                          </tr>
                        </thead>
                        <tbody className="myScrollBarDash">
                          {allUsers &&
                            allUsers.map((user) => {
                              return (
                                <tr key={user.u_id} class="bg-white border-b">
                                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {user.email}
                                  </td>
                                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {user.mobile_phone}
                                  </td>
                                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {user.country}
                                  </td>
                                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {user.is_agent ? (
                                      <BsCheck2 />
                                    ) : (
                                      <MdClose className="text-red-600" />
                                    )}
                                  </td>
                                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {user.is_verified_agent ? (
                                      <BsCheck2 />
                                    ) : (
                                      <MdClose className="text-red-600" />
                                    )}
                                  </td>
                                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {user.is_investor ? (
                                      <BsCheck2 />
                                    ) : (
                                      <MdClose className="text-red-600" />
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4>All Subscribers</h4>
              </div>
              <div class="flex flex-col myScrollBarDash">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="overflow-hidden myScrollBarDash">
                      <table class="min-w-full text-center">
                        <thead class="border-b bg-gray-800">
                          <tr>
                            <th
                              scope="col"
                              class="text-sm font-medium text-white px-6 py-4"
                            >
                              Id
                            </th>
                            <th
                              scope="col"
                              class="text-sm font-medium text-white px-6 py-4"
                            >
                              Email
                            </th>
                            <th
                              scope="col"
                              class="text-sm font-medium text-white px-6 py-4"
                            >
                              Date Subscribed
                            </th>
                            <th
                              scope="col"
                              class="text-sm font-medium text-white px-6 py-4"
                            >
                              Subscription Type
                            </th>
                          </tr>
                        </thead>
                        <tbody className="myScrollBarDash">
                          {allSubscriberUsers &&
                            allSubscriberUsers.map((user) => {
                              return (
                                <tr key={user.id} class="bg-white border-b">
                                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {user.id}
                                  </td>
                                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {user.email}
                                  </td>
                                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {showTime(user.created_at)} 
                                  </td>
                                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {user.subscription_type}
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div>
              <h4 className="font-semibold text-xl text-cloud-theme-gold">
                Reports
              </h4>
            </div>
          )}
        </div>
      </div>
      <DeletePost
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        deleteListings={deleteListings}
        dispatch={dispatch}
        slug={listingSlug}
      />
      {taskEdit && (
        <EditTask
          openEditDeleteModal={openEditDeleteModal}
          setOpenEditDeleteModal={setOpenEditDeleteModal}
          todo={taskEdit}
          setTaskEdit={setTaskEdit}
          todoGrpId={todoGrpId}
          todoGrpName={todoGrpName}
          agentManageTodos={agentManageTodos}
          dispatch={dispatch}
        />
      )}
      <AddTasks
        openAddTaskModal={openAddTaskModal}
        dispatch={dispatch}
        setOpenAddTaskModal={setOpenAddTaskModal}
      />
    </section>
  );
};

const AddTasks = ({ dispatch, openAddTaskModal, setOpenAddTaskModal }) => {
  const [task, setTask] = useState("");
  const [taskGroupName, setTaskGroupName] = useState("");
  const [taskErr, setTaskErr] = useState(null);
  const [taskGroupErr, setTaskGroupErr] = useState(null);
  const handleAddTask = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (!task) {
      setTaskGroupErr("Field required");
      return;
    }
    if (!taskGroupName) {
      setTaskErr("Field required");
      return;
    }
    setTaskErr("");
    formData.append("task", task);
    formData.append("todo_group_name", taskGroupName);

    dispatch(agentAddTodo(formData, taskGroupName));
    setOpenAddTaskModal(false);
  };
  return (
    <Transition appear show={openAddTaskModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => setOpenAddTaskModal(true)}
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

          {/* This element is to trick the browser into centering the modal contents. */}
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
            <div className="inline-block mt-[5.5rem] w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900 mt-4"
              >
                Add A New Task
              </Dialog.Title>
              <div className="mt-2">
                <div className="">
                  <form
                    onSubmit={handleAddTask}
                    className="flex flex-col w-full"
                  >
                    <div className="mb-3 relative">
                      <p className="text-sm text-cloud-theme-blue mb-2">
                        Task Group
                      </p>
                      {taskGroupErr && (
                        <p className="text-xs mb-2 text-red-600 animate-pulse">
                          {taskGroupErr}
                        </p>
                      )}
                      <input
                        type="text"
                        value={taskGroupName}
                        maxLength={15}
                        onChange={(e) => setTaskGroupName(e.target.value)}
                        className="rounded-none rounded-l-sm dark:bg-gray-700  dark:border-cloud-theme-blue
                         dark:placeholder-gray-400 dark:text-white  bg-gray-50 border border-1 outline-none
                         border-gray-300 text-gray-900 focus:border-cloud-theme-blue block flex-1 w-full text-sm p-2"
                        placeholder="task group name"
                      />
                    </div>
                    <div className="mb-3 relative">
                      <p className="text-sm text-cloud-theme-blue mb-2">Task</p>
                      {taskErr && (
                        <p className="text-xs mb-2 text-red-600 animate-pulse">
                          {taskErr}
                        </p>
                      )}
                      <input
                        type="text"
                        value={task}
                        maxLength={100}
                        onChange={(e) => setTask(e.target.value)}
                        className="rounded-none rounded-l-sm dark:bg-gray-700  dark:border-cloud-theme-blue
                         dark:placeholder-gray-400 dark:text-white  bg-gray-50 border border-1 outline-none
                         border-gray-300 text-gray-900 focus:border-cloud-theme-blue block flex-1 w-full text-sm p-2"
                        placeholder="task"
                      />
                    </div>

                    <div className="grid gap-3 grid-cols-2">
                      <button
                        className="w-full
                    py-2
                    rounded-md
                    shadow-md
                    px-3
                    mt-2
                    bg-cloud-theme-gold
                    text-white text-center text-base
                    flex justify-center items-center content-center"
                        type="button"
                        onClick={() => {
                          setOpenAddTaskModal(false);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="w-full
                    py-2
                    rounded-md
                    shadow-md
                    px-3
                    mt-2
                    bg-cloud-theme-blue
                    text-white text-center text-base
                    flex justify-center items-center content-center"
                        type="submit"
                      >
                        Add
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
const EditTask = ({
  openEditDeleteModal,
  setOpenEditDeleteModal,
  todo,
  setTaskEdit,
  agentManageTodos,
  dispatch,
  todoGrpName,
}) => {
  const [task, setTask] = useState(todo?.task);
  const [isCompleted, setIsCompleted] = useState(todo?.is_completed);
  const [taskErr, setTaskErr] = useState(null);
  const handleEditTask = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (!task) {
      setTaskErr("Field required");
      return;
    }
    formData.append("org_task", todo.task);
    formData.append("task", task);
    formData.append("is_completed", isCompleted);
    dispatch(agentManageTodos(formData, "patch", todoGrpName));
    setTaskEdit(null);
    setOpenEditDeleteModal(false);
  };
  return (
    <Transition appear show={openEditDeleteModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => setOpenEditDeleteModal(true)}
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

          {/* This element is to trick the browser into centering the modal contents. */}
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
            <div className="inline-block mt-[5.5rem] w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900 mt-4"
              >
                Edit This Task
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-gray-600">{todo.task}</p>
                <div className="">
                  <form
                    onSubmit={handleEditTask}
                    className="flex flex-col w-full"
                  >
                    <div className="mb-3 relative">
                      {taskErr && (
                        <p className="text-xs mb-2 text-red-600 animate-pulse">
                          {taskErr}
                        </p>
                      )}
                      <input
                        type="text"
                        value={task}
                        maxLength={100}
                        onChange={(e) => setTask(e.target.value)}
                        className="rounded-none rounded-l-sm dark:bg-gray-700  dark:border-cloud-theme-blue
                         dark:placeholder-gray-400 dark:text-white  bg-gray-50 border border-1 outline-none
                         border-gray-300 text-gray-900 focus:border-cloud-theme-blue block flex-1 w-full text-sm p-2"
                        placeholder="Edit this task"
                      />
                    </div>
                    <div className="relative flex justify-between items-center pl-1 py-2 hover:bg-blue-50">
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="regular-user"
                          value={isCompleted}
                          checked={isCompleted === true}
                          onChange={() => setIsCompleted(!isCompleted)}
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
                        Completed
                      </label>
                    </div>
                    <div className="grid gap-3 grid-cols-2">
                      <button
                        className="w-full
                    py-2
                    rounded-md
                    shadow-md
                    px-3
                    mt-2
                    bg-cloud-theme-blue
                    text-white text-center text-base
                    flex justify-center items-center content-center"
                        type="button"
                        onClick={() => {
                          setOpenEditDeleteModal(false);
                          setTaskEdit(null);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="w-full
                    py-2
                    rounded-md
                    shadow-md
                    px-3
                    mt-2
                    bg-cloud-theme-gold
                    text-white text-center text-base
                    flex justify-center items-center content-center"
                        type="submit"
                      >
                        Change
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

const DeletePost = ({
  openDeleteModal,
  setOpenDeleteModal,
  slug,
  deleteListings,
  dispatch,
}) => {
  return (
    <Transition appear show={openDeleteModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => setOpenDeleteModal(true)}
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

          {/* This element is to trick the browser into centering the modal contents. */}
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
            <div className="inline-block mt-[5.5rem] w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900 mt-4"
              >
                Are You Sure?
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-gray-600">
                  You are about to change active status of this listing.
                  Inactive listings won't be seen by users.
                </p>
                <div className="grid gap-3 grid-cols-2">
                  <button
                    className="w-full
                  py-2
                  rounded-md
                  shadow-md
                  px-3
                  mt-2
                  bg-cloud-theme-blue
                  text-white text-center text-base
                  flex justify-center items-center content-center"
                    type="button"
                    onClick={() => setOpenDeleteModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="w-full
                  py-2
                  rounded-md
                  shadow-md
                  px-3
                  mt-2
                  bg-cloud-theme-gold
                  text-white text-center text-base
                  flex justify-center items-center content-center"
                    type="button"
                    onClick={() => {
                      dispatch(deleteListings(slug));
                      setOpenDeleteModal(false);
                    }}
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
function MyDoughnutChart({ likeData }) {
  if (!likeData) {
    return null;
  }

  return (
    <div className="shadow-md rounded-sm bg-gray-800 p-4">
      {likeData.is_likes === "True" ? (
        <Doughnut
          data={{
            labels: ["commercial", "land", "residential"],
            // labels: chartData.map(function(like){ return moment(like.date_liked).format("DD MMM");}),
            // labels: chartData.map(function(like){ return showChartTime(like.date_liked)}),
            datasets: [
              {
                label: "Property Likes",
                data: [
                  likeData.likes_serialized_com,
                  likeData.likes_serialized_land,
                  likeData.likes_serialized_res,
                ],
                backgroundColor: ["#7f003f", "#47e331", "#11eecc"],
                hoverOffset: 7,
                borderWidth: 0,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Likes Summary",
                color: "#f5fffa",
                align: "center",
                font: {
                  size: 15,
                },
              },
              legend: {
                display: true,
                position: "bottom",
                labels: {
                  color: "white",
                  font: {
                    size: 12,
                  },
                },
              },
            },
          }}
        />
      ) : (
        <Doughnut
          data={{
            labels: ["commercial", "land", "residential"],
            // labels: chartData.map(function(like){ return moment(like.date_liked).format("DD MMM");}),
            // labels: chartData.map(function(like){ return showChartTime(like.date_liked)}),
            datasets: [
              {
                label: "Property Views",
                data: [
                  likeData.views_commercial,
                  likeData.views_land,
                  likeData.views_residential,
                ],
                backgroundColor: ["#7f003f", "#47e331", "#11eecc"],
                hoverOffset: 7,
                borderWidth: 0,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Views Summary",
                color: "#f5fffa",
                align: "center",
                font: {
                  size: 15,
                },
              },
              legend: {
                display: true,
                position: "bottom",
                labels: {
                  color: "white",
                  font: {
                    size: 12,
                  },
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default DashBoard;
