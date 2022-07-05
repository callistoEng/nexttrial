import { useEffect, useRef, useState, Fragment } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { BiBed } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import {
  truncateWords,
  NumberFormat,
  NumberFormatAcres,
} from "../../utils/Truncate";
import commercialMarker from "../images/Commercial.svg";
import { SpinOne } from "../Spinners/Spinner";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import landMarker from "../images/Land.svg";
import parse from "html-react-parser";
import {
  getASingleListingDetail,
  reportListing,
  scheduleViewing,
} from "../../state/actionCreators/listings";
import Link from "next/link";
// import L from "leaflet";
import { AiOutlineHeart, AiOutlineWarning } from "react-icons/ai";
import {
  BsShareFill,
  BsFillTelephoneFill,
  BsSquare,
  BsWifi,
  BsWhatsapp,
  BsEyeglasses,
} from "react-icons/bs";
import { FaAngleDown, FaAngleUp, FaLeaf } from "react-icons/fa";
import { MdOutlineEmail, MdOutlinePool, MdPets } from "react-icons/md";
// import {
//   FacebookIcon,
//   FacebookShareButton,
//   TwitterIcon,
//   TelegramIcon,
//   TelegramShareButton,
//   TwitterShareButton,
//   WhatsappIcon,
//   WhatsappShareButton,
// } from "react-share";
import { IoCarSportSharp } from "react-icons/io5";
import { CgGym } from "react-icons/cg";
import im3 from "../images/twi4.jpg";
import { GoFlame } from "react-icons/go";
import { IoLocationSharp } from "react-icons/io5";
import { likeListings } from "../../state/actionCreators/listings";
import { Pagination, Autoplay, Scrollbar } from "swiper";
import { GiBathtub, GiEntryDoor, GiSteamBlast } from "react-icons/gi";
import { failedGetingListingDetail } from "../../state/estateSlices/allListingSlices";
import { failedGettingAgentContact } from "../../state/estateSlices/authSlices";
import Head from "next/head";
// import { TrackpageView } from "../GAnalytics";
const ListingDetail = ({ slug }) => {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const [activePark, setActivePark] = useState(false);
  const [openReportModal, setOpenReportModal] = useState(false);
  const [openContactModal, setOpenContactModal] = useState(false);
  const [openViewingModal, setOpenViewingModal] = useState(false);
  const [perkDivHeight, setPerkDivHeight] = useState("0px");
  const perkHeight = useRef(null);
  const togglePerks = () => {
    setActivePark(activePark === false ? true : false);
    setPerkDivHeight(
      !activePark ? `${perkHeight.current.scrollHeight}px` : "0px"
    );
  };

  const listing = useSelector((state) => state.listings.listingDetail);
  const reportMessage = useSelector((state) => state.listings.reportMessage);
  const reporting = useSelector((state) => state.listings.reporting);
  const relatedListings = useSelector(
    (state) => state.listings.relatedListings
  );
  useEffect(() => {
    if (typeof window !== "undefined") {
      var google = window.google;
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
    dispatch(getASingleListingDetail(slug));
    // TrackpageView(`/listings/more-info/${slug}`);
    return () => {
      dispatch(failedGetingListingDetail());
      dispatch(failedGettingAgentContact());
    };
  }, [dispatch, slug]);
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

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  const swiperParams = {
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    modules: [Autoplay, Scrollbar],
    pagination: { clickable: true, dynamicBullets: true },
    breakpoints: {
      768: {
        slidesPerView: 8,
        spaceBetween: 10,
      },
      640: {
        slidesPerView: 5,
        spaceBetween: 10,
      },
      0: {
        slidesPerView: 5,
        spaceBetween: 10,
      },
    },
  };
  const swiperParamsR = {
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
  return (
    <>
      <Head>
        <title>{listing ? listing.properties.title : ""}</title>
        <meta
          name="Listing details"
          content="more infomation about listed property"
        />
      </Head>
      <section className="w-full md:px-20 px-5 mt-[5.5rem] mb-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-9 h-80 overflow-hidden">
          {listing ? (
            <>
              <div className="p-0 dark:bg-cloud-theme-dark bg-white h-80 w-full relative overflow-hidden rounded-l-lg">
                <img
                // {`https://estatecloud.co.ke${item.thumbnail}`} 
                  src={
                    `https://estatecloud.co.ke${listing.properties.Images}`
                      ? `https://estatecloud.co.ke${listing.properties.Images[index]?.images}`
                      : ""
                  }
                  className="w-full h-full object-cover"
                  alt={listing.properties.title}
                />
                <div className="absolute top-3 left-0 flex justify-between items-center content-center w-full px-3">
                  <div className="dark:bg-cloud-theme-dark bg-white py-1 px-4 rounded-md">
                    {listing.properties.is_land ? (
                      listing.properties.category?.category_name ===
                      "For Sale" ? (
                        <p className="font-semibold m-0 text-xs px-1.5 py-1">
                          SALE
                        </p>
                      ) : (
                        <p className="font-semibold text-xs p-0">LEASE</p>
                      )
                    ) : listing.properties.is_commercial ? (
                      listing.properties.category?.category_name ===
                      "For Sale" ? (
                        <p className="font-semibold text-xs p-0">SALE</p>
                      ) : (
                        <p className="font-semibold text-xs p-0">TO-LET</p>
                      )
                    ) : listing.properties.category?.category_name ===
                      "For Sale" ? (
                      <p className="font-semibold text-xs p-0">SALE</p>
                    ) : (
                      <p className="font-semibold text-xs p-0">RENT</p>
                    )}
                  </div>
                  <div className="flex items-center content-center">
                    <button
                      type="button"
                      onClick={() =>
                        dispatch(likeListings(listing.properties.slug))
                      }
                      className="bg-transparent ring-cloud-theme-blue ring-1 flex justify-center items-center content-center rounded-full w-8 h-8 mr-4"
                    >
                      <AiOutlineHeart className="mt-0 md:text-lg text-[] text-white" />
                    </button>
                    <div>
                      <div className="rounded-md group">
                        <button
                          type="button"
                          className="bg-transparent ring-cloud-theme-blue ring-1 flex justify-center items-center content-center rounded-full w-8 h-8 mr-4"
                        >
                          <BsShareFill className="mt-0 md:text-lg text-sm text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:grid none grid-cols-2 gap-1 grid-rows-2 h-80 rounded-r-lg overflow-hidden">
                {listing.properties.Images?.slice(0, 4).flatMap(
                  (image, index) => (
                    <div className="h-full overflow-hidden" key={index}>
                      <img
                        src={`https://estatecloud.co.ke${image.images}`}
                        className="w-full h-full object-cover"
                        onClick={() => setIndex(index)}
                        alt={listing.properties.title.substring(0, 30)}
                      />
                    </div>
                  )
                )}
              </div>
            </>
          ) : (
            <>
              <div className="p-0 dark:bg-cloud-theme-dark animate-pulse bg-white h-80 w-full relative overflow-hidden rounded-l-lg">
                <div className="w-full h-full bg-gray-300"></div>
              </div>
              <div className="md:grid none grid-cols-2 gap-1 animate-pulse grid-rows-2 h-80 rounded-r-lg overflow-hidden">
                {[1, 2, 3, 4].flatMap((_, index) => (
                  <div className="h-full w-full bg-gray-300 overflow-hidden"></div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="px-0 py-2 font-semibold">
          <div className="px-0 my-2 w-full h-full shadow-sm dark:shadow-darkShadow">
            <Swiper className=" h-24" {...swiperParams}>
              {listing
                ? listing.properties.Images?.flatMap((image, index) => (
                    <SwiperSlide key={index} className="mt-2 ml-1">
                      <div className="h-20 rounded-xl overflow-hidden p-1.5 ring-cloud-theme-blue ring-1 ">
                        <img
                          onClick={() => setIndex(index)}
                          className="rounded-xl h-full w-full object-cover"
                          src={`https://estatecloud.co.ke${image.images}`}
                          alt={listing.properties.title.substring(0, 10)}
                        />
                      </div>
                    </SwiperSlide>
                  ))
                : [1, 2, 3, 4, 5, 6, 7, 8, 9].flatMap((_, index) => (
                    <SwiperSlide key={index} className="mt-2 ml-1">
                      <div className="h-20 rounded-xl bg-gray-300 animate-pulse"></div>
                    </SwiperSlide>
                  ))}
            </Swiper>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {listing ? (
            listing.properties.is_residential ? (
              <>
                <div
                  className="p-4 pl-0
                pt-10 mt-2"
                >
                  <div className="flex justify-between mb-3">
                    <h3 className="font-bold">{listing.properties.title}</h3>
                    {listing.properties.property_size ? (
                      <h4 className="flex place-content-center items-center text-sm text-cloud-theme-blue">
                        <BsSquare className="mr-1" />
                        {NumberFormatAcres(listing.properties.property_size)}
                        (acres)
                      </h4>
                    ) : (
                      ""
                    )}
                  </div>
                  <p className="mb-2">
                    {listing.properties.location_description}
                  </p>
                  {listing.properties.category?.category_name === "For Sale"
                    ? listing.properties.selling_price && (
                        <p className="font-bold mb-3">
                          KES {NumberFormat(listing.properties.selling_price)}
                        </p>
                      )
                    : listing.properties.rental_price && (
                        <p className="font-bold mb-3">
                          KES {NumberFormat(listing.properties.rental_price)}{" "}
                          <span>per month</span>
                        </p>
                      )}

                  <p className="flex items-center">
                    <GiEntryDoor className="mr-1 text-xl text-cloud-theme-blue" />
                    {listing.properties.listing_availability}
                  </p>
                  <div className="grid grid-cols-3 gap-4 mt-5 text-cloud-theme-blue">
                    <div className="flex flex-col shadow-md py-3 items-center place-content-center">
                      <BiBed className="text-2xl" />
                      <p className=" text-sm font-bold">
                        {listing.properties.bedrooms}
                      </p>
                    </div>
                    <div className="flex flex-col shadow-md py-3 items-center place-content-center">
                      <GiBathtub className="text-2xl" />
                      <p className=" text-sm font-bold">
                        {listing.properties.bathrooms}
                      </p>
                    </div>
                    <div className="flex flex-col shadow-md py-3 items-center place-content-center">
                      <IoCarSportSharp className="text-2xl" />
                      <p className=" text-sm font-bold">
                        {listing.properties.parking_spaces}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : listing.properties.is_commercial ? (
              <>
                <div
                  className="p-4
                pt-10 mt-2"
                >
                  <div className="flex justify-between mb-3">
                    <h3 className="font-bold">{listing.properties.title}</h3>
                    <h4 className="flex place-content-center items-center text-sm text-cloud-theme-blue">
                      <BsSquare className="mr-1" />
                      {listing.properties.area_to_let}m<sup>2</sup>
                    </h4>
                  </div>
                  <p className="mb-2">
                    {listing.properties.location_description}
                  </p>
                  {listing.properties.category?.category_name === "For Sale"
                    ? listing.properties.selling_price && (
                        <p className="font-bold mb-3">
                          KES {NumberFormat(listing.properties.selling_price)}
                        </p>
                      )
                    : listing.properties.rental_price && (
                        <p className="font-bold mb-3">
                          KES {NumberFormat(listing.properties.rental_price)}{" "}
                          <span>per month</span>
                        </p>
                      )}

                  <div className="flex items-center content-center justify-between">
                    <p className="flex items-center">
                      <GiEntryDoor className="mr-1 text-xl text-cloud-theme-blue" />
                      {listing.properties.listing_availability}
                    </p>
                    {listing.properties.is_negotiable ? (
                      <p className="flex items-center">Negotiable</p>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-5 text-cloud-theme-blue">
                    <div className="flex flex-col items-center place-content-center shadow-md py-3 px-2">
                      Occupancy
                      <p className=" text-sm font-bold">
                        {listing.properties.current_occupancy}
                      </p>
                    </div>
                    <div className="flex flex-col items-center place-content-center shadow-md py-3 px-2">
                      Class
                      <p className=" text-sm font-bold">
                        {listing.properties.building_class}
                      </p>
                    </div>
                    <div className="flex flex-col items-center place-content-center shadow-md py-3 px-2">
                      <IoCarSportSharp className="text-2xl" />
                      <p className=" text-sm font-bold">
                        {listing.properties.parking_spaces}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : listing.properties.is_land ? (
              <>
                <div
                  className="p-4
               pt-10 mt-2"
                >
                  <div className="flex justify-between mb-3">
                    <h3 className="font-bold">{listing.properties.title}</h3>
                    {listing.properties.property_size ? (
                      <h4 className="flex place-content-center items-center text-sm text-cloud-theme-blue">
                        <BsSquare className="mr-1" />
                        {NumberFormatAcres(listing.properties.property_size)}
                        (acres)
                      </h4>
                    ) : (
                      ""
                    )}
                  </div>
                  <p className="mb-2">
                    {listing.properties.location_description}
                  </p>
                  {listing.properties.category?.category_name === "For Sale"
                    ? listing.properties.selling_price && (
                        <p className="font-bold mb-3">
                          KES {NumberFormat(listing.properties.selling_price)}
                        </p>
                      )
                    : listing.properties.lease_price && (
                        <p className="font-bold mb-3">
                          KES {NumberFormat(listing.properties.lease_price)}{" "}
                          <span>per month</span>
                        </p>
                      )}

                  <div className="flex items-center content-center justify-between">
                    <p className="flex items-center">
                      <GiEntryDoor className="mr-1 text-xl text-cloud-theme-blue" />
                      {listing.properties.listing_availability}
                    </p>
                    {listing.properties.is_negotiable ? (
                      <p className="flex items-center">Negotiable</p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div
                  className="
             pt-0 mt-2 animate-pulse"
                >
                  <div className="flex justify-between mb-3 rounded-md w-full">
                    <p className="bg-gray-300 p-2 w-full rounded-md"></p>
                  </div>
                  <p className="bg-gray-300 p-2 mb-2 w-2/3 rounded-md "></p>
                  <p className="bg-gray-300 p-2 mb-3 w-10/12 rounded-md"></p>
                  <p className="bg-gray-300 p-2 w-1/3 rounded-md"></p>
                  <div className="grid grid-cols-4 gap-4 mt-5 text-cloud-theme-blue">
                    <div className="rounded-md bg-gray-300 px-5 py-6"></div>
                    <div className="rounded-md bg-gray-300"></div>
                    <div className="rounded-md bg-gray-300"></div>
                    <div className="rounded-md bg-gray-300"></div>
                  </div>
                </div>
              </>
            )
          ) : (
            <>
              <div
                className="
       pt-0 mt-2 animate-pulse"
              >
                <div className="flex justify-between mb-3 rounded-md w-full">
                  <p className="bg-gray-300 p-2 w-full rounded-md"></p>
                </div>
                <p className="bg-gray-300 p-2 mb-2 w-2/3 rounded-md "></p>
                <p className="bg-gray-300 p-2 mb-3 w-10/12 rounded-md"></p>
                <p className="bg-gray-300 p-2 w-1/3 rounded-md"></p>
                <div className="grid grid-cols-4 gap-4 mt-5 text-cloud-theme-blue">
                  <div className="rounded-md bg-gray-300 px-5 py-6"></div>
                  <div className="rounded-md bg-gray-300"></div>
                  <div className="rounded-md bg-gray-300"></div>
                  <div className="rounded-md bg-gray-300"></div>
                </div>
              </div>
            </>
          )}

          <div
            className="
          shadow-lg
          mt-4
          p-4
          pt-0           
          rounded-lg
          border-2 border-cloud-theme-blue
        "
          >
            <div className="px-0 py-4">
              <div className="flex justify-center items-center content-center">
                <img src={im3} alt="" className="rounded-full h-16 w-16 mb-3" />
              </div>

              <div className="border-b-2 pb-2 dark:border-cloud-theme-blue">
                <div className="flex flex-col justify-center w-64 m-auto dark:text-white">
                  {listing ? (
                    <>
                      <a
                        href={`tel:+${listing.properties.agent.phone}`}
                        className="
                  w-full
                  py-1
                  px-3
                  mb-2
                  sm:hidden
                  bg-cloud-theme-blue
                  text-white text-center text-base
                  flex justify-center items-center content-center
                "
                      >
                        <BsFillTelephoneFill className="mt-1.5 mr-5 text-sm text-white" />{" "}
                        Contact Agent
                      </a>
                      <ShowPhoneNumber
                        phone={listing?.properties.agent.phone}
                        openContactModal={openContactModal}
                        setOpenContactModal={setOpenContactModal}
                      />
                      <button
                        type="button"
                        onClick={() => setOpenContactModal(true)}
                        className="
                  w-full
                  py-1
                  px-3
                  mb-2
                  sm:block
                  hidden
                  bg-cloud-theme-blue
                  text-white text-center text-base
                  
                "
                      >
                        <p className="flex justify-center items-center content-center">
                          <BsFillTelephoneFill className=" mr-5 text-sm text-white" />{" "}
                          Contact Agent
                        </p>
                      </button>
                      <button
                        onClick={() => {}}
                        className="
                  w-full
                  py-1
                  px-3
                  mb-2
                  bg-cloud-theme-blue
                  text-white text-center text-base
                  flex justify-center items-center content-center
                "
                      >
                        <MdOutlineEmail className="mr-5 text-base text-white" />{" "}
                        Email Agent
                      </button>

                      <a
                        href={`https://wa.me/${listing.properties.agent.phone}?text=Hi, I saw a property posted on Estate Cloud.I'd like us to talk about it.`}
                        rel="noreferrer noopener"
                        target="_blank"
                        className="
                  w-full
                  py-1
                  px-3
                  mb-2
                  text-center text-base
                  border-2 border-cloud-theme-blue
                  text-cloud-theme-blue
                  dark:text-white
                  flex justify-center items-center content-center
                "
                      >
                        <BsWhatsapp className="mr-5 text-lg" />
                        Whatsapp
                      </a>
                      <p className="mb-2 text-center">or</p>
                      <button
                        type="button"
                        onClick={() => setOpenViewingModal(true)}
                        className="
                  w-full
                  py-1
                  px-3
                  mb-0
                  text-center text-base
                  border-2 border-cloud-theme-blue
                  text-cloud-theme-blue
                  dark:text-white
                  flex justify-center items-center content-center
                "
                      >
                        <BsEyeglasses className="mr-5 text-lg" />
                        Schedule Viewing
                      </button>
                      <ScheduleViewing
                        openViewingModal={openViewingModal}
                        setOpenViewingModal={setOpenViewingModal}
                        reportMessage={reportMessage}
                        reporting={reporting}
                        dispatch={dispatch}
                        slug={slug}
                      />
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            {/* <div className="m-auto mb-2">
              <div className="flex justify-center items-center content-center pb-2 mb-0 text-cloud-theme-blue dark:text-white">
                <div className="">
                  <AiOutlineInfoCircle className="text-3xl mr-2" />
                </div>
                <div className="border-b-2 border-white">
                  <Link to="#" className="pb-0 text-sm">
                    More properties from this estate agent
                  </Link>
                </div>
              </div>
            </div> */}
            {/* <Button onPress={() => Linking.openURL('mailto:support@example.com?subject=SendMail&body=Description') }
              title="support@example.com" /> */}
          </div>
        </div>
        <div className="sm:grid block sm:grid-cols-2 gap-4 mt-10">
          <div className=" overflow-y-scroll myScrollBar">
            <div className="flex justify-between items-center place-content-center px-3 pl-0 py-6 my-3 mb-2">
              <h3 className="font-semibold text-blue-600 text-xl">
                Description
              </h3>
              <button
                onClick={() => setOpenReportModal(true)}
                className="text-sm flex items-center place-content-center text-gray-500"
              >
                <AiOutlineWarning className="mr-1 text-cloud-theme-gold" />{" "}
                Report this listing
              </button>
            </div>
            <ReportListing
              openReportModal={openReportModal}
              setOpenReportModal={setOpenReportModal}
              reportMessage={reportMessage}
              dispatch={dispatch}
              slug={slug}
              reporting={reporting}
            />
            <div className="pl-0 px-3 dark:text-white h-60 overflow-y-scroll myScrollBar">
              {listing ? (
                parse(listing.properties.description)
              ) : (
                <div className="animate-pulse">
                  <div className="w-full mb-4">
                    <p className="w-full bg-gray-300 p-3 mb-2 rounded-md"></p>
                    <p className="w-9/12 bg-gray-300 p-3 mb-2 rounded-md"></p>
                    <p className="w-full bg-gray-300 p-3 mb-2 rounded-md"></p>
                    <p className="w-6/12 bg-gray-300 p-3 mb-2 rounded-md"></p>
                  </div>
                  <div className="w-full mb-2">
                    <p className="w-full bg-gray-300 p-3 mb-2 rounded-md"></p>
                    <p className="w-9/12 bg-gray-300 p-3 mb-2 rounded-md"></p>
                    <p className="w-full bg-gray-300 p-3 mb-2 rounded-md"></p>
                    <p className="w-6/12 bg-gray-300 p-3 mb-2 rounded-md"></p>
                  </div>
                </div>
              )}

              {/* <p className="my-3 text-center text-purple-300">more ...</p> */}
            </div>
          </div>
          {listing ? (
            <div className="h-[20rem] sm:mt-0 mt-3 sm:h-auto">
              {isLoaded ? (
                <GoogleMap
                  mapContainerClassName="w-full h-full"
                  center={{
                    lat: listing.geometry.coordinates[1],
                    lng: listing.geometry.coordinates[0],
                  }}
                  zoom={13}
                >
                  <Marker
                    position={{
                      lat: listing.geometry.coordinates[1],
                      lng: listing.geometry.coordinates[0],
                    }}
                    icon={
                      listing.properties.is_land
                        ? {
                            path: "M12 1c-3.148 0-6 2.553-6 5.702 0 3.148 2.602 6.907 6 12.298 3.398-5.391 6-9.15 6-12.298 0-3.149-2.851-5.702-6-5.702zm0 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm8 6h-3.135c-.385.641-.798 1.309-1.232 2h3.131l.5 1h-4.264l-.344.544-.289.456h.558l.858 2h-7.488l.858-2h.479l-.289-.456-.343-.544h-2.042l-1.011-1h2.42c-.435-.691-.848-1.359-1.232-2h-3.135l-4 8h24l-4-8zm-12.794 6h-3.97l1.764-3.528 1.516 1.528h1.549l-.859 2zm8.808-2h3.75l1 2h-3.892l-.858-2z",
                            fillColor: "black",
                            fillOpacity: 0.6,
                            strokeWeight: 0,
                            rotation: 0,
                            scale: 2,
                            anchor: new google.maps.Point(15, 30),
                          }
                        : listing.properties.is_commercial
                        ? {
                            path: "M24 24h-23v-16h6v-8h11v12h6v12zm-12-5h-3v4h3v-4zm4 0h-3v4h3v-4zm6 0h-2v4h2v-4zm-17 0h-2v4h2v-4zm11-5h-2v2h2v-2zm-5 0h-2v2h2v-2zm11 0h-2v2h2v-2zm-17 0h-2v2h2v-2zm11-4h-2v2h2v-2zm-5 0h-2v2h2v-2zm-6 0h-2v2h2v-2zm11-4h-2v2h2v-2zm-5 0h-2v2h2v-2zm5-4h-2v2h2v-2zm-5 0h-2v2h2v-2z",
                            fillColor: "black",
                            fillOpacity: 0.6,
                            strokeWeight: 0,
                            rotation: 0,
                            scale: 2,
                            anchor: new google.maps.Point(15, 30),
                          }
                        : {
                            path: "M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z",
                            fillColor: "black",
                            fillOpacity: 0.6,
                            strokeWeight: 0,
                            rotation: 0,
                            scale: 2,
                            anchor: new google.maps.Point(15, 30),
                          }
                    }
                  >
                    {/* <Tooltip>{listing.properties.title}</Tooltip> */}
                  </Marker>
                </GoogleMap>
              ) : (
                <div className="h-16 sm:h-auto">
                  <p>Fetching map ...</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gray-300 animate-pulse rounded-sm"></div>
          )}
        </div>
        {listing ? (
          listing.properties.is_land ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 md:mt-6">
              <div className="shadow-lg md:mt-4 mt-0 pl-0 md:p-4 p-0 mx-0 mb-6 rounded-lg">
                <div className="flex px-2 md:px-0 my-3">
                  <h4 className="text-xl font-semibold text-cloud-theme-blue">
                    Lease Information
                  </h4>
                </div>

                <div className="w-11/12 m-auto mb-10">
                  {listing.properties.lease_price && (
                    <div className="flex text-sm justify-between border-b-2 pb-2 mb-4">
                      <p className="dark:text-white">Lease Price</p>
                      <p className="dark:text-white">
                        KES {NumberFormat(listing.properties.lease_price)}
                      </p>
                    </div>
                  )}
                  {listing.properties.financing_type && (
                    <div className="flex text-sm justify-between border-b-2 pb-2 mb-4">
                      <p className="dark:text-white">Financing Type</p>
                      <p className="dark:text-white">
                        {listing.properties.financing_type}
                      </p>
                    </div>
                  )}
                  {listing.properties.price_per_plot && (
                    <div className="flex text-sm justify-between border-b-2 pb-2 mb-4">
                      <p className="dark:text-white">Price Per Plot</p>
                      <p className="dark:text-white">
                        KES {NumberFormat(listing.properties.price_per_plot)}
                      </p>
                    </div>
                  )}
                  {listing.properties.number_of_plots && (
                    <div className="flex text-sm justify-between border-b-2 pb-2 mb-4">
                      <p className="dark:text-white">Number of Plots</p>
                      <p className="dark:text-white">
                        {listing.properties.number_of_plots}
                      </p>
                    </div>
                  )}
                  {listing.properties.size_of_plots && (
                    <div className="flex text-sm justify-between border-b-2 pb-2 mb-4">
                      <p className="dark:text-white">Size of Plots</p>
                      <p className="dark:text-white">
                        {listing.properties.size_of_plots} (ft)
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="shadow-lg md:mt-4 mt-0 pl-0 md:p-4 p-0 mx-0 mb-6 rounded-lg">
                <div className="flex justify-between align-center place-content-center px-2 md:px-0 my-3">
                  <h4 className="text-xl font-semibold text-cloud-theme-blue">
                    Other Infomation
                  </h4>
                </div>
                <div className="w-11/12 m-auto mb-10">
                  <div className="flex text-sm justify-between border-b-2 pb-2 mb-4">
                    <p className="dark:text-white">Type of Property</p>
                    <p className="dark:text-white text-sm">
                      {listing.properties.property_type}
                    </p>
                  </div>
                  {listing.properties.financing_type && (
                    <div className="flex text-sm justify-between border-b-2 pb-2 mb-4">
                      <p className="dark:text-white">Financing Type</p>
                      <p className="dark:text-white">
                        {listing.properties.financing_type}
                      </p>
                    </div>
                  )}
                  {listing.properties.area_zonning && (
                    <div className="flex text-sm justify-between border-b-2 pb-2 mb-4">
                      <p className="dark:text-white">Area Zonning</p>
                      <p className="dark:text-white">
                        {listing.properties.area_zonning}
                      </p>
                    </div>
                  )}
                  {listing.properties.is_land
                    ? listing.properties.property_size && (
                        <div className="flex text-sm justify-between border-b-2 pb-2 mb-4">
                          <p className="dark:text-white">Property Size</p>
                          <p className="dark:text-white">
                            {NumberFormatAcres(
                              listing.properties.property_size
                            )}{" "}
                            (acres)
                          </p>
                        </div>
                      )
                    : ""}
                </div>
              </div>
            </div>
          ) : listing.properties.is_residential ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 md:mt-6">
              {listing.properties.category?.category_name === "For Rent" ? (
                <div className="shadow-lg md:mt-4 mt-0 pl-0 md:p-4 p-0 mb-6 rounded-lg">
                  <div className="flex px-2 md:px-0 my-3">
                    <h4 className="text-xl font-semibold text-cloud-theme-blue">
                      Rental Information
                    </h4>
                  </div>

                  <div className="w-11/12 m-auto mb-10">
                    {listing.properties.rental_price > 0 && (
                      <div className="flex text-sm justify-between border-b-2 pb-2 mb-4">
                        <p className="dark:text-white">Rental Price</p>
                        <p className="dark:text-white">
                          KES {NumberFormat(listing.properties.rental_price)}
                        </p>
                      </div>
                    )}
                    {listing.properties.service_cost > 0 && (
                      <div className="flex text-sm justify-between border-b-2 pb-2 mb-4">
                        <p className="dark:text-white">Service Cost</p>

                        <p className="dark:text-white">
                          KES {NumberFormat(listing.properties.service_cost)}
                        </p>
                      </div>
                    )}
                    {listing.properties.deposit > 0 && (
                      <div className="flex text-sm justify-between border-b-2 pb-2 mb-4">
                        <p className="dark:text-white">Deposit</p>
                        <p className="dark:text-white">
                          KES {NumberFormat(listing.properties.deposit)}
                        </p>
                      </div>
                    )}

                    {listing.properties.living_area && (
                      <div className="flex text-sm justify-between border-b-2 pb-2 mb-4">
                        <p className="dark:text-white">Living Area</p>
                        <p className="dark:text-white">
                          {NumberFormat(listing.properties.living_area)}ft
                          <sup>2</sup>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="shadow-lg md:mt-4 mt-0 pl-0 md:p-4 p-0 mb-6 rounded-lg">
                  <div className="flex px-2 md:px-0 my-3">
                    <h4 className="text-xl font-semibold text-cloud-theme-blue">
                      Sale Information
                    </h4>
                  </div>

                  <div className="w-11/12 m-auto mb-10">
                    {listing.properties.selling_price > 0 && (
                      <div className="flex text-sm justify-between border-b-2 pb-2 mb-4">
                        <p className="dark:text-white">Selling Price</p>
                        <p className="dark:text-white">
                          KES {NumberFormat(listing.properties.selling_price)}
                        </p>
                      </div>
                    )}
                    {/* {listing.properties.service_cost > 0 && (
                    <div className="flex text-sm justify-between border-b-2 pb-2 mb-4">
                      <p className="dark:text-white">Service Cost</p>

                      <p className="dark:text-white">
                        KES {NumberFormat(listing.properties.service_cost)}
                      </p>
                    </div>
                  )}
                  {listing.properties.deposit > 0 && (
                    <div className="flex text-sm justify-between border-b-2 pb-2 mb-4">
                      <p className="dark:text-white">Deposit</p>
                      <p className="dark:text-white">
                        KES {NumberFormat(listing.properties.deposit)}
                      </p>
                    </div>
                  )}

                  {listing.properties.living_area && (
                    <div className="flex text-sm justify-between border-b-2 pb-2 mb-4">
                      <p className="dark:text-white">Living Area</p>
                      <p className="dark:text-white">
                        {NumberFormat(listing.properties.living_area)}ft
                        <sup>2</sup>
                      </p>
                    </div>
                  )} */}
                  </div>
                </div>
              )}
              <div className="shadow-lg md:mt-4 mt-0 pl-0 md:p-4 p-0 mb-6 rounded-lg">
                <div className="flex justify-between align-center place-content-center px-2 md:px-0 my-3">
                  <h4 className="text-xl font-semibold text-cloud-theme-blue">
                    Construction
                  </h4>
                </div>
                <div className="w-11/12 m-auto mb-10">
                  <div className="flex text-sm justify-between border-b-2 pb-2 mb-4">
                    <p className="dark:text-white">Type of Property</p>
                    <p className="dark:text-white">
                      {listing.properties.property_type}
                    </p>
                  </div>
                  <div className="flex text-sm justify-between border-b-2 pb-2 mb-4">
                    <p className="dark:text-white">Year</p>
                    {listing.properties.year ? (
                      <p className="dark:text-white">
                        {listing.properties.year}
                      </p>
                    ) : (
                      <p>--</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 md:mt-6">
              {listing.properties.category?.category_name === "For Rent" ? (
                <div className="shadow-lg md:mt-4 mt-0 pl-0 md:p-4 p-0 mb-6 rounded-lg">
                  <div className="flex px-2 md:px-0 my-3">
                    <h4 className="text-xl font-semibold text-cloud-theme-blue">
                      Rental Information
                    </h4>
                  </div>
                  <div className="w-11/12 m-auto mb-10">
                    {listing.properties.parking_ratio && (
                      <div className="flex text-sm justify-between border-b-2 pb-2 mb-4">
                        <p className="dark:text-white">Parking Ratio</p>
                        <p className="dark:text-white">
                          {listing.properties.parking_ratio}
                        </p>
                      </div>
                    )}
                    {listing.properties.avg_monthly_cost && (
                      <div className="flex text-sm justify-between border-b-2 pb-2 mb-4">
                        <p className="dark:text-white">Avg Monthly Cost</p>
                        <p className="dark:text-white">
                          KES{" "}
                          {NumberFormat(listing.properties.avg_monthly_cost)}
                        </p>
                      </div>
                    )}
                    {listing.properties.gross_rent_multiplier && (
                      <div className="flex text-sm justify-between border-b-2 pb-2 mb-4">
                        <p className="dark:text-white">Rent Multiplier</p>
                        <p className="dark:text-white">
                          {listing.properties.gross_rent_multiplier}
                        </p>
                      </div>
                    )}
                    {listing.properties.rental_price && (
                      <div className="flex text-sm justify-between border-b-2 pb-2 mb-4">
                        <p className="dark:text-white">Rental Price</p>
                        <p className="dark:text-white">
                          KES {NumberFormat(listing.properties.rental_price)}
                        </p>
                      </div>
                    )}
                    {listing.properties.area_to_let && (
                      <div className="flex text-sm justify-between border-b-2 pb-2 mb-4">
                        <p className="dark:text-white">Area to Let</p>
                        <p className="dark:text-white">
                          {listing.properties.area_to_let}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="shadow-lg md:mt-4 mt-0 pl-0 md:p-4 p-0 mb-6 rounded-lg">
                  <div className="flex px-2 md:px-0 my-3">
                    <h4 className="text-xl font-semibold text-cloud-theme-blue">
                      Sale Information
                    </h4>
                  </div>

                  <div className="w-11/12 m-auto mb-10">
                    {listing.properties.selling_price > 0 && (
                      <div className="flex text-sm justify-between border-b-2 pb-2 mb-4">
                        <p className="dark:text-white">Selling Price</p>
                        <p className="dark:text-white">
                          KES {NumberFormat(listing.properties.selling_price)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div className="shadow-lg md:mt-4 mt-0 pl-0 md:p-4 p-0 mb-6 rounded-lg">
                <div className="flex justify-between align-center place-content-center px-2 md:px-0 my-3">
                  <h4 className="text-xl font-semibold text-cloud-theme-blue">
                    Construction
                  </h4>
                </div>
                <div className="w-11/12 m-auto mb-10">
                  {listing.properties.property_type && (
                    <div className="flex text-sm justify-between border-b-2 pb-2 mb-4">
                      <p className="dark:text-white">Property Type</p>
                      <p className="dark:text-white text-sm">
                        {listing.properties.property_type}
                      </p>
                    </div>
                  )}
                  {listing.properties.no_of_stories && (
                    <div className="flex text-sm justify-between border-b-2 pb-2 mb-4">
                      <p className="dark:text-white">Stories</p>
                      <p className="dark:text-white">
                        {listing.properties.no_of_stories}
                      </p>
                    </div>
                  )}
                  {listing.properties.loading_area && (
                    <div className="flex text-sm justify-between border-b-2 pb-2 mb-4">
                      <p className="dark:text-white">Loading Area</p>
                      <p className="dark:text-white">
                        {listing.properties.loading_area}
                      </p>
                    </div>
                  )}

                  <div className="flex text-sm justify-between border-b-2 pb-2 mb-4">
                    <p className="dark:text-white">Year</p>
                    {listing.properties.year ? (
                      <p className="dark:text-white">
                        {listing.properties.year}
                      </p>
                    ) : (
                      <p>-</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 md:mt-6">
            <div className="shadow-lg md:mt-4 mt-0 pl-0 md:p-4 p-0 md:mx-4 mb-6 rounded-lg">
              <div className="flex px-2 md:px-0 my-3">
                <h4 className="text-xl font-semibold text-cloud-theme-blue">
                  Rental Information
                </h4>
              </div>

              <div className="w-11/12 m-auto mb-10">
                <div className="flex text-sm justify-between border-b-2 pb-2 mb-4">
                  <p className="dark:text-white">Rental Price</p>
                  <p className="bg-gray-300 animate-pulse p-1.5 rounded-md w-6/12"></p>
                </div>
                <div className="flex text-sm justify-between border-b-2 pb-2 mb-4">
                  <p className="dark:text-white">Service Cost</p>
                  <p className="bg-gray-300 animate-pulse p-1.5 rounded-md w-6/12"></p>
                </div>
                <div className="flex text-sm justify-between border-b-2 pb-2 mb-4">
                  <p className="dark:text-white">Deposit</p>
                  <p className="bg-gray-300 animate-pulse p-1.5 rounded-md w-6/12"></p>
                </div>
                <div className="flex text-sm justify-between border-b-2 pb-2 mb-4">
                  <p className="dark:text-white">Living Area</p>
                  <p className="bg-gray-300 animate-pulse p-1.5 rounded-md w-6/12"></p>
                </div>
              </div>
            </div>
            <div className="shadow-lg md:mt-4 mt-0 pl-0 md:p-4 p-0 md:mx-4 mb-6 rounded-lg">
              <div className="flex justify-between align-center place-content-center px-2 md:px-0 my-3">
                <h4 className="text-xl font-semibold text-cloud-theme-blue">
                  Construction
                </h4>
                <FaAngleUp className="mt-2 text-xl" />
              </div>
              <div className="w-11/12 m-auto mb-10">
                <div className="flex text-sm justify-between border-b-2 pb-2 mb-4">
                  <p className="dark:text-white">Type of Property</p>
                  <p className="bg-gray-300 animate-pulse p-1.5 rounded-md w-6/12"></p>
                </div>
                <div className="flex text-sm justify-between border-b-2 pb-2 mb-4">
                  <p className="dark:text-white">Year</p>
                  <p className="bg-gray-300 animate-pulse p-1.5 rounded-md w-6/12"></p>
                </div>
              </div>
            </div>
          </div>
        )}
        {listing && listing.properties.is_residential ? (
          <div className="shadow-lg mt-4 p-0 md:p-4 mx-0 mb-11 rounded-lg overflow-hidden">
            <div className="overflow-hidden">
              <div
                className="flex justify-between items-center content-center px-2 md:px-0 my-3"
                onClick={togglePerks}
              >
                <h4 className="text-xl font-semibold text-blue-600">Perks</h4>
                {activePark ? <FaAngleUp /> : <FaAngleDown />}
              </div>
              <div
                ref={perkHeight}
                style={{ maxHeight: `${perkDivHeight}` }}
                className="transition-max-height ease-in duration-300"
              >
                <div className="grid h-full grid-cols-2 gap-4 px-3 dark:text-white">
                  {listing ? (
                    listing.properties.has_wifi ? (
                      <div className="flex justify-start items-center pb-2 mb-4">
                        <BsWifi className="mr-2 text-lg text-cloud-theme-blue" />
                        <p className="text-sm">Wi-Fi</p>
                      </div>
                    ) : (
                      ""
                    )
                  ) : (
                    <p className="bg-gray-300 animate-pulse p-1.5 rounded-md w-6/12"></p>
                  )}
                  {listing ? (
                    listing.properties.has_sauna ? (
                      <div className="flex justify-start items-center pb-2 mb-4">
                        <GiSteamBlast className="mr-2 text-lg text-cloud-theme-blue" />
                        <p className="text-sm">Sauna/steam</p>
                      </div>
                    ) : (
                      ""
                    )
                  ) : (
                    <p className="bg-gray-300 animate-pulse p-1.5 rounded-md w-6/12"></p>
                  )}
                  {listing ? (
                    listing.properties.has_garden ? (
                      <div className="flex justify-start items-center pb-2 mb-4">
                        <FaLeaf className="mr-2 text-lg text-cloud-theme-blue" />
                        <p className="text-sm">Garden</p>
                      </div>
                    ) : (
                      ""
                    )
                  ) : (
                    <p className="bg-gray-300 animate-pulse p-1.5 rounded-md w-6/12"></p>
                  )}
                  {listing ? (
                    listing.properties.has_swiming_pool ? (
                      <div className="flex justify-start items-center pb-2 mb-4">
                        <MdOutlinePool className="mr-2 text-lg text-cloud-theme-blue" />{" "}
                        <p className="text-sm">Swimming Pool</p>
                      </div>
                    ) : (
                      ""
                    )
                  ) : (
                    <p className="bg-gray-300 animate-pulse p-1.5 rounded-md w-6/12"></p>
                  )}
                  {listing ? (
                    listing.properties.is_petfriendly ? (
                      <div className="flex justify-start items-center pb-2 mb-4">
                        <MdPets className="text-cloud-theme-blue mr-2" />
                        <p className="text-sm">Pet Friendly</p>
                      </div>
                    ) : (
                      ""
                    )
                  ) : (
                    <p className="bg-gray-300 animate-pulse p-1.5 rounded-md w-6/12"></p>
                  )}
                  {listing ? (
                    listing.properties.has_gym ? (
                      <div className="flex justify-start items-center pb-2 mb-4">
                        <CgGym className="text-cloud-theme-blue mr-2" />
                        <p className="text-sm">Gym</p>
                      </div>
                    ) : (
                      ""
                    )
                  ) : (
                    <p className="bg-gray-300 animate-pulse p-1.5 rounded-md w-6/12"></p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <section className="px-0 mt-4">
          <div className="px-0">
            <h3 className="font-bold text-xl text-cloud-theme-blue mb-2">
              Similar Listings
            </h3>
          </div>
          <Swiper {...swiperParamsR}>
            {relatedListings && relatedListings.length > 0
              ? relatedListings.map((listing, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div className="pt-3 pl-0 pb-2">
                        <div className="h-48 md:h-52 rounded-t-xl overflow-hidden relative">
                          <Link href={`/listings/more-info/${listing.slug}`}>
                            <img
                              src={`https://estatecloud.co.ke${listing.Images[0]?.images}`}
                              alt={listing.title.substring(0, 40)}
                              className="w-full h-full"
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
                                ) : listing.category?.category_name ===
                                  "For Rent" ? (
                                  <p className="font-semibold text-xs text-cloud-theme-blue ">
                                    TO-LET
                                  </p>
                                ) : (
                                  <p className="font-semibold text-xs text-cloud-theme-blue ">
                                    LEASE
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="absolute top-3 md:right-3 right-1.5 text-white flex justify-between items-center content-center">
                              <div className="rounded-md mr-1.5">
                                <button
                                  type="button"
                                  onClick={() =>
                                    dispatch(likeListings(listing.slug))
                                  }
                                  className="bg-transparent dark:bg-cloud-theme-dark ring-cloud-theme-blue ring-1 flex justify-center rounded-full md:w-8 md:h-8 w-6 h-6 mr-2 nd:mr-4"
                                >
                                  <AiOutlineHeart className="mt-1.5 md:text-lg text-sm " />
                                </button>
                              </div>
                              <div className="rounded-md group">
                                <button
                                  type="button"
                                  className="bg-transparent dark:bg-cloud-theme-dark ring-cloud-theme-blue ring-1 flex justify-center rounded-full md:w-8 md:h-8 w-6 h-6 mr-1"
                                >
                                  <BsShareFill className="mt-1.5 md:text-lg text-sm" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Link href={`/listings/more-info/${listing.slug}`}>
                          <div className="p-2 pt-2 md:h-32 h-28 text-sm md:text-base rounded-lg dark:shadow-darkShadow shadow-lg z-10 opacity-100 bg-white dark:bg-cloud-theme-dark dark:text-white relative -top-6">
                            <p className=" text-opacity-0 mb-1">
                              {winCardWidth >= 830
                                ? truncateWords(listing.title, 40)
                                : truncateWords(listing.title, 35)}
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

                            <div className="flex justify-between content-center items-center pt-1 pb-2 mt-0">
                              <p className="text-cloud-theme-blue text-sm flex place-content-center">
                                <IoLocationSharp className="mt-[0.188rem] text-sm" />
                                {truncateWords(
                                  listing.location_description,
                                  15
                                )}
                              </p>
                              <p className="text-blue-500 ">
                                {NumberFormatAcres(listing.property_size)}
                                (acres)
                              </p>
                            </div>
                          </div>
                        </Link>
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
      </section>
    </>
  );
};
const ShowPhoneNumber = ({ openContactModal, setOpenContactModal, phone }) => {
  return (
    <Transition appear show={openContactModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-1010 overflow-y-auto"
        onClose={() => setOpenContactModal(true)}
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
                className="text-lg font-medium mb-4 leading-6 text-gray-900 mt-0"
              >
                Contact Me
              </Dialog.Title>
              <div>
                <p className="font-bold text-xl">+{phone}</p>
                <button
                  type="button"
                  onClick={() => setOpenContactModal(false)}
                  className="
                  w-full
                  py-2
                  rounded-md
                  shadow-md
                  px-3
                  mt-2
                  bg-cloud-theme-blue
                  text-white text-center text-base
                  flex justify-center items-center content-center
                "
                >
                  Close
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
const ScheduleViewing = ({
  openViewingModal,
  setOpenViewingModal,
  dispatch,
  slug,
  reportMessage,
  reporting,
}) => {
  const [date, setDate] = useState("");
  const [phone, setphone] = useState("");
  const [time, setTime] = useState("");
  const [dateErr, setDateErr] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [timeErr, setTimeErr] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    if (date === "") {
      setDateErr("This field is required");
      return;
    }
    if (time === "") {
      setTimeErr("This field is required");
      return;
    }
    if (phone === "") {
      setPhoneErr("This field is required");
      return;
    }
    setDateErr("");
    setTimeErr("");
    setPhoneErr("");
    const formData = new FormData();
    formData.append("phone", phone);
    formData.append("time", time);
    formData.append("date", date);
    formData.append("slug", slug);
    dispatch(scheduleViewing(formData));
  };
  return (
    <Transition appear show={openViewingModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-1010 overflow-y-auto"
        onClose={() => setOpenViewingModal(true)}
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
                Schedule Viewing For This Listing
              </Dialog.Title>
              <form className="mt-1" onSubmit={(e) => onSubmit(e)}>
                <div className="relative z-0 mb-6 w-full">
                  <p className="italic font-semibold text-sm mb-1">
                    Date of Viewing
                  </p>
                  {reportMessage && (
                    <p className="italic text-cloud-theme-gold font-semibold text-xxs mb-1">
                      {reportMessage}
                    </p>
                  )}

                  {dateErr && (
                    <p className="text-red-500 text-xxs">{dateErr}</p>
                  )}
                  <input
                    type="text"
                    name="overview"
                    id="overview"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    maxLength={50}
                    className="block p-2.5 w-full text-sm outline-none text-gray-900 bg-gray-50 rounded-sm border border-gray-300 
              focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                    placeholder="viewing date"
                  />
                </div>
                <div className="relative z-0 mb-6 w-full">
                  <p className="italic font-semibold text-sm mb-1">Time</p>
                  {reportMessage && (
                    <p className="italic text-cloud-theme-gold font-semibold text-xxs mb-1">
                      {reportMessage}
                    </p>
                  )}

                  {timeErr && (
                    <p className="text-red-500 text-xxs">{timeErr}</p>
                  )}
                  <input
                    type="text"
                    name="time"
                    id="overview"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    maxLength={50}
                    className="block p-2.5 w-full text-sm outline-none text-gray-900 bg-gray-50 rounded-sm border border-gray-300 
              focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                    placeholder="Time you are available for viewing"
                  />
                </div>
                <div className="relative z-0 mb-6 w-full">
                  <p className="italic font-semibold text-sm mb-1">Phone</p>
                  {reportMessage && (
                    <p className="italic text-cloud-theme-gold font-semibold text-xxs mb-1">
                      {reportMessage}
                    </p>
                  )}

                  {phoneErr && (
                    <p className="text-red-500 text-xxs">{phoneErr}</p>
                  )}
                  <input
                    type="text"
                    name="overview"
                    id="overview"
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}
                    maxLength={50}
                    className="block p-2.5 w-full text-sm outline-none text-gray-900 bg-gray-50 rounded-sm border border-gray-300 
              focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                    placeholder="Phone number"
                  />
                </div>
                <div></div>
                <div className="mt-5 flex items-center content-center justify-center w-full">
                  {reporting ? (
                    <SpinOne />
                  ) : (
                    <div className="grid grid-cols-2 gap-3 w-full">
                      <button
                        onClick={() => setOpenViewingModal(false)}
                        type="button"
                        className="outline-none border-none px-10 rounded-md py-2.5 bg-cloud-theme-blue text-white font-semibold"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="outline-none border-none px-10 rounded-md py-2.5 bg-cloud-theme-gold text-white font-semibold"
                      >
                        Submit
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
const ReportListing = ({
  openReportModal,
  setOpenReportModal,
  dispatch,
  slug,
  reportMessage,
  reporting,
}) => {
  const [complaint, setComplaint] = useState("");
  const [complaintErr, setComplaintErr] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    if (complaint === "") {
      setComplaintErr("This field is required");
      return;
    }
    dispatch(reportListing(slug, complaint));
    setComplaint("");
  };
  return (
    <Transition appear show={openReportModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-1010 overflow-y-auto"
        onClose={() => setOpenReportModal(true)}
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
                Report This Listing
              </Dialog.Title>
              <form className="mt-1" onSubmit={(e) => onSubmit(e)}>
                <div className="relative z-0 mb-6 w-full">
                  <p className="italic font-semibold text-sm mb-1">
                    Reason for Reporting
                  </p>
                  {reportMessage && (
                    <p className="italic text-cloud-theme-gold font-semibold text-xxs mb-1">
                      {reportMessage}
                    </p>
                  )}

                  {complaintErr && (
                    <p className="text-red-500 text-xxs">{complaintErr}</p>
                  )}
                  <textarea
                    type="summary"
                    name="overview"
                    id="overview"
                    value={complaint}
                    onChange={(e) => setComplaint(e.target.value)}
                    maxLength={240}
                    rows="4"
                    className="block p-2.5 w-full text-sm outline-none text-gray-900 bg-gray-50 rounded-sm border border-gray-300 
              focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                    placeholder="What's the reason for reporting this listing..."
                  />
                </div>
                <div></div>
                <div className="mt-5 flex items-center content-center justify-center w-full">
                  {reporting ? (
                    <SpinOne />
                  ) : (
                    <div className="grid grid-cols-2 gap-3 w-full">
                      <button
                        onClick={() => setOpenReportModal(false)}
                        type="button"
                        className="outline-none border-none px-10 rounded-md py-3 bg-cloud-theme-blue text-white font-semibold"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="outline-none border-none px-10 rounded-md py-3 bg-cloud-theme-blue text-white font-semibold"
                      >
                        Submit
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
export default ListingDetail;
