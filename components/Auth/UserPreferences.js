import { useEffect, useRef, useState, Fragment } from "react";
import { isValidPhoneNumber, parsePhoneNumber } from "react-phone-number-input";
import PhoneInput from "react-phone-number-input";
import { SpinMadoido, SpinOne } from "../Spinners/Spinner";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import { truncateWords, NumberFormat } from "../../utils/Truncate";
import { Tab } from "@headlessui/react";
import { Dialog, Transition } from "@headlessui/react";
import {
  getUserPreferences,
  updateUser,
  agentAddTodo,
  agentGetTodos,
  agentAddTodoGroup,
  agentGetTodosGroup,
  agentManageTodos,
  updateUserPreferences,
  loadUsers,
} from "../../state/actionCreators/auth";

import {
  getLikedListings,
  likeListings,
} from "../../state/actionCreators/listings";
// import { TrackpageView } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { GrClose } from "react-icons/gr";
import {
  MdManageAccounts,
  MdMeetingRoom,
  MdOutlineFavorite,
  MdRoomPreferences,
  MdWarningAmber,
} from "react-icons/md";
import { BsClipboardCheck, BsListTask, BsTrash } from "react-icons/bs";
import { TiMessages } from "react-icons/ti";
import { AiOutlineEdit, AiOutlineMenu } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";

