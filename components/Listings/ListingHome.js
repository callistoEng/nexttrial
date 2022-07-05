import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { GoFlame, GoRequestChanges } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
import { Fragment, useState } from "react";
// import { isValidPhoneNumber, parsePhoneNumber } from "react-phone-number-input";
// import 'react-phone-number-input/style.css'
// import PhoneInput from 'react-phone-number-input'
import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineScreenSearchDesktop } from "react-icons/md";
import { TiNews } from "react-icons/ti";
import { IoLocationSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { BsShareFill } from "react-icons/bs";
import { Dialog, Transition } from "@headlessui/react";
import hm from "../../public/hm.jpg";
import "swiper/css";
import Link from "next/link";
import { useEffect } from "react";
import { likeListings } from "../../state/actionCreators/listings";
import { truncateWords, NumberFormat } from "../../utils/Truncate";
import { Pagination, Autoplay } from "swiper";
import { SiCivicrm } from "react-icons/si";
// import Typewriter from "typewriter-effect";
import { SpinMadoido } from "../Spinners/Spinner";
import { userRequestProperty } from "../../state/actionCreators/auth";
import HomeWidgets from "./HomeWidgets";
import { useRouter } from "next/router";
import { Interact } from "./Interact";
// import { TrackpageView } from "../GAnalytics";

const ListingHome = () => {
  const [openRequestModal, setOpenRequestModal] = useState(false);
  const dispatch = useDispatch(); 
  const router = useRouter();
  const residentialHomeListings = useSelector(  
    (state) => state.listings.residentialHomeListings
  );

  const landHomeListings = useSelector(
    (state) => state.listings.landHomeListings
  );
  const coWorkingHomeListings = useSelector(
    (state) => state.listings.coWorkingHomeListings
  );
  const commercialHomeListings = useSelector(
    (state) => state.listings.commercialHomeListings
  );
  const loadinRequest = useSelector((state) => state.auth.loadinRequest);
  const requestingProperty = useSelector(
    (state) => state.auth.requestingProperty
  );

  const [winCardWidth, setWinCardWidth] = useState("");
  useEffect(() => {
    const getWindowWIdth = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        return width;
      }
      return null;
    };
    const handleResize = () => {
      setWinCardWidth(getWindowWIdth());
    };
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // TrackpageView("/")
  // return () => {
  // dispatch(failedGetingCoWorkingListing());
  // dispatch(failedGetingLandListing());
  // dispatch(failedGetingResidentialListing());
  // dispatch(failedGetingCommercialHomeListing());
  //   };
  // }, [dispatch]);

  const [searchQuery, setSearchQuery] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/listings/search/properties",
      query: { q: searchQuery },
    });
  };
  const swiperParams = {
    spaceBetween: 15,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    modules: [Autoplay, Pagination],
    pagination: { clickable: true, dynamicBullets: true },
    slidesPerView: 4,
    breakpoints: {
      1024: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      500: {
        slidesPerView: 2.5,
        spaceBetween: 10,
      },
      0: {
        slidesPerView: 1.6,
        spaceBetween: 10,
      },
    },
  };
  const swiperParams2 = {
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    modules: [Autoplay, Pagination],
    pagination: { clickable: true, dynamicBullets: true },
    breakpoints: {
      640: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      0: {
        slidesPerView: 2.3,
        spaceBetween: 10,
      },
    },
  };

  return (
    <>
      <section className="mb-5 md:mb-8 mt-[4.85rem] md:h-[85vh] sm:h-[60vh] h-[40vh] relative px-0">
        <div className="w-full flex justify-center content-center items-center h-full">
          <div
            className="flex flex-col w-11/12 xs-l:w-4/5 sm:w-2/3 bg-opacity-30
          sm:p-10 p-5 justify-center content-center items-center rounded-lg bg-cloud-theme-blue mx-auto shadow-lg"
          >
            <h2 className="font-bold md:text-5xl md:mb-10 sm:text-3xl text-2xl text-white opacity-100 text-left">
              Explore Property With Us
            </h2>
            {/* <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString("Find Property Everywhere")
                  .pauseFor(1000)
                  .deleteChars(19)
                  .typeString("Land")
                  .pauseFor(900)
                  .deleteChars(4)
                  .typeString("Homes")
                  .pauseFor(900)
                  .deleteChars(5)
                  .typeString("Business Premises")
                  .pauseFor(900)
                  .deleteChars(17)
                  .typeString("Office Space And More")
                  .pauseFor(1000)
                  .deleteAll()
                  .start();
              }}
              options={{
                loop: true,
                wrapperClassName:
                  "sm:text-2xl text-xl text-cloud-theme-gold opacity-100 font-bold text-left",
              }}
            /> */}
            <div className="xs-l:w-4/5 w-full">
              <form
                className="flex w-full sm:mt-8 mt-5 md:mt-16 shadow-lg opacity-100"
                onSubmit={onSubmit}
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-none rounded-l-lg  dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white  border border-1 
                  dark:border-cloud-theme-blue outline-none border-gray-300 text-gray-900 focus:border-cloud-theme-blue block flex-1 w-full text-sm p-2.5"
                  placeholder="e.g. location, area, project"
                />
                <button
                  className="inline-flex items-center px-3 text-sm dark:bg-gray-700 text-gray-900 opacity-100 bg-gray-200 rounded-r-lg border
                border-r-0 border-gray-300 dark:border-cloud-theme-blue  focus:border-cloud-theme-blue"
                >
                  <FaSearch />
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="w-full h-full absolute top-0 left-0 -z-10">
          <Image
            alt="estatecloud banner"
            src={hm}
            layout="fill"
            className="h-full w-full object-cover"
          />
        </div>
      </section>
      <section className="mb-5 px-5">
        <div className="px-0">
          <h3 className="font-bold text-xl text-cloud-theme-blue mb-2">
            SERVICES
          </h3>
        </div>
        <Swiper {...swiperParams2}>
          <SwiperSlide>
            <div className="py-4 pb-7">
              <div className="flex h-36 flex-col justify-center items-center content-center rounded-lg p-2  pb-3 shadow-xl relative dark:shadow-darkShadow">
                <TiNews className="text-cloud-theme-blue text-4xl mb-2" />
                <p className="text-xs mb-2 dark:text-white text-center font-semibold">
                  Latest industry insights
                </p>
                <Link href="/news">
                  <a className="bg-cloud-theme-blue rounded-md text-white px-5 shadow-lg py-1 mt-1 text-xs absolute bottom-3">
                    Go
                  </a>
                </Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="py-4">
              <div className="flex h-36 flex-col justify-center items-center content-center rounded-lg p-2  pb-3 shadow-xl relative dark:shadow-darkShadow">
                <MdOutlineScreenSearchDesktop className="text-cloud-theme-blue text-4xl mb-2" />
                <p className="text-xs mb-2 dark:text-white text-center font-semibold">
                  Find listings quickly and efficiently
                </p>
                <Link href="/listings/search/properties">
                  <a className="bg-cloud-theme-blue rounded-md text-white px-5 shadow-lg py-1 mt-1 text-xs absolute bottom-3">
                    Go
                  </a>
                </Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="py-4">
              <div className="flex h-36 flex-col justify-center items-center content-center rounded-lg p-2  pb-3 shadow-xl relative dark:shadow-darkShadow">
                <SiCivicrm className="text-cloud-theme-blue text-4xl mb-2" />
                <p className="text-xs mb-2 dark:text-white text-center font-semibold">
                  Listing management and CRM
                </p>
                <button
                  type="button"
                  className="bg-cloud-theme-blue rounded-md text-white px-5 shadow-lg py-1 mt-1 text-xs absolute bottom-3"
                >
                  Go
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="py-4">
              <div className="flex h-36 flex-col justify-center items-center content-center rounded-lg p-2  pb-3 shadow-xl relative dark:shadow-darkShadow">
                <GoRequestChanges className="text-cloud-theme-blue text-4xl mb-2" />
                <p className="text-xs mb-2 dark:text-white text-center font-semibold">
                  Request property
                </p>
                <button
                  type="button"
                  onClick={() => setOpenRequestModal(!openRequestModal)}
                  className="bg-cloud-theme-blue rounded-md text-white px-5 shadow-lg py-1 mt-1 text-xs absolute bottom-3"
                >
                  Go
                </button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        <RequestProperty
          openRequestModal={openRequestModal}
          setOpenRequestModal={setOpenRequestModal}
          dispatch={dispatch}
          requestingProperty={requestingProperty}
          loadinRequest={loadinRequest}
          userRequestProperty={userRequestProperty}
        />
      </section>
      <section className="px-5 mb-3">
        <div className="px-0 flex items-center justify-between w-full">
          <h3 className="font-bold text-xl text-cloud-theme-blue mb-2">
            RECENT LISTINGS
          </h3>
        </div>
        <Swiper {...swiperParams}>
          {residentialHomeListings && residentialHomeListings.length > 0
            ? residentialHomeListings.map((listing, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="pt-3 pl-0 pb-2 overflow-hidden">
                      <Interact
                        listing={listing}
                        dispatch={dispatch}
                        likeListings={likeListings}
                      />

                      <div className="p-2 pt-2 md:h-32 h-28 text-sm md:text-base rounded-lg dark:shadow-darkShadow shadow-lg z-10 opacity-100 bg-white dark:bg-cloud-theme-dark dark:text-white relative -top-6">
                        <Link href={`/listings/more-info/${listing.slug}`}>
                          <a>
                            {" "}
                            <p className=" text-opacity-0 mb-1">
                              {winCardWidth >= 768
                                ? truncateWords(listing.title, 48)
                                : winCardWidth >= 640 && winCardWidth < 768
                                ? truncateWords(listing.title, 60)
                                : winCardWidth >= 600 && winCardWidth < 640
                                ? truncateWords(listing.title, 50)
                                : winCardWidth >= 500 && winCardWidth < 600
                                ? truncateWords(listing.title, 40)
                                : winCardWidth >= 400 && winCardWidth < 500
                                ? truncateWords(listing.title, 55)
                                : truncateWords(listing.title, 37)}
                            </p>
                            <div className="flex justify-between font-bold">
                              {listing.category?.category_name ===
                              "For Sale" ? (
                                <p className="">
                                  KES {NumberFormat(listing.selling_price)}
                                </p>
                              ) : listing.category?.category_name ===
                                "For Rent" ? (
                                <p className="">
                                  KES {NumberFormat(listing.rental_price)}
                                </p>
                              ) : (
                                ""
                              )}

                              {listing.is_negotiable ? (
                                <p className="text-xs">negotiable</p>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="flex justify-between content-center items-center py-1.5 mt-0">
                              <p className="text-cloud-theme-blue text-sm flex place-content-center">
                                <IoLocationSharp className="mt-[0.188rem] text-sm" />
                                {truncateWords(
                                  listing.location_description,
                                  15
                                )}
                              </p>
                              {listing.property_size && (
                                <p className="text-blue-500 ">
                                  {NumberFormat(listing.property_size)}ft
                                  <sup>2</sup>
                                </p>
                              )}
                            </div>
                          </a>
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })
            : [1, 2, 3, 4, 5].flatMap((_, index) => (
                <SwiperSlide key={index}>
                  <div className="animate-pulse">
                    <div className="h-64 rounded-t-xl overflow-hidden relative">
                      <div className="bg-gray-300 w-full h-full"></div>
                    </div>

                    <div
                      className="
                          p-3
                          rounded-lg
                          shadow-lg
                          z-10
                          opacity-100
                          bg-white

                          relative
                          -top-6
                          h-32
                        "
                    >
                      <p className="bg-gray-300 p-2 my-2.5 rounded-md w-8/12"></p>
                      <div className="flex justify-between mb-2 content-center items-center pt-0 pb-1">
                        <p className="p-2 w-7/12 mr-6 bg-gray-300 rounded-md"></p>
                        <p className="p-2 w-7/12 bg-gray-300 rounded-md"></p>
                      </div>
                      <div className="flex justify-between mb-2 content-center items-center pt-0 pb-1">
                        <p className="p-2 w-7/12 mr-6 bg-gray-300 rounded-md"></p>
                        <p className="p-2 w-7/12 bg-gray-300 rounded-md"></p>
                      </div>
                      <p className="bg-gray-300 p-2 mb-10 rounded-md w-9/12"></p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>
      </section>
      <HomeWidgets
        dispatch={dispatch}
        likeListings={likeListings}
        title="RESIDENTIAL"
        homeListing={residentialHomeListings}
        winCardWidth={winCardWidth}
      />
      <HomeWidgets
        dispatch={dispatch}
        likeListings={likeListings}
        title="COMMERCIAL"
        homeListing={commercialHomeListings}
        winCardWidth={winCardWidth}
      />
      <HomeWidgets
        likeListings={likeListings}
        dispatch={dispatch}
        title="CO-WORKING"
        homeListing={coWorkingHomeListings}
        winCardWidth={winCardWidth}
      />
      
      {/* <section className="px-5 mb-3">
        <div className="px-0 flex items-center justify-between w-full">
          <h3 className="font-bold text-xl text-cloud-theme-blue mb-2">
            CO-WORKING
          </h3>
        </div>
        <Swiper {...swiperParams}>
          {coWorkingHomeListings && coWorkingHomeListings.length > 0
            ? coWorkingHomeListings.map((listing, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="pt-3 pl-0 pb-2 overflow-hidden">
                      <div className="h-48 md:h-52 rounded-t-xl overflow-hidden relative">
                        <Link href={`/listings/more-info/${listing.slug}`}>
                          <img
                            src={listing.Images[0]?.images}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </Link>
                        <div className="flex justify-between items-center content-center">
                          <div className="absolute top-3 left-3 text-white dark:text-black flex justify-between items-center content-center">
                            <div className=" bg-cloud-theme-red md:py-2 md:px-4 px-2 py-1 rounded-md mr-1.5">
                              <p className="font-bold">
                                <GoFlame className="text-xs dark:text-black" />
                              </p>
                            </div>
                            <div className="bg-white py-1.5 px-2.5 rounded-md dark:bg-cloud-theme-dark">
                              {listing.category?.category_name ===
                              "For Sale" ? (
                                <p className="font-semibold text-xs text-cloud-theme-blue ">
                                  SALE
                                </p>
                              ) : (
                                <p className="font-semibold text-xs text-cloud-theme-blue ">
                                  TO-LET
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="absolute top-3 md:right-3 right-1.5 text-white flex justify-between items-center content-center">
                            <div className="rounded-md mr-1.5">
                              <Link
                                to="#"
                                onClick={() =>
                                  dispatch(likeListings(listing.slug))
                                }
                                className="bg-transparent dark:bg-cloud-theme-dark ring-cloud-theme-blue ring-1 flex justify-center rounded-full md:w-8 md:h-8 w-6 h-6 mr-2 nd:mr-4"
                              >
                                <AiOutlineHeart className="mt-1.5 md:text-lg text-sm " />
                              </Link>
                            </div>
                            <div className="rounded-md group">
                              <Link
                                to="#"
                                className="bg-transparent dark:bg-cloud-theme-dark ring-cloud-theme-blue ring-1 flex justify-center rounded-full md:w-8 md:h-8 w-6 h-6 mr-1"
                              >
                                <BsShareFill className="mt-1.5 md:text-lg text-sm" />
                              </Link>
                                className="absolute bg-white top-0 group-hover:right-0 duration-200 ease-in py-1 px-2 
                                -right-full transition-all duration-50"
                              >
                                <li>
                                  <FacebookShareButton
                                    quote={listing.title}
                                    // url = {String(window.location.href)}
                                    url={`${process.env.REACT_APP_DJANGO_SEMIBASE_URL}/listings/more-info/${listing.slug}`}
                                  >
                                    <FacebookIcon size={20} round={true} />
                                  </FacebookShareButton>
                                </li>
                                <li>
                                  <TwitterShareButton
                                    related={["@EstateCloudKe"]}
                                    hashtags={["1EstateCloud"]}
                                    title={listing.title}
                                    url={`${process.env.REACT_APP_DJANGO_SEMIBASE_URL}/listings/more-info/${listing.slug}`}
                                  >
                                    <TwitterIcon size={20} round={true} />
                                  </TwitterShareButton>
                                </li>
                                <li>
                                  <WhatsappShareButton
                                    title={listing.title}
                                    url={`${process.env.REACT_APP_DJANGO_SEMIBASE_URL}/listings/more-info/${listing.slug}`}
                                  >
                                    <WhatsappIcon size={20} round={true} />
                                  </WhatsappShareButton>
                                </li>
                                <li>
                                  <TelegramShareButton
                                    title={listing.title}
                                    url={`${process.env.REACT_APP_DJANGO_SEMIBASE_URL}/listings/more-info/${listing.slug}`}
                                  >
                                    <TelegramIcon size={20} round={true} />
                                  </TelegramShareButton>
                                </li>
                              </ul> 
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-2 pt-2 md:h-32 h-28 text-sm md:text-base rounded-lg dark:shadow-darkShadow shadow-lg z-10 opacity-100 bg-white dark:bg-cloud-theme-dark dark:text-white relative -top-6">
                        <Link href={`/listings/more-info/${listing.slug}`}>
                          <p className=" text-opacity-0 mb-1">
                            {winCardWidth >= 768
                              ? truncateWords(listing.title, 48)
                              : winCardWidth >= 640 && winCardWidth < 768
                              ? truncateWords(listing.title, 60)
                              : winCardWidth >= 600 && winCardWidth < 640
                              ? truncateWords(listing.title, 50)
                              : winCardWidth >= 500 && winCardWidth < 600
                              ? truncateWords(listing.title, 40)
                              : winCardWidth >= 400 && winCardWidth < 500
                              ? truncateWords(listing.title, 55)
                              : truncateWords(listing.title, 37)}
                          </p>
                          <div className="flex justify-between font-bold">
                            {listing.category?.category_name === "For Sale" ? (
                              <p className="">
                                KES {NumberFormat(listing.selling_price)}
                              </p>
                            ) : listing.category?.category_name ===
                              "For Rent" ? (
                              listing.rental_price && (
                                <p className="">
                                  KES {NumberFormat(listing.rental_price)}
                                </p>
                              )
                            ) : (
                              ""
                            )}
                            {listing.is_negotiable ? (
                              <p className="text-xs">negotiable</p>
                            ) : (
                              ""
                            )}
                          </div>

                          <div className="flex justify-between content-center items-center py-1.5 mt-0">
                            <p className="text-cloud-theme-blue text-sm flex place-content-center">
                              <IoLocationSharp className="mt-[0.188rem] text-sm" />
                              {truncateWords(listing.location_description, 15)}
                            </p>
                            {listing.property_size && (
                              <p className="text-blue-500 ">
                                {NumberFormat(listing.property_size)}ft
                                <sup>2</sup>
                              </p>
                            )}
                          </div>
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })
            : [1, 2, 3, 4, 5].flatMap((_, index) => (
                <SwiperSlide key={index}>
                  <div className="animate-pulse">
                    <div className="h-64 rounded-t-xl overflow-hidden relative">
                      <div className="bg-gray-300 w-full h-full"></div>
                    </div>

                    <div
                      className="
                        p-3
                        rounded-lg
                        shadow-lg
                        z-10
                        opacity-100
                        bg-white

                        relative
                        -top-6
                        h-32
                      "
                    >
                      <p className="bg-gray-300 p-2 my-2.5 rounded-md w-8/12"></p>
                      <div className="flex justify-between mb-2 content-center items-center pt-0 pb-1">
                        <p className="p-2 w-7/12 mr-6 bg-gray-300 rounded-md"></p>
                        <p className="p-2 w-7/12 bg-gray-300 rounded-md"></p>
                      </div>
                      <div className="flex justify-between mb-2 content-center items-center pt-0 pb-1">
                        <p className="p-2 w-7/12 mr-6 bg-gray-300 rounded-md"></p>
                        <p className="p-2 w-7/12 bg-gray-300 rounded-md"></p>
                      </div>
                      <p className="bg-gray-300 p-2 mb-10 rounded-md w-9/12"></p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>
      </section> */}
    </>
  );
};

const RequestProperty = ({
  setOpenRequestModal,
  userRequestProperty,
  openRequestModal,
  dispatch,
  requestingProperty,
  loadinRequest,
}) => {
  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [requestDetails, setRequestDetails] = useState("");
  const [requestDetailsErr, setRequestDetailsErr] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      setNameErr("Field is required");
      return;
    }
    setNameErr("");
    if (!phone) {
      setPhoneErr("Field is required");
      return;
    }
    setPhoneErr("");
    // if (isValidPhoneNumber(phone)) {
    //   const phoneParse = parsePhoneNumber(phone);
    //   var mobile_phone = phone;
    //   var country = phoneParse.country;
    // } else {
    //   setPhoneErr("Invalid phone number");
    //   return;
    // }
    setPhoneErr("");
    setEmailErr("");
    if (!requestDetails) {
      setRequestDetailsErr("Field is required");
      return;
    }
    setRequestDetailsErr("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobile_phone", mobile_phone);
    formData.append("country", country);
    formData.append("requestDetails", requestDetails);
    dispatch(userRequestProperty(formData));
    setName("");
    setEmail("");
    setPhone("");
    setRequestDetails("");
  };
  return (
    <Transition appear show={openRequestModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-1010 overflow-y-auto"
        onClose={() => setOpenRequestModal(true)}
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
                Request Properties by Directly Emailing Us the Property Details
              </Dialog.Title>
              <form className="mt-3" onSubmit={(e) => onSubmit(e)}>
                <div className="relative z-0 mb-6 w-full">
                  <div className="relative z-0 mb-3 w-full group">
                    <input
                      type="text"
                      id="name"
                      className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0
                border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 
                dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-cloud-theme-blue peer"
                      placeholder=" "
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label
                      htmlFor="name"
                      className="absolute text-base text-gray-500 dark:text-gray-400 duration-300 
                transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 
                peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Your Name
                    </label>
                    {nameErr && (
                      <p className="mb-2 text-red-500 text-xxs">{nameErr}</p>
                    )}
                  </div>
                  <div className="relative z-0 mb-6 w-full">
                    <div className="mb-1.5">
                      <p className="text-blue-600 font-semibold text-sm">
                        Phone Number
                      </p>
                      {phoneErr && (
                        <p className="text-red-600 font-semibold text-xs">
                          {phoneErr}
                        </p>
                      )}
                    </div>
                    {/* <PhoneInput
                      value={phone}
                      onChange={setPhone}
                      placeholder="Phone number eg:+25471234.."
                      className="w-full
                      text-gray-900
                      md:px-3
                      px-2 
                      py-2
                      ring-1
                      outline-none
                      border-none
                      border-gray-300
                      focus:ring-cloud-theme-blue
                      ring-gray-300
                      "
                      withCountryCallingCode
                      international
                      defaultCountry="KE"
                      maxLength="16"
                    /> */}
                  </div>
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
                      Your Email (optional)
                    </label>
                    {emailErr && (
                      <p className="mb-2 text-red-500 text-xxs">{emailErr}</p>
                    )}
                  </div>
                  <div className="relative z-0 mb-6 w-full group">
                    <div className="mb-1.5">
                      <p className="text-blue-600 font-semibold text-sm">
                        Property Details
                      </p>
                      {requestDetailsErr && (
                        <p className="text-red-600 font-semibold text-xs">
                          {requestDetailsErr}
                        </p>
                      )}
                    </div>
                    <textarea
                      id="overview"
                      value={requestDetails}
                      onChange={(e) => setRequestDetails(e.target.value)}
                      maxLength={240}
                      rows="4"
                      className="block p-2.5 w-full text-sm outline-none text-gray-900 bg-gray-50 rounded-sm border border-gray-300 
            focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                      placeholder="Describe the property you are looking for"
                    />
                  </div>
                </div>
                {requestingProperty ? (
                  <p className="text-red-600">
                    Email has been sent. You will hear from us shortly
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
                        onClick={() => setOpenRequestModal(false)}
                        type="button"
                        className="outline-none border-none px-10 rounded-md py-3 bg-cloud-theme-blue text-white font-semibold"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="outline-none border-none px-10 rounded-md py-3 bg-cloud-theme-blue text-white font-semibold"
                      >
                        Request
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
};

const ListingPropertiesCard = ({
  winCardWidth,
  swiperParams,
  residentialHomeListings,
}) => {
  return (
    <Swiper {...swiperParams}>
      {residentialHomeListings && residentialHomeListings.length > 0
        ? residentialHomeListings.map((listing, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="pt-3 pl-0 pb-2 overflow-hidden">
                  <div className="h-48 md:h-52 rounded-t-xl overflow-hidden relative">
                    {/* <Link href={`/listings/more-info/${listing.slug}`}>
                      <img
                        src={listing.Images[0]?.images}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </Link> */}
                    <div className="flex justify-between items-center content-center">
                      <div className="absolute top-3 left-3 text-white dark:text-black flex justify-between items-center content-center">
                        <div className=" bg-cloud-theme-red md:py-2 md:px-4 px-2 py-1 rounded-md mr-1.5">
                          <p className="font-bold">
                            <GoFlame className="text-xs dark:text-black" />
                          </p>
                        </div>
                        <div className="bg-white py-1.5 px-2.5 rounded-md dark:bg-cloud-theme-dark">
                          {listing.category?.category_name === "For Sale" ? (
                            <p className="font-semibold text-xs text-cloud-theme-blue ">
                              SALE
                            </p>
                          ) : (
                            <p className="font-semibold text-xs text-cloud-theme-blue ">
                              TO-LET
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="absolute top-3 md:right-3 right-1.5 text-white flex justify-between items-center content-center">
                        <div className="rounded-md mr-1.5">
                          <button
                            type="button"
                            onClick={(e) =>
                              dispatch(likeListings(listing.slug))
                            }
                            className="bg-transparent dark:bg-cloud-theme-dark ring-cloud-theme-blue ring-1 flex justify-center rounded-full md:w-8 md:h-8 w-6 h-6 mr-2 nd:mr-4"
                          >
                            <AiOutlineHeart className="mt-1.5 md:text-lg text-sm text-white" />
                          </button>
                        </div>
                        <div className="rounded-md group">
                          <button
                            type="button"
                            className="bg-transparent dark:bg-cloud-theme-dark ring-cloud-theme-blue ring-1 flex justify-center rounded-full md:w-8 md:h-8 w-6 h-6 mr-1"
                          >
                            <BsShareFill className="mt-1.5 md:text-lg text-sm text-white" />
                          </button>
                          {/* <ul
                          className="absolute bg-white top-0 group-hover:right-0 duration-200 ease-in py-1 px-2 
                          -right-full transition-all duration-50"
                        >
                          <li>
                            <FacebookShareButton
                              quote={listing.title}
                              // url = {String(window.location.href)}
                              url={`${process.env.REACT_APP_DJANGO_SEMIBASE_URL}/listings/more-info/${listing.slug}`}
                            >
                              <FacebookIcon size={20} round={true} />
                            </FacebookShareButton>
                          </li>
                          <li>
                            <TwitterShareButton
                              related={["@EstateCloudKe"]}
                              hashtags={["1EstateCloud"]}
                              title={listing.title}
                              url={`${process.env.REACT_APP_DJANGO_SEMIBASE_URL}/listings/more-info/${listing.slug}`}
                            >
                              <TwitterIcon size={20} round={true} />
                            </TwitterShareButton>
                          </li>
                          <li>
                            <WhatsappShareButton
                              title={listing.title}
                              url={`${process.env.REACT_APP_DJANGO_SEMIBASE_URL}/listings/more-info/${listing.slug}`}
                            >
                              <WhatsappIcon size={20} round={true} />
                            </WhatsappShareButton>
                          </li>
                          <li>
                            <TelegramShareButton
                              title={listing.title}
                              url={`${process.env.REACT_APP_DJANGO_SEMIBASE_URL}/listings/more-info/${listing.slug}`}
                            >
                              <TelegramIcon size={20} round={true} />
                            </TelegramShareButton>
                          </li>
                        </ul> */}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-2 pt-2 md:h-32 h-28 text-sm md:text-base rounded-lg dark:shadow-darkShadow shadow-lg z-10 opacity-100 bg-white dark:bg-cloud-theme-dark dark:text-white relative -top-6">
                    <Link href={`/listings/more-info/${listing.slug}`}>
                      <a>
                        <p className=" text-opacity-0 mb-1">
                          {winCardWidth >= 768
                            ? truncateWords(listing.title, 48)
                            : winCardWidth >= 640 && winCardWidth < 768
                            ? truncateWords(listing.title, 60)
                            : winCardWidth >= 600 && winCardWidth < 640
                            ? truncateWords(listing.title, 50)
                            : winCardWidth >= 500 && winCardWidth < 600
                            ? truncateWords(listing.title, 40)
                            : winCardWidth >= 400 && winCardWidth < 500
                            ? truncateWords(listing.title, 55)
                            : truncateWords(listing.title, 37)}
                        </p>
                        <div className="flex justify-between font-bold">
                          {listing.category?.category_name === "For Sale" ? (
                            <p className="">
                              KES {NumberFormat(listing.selling_price)}
                            </p>
                          ) : (
                            <p className="">
                              KES {NumberFormat(listing.rental_price)}
                            </p>
                          )}
                          {listing.is_negotiable ? (
                            <p className="text-xs">negotiable</p>
                          ) : (
                            ""
                          )}
                        </div>

                        <div className="flex justify-between content-center items-center py-1.5 mt-0">
                          <p className="text-cloud-theme-blue text-sm flex place-content-center">
                            <IoLocationSharp className="mt-[0.188rem] text-sm" />
                            {truncateWords(listing.location_description, 15)}
                          </p>
                          {listing.property_size && (
                            <p className="text-blue-500 ">
                              {NumberFormat(listing.property_size)}ft
                              <sup>2</sup>
                            </p>
                          )}
                        </div>
                      </a>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            );
          })
        : [1, 2, 3, 4, 5].flatMap((_, index) => (
            <SwiperSlide key={index}>
              <div className="animate-pulse">
                <div className="h-64 rounded-t-xl overflow-hidden relative">
                  <div className="bg-gray-300 w-full h-full"></div>
                </div>

                <div
                  className="
                          p-3
                          rounded-lg
                          shadow-lg
                          z-10
                          opacity-100
                          bg-white

                          relative
                          -top-6
                          h-32
                        "
                >
                  <p className="bg-gray-300 p-2 my-2.5 rounded-md w-8/12"></p>
                  <div className="flex justify-between mb-2 content-center items-center pt-0 pb-1">
                    <p className="p-2 w-7/12 mr-6 bg-gray-300 rounded-md"></p>
                    <p className="p-2 w-7/12 bg-gray-300 rounded-md"></p>
                  </div>
                  <div className="flex justify-between mb-2 content-center items-center pt-0 pb-1">
                    <p className="p-2 w-7/12 mr-6 bg-gray-300 rounded-md"></p>
                    <p className="p-2 w-7/12 bg-gray-300 rounded-md"></p>
                  </div>
                  <p className="bg-gray-300 p-2 mb-10 rounded-md w-9/12"></p>
                </div>
              </div>
            </SwiperSlide>
          ))}
    </Swiper>
  );
};

export default ListingHome;