const UserPreferences = () => {
  const userData = useSelector((state) => state.auth.user);
  const [property_trend, setTrend] = useState(false);
  const [market_economy, setEconomy] = useState(false);
  const [investment_property, setInvestment] = useState(false);
  const [infrustructure, setInfrustructure] = useState(false);
  const [is_land, setLand] = useState(false);
  const [tax_legal, setTax] = useState(false);
  const [is_building, setBuilding] = useState(false);
  const [is_opinion, setOpinion] = useState(false);
  const [is_sponsored, setSponsored] = useState(false);
  const [listIndex, setListIndex] = useState(1);
  const [activeContentBox, setActiveContentBox] = useState(false);
  const [contentBoxHeight, setcontentBoxHeight] = useState("0px");
  const [is_landProp, setLandProperties] = useState(false);
  const [is_houses, setHouses] = useState(false);
  const [is_commercial, setCommercial] = useState(false);
  const [is_sale, setSale] = useState(false);
  const [is_let, setLet] = useState(false);
  const [flipingDeals, setFlipingDeals] = useState(false);
  const [offPlan, setOfPlan] = useState(false);
  const [jv, setJv] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [incomeProperties, setIncomeProperties] = useState(false);
  const [forDev, setForDev] = useState(false);
  const [incompleteBuildings, setIncompleteBuildings] = useState(false);
  const [instProperties, setInstProperties] = useState(false);
  const [distressed, setDistressed] = useState(false);
  const [quickSale, setQuickSale] = useState(false);
  const [others, setOthers] = useState("");
  const [openEditDeleteModal, setOpenEditDeleteModal] = useState(false);
  const [openAddTaskModal, setOpenAddTaskModal] = useState(false);
  const [taskGroup, setTaskGroup] = useState("");
  const [todoGrpName, setTodoGrpName] = useState(null);
  const [todoGrpId, setTodoGrpId] = useState(null);
  const [taskEdit, setTaskEdit] = useState(null);
  const [taskGroupErr, setTaskGroupErr] = useState(null);
  const [priceRange, setPriceRange] = useState("");
  const [openSignup, setOpenSignup] = useState(false);
  const [signupTypeHeight, setSignupTypeHeight] = useState("0px");
  const contentHeight = useRef(null);
  const [activePropertiesBox, setActivePropertiesBox] = useState(false);
  const [listingsBoxHeight, setListingsBoxHeight] = useState("0px");
  const listingsHeight = useRef(null);
  const promotionsHeight = useRef(null);
  const signupHeight = useRef();
  const [activePromotionsBox, setActivePromotionsBox] = useState(false);
  const [promotionsBoxHeight, setPromotionBoxHeight] = useState("0px");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.auth.todos); 
  const gettingTodos = useSelector((state) => state.auth.gettingTodos);
  const todosGroups = useSelector((state) => state.auth.todosGroups);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isSubmitingPreference = useSelector(
    (state) => state.auth.isSubmitingPreference
  );
  console.log('todis', todos) 
  const registering = useSelector((state) => state.auth.registering);
  const deleting = useSelector((state) => state.auth.deleting);
  const loadingLiked = useSelector((state) => state.listings.loadingLiked);
  const myPreferences = useSelector((state) => state.auth.userPreferences);
  const likedCommercialListings = useSelector(
    (state) => state.listings.likedCommercialListings
  );
  const likedLandListings = useSelector(
    (state) => state.listings.likedLandListings
  );
  const likedResidentialListings = useSelector(
    (state) => state.listings.likedResidentialListings
  );
  const user = userData?.id;
  useEffect(() => {
    // dispatch(getLikedListings());
    // dispatch(getUserPreferences());
    // dispatch(loadUsers());
    dispatch(agentGetTodosGroup());
    // TrackpageView("/auth/user/my-preferences");
  }, [dispatch]);
  const handleAddTaskGroup = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (!taskGroup) {
      setTaskGroupErr("This field is required");
      return;
    }
    formData.append("group_name", taskGroup);
    dispatch(agentAddTodoGroup(formData));
  };
  const toggleSignup = () => {
    setOpenSignup(openSignup === false ? true : false);
    setSignupTypeHeight(
      !openSignup ? `${signupHeight.current.scrollHeight}px` : "0px"
    );
  };
  const toggleContent = () => {
    setActiveContentBox(activeContentBox === false ? true : false);
    setcontentBoxHeight(
      !activeContentBox ? `${contentHeight.current.scrollHeight}px` : "0px"
    );
  };
  const toggleProperties = () => {
    setActivePropertiesBox(activePropertiesBox === false ? true : false);
    setListingsBoxHeight(
      !activePropertiesBox ? `${listingsHeight.current.scrollHeight}px` : "0px"
    );
  };
  const togglePromotions = () => {
    setActivePromotionsBox(activePromotionsBox === false ? true : false);
    setPromotionBoxHeight(
      !activePromotionsBox
        ? `${promotionsHeight.current.scrollHeight}px`
        : "0px"
    );
  };
  const handleClick = () => {
    dispatch(
      updateUserPreferences(
        property_trend,
        market_economy,
        investment_property,
        infrustructure,
        is_land,
        tax_legal,
        is_building,
        is_opinion,
        is_sponsored,
        is_landProp,
        is_houses,
        user,
        is_commercial,
        is_sale,
        is_let,
        others,
        priceRange,
        offPlan,
        flipingDeals,
        jv,
        forDev,
        incompleteBuildings,
        instProperties,
        distressed,
        quickSale
      )
    );
  };
  if (!isAuthenticated) {
    return (
      <div className="mt-[6rem] h-screen w-full">
        <div className="sm:w-[37.5rem] mt-20 xs-l:w-[30rem] w-full px-5 xs-l:px-0 mx-auto mb-5">
          <p className="animate-pulse text-cloud-theme-blue">
            Please wait... Authenticating. This page is for those who are
            registered as content creators. If it's taking too long to
            authenticate, login again
          </p>
        </div>
      </div>
    );
  }
  return (
    <section className="sm:mt-[4.85rem] text-white mt-[3.9rem] pb-4 bg-cloud-dash-body px-4 sm:px-16 md-xls:px-24 pt-10">
      <div className="flex">
        <div
          className={
            openMenu
              ? `h-[100vh] fixed left-0 transition-all duration-300 backdrop-filter top-[4.8rem] backdrop-blur-lg z-20 md:sticky md:top-[4.96rem] pt-3 px-3 w-full md:w-[20rem]`
              : `h-[100vh] fixed -left-full md:sticky duration-300 transition-all top-[4.8rem] md:top-[4.96rem] pt-3 px-3 md:w-[20rem] w-full`
          }
        >
          <div className="flex justify-between items-center content-center md:w-full w-[20rem]">
            <div className="flex justify-start items-center">
              <div className="w-12 h-12 mr-3 rounded-full overflow-hidden">
                <img
                  src=""
                  onClick={() => setOpenMenu(!openMenu)}
                  className="w-full h-full"
                  alt="agent logo"
                />
              </div>
              <div className="">
                <h5>{userData?.agency_name}</h5>
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
                className={
                  listIndex === 1
                    ? `p-2 border-r-2 flex justify-start hover:scale-105 border-b-cloud-theme-blue border-b-2 transition-all duration-300 items-center border-cloud-theme-blue bg-gray-800 mb-2 rounded-md shadow-md`
                    : `p-2 flex justify-start items-center hover:scale-105 duration-300 transition-all border-cloud-theme-blue
                   bg-gray-800 mb-2 rounded-md shadow-md`
                }
              >
                <MdRoomPreferences className="text-2xl mr-2" />
                <button
                  onClick={() => {
                    setListIndex(1);
                    setOpenMenu(!openMenu);
                  }}
                  type="button"
                  className="w-full text-left"
                >
                  My Preferences
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
                <MdManageAccounts className="text-2xl mr-2" />
                <button
                  onClick={() => {
                    setListIndex(2);
                    setOpenMenu(!openMenu);
                  }}
                  type="button"
                  className="w-full text-left"
                >
                  Update Account
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
                <MdOutlineFavorite className="text-2xl mr-2" />
                <button
                  onClick={() => {
                    setListIndex(3);
                    setOpenMenu(!openMenu);
                  }}
                  type="button"
                  className="w-full text-left"
                >
                  Favorites
                </button>
              </li>
              {userData?.is_agent ? (
                <li
                  className={
                    listIndex === 4
                      ? `p-2 border-r-2 flex justify-start hover:scale-105 border-b-cloud-theme-blue border-b-2 transition-all duration-300 items-center border-cloud-theme-blue bg-gray-800 mb-2 rounded-md shadow-md`
                      : `p-2 flex justify-start items-center hover:scale-105 duration-300 transition-all border-cloud-theme-blue
                 bg-gray-800 mb-2 rounded-md shadow-md`
                  }
                >
                  <BsListTask className="text-2xl mr-2" />
                  <button
                    onClick={() => {
                      setListIndex(4);
                      setOpenMenu(!openMenu);
                    }}
                    type="button"
                    className="w-full text-left"
                  >
                    My Tasks
                  </button>
                </li>
              ) : (
                <li
                  className={
                    listIndex === 4
                      ? `p-2 border-r-2 flex justify-start hover:scale-105 border-b-cloud-theme-blue border-b-2 transition-all duration-300 items-center border-cloud-theme-blue bg-gray-800 mb-2 rounded-md shadow-md`
                      : `p-2 flex justify-start items-center hover:scale-105 duration-300 transition-all border-cloud-theme-blue
                   bg-gray-800 mb-2 rounded-md shadow-md`
                  }
                >
                  <BsListTask className="text-2xl mr-2" />
                  <button
                    onClick={() => {
                      setListIndex(4);
                      setOpenMenu(!openMenu);
                    }}
                    type="button"
                    className="w-full text-left"
                  >
                    My Tasks
                  </button>
                </li>
              )}

              <li
                className={
                  listIndex === 5
                    ? `p-2 border-r-2 flex justify-start hover:scale-105 border-b-cloud-theme-blue border-b-2 transition-all duration-300 items-center border-cloud-theme-blue bg-gray-800 mb-2 rounded-md shadow-md`
                    : `p-2 flex justify-start items-center hover:scale-105 duration-300 transition-all border-cloud-theme-blue
                   bg-gray-800 mb-2 rounded-md shadow-md`
                }
              >
                <MdWarningAmber className="text-2xl mr-2" />
                <button
                  onClick={() => {
                    setListIndex(5);
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
                  listIndex === 6
                    ? `p-2 border-r-2 flex justify-start hover:scale-105 border-b-cloud-theme-blue border-b-2 transition-all duration-300 items-center border-cloud-theme-blue bg-gray-800 mb-2 rounded-md shadow-md`
                    : `p-2 flex justify-start items-center hover:scale-105 duration-300 transition-all border-cloud-theme-blue
                   bg-gray-800 mb-2 rounded-md shadow-md`
                }
              >
                <MdMeetingRoom className="text-2xl mr-2" />
                <button
                  onClick={() => {
                    setListIndex(6);
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
                  listIndex === 7
                    ? `p-2 border-r-2 flex justify-start hover:scale-105 border-b-cloud-theme-blue border-b-2 transition-all duration-300 items-center border-cloud-theme-blue bg-gray-800 mb-2 rounded-md shadow-md`
                    : `p-2 flex justify-start items-center hover:scale-105 duration-300 transition-all border-cloud-theme-blue
                   bg-gray-800 mb-2 rounded-md shadow-md`
                }
              >
                <TiMessages className="text-2xl mr-2" />
                <button
                  onClick={() => {
                    setListIndex(7);
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
        <div className="w-full">
          <div className="flex justify-start mb-3 items-center content-center">
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
            <div>
              <h5 className="text-xl">My Profile</h5>
            </div>
          </div>
          {listIndex === 1 && ( 
            <div className="">
              {myPreferences ? (
                <UpdatePreferences
                  myPreferences={myPreferences}
                  dispatch={dispatch}
                  user_id={user?.id}
                  isSubmitingPreference={isSubmitingPreference}
                />
              ) : (
                <div className="shadow-md p-4 bg-gray-800">
                  <div className=" mb-3">
                    <h1 className="font-bold text-lg text-cloud-theme-gold">
                      User Preferences
                    </h1>
                    <h3 className="font-bold italic">
                      Help us serve you better. Fill in the form below for a
                      better experience on our platform
                    </h3>
                  </div>
                  <div className=" mb-3">
                    <div>
                      <h3 className="font-semibold">
                        What content would you like
                      </h3>
                    </div>
                    <div className="overflow-hidden mb-3">
                      <div>
                        <button
                          onClick={toggleContent}
                          className="flex w-full justify-between border-b border-b-blue-500 items-center mb-0 px-0 py-2"
                        >
                          <p>Select prefered content</p>
                          {activeContentBox ? <FaAngleUp /> : <FaAngleDown />}
                        </button>
                      </div>
                      <div
                        ref={contentHeight}
                        style={{ maxHeight: `${contentBoxHeight}` }}
                        className="flex flex-col transition-max-height ease-in duration-300"
                      >
                        <div className="relative flex justify-between items-center pl-1 py-2 hover:bg-cloud-theme-blue transition-all duration-300">
                          <div className="relative">
                            <input
                              type="checkbox"
                              id="prop-trend"
                              value="Property Trends"
                              checked={property_trend === true}
                              onChange={(e) => setTrend(!property_trend)}
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
                            htmlFor="prop-trend"
                            className="w-full md:text-sm text-xs h-full"
                          >
                            Property Trends
                          </label>
                        </div>
                        <div className="relative flex justify-between items-center pl-1 py-2 hover:bg-cloud-theme-blue transition-all duration-300">
                          <div className="relative">
                            <input
                              type="checkbox"
                              id="market"
                              value="Market & Economy"
                              checked={market_economy === true}
                              onChange={() => setEconomy(!market_economy)}
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
                            htmlFor="market"
                            className="w-full md:text-sm text-xs h-full"
                          >
                            Market & Economy
                          </label>
                        </div>
                        <div className="relative flex justify-between items-center pl-1 py-2 hover:bg-cloud-theme-blue transition-all duration-300">
                          <div className="relative">
                            <input
                              type="checkbox"
                              id="Investment"
                              value="Investment & Deals"
                              checked={investment_property === true}
                              onChange={() =>
                                setInvestment(!investment_property)
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
                            htmlFor="Investment"
                            className="w-full md:text-sm text-xs h-full"
                          >
                            Investment & Deals
                          </label>
                        </div>
                        <div className="relative flex justify-between items-center pl-1 py-2 hover:bg-cloud-theme-blue transition-all duration-300">
                          <div className="relative">
                            <input
                              type="checkbox"
                              id="infrustructure"
                              value="Infrustructure&Projects"
                              checked={infrustructure === true}
                              onChange={() =>
                                setInfrustructure(!infrustructure)
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
                            htmlFor="infrustructure"
                            className="w-full md:text-sm text-xs h-full"
                          >
                            Infrustructure&Projects
                          </label>
                        </div>
                        <div className="relative flex justify-between items-center pl-1 py-2 hover:bg-cloud-theme-blue transition-all duration-300">
                          <div className="relative">
                            <input
                              type="checkbox"
                              id="land"
                              value="Land Matters"
                              checked={is_land === true}
                              onChange={() => setLand(!is_land)}
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
                            htmlFor="land"
                            className="w-full md:text-sm text-xs h-full"
                          >
                            Land Matters
                          </label>
                        </div>
                        <div className="relative flex justify-between items-center pl-1 py-2 hover:bg-cloud-theme-blue transition-all duration-300">
                          <div className="relative">
                            <input
                              type="checkbox"
                              id="tax"
                              value="Tax and Legal"
                              checked={tax_legal === true}
                              onChange={() => setTax(!tax_legal)}
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
                            htmlFor="tax"
                            className="w-full md:text-sm text-xs h-full"
                          >
                            Tax and Legal
                          </label>
                        </div>
                        <div className="relative flex justify-between items-center pl-1 py-2 hover:bg-cloud-theme-blue transition-all duration-300">
                          <div className="relative">
                            <input
                              type="checkbox"
                              id="building"
                              value="Buildings & Architecture"
                              checked={is_building === true}
                              onChange={() => setBuilding(!is_building)}
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
                            htmlFor="building"
                            className="w-full md:text-sm text-xs h-full"
                          >
                            Buildings & Architecture
                          </label>
                        </div>
                        <div className="relative flex justify-between items-center pl-1 py-2 hover:bg-cloud-theme-blue transition-all duration-300">
                          <div className="relative">
                            <input
                              type="checkbox"
                              id="opinion"
                              value="Opinion"
                              checked={is_opinion === true}
                              onChange={() => setOpinion(!is_opinion)}
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
                            htmlFor="opinion"
                            className="w-full md:text-sm text-xs h-full"
                          >
                            Opinion
                          </label>
                        </div>
                        <div className="relative flex justify-between items-center pl-1 py-2 hover:bg-cloud-theme-blue transition-all duration-300">
                          <div className="relative">
                            <input
                              type="checkbox"
                              id="sponsored"
                              value="Sponsored Content"
                              checked={is_sponsored === true}
                              onChange={() => setSponsored(!is_sponsored)}
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
                            htmlFor="sponsored"
                            className="w-full md:text-sm text-xs h-full"
                          >
                            Sponsored Content
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" mb-3">
                    <div>
                      <h3 className="font-semibold">
                        What properties would you like to see more
                      </h3>
                    </div>
                    <div className="overflow-hidden">
                      <div>
                        <button
                          onClick={toggleProperties}
                          className="flex w-full justify-between border-b border-b-blue-500 items-center mb-0 px-0 py-2"
                        >
                          <p>Select prefered listings</p>
                          {activePropertiesBox ? (
                            <FaAngleUp />
                          ) : (
                            <FaAngleDown />
                          )}
                        </button>
                      </div>
                      <div
                        ref={listingsHeight}
                        style={{ maxHeight: `${listingsBoxHeight}` }}
                        className="flex flex-col transition-max-height ease-in duration-300"
                      >
                        <div className="relative flex justify-between items-center pl-1 py-2 hover:bg-cloud-theme-blue transition-all duration-300">
                          <div className="relative">
                            <input
                              type="checkbox"
                              id="land-pref"
                              value="Land"
                              checked={is_landProp === true}
                              onChange={() => setLandProperties(!is_landProp)}
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
                            htmlFor="land-pref"
                            className="w-full md:text-sm text-xs h-full"
                          >
                            Land
                          </label>
                        </div>
                        <div className="relative flex justify-between items-center pl-1 py-2 hover:bg-cloud-theme-blue transition-all duration-300">
                          <div className="relative">
                            <input
                              type="checkbox"
                              id="houses"
                              value="Houses"
                              checked={is_houses === true}
                              onChange={() => setHouses(!is_houses)}
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
                            htmlFor="houses"
                            className="w-full md:text-sm text-xs h-full"
                          >
                            Houses and Apartments
                          </label>
                        </div>
                        <div className="relative flex justify-between items-center pl-1 py-2 hover:bg-cloud-theme-blue transition-all duration-300">
                          <div className="relative">
                            <input
                              type="checkbox"
                              id="commercial"
                              value="Commercial"
                              checked={is_commercial === true}
                              onChange={() => setCommercial(!is_commercial)}
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
                            htmlFor="commercial"
                            className="w-full md:text-sm text-xs h-full"
                          >
                            Commercial Properties
                          </label>
                        </div>
                        <div className="relative flex justify-between items-center pl-1 py-2 hover:bg-cloud-theme-blue transition-all duration-300">
                          <div className="relative">
                            <input
                              type="checkbox"
                              id="sale"
                              value="For Sale"
                              checked={is_sale === true}
                              onChange={() => setSale(!is_sale)}
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
                            htmlFor="sale"
                            className="w-full md:text-sm text-xs h-full"
                          >
                            Sale
                          </label>
                        </div>
                        <div className="relative flex justify-between items-center pl-1 py-2 hover:bg-cloud-theme-blue transition-all duration-300">
                          <div className="relative">
                            <input
                              type="checkbox"
                              id="let"
                              value="To Let"
                              checked={is_let === true}
                              onChange={() => setLet(!is_let)}
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
                            htmlFor="let"
                            className="w-full md:text-sm text-xs h-full"
                          >
                            To Let
                          </label>
                        </div>

                        <div className="pl-1 py-2 hover:bg-blue-50">
                          <label
                            htmlFor="prange"
                            className="w-full md:text-sm text-xs h-full"
                          >
                            Price Range
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={priceRange}
                              onChange={(e) => setPriceRange(e.target.value)}
                              className="rounded-md dark:bg-gray-700  dark:border-cloud-theme-blue dark:placeholder-gray-400 dark:text-white  bg-gray-50 border border-1 outline-none border-gray-300 text-gray-900 focus:border-cloud-theme-blue block flex-1 w-full text-sm px-2 py-2"
                              placeholder="price range"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <h3 className="font-semibold">
                        What promotions would you like
                      </h3>
                    </div>
                    <div className="overflow-hidden">
                      <div>
                        <button
                          onClick={togglePromotions}
                          className="flex w-full justify-between border-b border-b-blue-500 items-center mb-0 px-0 py-2"
                        >
                          <p>Select prefered promotions</p>
                          {activePromotionsBox ? (
                            <FaAngleUp />
                          ) : (
                            <FaAngleDown />
                          )}
                        </button>
                      </div>
                      <div
                        ref={promotionsHeight}
                        style={{ maxHeight: `${promotionsBoxHeight}` }}
                        className="flex flex-col transition-max-height ease-in duration-300"
                      >
                        <div className="pt-2"></div>
                        <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-cloud-theme-blue">
                          <label
                            htmlFor="Flipping-deals"
                            className="w-full h-full"
                          >
                            Flipping-Deals
                          </label>
                          <div className="relative">
                            <input
                              type="checkbox"
                              id="Flipping-deals"
                              value="Flipping-deals"
                              checked={flipingDeals === true}
                              onChange={(e) => setFlipingDeals(!flipingDeals)}
                              className="opacity-0 absolute h-4 w-4"
                            />
                            <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
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
                        </div>
                        <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-cloud-theme-blue">
                          <label htmlFor="Off-Plan" className="w-full h-full">
                            Off-Plan
                          </label>
                          <div className="relative">
                            <input
                              type="checkbox"
                              id="Off-Plan"
                              value="Off-Plan"
                              checked={offPlan === true}
                              onChange={() => setOfPlan(!offPlan)}
                              className="opacity-0 absolute h-4 w-4"
                            />
                            <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
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
                        </div>
                        <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-cloud-theme-blue">
                          <label
                            htmlFor="Joint-Venture"
                            className="w-full h-full"
                          >
                            Joint Venture
                          </label>
                          <div className="relative">
                            <input
                              type="checkbox"
                              id="Joint-Venture"
                              value="Joint-Venture"
                              checked={jv === true}
                              onChange={() => setJv(!jv)}
                              className="opacity-0 absolute h-4 w-4"
                            />
                            <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
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
                        </div>
                        <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-cloud-theme-blue">
                          <label
                            htmlFor="Income-Properties"
                            className="w-full h-full"
                          >
                            Income Properties
                          </label>
                          <div className="relative">
                            <input
                              type="checkbox"
                              id="Income-Properties"
                              value="Income-Properties"
                              checked={incomeProperties === true}
                              onChange={() =>
                                setIncomeProperties(!incomeProperties)
                              }
                              className="opacity-0 absolute h-4 w-4"
                            />
                            <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
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
                        </div>
                        <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-cloud-theme-blue">
                          <label
                            htmlFor="For-Redevelopment"
                            className="w-full h-full"
                          >
                            For Redevelopment
                          </label>
                          <div className="relative">
                            <input
                              type="checkbox"
                              id="For-Redevelopment"
                              value="For-Redevelopment"
                              checked={forDev === true}
                              onChange={() => setForDev(!forDev)}
                              className="opacity-0 absolute h-4 w-4"
                            />
                            <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
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
                        </div>
                        <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-cloud-theme-blue">
                          <label
                            htmlFor="Incomplete-Buildings"
                            className="w-full h-full"
                          >
                            Incomplete Buildings
                          </label>
                          <div className="relative">
                            <input
                              type="checkbox"
                              id="Incomplete-Buildings"
                              value="Incomplete-Buildings"
                              checked={incompleteBuildings === true}
                              onChange={(e) =>
                                setIncompleteBuildings(!incompleteBuildings)
                              }
                              className="opacity-0 absolute h-4 w-4"
                            />
                            <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
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
                        </div>
                        <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-cloud-theme-blue">
                          <label
                            htmlFor="Institutional-Properties"
                            className="w-full h-full"
                          >
                            Institutional Properties
                          </label>
                          <div className="relative">
                            <input
                              type="checkbox"
                              id="Institutional-Properties"
                              value="Institutional-Properties"
                              checked={instProperties === true}
                              onChange={() =>
                                setInstProperties(!instProperties)
                              }
                              className="opacity-0 absolute h-4 w-4"
                            />
                            <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
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
                        </div>
                        <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-cloud-theme-blue">
                          <label
                            htmlFor="Destressed-Sale"
                            className="w-full h-full"
                          >
                            Distressed Sale
                          </label>
                          <div className="relative">
                            <input
                              type="checkbox"
                              id="Destressed-Sale"
                              value="Destressed-Sale"
                              checked={distressed === true}
                              onChange={() => setDistressed(!distressed)}
                              className="opacity-0 absolute h-4 w-4"
                            />
                            <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
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
                        </div>
                        <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-cloud-theme-blue">
                          <label htmlFor="Quick-Sale" className="w-full h-full">
                            Quick Sale
                          </label>
                          <div className="relative">
                            <input
                              type="checkbox"
                              id="Quick-Sale"
                              value="Quick-Sale"
                              checked={quickSale === true}
                              onChange={() => setQuickSale(!quickSale)}
                              className="opacity-0 absolute h-4 w-4"
                            />
                            <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
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
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative z-0 mt-4 mb-3 w-full group">
                    <div className="mb-1.5">
                      <h3 className="font-semibold">Others</h3>
                    </div>
                    <textarea
                      id="overview"
                      value={others}
                      onChange={(e) => setOthers(e.target.value)}
                      maxLength={240}
                      rows="4"
                      className="block p-2.5 w-full text-sm outline-none text-gray-900 bg-gray-50 rounded-sm border border-gray-300 
          focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                      placeholder="Any other prefrences not captured"
                    />
                  </div>
                  <div className="mt-4 flex items-center content-center justify-center">
                    {isSubmitingPreference ? (
                      <SpinOne />
                    ) : (
                      <button
                        className="px-14 py-2 rounded-md shadow-sm bg-cloud-theme-blue text-white"
                        onClick={handleClick}
                        type="button"
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          {listIndex === 2 && (
            <div className="">
              {userData ? (
                <UpdateUserForm
                  user={userData}
                  registering={registering}
                  dispatch={dispatch}
                  deleting={deleting}
                  toggleSignup={toggleSignup}
                  signupHeight={signupHeight}
                  signupTypeHeight={signupTypeHeight}
                />
              ) : (
                ""
              )}
            </div>
          )}
          {listIndex === 3 && (
            <div className="p-0">
              <div className="mb-3">
                <h4 className="font-semibold text-lg text-cloud-theme-gold hover:text-white">
                  My Favorite Properties
                </h4>
              </div>
              <div>
                <Tab.Group>
                  <Tab.List className={`mb-5`}>
                    <Tab>
                      {({ selected }) => (
                        <div
                          className={
                            selected
                              ? `text-white bg-black transition-all duration-300 font-semibold rounded-sm shadow-md px-2 text-xm py-2 mr-2`
                              : `text-white bg-cloud-theme-blue transition-all duration-300 hover:bg-white hover:text-cloud-theme-blue font-semibold rounded-sm shadow-md px-2 text-xm py-2 mr-2`
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
                    <Tab.Panel
                      className={`h-[60vh] overflow-y-scroll myScrollBarDash`}
                    >
                      {loadingLiked ? (
                        <SpinOne />
                      ) : likedResidentialListings.length <= 0 ? (
                        <div>
                          <p>No Properties Found</p>
                        </div>
                      ) : (
                        likedResidentialListings.flatMap((listing, index) => (
                          <div
                            key={index}
                            className="flex gap-2 w-full rounded-md mb-3 shadow-md bg-gray-900"
                          >
                            <div className="h-20 w-2/6">
                              <img
                                className="h-full w-full"
                                src={listing.Images?.[0]?.images}
                                alt={listing.title.substring(0, 40)}
                              />
                            </div>
                            <div className="py-2 relative w-4/6">
                              <h6 className="font-semibold text-sm capitalize">
                                {truncateWords(listing.title, 65)}
                              </h6>
                              <p className="text-xs">
                                {truncateWords(
                                  listing.location_description,
                                  50
                                )}
                              </p>
                              <div className="absolute bottom-2 right-4">
                                <Link
                                  href={`/listings/more-info/${listing.slug}`}
                                >
                                  <a className="text-xs shadow-md hover:text-cloud-theme-gold bg-cloud-theme-blue text-white rounded-sm px-2.5 py-1">
                                    View
                                  </a>
                                </Link>
                                <button
                                  type="button"
                                  className=" ml-2 text-xs shadow-md hover:text-cloud-theme-gold bg-cloud-theme-blue text-white rounded-sm px-2.5 py-1"
                                  onClick={() =>
                                    dispatch(likeListings(listing.slug))
                                  }
                                >
                                  Unlike
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </Tab.Panel>
                    <Tab.Panel
                      className={`h-[38vh] overflow-y-scroll myScrollBarDash`}
                    >
                      {loadingLiked ? (
                        <SpinOne />
                      ) : likedCommercialListings.length <= 0 ? (
                        <div>
                          <p>No Properties Found</p>
                        </div>
                      ) : (
                        likedCommercialListings.flatMap((listing, index) => (
                          <div
                            key={index}
                            className="flex gap-2 w-full rounded-md mb-3 shadow-md bg-gray-900"
                          >
                            <div className="h-20 w-2/6">
                              <img
                                className="h-full w-full"
                                src={listing.Images?.[0]}
                                alt={listing.title.substring(0, 40)}
                              />
                            </div>
                            <div className="py-2 relative w-4/6">
                              <h6 className="font-semibold text-sm capitalize">
                                {truncateWords(listing.title, 65)}
                              </h6>
                              <p className="text-xs">
                                {truncateWords(
                                  listing.location_description,
                                  50
                                )}
                              </p>
                              <div className="absolute bottom-2 right-4">
                                <Link
                                  href={`/listings/more-info/${listing.slug}`}
                                >
                                  <a className="text-xs shadow-md hover:text-cloud-theme-gold bg-cloud-theme-blue text-white rounded-sm px-2.5 py-1">
                                    View
                                  </a>
                                </Link>
                                <button
                                  type="button"
                                  className=" ml-2 text-xs shadow-md hover:text-cloud-theme-gold bg-cloud-theme-blue text-white rounded-sm px-2.5 py-1"
                                  onClick={() =>
                                    dispatch(likeListings(listing.slug))
                                  }
                                >
                                  Unlike
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </Tab.Panel>
                    <Tab.Panel
                      className={`h-[38vh] overflow-y-scroll myScrollBarDash`}
                    >
                      {loadingLiked ? (
                        <SpinOne />
                      ) : likedLandListings.length <= 0 ? (
                        <div>
                          <p>No Properties Found</p>
                        </div>
                      ) : (
                        likedLandListings &&
                        likedLandListings.flatMap((listing, index) => (
                          <div
                            key={index}
                            className="flex gap-2 w-full rounded-md mb-3 shadow-md bg-gray-900"
                          >
                            <div className="h-20 w-2/6">
                              <img
                                className="h-full w-full"
                                src={listing.Images?.[0]}
                                alt={listing.title.substring(0, 40)}
                              />
                            </div>
                            <div className="py-2 relative w-4/6">
                              <h6 className="font-semibold text-sm capitalize">
                                {truncateWords(listing.title, 65)}
                              </h6>
                              <p className="text-xs">
                                {truncateWords(
                                  listing.location_description,
                                  50
                                )}
                              </p>
                              <div className="absolute bottom-2 right-4">
                                <Link
                                  href={`/listings/more-info/${listing.slug}`}
                                >
                                  <a className="text-xs shadow-md hover:text-cloud-theme-gold bg-cloud-theme-blue text-white rounded-sm px-2.5 py-1">
                                    View
                                  </a>
                                </Link>
                                <button
                                  type="button"
                                  className=" ml-2 text-xs shadow-md hover:text-cloud-theme-gold bg-cloud-theme-blue text-white rounded-sm px-2.5 py-1"
                                  onClick={() =>
                                    dispatch(likeListings(listing.slug))
                                  }
                                >
                                  Unlike
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </div>
          )}
          {listIndex === 4 && (
            <div className="sm:w-[30rem] w-full">
              <div>
                <h3 className="mb-2 text-lg font-semibold text-cloud-theme-gold">
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
                            <div
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
                            </div>
                          )}
                        </Tab>
                      ))}
                  </Tab.List>
                  <Tab.Panels>
                    <div className="mt-3 flex">
                      <h5 className="text-cloud-theme-gold">My Tasks</h5> 
                      <div>
                      <div
                          className="text-sm bg-cloud-theme-gold flex shadow-md ml-2.5 px-2 py-1 rounded-sm"
                          type="button"
                          onClick={() => {
                            setOpenAddTaskModal(true);
                            setOpenMenu(false);
                          }}
                        >
                          Add Task <IoMdAdd className="text-xl ml-2" />
                        </div>
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
          )}
          {listIndex === 5 && (
            <div className="p-4">
              <div>
                <h4 className="font-semibold text-cloud-theme-gold">
                  Complaints
                </h4>
              </div>
            </div>
          )}
          {listIndex === 6 && (
            <div className="p-4">
              <div>
                <h4 className="font-semibold text-cloud-theme-gold">
                  Sheduled Viewing
                </h4>
              </div>
            </div>
          )}
          {listIndex === 7 && (
            <div className="p-4">
              <div>
                <h4 className="font-semibold text-cloud-theme-gold">Chats</h4>
              </div>
            </div>
          )}
          {listIndex === 8 && (
            <div className="p-4">
              <div>
                <h4 className="font-semibold text-cloud-theme-gold">Reports</h4>
              </div>
            </div>
          )}
        </div>
      </div>
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
        dispatch={dispatch}
        openAddTaskModal={openAddTaskModal}
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

const UpdateUserForm = ({
  signupHeight,
  signupTypeHeight,
  toggleSignup,
  registering,
  user,
  dispatch,
}) => {
  const [user_name, setUserName] = useState(user.user_name);
  const [agency_name, setAgencyName] = useState(user.agency_name);
  const [location, setLocation] = useState(user.location);
  const [locality, setLocality] = useState(user.locality);
  const [content_creator_name, setCreatorName] = useState(
    user.content_creator_name
  );
  const [about_me, setAboutMe] = useState(user.about_me ? user.about_me : "");
  const [is_content_creator, setContentCreator] = useState(
    user.is_content_creator
  );
  let phone1 = user?.mobile_phone;
  let new_phone = "+" + phone1;
  const [is_regular, setRegular] = useState(user.is_regular);
  const [is_investor, setInvestor] = useState(user.is_investor);
  const [openSignup, setOpenSignup] = useState(false);
  const [is_agent, setAgent] = useState(user.is_agent);
  const [phone, setPhone] = useState(new_phone);
  const [phoneErr, setPhoneErr] = useState("");
  const [agencyErr, setAgencyErr] = useState("");
  const [creatorErr, setCreatorNameErr] = useState("");
  const [locationErr, setLocationErr] = useState("");
  const [localityErr, setLocalityErr] = useState("");
  const [user_nameErr, setUsernameErr] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    if (!user_name) {
      setUsernameErr("This field is required");
      return;
    }
    if (is_content_creator && !content_creator_name) {
      setCreatorNameErr("Field required for content creators");
      return;
    }
    if (is_agent && setLocation === "") {
      setLocationErr("Field required for agents");
      return;
    }
    if (is_agent && !locality) {
      setLocalityErr("Field required for agents");
      return;
    }
    if (is_agent && !agency_name) {
      setAgencyErr("Field required for agents");
      return;
    }
    if (phone) {
      let phoneProcessed = phone.substring(1);
      if (isValidPhoneNumber(phoneProcessed)) {
        const phoneParse = parsePhoneNumber(phoneProcessed);
        var mobile_phone = phoneProcessed;
        const country = phoneParse.country;
        setPhoneErr("");
        setLocalityErr("");
        setUsernameErr("");
        setCreatorNameErr("");
        setLocationErr("");
        dispatch(
          updateUser(
            location,
            locality,
            user_name,
            about_me,
            content_creator_name,
            agency_name,
            country,
            is_agent,
            is_investor,
            is_regular,
            is_content_creator,
            mobile_phone
          )
        );
      } else {
        setPhoneErr("Phone number is invalid");
        return;
      }
    } else {
      const country = "";
      setPhoneErr("");
      setLocalityErr("");
      setUsernameErr("");
      setCreatorNameErr("");
      setLocationErr("");
      dispatch(
        updateUser(
          location,
          locality,
          user_name,
          about_me,
          content_creator_name,
          agency_name,
          country,
          is_agent,
          is_investor,
          is_regular,
          is_content_creator,
          mobile_phone
        )
      );
    }
  };
  return (
    <div className="shadow-md bg-gray-900 p-4">
      <p className="font-bold text-lg text-cloud-theme-gold">
        Update Your Account
      </p>
      <form className="" onSubmit={onSubmit}>
        <div className="my-3">
          <div className="flex justify-between mb-1.5">
            <p className="font-semibold text-sm text-white">User Name</p>
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
              maxLength="15"
              className="
                      w-full
                      text-white
                      md:px-3
                      px-2
                      py-2
                      ring-1
                      outline-none
                      border-none
                      bg-gray-400
                      ring-red-300
                        "
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-hidden mb-4 shadow-md">
          <div
            className="flex justify-between mb-0 shadow-md ring-red-300
                py-1
                ring-1"
          >
            <button
              onClick={toggleSignup}
              type="button"
              className="flex w-full justify-between items-center mb-0 px-1 py-2"
            >
              <p className="text-white font-semibold">Upgrade Account:</p>
              {openSignup ? <FaAngleUp /> : <FaAngleDown />}
            </button>
          </div>
          <div
            ref={signupHeight}
            style={{ maxHeight: `${signupTypeHeight}` }}
            className="flex flex-col transition-max-height ease-in duration-300"
          >
            <p className="italic text-sm my-2">
              You can select multiple check boxes:
            </p>
            <div className="relative flex justify-between items-center pl-1 py-2 hover:bg-cloud-theme-blue transition-all duration-300">
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
                Regular
              </label>
            </div>
            <div className="relative flex justify-between items-center pl-1 py-2 hover:bg-cloud-theme-blue transition-all duration-300">
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
            <div className="relative flex justify-between items-center pl-1 py-2 hover:bg-cloud-theme-blue transition-all duration-300">
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
            <div className="relative flex justify-between items-center pl-1 py-2 hover:bg-cloud-theme-blue transition-all duration-300">
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
        <div className="mb-5">
          <div className="mb-1.5">
            <p className="text-white font-semibold text-sm">Phone Number</p>
            {new_phone && (
              <p className="text-white font-semibold text-xs italic">
                {new_phone}
              </p>
            )}

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
              text-white
              bg-gray-400
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
        {is_content_creator ? (
          <div className="mb-5">
            <div className="mb-1.5">
              <p className="font-semibold text-sm text-white">
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
                text-white
                md:px-3
                px-2
                bg-gray-400
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
            <div className="relative z-0 mb-6 w-full">
              <p className="">About Me</p>
              <textarea
                type="text"
                value={about_me}
                onChange={(e) => setAboutMe(e.target.value)}
                maxLength={200}
                rows="4"
                className="block p-2.5 w-full text-sm outline-none ring-1 text-white bg-gray-400 rounded-sm 
                ring-red-300"
                placeholder="A brief description of your agency or you"
              />
            </div>
            <div className="mb-5">
              <div className="flex justify-between mb-1.5">
                <p className="font-semibold text-sm text-white">
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
                          text-ehite
                          bg-gray-400
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
                <p className="font-semibold text-sm text-white">Agent County</p>
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
                text-white
                bg-gray-400
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
                <p className="font-semibold text-sm text-white">
                  Agent Locality
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
                text-white
                bg-gray-400
                md:px-3
                px-2
                py-2
                ring-1
                outline-none
                border-none
                ring-red-300
              "
                  placeholder="your location:eg Kilimani"
                  onChange={(e) => setLocality(e.target.value)}
                />
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        {registering ? (
          <SpinOne />
        ) : (
          <button className="w-full mt-2 py-2 rounded-md shadow-sm bg-cloud-theme-blue text-white">
            Update
          </button>
        )}
      </form>

      {/* <div className="mt-4">
        <p className="text-red-700 font-semibold">Delete My Account</p>
        <div className="mt-1">
          <p className="mb-1">Enter your password</p>
          <div className="relative">
            <input
              type={see ? "text" : "password"}
              value={current_password}
              onChange={(e) => setCurrentPassword(e.target.value.trim())}
              placeholder="enter your current password"
              className="
                    w-full
                    text-gray-900
                    md:pl-3
                    p-1.5
                    ring-1
                    pr-12
                    outline-none
                    border-none
                    rounded-sm
                    shadow-sm
                    ring-red-300
                  "
            />
            <div
              onClick={() => setNoSee(!see)}
              className="
                  absolute h-full w-10 flex justify-center items-center content-center top-0 right-0 py-0.5 bg-blue-200"
            >
              {see ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {deleting ? (
            <SpinOne />
          ) : (
            <button
              className="px-8 text-sm py-1.5 mt-3 rounded-md shadow-sm bg-cloud-theme-blue text-white"
              type="button"
              onClick={() => {
                dispatch(deleteUserAccount(current_password));
              }}
            >
              Delete
            </button>
          )}
        </div>
      </div> */}
    </div>
  );
};

const UpdatePreferences = ({
  dispatch,
  myPreferences,
  user_id,
  isSubmitingPreference,
}) => {
  const [property_trend, setTrend] = useState(myPreferences.property_trend);
  const [market_economy, setEconomy] = useState(myPreferences.market_economy);
  const [investment_property, setInvestment] = useState(
    myPreferences.investment_property
  );
  const [infrustructure, setInfrustructure] = useState(
    myPreferences.infrustructure
  );
  const [is_land, setLand] = useState(myPreferences.is_land);
  const [tax_legal, setTax] = useState(myPreferences.tax_legal);
  const [is_building, setBuilding] = useState(myPreferences.is_building);
  const [is_opinion, setOpinion] = useState(myPreferences.is_opinion);
  const [is_sponsored, setSponsored] = useState(myPreferences.is_sponsored);
  const [activeContentBox, setActiveContentBox] = useState(false);
  const [contentBoxHeight, setcontentBoxHeight] = useState("0px");
  const [is_landProp, setLandProperties] = useState(myPreferences.is_landProp);
  const [is_houses, setHouses] = useState(myPreferences.is_houses);
  const [is_commercial, setCommercial] = useState(myPreferences.is_commercial);
  const [is_sale, setSale] = useState(myPreferences.is_sale);
  const [is_let, setLet] = useState(myPreferences.is_let);
  const [flipingDeals, setFlipingDeals] = useState(myPreferences.flipingDeals);
  const [offPlan, setOfPlan] = useState(myPreferences.offPlan);
  const [jv, setJv] = useState(myPreferences.jv);
  const [incomeProperties, setIncomeProperties] = useState(
    myPreferences.incomeProperties
  );
  const [forDev, setForDev] = useState(myPreferences.forDev);
  const [incompleteBuildings, setIncompleteBuildings] = useState(
    myPreferences.incompleteBuildings
  );
  const [instProperties, setInstProperties] = useState(
    myPreferences.instProperties
  );
  const [distressed, setDistressed] = useState(myPreferences.distressed);
  const [quickSale, setQuickSale] = useState(myPreferences.quickSale);
  const [others, setOthers] = useState(myPreferences.others);
  const [priceRange, setPriceRange] = useState(myPreferences.priceRange);
  const contentHeight = useRef(null);
  const [activePropertiesBox, setActivePropertiesBox] = useState(false);
  const [listingsBoxHeight, setListingsBoxHeight] = useState("0px");
  const listingsHeight = useRef(null);
  const promotionsHeight = useRef(null);
  const [activePromotionsBox, setActivePromotionsBox] = useState(false);
  const [promotionsBoxHeight, setPromotionBoxHeight] = useState("0px");
  const user = user_id;
  const toggleContent = () => {
    setActiveContentBox(activeContentBox === false ? true : false);
    setcontentBoxHeight(
      !activeContentBox ? `${contentHeight.current.scrollHeight}px` : "0px"
    );
  };
  const toggleProperties = () => {
    setActivePropertiesBox(activePropertiesBox === false ? true : false);
    setListingsBoxHeight(
      !activePropertiesBox ? `${listingsHeight.current.scrollHeight}px` : "0px"
    );
  };
  const togglePromotions = () => {
    setActivePromotionsBox(activePromotionsBox === false ? true : false);
    setPromotionBoxHeight(
      !activePromotionsBox
        ? `${promotionsHeight.current.scrollHeight}px`
        : "0px"
    );
  };
  const handleClick = () => {
    dispatch(
      updateUserPreferences(
        property_trend,
        market_economy,
        investment_property,
        infrustructure,
        is_land,
        tax_legal,
        is_building,
        is_opinion,
        is_sponsored,
        is_landProp,
        is_houses,
        is_commercial,
        is_sale,
        is_let,
        others,
        priceRange,
        offPlan,
        flipingDeals,
        jv,
        user,
        forDev,
        incompleteBuildings,
        instProperties,
        distressed,
        quickSale
      )
    );
  };
  return (
    <div className="shadow-md bg-gray-900 p-4">
      <div className=" mb-3">
        <h1 className="font-bold text-lg">Update Your Preferences</h1>
      </div>
      <div className=" mb-3">
        <div>
          <h3 className="font-semibold">What content would you like</h3>
        </div>
        <div className="overflow-hidden mb-3">
          <div>
            <button
              onClick={toggleContent}
              className="flex w-full justify-between border-b border-b-blue-500 items-center mb-0 px-0 py-2"
            >
              <p>Select prefered contents</p>
              {activeContentBox ? <FaAngleUp /> : <FaAngleDown />}
            </button>
          </div>
          <div
            ref={contentHeight}
            style={{ maxHeight: `${contentBoxHeight}` }}
            className="flex flex-col transition-max-height ease-in duration-300"
          >
            <div className="relative flex justify-between items-center pl-1 py-2 hover:bg-cloud-theme-blue transition-all duration-300">
              <div className="relative">
                <input
                  type="checkbox"
                  id="prop-trend"
                  value="Property Trends"
                  checked={property_trend === true}
                  onChange={(e) => setTrend(!property_trend)}
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
                htmlFor="prop-trend"
                className="w-full md:text-sm text-xs h-full"
              >
                Property Trends
              </label>
            </div>
            <div className="relative flex justify-between items-center pl-1 py-2 hover:bg-cloud-theme-blue transition-all duration-300">
              <div className="relative">
                <input
                  type="checkbox"
                  id="market"
                  value="Market & Economy"
                  checked={market_economy === true}
                  onChange={() => setEconomy(!market_economy)}
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
                htmlFor="market"
                className="w-full md:text-sm text-xs h-full"
              >
                Market & Economy
              </label>
            </div>
            <div className="relative flex justify-between items-center pl-1 py-2 hover:bg-cloud-theme-blue transition-all duration-300">
              <div className="relative">
                <input
                  type="checkbox"
                  id="Investment"
                  value="Investment & Deals"
                  checked={investment_property === true}
                  onChange={() => setInvestment(!investment_property)}
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
                htmlFor="Investment"
                className="w-full md:text-sm text-xs h-full"
              >
                Investment & Deals
              </label>
            </div>
            <div className="relative flex justify-between items-center pl-1 py-2 hover:bg-cloud-theme-blue transition-all duration-300">
              <div className="relative">
                <input
                  type="checkbox"
                  id="infrustructure"
                  value="Infrustructure&Projects"
                  checked={infrustructure === true}
                  onChange={() => setInfrustructure(!infrustructure)}
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
                htmlFor="infrustructure"
                className="w-full md:text-sm text-xs h-full"
              >
                Infrustructure&Projects
              </label>
            </div>
            <div className="relative flex justify-between items-center pl-1 py-2 hover:bg-cloud-theme-blue transition-all duration-300">
              <div className="relative">
                <input
                  type="checkbox"
                  id="land"
                  value="Land Matters"
                  checked={is_land === true}
                  onChange={() => setLand(!is_land)}
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
                htmlFor="land"
                className="w-full md:text-sm text-xs h-full"
              >
                Land Matters
              </label>
            </div>
            <div className="relative flex justify-between items-center pl-1 py-2 hover:bg-cloud-theme-blue transition-all duration-300">
              <div className="relative">
                <input
                  type="checkbox"
                  id="tax"
                  value="Tax and Legal"
                  checked={tax_legal === true}
                  onChange={() => setTax(!tax_legal)}
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
              <label htmlFor="tax" className="w-full md:text-sm text-xs h-full">
                Tax and Legal
              </label>
            </div>
            <div className="relative flex justify-between items-center pl-1 py-2 hover:bg-cloud-theme-blue transition-all duration-300">
              <div className="relative">
                <input
                  type="checkbox"
                  id="building"
                  value="Buildings & Architecture"
                  checked={is_building === true}
                  onChange={() => setBuilding(!is_building)}
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
                htmlFor="building"
                className="w-full md:text-sm text-xs h-full"
              >
                Buildings & Architecture
              </label>
            </div>
            <div className="relative flex justify-between items-center pl-1 py-2 hover:bg-cloud-theme-blue transition-all duration-300">
              <div className="relative">
                <input
                  type="checkbox"
                  id="opinion"
                  value="Opinion"
                  checked={is_opinion === true}
                  onChange={() => setOpinion(!is_opinion)}
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
                htmlFor="opinion"
                className="w-full md:text-sm text-xs h-full"
              >
                Opinion
              </label>
            </div>
            <div className="relative flex justify-between items-center pl-1 py-2 hover:bg-cloud-theme-blue transition-all duration-300">
              <div className="relative">
                <input
                  type="checkbox"
                  id="sponsored"
                  value="Sponsored Content"
                  checked={is_sponsored === true}
                  onChange={() => setSponsored(!is_sponsored)}
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
                htmlFor="sponsored"
                className="w-full md:text-sm text-xs h-full"
              >
                Sponsored Content
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className=" mb-3">
        <div>
          <h3 className="font-semibold">
            What properties would you like to see more
          </h3>
        </div>
        <div className="overflow-hidden">
          <div>
            <button
              onClick={toggleProperties}
              className="flex w-full justify-between border-b border-b-blue-500 items-center mb-0 px-0 py-2"
            >
              <p>Select prefered listings</p>
              {activePropertiesBox ? <FaAngleUp /> : <FaAngleDown />}
            </button>
          </div>
          <div
            ref={listingsHeight}
            style={{ maxHeight: `${listingsBoxHeight}` }}
            className="flex flex-col transition-max-height ease-in duration-300"
          >
            <div className="relative flex justify-between items-center pl-1 py-2 hover:bg-cloud-theme-blue transition-all duration-300">
              <div className="relative">
                <input
                  type="checkbox"
                  id="land-pref"
                  value="Land"
                  checked={is_landProp === true}
                  onChange={() => setLandProperties(!is_landProp)}
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
                htmlFor="land-pref"
                className="w-full md:text-sm text-xs h-full"
              >
                Land
              </label>
            </div>
            <div className="relative flex justify-between items-center pl-1 py-2 hover:bg-cloud-theme-blue transition-all duration-300">
              <div className="relative">
                <input
                  type="checkbox"
                  id="houses"
                  value="Houses"
                  checked={is_houses === true}
                  onChange={() => setHouses(!is_houses)}
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
                htmlFor="houses"
                className="w-full md:text-sm text-xs h-full"
              >
                Houses and Apartments
              </label>
            </div>
            <div className="relative flex justify-between items-center pl-1 py-2 hover:bg-cloud-theme-blue transition-all duration-300">
              <div className="relative">
                <input
                  type="checkbox"
                  id="commercial"
                  value="Commercial"
                  checked={is_commercial === true}
                  onChange={() => setCommercial(!is_commercial)}
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
                htmlFor="commercial"
                className="w-full md:text-sm text-xs h-full"
              >
                Commercial Properties
              </label>
            </div>
            <div className="relative flex justify-between items-center pl-1 py-2 hover:bg-cloud-theme-blue transition-all duration-300">
              <div className="relative">
                <input
                  type="checkbox"
                  id="sale"
                  value="For Sale"
                  checked={is_sale === true}
                  onChange={() => setSale(!is_sale)}
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
                htmlFor="sale"
                className="w-full md:text-sm text-xs h-full"
              >
                Sale
              </label>
            </div>
            <div className="relative flex justify-between items-center pl-1 py-2 hover:bg-cloud-theme-blue transition-all duration-300">
              <div className="relative">
                <input
                  type="checkbox"
                  id="let"
                  value="To Let"
                  checked={is_let === true}
                  onChange={() => setLet(!is_let)}
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
              <label htmlFor="let" className="w-full md:text-sm text-xs h-full">
                To Let
              </label>
            </div>

            <div className="pl-1 py-2 hover:bg-blue-50">
              <label
                htmlFor="prange"
                className="w-full md:text-sm text-xs h-full"
              >
                Price Range
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="rounded-md dark:bg-gray-700  dark:border-cloud-theme-blue dark:placeholder-gray-400 dark:text-white  bg-gray-50 border border-1 outline-none border-gray-300 text-gray-900 focus:border-cloud-theme-blue block flex-1 w-full text-sm px-2 py-2"
                  placeholder="price range"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <h3 className="font-semibold">What promotions would you like</h3>
        </div>
        <div className="overflow-hidden">
          <div>
            <button
              onClick={togglePromotions}
              className="flex w-full justify-between border-b border-b-blue-500 items-center mb-0 px-0 py-2"
            >
              <p>Select prefered promotions</p>
              {activePromotionsBox ? <FaAngleUp /> : <FaAngleDown />}
            </button>
          </div>
          <div
            ref={promotionsHeight}
            style={{ maxHeight: `${promotionsBoxHeight}` }}
            className="flex flex-col transition-max-height ease-in duration-300"
          >
            <div className="pt-2"></div>
            <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-cloud-theme-blue">
              <div className="relative">
                <input
                  type="checkbox"
                  id="Flipping-deals"
                  value="Flipping-deals"
                  checked={flipingDeals === true}
                  onChange={(e) => setFlipingDeals(!flipingDeals)}
                  className="opacity-0 absolute h-4 w-4"
                />
                <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
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
              <label htmlFor="Flipping-deals" className="w-full h-full">
                Flipping-Deals
              </label>
            </div>
            <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-cloud-theme-blue">
              <div className="relative">
                <input
                  type="checkbox"
                  id="Off-Plan"
                  value="Off-Plan"
                  checked={offPlan === true}
                  onChange={() => setOfPlan(!offPlan)}
                  className="opacity-0 absolute h-4 w-4"
                />
                <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
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
              <label htmlFor="Off-Plan" className="w-full h-full">
                Off-Plan
              </label>
            </div>
            <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-cloud-theme-blue">
              <div className="relative">
                <input
                  type="checkbox"
                  id="Joint-Venture"
                  value="Joint-Venture"
                  checked={jv === true}
                  onChange={() => setJv(!jv)}
                  className="opacity-0 absolute h-4 w-4"
                />
                <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
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
              <label htmlFor="Joint-Venture" className="w-full h-full">
                Joint Venture
              </label>
            </div>
            <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-cloud-theme-blue">
              <div className="relative">
                <input
                  type="checkbox"
                  id="Income-Properties"
                  value="Income-Properties"
                  checked={incomeProperties === true}
                  onChange={() => setIncomeProperties(!incomeProperties)}
                  className="opacity-0 absolute h-4 w-4"
                />
                <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
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
              <label htmlFor="Income-Properties" className="w-full h-full">
                Income Properties
              </label>
            </div>
            <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-cloud-theme-blue">
              <div className="relative">
                <input
                  type="checkbox"
                  id="For-Redevelopment"
                  value="For-Redevelopment"
                  checked={forDev === true}
                  onChange={() => setForDev(!forDev)}
                  className="opacity-0 absolute h-4 w-4"
                />
                <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
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
              <label htmlFor="For-Redevelopment" className="w-full h-full">
                For Redevelopment
              </label>
            </div>
            <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-cloud-theme-blue">
              <div className="relative">
                <input
                  type="checkbox"
                  id="Incomplete-Buildings"
                  value="Incomplete-Buildings"
                  checked={incompleteBuildings === true}
                  onChange={(e) => setIncompleteBuildings(!incompleteBuildings)}
                  className="opacity-0 absolute h-4 w-4"
                />
                <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
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
              <label htmlFor="Incomplete-Buildings" className="w-full h-full">
                Incomplete Buildings
              </label>
            </div>
            <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-cloud-theme-blue">
              <div className="relative">
                <input
                  type="checkbox"
                  id="Institutional-Properties"
                  value="Institutional-Properties"
                  checked={instProperties === true}
                  onChange={() => setInstProperties(!instProperties)}
                  className="opacity-0 absolute h-4 w-4"
                />
                <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
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
                htmlFor="Institutional-Properties"
                className="w-full h-full"
              >
                Institutional Properties
              </label>
            </div>
            <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-cloud-theme-blue">
              <div className="relative">
                <input
                  type="checkbox"
                  id="Destressed-Sale"
                  value="Destressed-Sale"
                  checked={distressed === true}
                  onChange={() => setDistressed(!distressed)}
                  className="opacity-0 absolute h-4 w-4"
                />
                <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
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
              <label htmlFor="Destressed-Sale" className="w-full h-full">
                Distressed Sale
              </label>
            </div>
            <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-cloud-theme-blue">
              <div className="relative">
                <input
                  type="checkbox"
                  id="Quick-Sale"
                  value="Quick-Sale"
                  checked={quickSale === true}
                  onChange={() => setQuickSale(!quickSale)}
                  className="opacity-0 absolute h-4 w-4"
                />
                <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
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
              <label htmlFor="Quick-Sale" className="w-full h-full">
                Quick Sale
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-0 mt-4 mb-3 w-full group">
        <div className="mb-1.5">
          <h3 className="font-semibold">Others</h3>
        </div>
        <textarea
          id="overview"
          value={others}
          onChange={(e) => setOthers(e.target.value)}
          maxLength={240}
          rows="4"
          className="block p-2.5 w-full text-sm outline-none text-gray-900 bg-gray-50 rounded-sm border border-gray-300 
          focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
          placeholder="Any other prefrences not captured"
        />
      </div>
      <div className="mt-4 flex items-center content-center justify-center">
        {isSubmitingPreference ? (
          <SpinOne />
        ) : (
          <button
            className="px-14 py-2 rounded-md shadow-sm bg-cloud-theme-blue text-white"
            onClick={handleClick}
            type="button"
          >
            Update Preferences
          </button>
        )}
      </div>
    </div>
  );
};

export default UserPreferences;

// const fruits = [
//   { label: "Mango", value: "mg" },
//   { label: "Guava", value: "gv" },
//   { label: "Peach", value: "pc" },
//   { label: "Apple", value: "ap" }
// ];

// const states = [
//   { label: "MN", value: "MN" },
//   { label: "CA", value: "CA" },
//   { label: "CT", value: "CT" },
//   { label: "MI", value: "MI" }
// ];

// const DropDown = props => {
//   const options = props.multi
//     ? [{ label: "Select All", value: "all" }, ...props.options]
//     : props.options;
//   console.log(options);
//   return (
//     <div className={`react-select-wrapper ${props.multi ? "multi" : ""}`}>
//       <Select
//         name="example"
//         options={options}
//         multi={props.multi}
//         value={props.value ? props.value : null}
//         onChange={selected => {
//           props.multi &&
//           selected.length &&
//           selected.find(option => option.value === "all")
//             ? props.handleChange(options.slice(1))
//             : !props.multi
//               ? props.handleChange((selected && selected.value) || null)
//               : props.handleChange(selected);
//         }}
//       />
//     </div>
//   );
// };

// class App extends React.Component {
//   state = {
//     fruits: null,
//     states: null
//   };

//   handleChange = value => this.setState({ fruits: value });
//   updateState = value => this.setState({ states: value });

//   render() {
//     return (
//       <div>
//         <DropDown
//           value={this.state.fruits}
//           options={fruits}
//           handleChange={this.handleChange}
//           multi={true}
//         />
//         {this.state.fruits && <p>{JSON.stringify(this.state.fruits)}</p>}
//         <br />
//         <DropDown
//           value={this.state.states}
//           options={states}
//           handleChange={this.updateState}
//         />
//         {this.state.states && <p>{JSON.stringify(this.state.states)}</p>}
//       </div>
//     );
//   }
// }

// render(<App />, document.getElementById("root"));
