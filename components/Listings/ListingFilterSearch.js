import { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";
import Link from "next/link";
import { truncateWords, NumberFormat } from "../../utils/Truncate";
import { IoLocationSharp } from "react-icons/io5";
import { GoFlame } from "react-icons/go";
import { AiOutlineHeart } from "react-icons/ai";
import { IoListSharp } from "react-icons/io5";
import { GrMap } from "react-icons/gr";
import { BsShareFill } from "react-icons/bs";
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
import commercialMarker from "../images/Commercial.svg";
import houseMarker from "../images/house1.svg";
import landMarker from "../images/Land.svg";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import {
  likeListings,
  searchCommercialListings,
  searchLandListings,
  searchResidentialListings,
} from "../../state/actionCreators/listings";

import { SpinOne } from "../Spinners/Spinner";
import {
  SearchCommercialListingPagination,
  SearchLandListingPagination,
  SearchResidentialListingPagination,
} from "./ListingPagination";
import { RiMenuFoldLine } from "react-icons/ri";
import { useRouter } from "next/router";
// import { TrackpageView } from "../GAnalytics";

const Search = () => {
  const [mainCategory, setMainCategory] = useState("residential");
  const [isGrid, setIsGrid] = useState(true);
  const [openFilter, setOpenFilter] = useState(false);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMarker, setActiveMarker] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: -1.26538479248,
    lng: 36.81293735403939,
  });
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const [width, setWinWidth] = useState("");
  useEffect(() => {
    const getWindowWIdth = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        return width;
      }
      return null;
    };
    const handleResize = () => {
      setWinWidth(getWindowWIdth());
    };
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleActiveMarker = (index) => {
    if (index === activeMarker) {
      return;
    }
    setActiveMarker(index);
  };
  const router = useRouter();

  const query = "?search=" + searchQuery;
  const onSubmit = (e) => {
    e.preventDefault();
    if (mainCategory === "commercial") {
      dispatch(searchCommercialListings(query));
    } else if (mainCategory === "land") {
      dispatch(searchLandListings(query));
    } else {
      dispatch(searchResidentialListings(query));
    }
  };

  const residentialListings = useSelector(
    (state) => state.listings.residentialListings
  );
  const commercialListings = useSelector(
    (state) => state.listings.commercialListings
  );
  const landListings = useSelector((state) => state.listings.landListings);
  const residentialLoading = useSelector(
    (state) => state.listings.residentialLoading
  );
  const commercialLoading = useSelector(
    (state) => state.listings.commercialLoading
  );
  const landLoading = useSelector((state) => state.listings.landLoading);
  const next = useSelector((state) => state.listings.next);
  const prev = useSelector((state) => state.listings.prev);
  useEffect(() => {
    if (router.query.q) {
      setSearchQuery(router.query.q);
      console.log("rou search", searchQuery);
    }
    router.query.q = ""
    if (mainCategory === "commercial") {
      dispatch(searchCommercialListings(query));
    } else if (mainCategory === "land") {
      dispatch(searchLandListings(query));
    } else {
      dispatch(searchResidentialListings(query));
    }
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [query, mainCategory, dispatch]);
  // useEffect(() => {
  //   TrackpageView("/listings/search/properties");
  // }, []);
  return (
    <section className="mt-[5.3rem]">
      <div className="fixed top-[4.75rem] z-1020 px-3 xs-l:px-4 py-3 w-full bg-blue-50">
        <div className="flex flex-1 relative items-center content-center">
          <div className="xs-l:flex hidden shadow-md rounded-md mr-3 items-center content-center">
            <div className="flex relative h-10  flex-col rounded-md md:bg-blue-50 px-1 py-2 justify-center items-center text-xs text-center content-center mr-2 place-content-center">
              <label
                htmlFor="residential"
                className="text-xxs-s font-bold w-full h-full"
              >
                Residential
              </label>
              <input
                type="checkbox"
                checked={mainCategory === "residential"}
                id="residential"
                value="residential"
                className="p-1 hidden"
                onChange={(e) => setMainCategory(e.target.value)}
              />
              <div className="bg-white absolute bottom-2 rounded-full  w-3 h-3 flex flex-shrink-0 justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  className="fill-current hidden w-3 h-3 text-cloud-theme-gold pointer-events-none"
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
            <div className="flex relative h-10  flex-col rounded-md md:bg-blue-50 px-1 py-2 justify-center items-center text-xs text-center content-center mr-2 place-content-center">
              <label
                htmlFor="land"
                className="text-xxs-s font-bold w-full h-full"
              >
                Land
              </label>
              <input
                type="checkbox"
                checked={mainCategory === "land"}
                id="land"
                value="land"
                className="p-1 hidden"
                onChange={(e) => setMainCategory(e.target.value)}
              />
              <div className="bg-white absolute bottom-2 rounded-full  w-3 h-3 flex flex-shrink-0 justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  className="fill-current hidden w-3 h-3 text-cloud-theme-gold pointer-events-none"
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
            <div className="flex relative h-10  flex-col rounded-md md:bg-blue-50 px-1 py-2 justify-center items-center text-xs text-center content-center mr-2 place-content-center">
              <label
                htmlFor="commercial"
                className="text-xxs-s font-bold w-full h-full"
              >
                Commercial
              </label>
              <input
                type="checkbox"
                checked={mainCategory === "commercial"}
                id="commercial"
                value="commercial"
                className="p-1 hidden"
                onChange={(e) => setMainCategory(e.target.value)}
              />
              <div className="bg-white absolute bottom-2 rounded-full  w-3 h-3 flex flex-shrink-0 justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  className="fill-current hidden w-3 h-3 text-cloud-theme-gold pointer-events-none"
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
          <div className="xs-l:hidden mr-2">
            <button
              className="border-none outline-none cursor-pointer"
              type="button"
              onClick={() => setOpenFilter(!openFilter)}
            >
              <RiMenuFoldLine className="text-2xl mt-1" />
            </button>
            <div
              className={
                openFilter
                  ? `absolute top-0 z-80 -left-3 w-screen h-screen transition-all bg-gray-200 duration-300 ease-in`
                  : `absolute top-0 z-80 -left-full h-screen transition-all bg-gray-200 duration-300 ease-in`
              }
            >
              <div
                onClick={() => {
                  setOpenFilter(!openFilter);
                  setMainCategory("residential");
                }}
                className="flex relative h-10  flex-col rounded-md px-1 py-2 justify-center items-center text-xs text-center content-center mr-2 place-content-center"
              >
                <label
                  htmlFor="residential"
                  className="text-xxs-s font-bold w-full h-full"
                >
                  Residential
                </label>
                <input
                  type="checkbox"
                  checked={mainCategory === "residential"}
                  id="residential"
                  value="residential"
                  className="p-1 hidden"
                  onChange={(e) => setMainCategory(e.target.value)}
                />
                <div className="bg-white absolute bottom-2 rounded-full  w-3 h-3 flex flex-shrink-0 justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="fill-current hidden w-3 h-3 text-cloud-theme-gold pointer-events-none"
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
              <div
                onClick={() => {
                  setOpenFilter(!openFilter);
                  setMainCategory("land");
                }}
                className="flex relative h-10  flex-col rounded-md px-1 py-2 justify-center items-center text-xs text-center content-center mr-2 place-content-center"
              >
                <label
                  htmlFor="land"
                  className="text-xxs-s font-bold w-full h-full"
                >
                  Land
                </label>
                <input
                  type="checkbox"
                  checked={mainCategory === "land"}
                  id="land"
                  value="land"
                  className="p-1 hidden"
                  onChange={(e) => setMainCategory(e.target.value)}
                />
                <div className="bg-white absolute bottom-2 rounded-full  w-3 h-3 flex flex-shrink-0 justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="fill-current hidden w-3 h-3 text-cloud-theme-gold pointer-events-none"
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
              <div
                onClick={() => {
                  setOpenFilter(!openFilter);
                  setMainCategory("commercial");
                }}
                className="flex relative h-10  flex-col rounded-md px-1 py-2 justify-center items-center text-xs text-center content-center mr-2 place-content-center"
              >
                <label
                  htmlFor="commercial"
                  className="text-xxs-s font-bold w-full h-full"
                >
                  Commercial
                </label>
                <input
                  type="checkbox"
                  checked={mainCategory === "commercial"}
                  id="commercial"
                  value="commercial"
                  className="p-1 hidden"
                  onChange={(e) => setMainCategory(e.target.value)}
                />
                <div className="bg-white absolute bottom-2 rounded-full  w-3 h-3 flex flex-shrink-0 justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="fill-current hidden w-3 h-3 text-cloud-theme-gold pointer-events-none"
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
          <form
            className="flex flex-1 relative rounded-lg  shadow-md mr-3 xs-1:mr-5"
            onSubmit={onSubmit}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-lg  dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white
              bg-gray-50 border border-1 dark:border-cloud-theme-blue outline-none border-gray-300 
              text-gray-900 focus:border-cloud-theme-blue block flex-1 w-full text-sm p-2 xs-1:p-2.5"
              placeholder="e.g. location, area, price etc"
            />
          </form>
          <div className="text-sm justify-between items-center content-center">
            <ul className="flex">
              {isGrid ? (
                <li
                  onClick={() => setIsGrid(!isGrid)}
                  className="flex justify-center rounded-lg shadow-md xs-1:px-4 px-3 xs-1:py-3 py-2 items-center content-center text-sm"
                >
                  <GrMap className="mr-1 text-base" />
                  map
                </li>
              ) : (
                <li
                  onClick={() => setIsGrid(!isGrid)}
                  className="flex justify-center rounded-lg shadow-md xs-1:px-4 px-3 xs-1:py-3 py-2 items-center content-center text-sm"
                >
                  <IoListSharp className="mr-1 text-base" />
                  grid
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      {isGrid ? (
        <>
          <div className="mt-[8.6rem] px-4 md:px-16 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
            {mainCategory === "residential" ? (
              residentialLoading ? (
                <div className="flex col-span-3 w-full h-[24rem] items-center justify-center content-center">
                  <SpinOne />
                </div>
              ) : !residentialLoading && residentialListings.length <= 0 ? (
                <div className="flex sticky top- col-span-3 w-full h-[24rem] items-center justify-center content-center">
                  <p className="font-semibold mt-24">
                    No items found. Filter more
                  </p>
                </div>
              ) : (
                residentialListings &&
                residentialListings.flatMap((listing, index) => {
                  return (
                    <div className="pt-3 pl-0 overflow-hidden" key={index}>
                      <div className="h-52 rounded-t-xl overflow-hidden relative">
                        <Link
                          href={`/listings/more-info/${listing.properties.slug}`}
                        >
                          <img
                            src={listing.properties.Images[0]?.images}
                            alt={listing.properties.title}
                            className="w-full h-full object-cover"
                          />
                        </Link>
                        <div className="flex justify-between items-center content-center">
                          <div className="absolute top-3 left-3 text-white dark:text-black flex justify-between items-center content-center">
                            <div className=" bg-cloud-theme-red py-1.5 px-3 rounded-md mr-1.5">
                              <p className="font-bold">
                                <GoFlame className="text-xs dark:text-black" />
                              </p>
                            </div>
                            <div className="bg-white py-1 px-2 rounded-md dark:bg-cloud-theme-dark">
                              {listing.properties.category?.category_name ===
                              "For Sale" ? (
                                <p className="font-semibold text-xs text-cloud-theme-blue ">
                                  SALE
                                </p>
                              ) : (
                                <p className="font-semibold text-xs text-cloud-theme-blue ">
                                  TO LET
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="absolute top-3 right-2 text-white flex justify-between items-center content-center">
                            <div className="text-white  rounded-md mr-1.5">
                              <button
                                type="button"
                                onClick={() =>
                                  dispatch(
                                    likeListings(listing.properties.slug)
                                  )
                                }
                                className="bg-transparent dark:bg-cloud-theme-dark ring-cloud-theme-blue ring-1 flex justify-center rounded-full w-6 h-6 mr-4"
                              >
                                <AiOutlineHeart className="mt-1 text-base text-white" />
                              </button>
                            </div>
                            <div>
                              <div className="rounded-md group">
                                <button
                                  type="button"
                                  className="bg-transparent ring-cloud-theme-blue ring-1 flex justify-center items-center content-center rounded-full w-8 h-8 mr-1"
                                >
                                  <BsShareFill className="mt-0 md:text-lg text-sm text-white" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Link
                        href={`/listings/more-info/${listing.properties.slug}`}
                      >
                        <div className="p-2 pt-2 h-32 rounded-lg dark:shadow-darkShadow shadow-lg z-10 opacity-100 bg-white dark:bg-cloud-theme-dark dark:text-white relative -top-6">
                          <p className="md:text-base text-xxs-l text-opacity-0 mb-2">
                            {width >= 1000
                              ? truncateWords(listing.properties.title, 45)
                              : width >= 840 && width < 1000
                              ? truncateWords(listing.properties.title, 55)
                              : width > 768 && width < 840
                              ? truncateWords(listing.properties.title, 40)
                              : width >= 630 && width <= 768
                              ? truncateWords(listing.properties.title, 68)
                              : width >= 500 && width < 630
                              ? truncateWords(listing.properties.title, 55)
                              : truncateWords(listing.properties.title, 72)}
                          </p>
                          <div className="flex justify-between font-bold">
                            {listing.properties.category?.category_name ===
                              "For Rent" ||
                            listing.properties.category?.category_name ===
                              "To Let"
                              ? listing.properties.rental_price && (
                                  <p className="text-base">
                                    KES{" "}
                                    {NumberFormat(
                                      listing.properties.rental_price
                                    )}
                                  </p>
                                )
                              : listing.properties.category?.category_name ===
                                "For Sale"
                              ? listing.properties.selling_price && (
                                  <p className="text-base">
                                    KES{" "}
                                    {NumberFormat(
                                      listing.properties.selling_price
                                    )}
                                  </p>
                                )
                              : listing.properties.lease_price && (
                                  <p className="text-base">
                                    KES{" "}
                                    {NumberFormat(
                                      listing.properties.lease_price
                                    )}
                                  </p>
                                )}
                            {listing.properties.is_negotiable && (
                              <p>negotiable</p>
                            )}
                          </div>

                          <div className="flex justify-between content-center items-center py-2 mt-0">
                            <p className="text-cloud-theme-blue text-sm flex place-content-center">
                              <IoLocationSharp
                                style={{ marginTop: 3, fontSize: 15 }}
                              />
                              {truncateWords(
                                listing.properties.location_description,
                                23
                              )}
                            </p>
                            <p className="text-blue-500 text-sm">
                              {NumberFormat(listing.properties.living_area)}ft
                              <sup>2</sup>
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })
              )
            ) : mainCategory === "commercial" ? (
              commercialLoading ? (
                <div className="flex col-span-3 w-full h-[24rem] items-center justify-center content-center">
                  <SpinOne />
                </div>
              ) : !commercialLoading && commercialListings.length <= 0 ? (
                <div className="flex sticky top- col-span-3 w-full h-[24rem] items-center justify-center content-center">
                  <p className="font-semibold mt-24">
                    No items found. Filter more
                  </p>
                </div>
              ) : (
                commercialListings &&
                commercialListings.flatMap((listing, index) => {
                  return (
                    <div className="pt-3 pl-0 overflow-hidden" key={index}>
                      <div className="h-52 rounded-t-xl overflow-hidden relative">
                        <Link
                          href={`/listings/more-info/${listing.properties.slug}`}
                        >
                          <img
                            src={listing.properties.Images[0]?.images}
                            alt={listing.properties.title}
                            className="w-full h-full object-cover"
                          />
                        </Link>
                        <div className="flex justify-between items-center content-center">
                          <div className="absolute top-3 left-3 text-white dark:text-black flex justify-between items-center content-center">
                            <div className=" bg-cloud-theme-red py-1.5 px-3 rounded-md mr-1.5">
                              <p className="font-bold">
                                <GoFlame className="text-xs dark:text-black" />
                              </p>
                            </div>
                            <div className="bg-white py-1 px-2 rounded-md dark:bg-cloud-theme-dark">
                              {listing.properties.category?.category_name ===
                              "For Sale" ? (
                                <p className="font-semibold text-xs text-cloud-theme-blue ">
                                  SALE
                                </p>
                              ) : (
                                <p className="font-semibold text-xs text-cloud-theme-blue ">
                                  TO LET
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="absolute top-3 right-2 text-white flex justify-between items-center content-center">
                            <div className="text-white  rounded-md mr-1.5">
                              <button
                                type="button"
                                onClick={() =>
                                  dispatch(
                                    likeListings(listing.properties.slug)
                                  )
                                }
                                className="bg-transparent dark:bg-cloud-theme-dark ring-cloud-theme-blue ring-1 flex justify-center rounded-full w-6 h-6 mr-4"
                              >
                                <AiOutlineHeart className="mt-1 text-base text-white" />
                              </button>
                            </div>
                            <div>
                              <div className="rounded-md group">
                                <button
                                  type="button"
                                  className="bg-transparent ring-cloud-theme-blue ring-1 flex justify-center items-center content-center rounded-full w-8 h-8 mr-1"
                                >
                                  <BsShareFill className="mt-0 md:text-lg text-sm text-white" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Link
                        href={`/listings/more-info/${listing.properties.slug}`}
                      >
                        <div className="p-2 pt-2 h-32 rounded-lg dark:shadow-darkShadow shadow-lg z-10 opacity-100 bg-white dark:bg-cloud-theme-dark dark:text-white relative -top-6">
                          <p className="md:text-base text-xxs-l text-opacity-0 mb-2">
                            {width >= 1000
                              ? truncateWords(listing.properties.title, 45)
                              : width >= 840 && width < 1000
                              ? truncateWords(listing.properties.title, 55)
                              : width > 768 && width < 840
                              ? truncateWords(listing.properties.title, 40)
                              : width >= 630 && width <= 768
                              ? truncateWords(listing.properties.title, 68)
                              : width >= 500 && width < 630
                              ? truncateWords(listing.properties.title, 55)
                              : truncateWords(listing.properties.title, 72)}
                          </p>
                          <div className="flex justify-between font-bold">
                            {listing.properties.category?.category_name ===
                              "For Rent" ||
                            listing.properties.category?.category_name ===
                              "To Let"
                              ? listing.properties.rental_price && (
                                  <p className="text-base">
                                    KES{" "}
                                    {NumberFormat(
                                      listing.properties.rental_price
                                    )}
                                  </p>
                                )
                              : listing.properties.category?.category_name ===
                                "For Sale"
                              ? listing.properties.selling_price && (
                                  <p className="text-base">
                                    KES{" "}
                                    {NumberFormat(
                                      listing.properties.selling_price
                                    )}
                                  </p>
                                )
                              : listing.properties.lease_price && (
                                  <p className="text-base">
                                    KES{" "}
                                    {NumberFormat(
                                      listing.properties.lease_price
                                    )}
                                  </p>
                                )}
                            {listing.properties.is_negotiable && (
                              <p>negotiable</p>
                            )}
                          </div>
                          <div className="flex justify-between content-center items-center py-2 mt-0">
                            <p className="text-cloud-theme-blue text-sm flex place-content-center">
                              <IoLocationSharp
                                style={{ marginTop: 3, fontSize: 15 }}
                              />
                              {truncateWords(
                                listing.properties.location_description,
                                23
                              )}
                            </p>
                            <p className="text-blue-500 text-sm">
                              {NumberFormat(listing.properties.living_area)}ft
                              <sup>2</sup>
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })
              )
            ) : landLoading ? (
              <div className="flex col-span-3 w-full h-[24rem] items-center justify-center content-center">
                <SpinOne />
              </div>
            ) : !landLoading && landListings.length <= 0 ? (
              <div className="flex sticky top- col-span-3 w-full h-[24rem] items-center justify-center content-center">
                <p className="font-semibold mt-24">
                  No items found. Filter more
                </p>
              </div>
            ) : (
              landListings &&
              landListings.flatMap((listing, index) => {
                return (
                  <div className="pt-3 pl-0 overflow-hidden" key={index}>
                    <div className="h-52 rounded-t-xl overflow-hidden relative">
                      <Link
                        href={`/listings/more-info/${listing.properties.slug}`}
                      >
                        <img
                          src={listing.properties.Images[0]?.images}
                          alt={listing.properties.title}
                          className="w-full h-full  object-cover"
                        />
                      </Link>
                      <div className="flex justify-between items-center content-center">
                        <div className="absolute top-3 left-3 text-white dark:text-black flex justify-between items-center content-center">
                          <div className=" bg-cloud-theme-red py-2 px-4 rounded-md mr-1.5">
                            <p className="font-bold">
                              <GoFlame className="text-xs dark:text-black" />
                            </p>
                          </div>
                          <div className="bg-white py-1.5 px-2.5 rounded-md dark:bg-cloud-theme-dark">
                            {listing.properties.category?.category_name ===
                            "For Sale" ? (
                              <p className="font-semibold text-xs text-cloud-theme-blue ">
                                SALE
                              </p>
                            ) : (
                              <p className="font-semibold text-xs text-cloud-theme-blue ">
                                TO LET
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="absolute top-3 right-2 text-white flex justify-between items-center content-center">
                          <div className="text-white  rounded-md mr-1.5">
                            <button
                              type="button"
                              onClick={() =>
                                dispatch(likeListings(listing.properties.slug))
                              }
                              className="bg-transparent dark:bg-cloud-theme-dark ring-cloud-theme-blue ring-1 flex justify-center rounded-full w-6 h-6 mr-4"
                            >
                              <AiOutlineHeart className="mt-1 text-base text-white" />
                            </button>
                          </div>
                          <div>
                            <div className="rounded-md group">
                              <button
                                type="button"
                                className="bg-transparent ring-cloud-theme-blue ring-1 flex justify-center items-center content-center rounded-full w-8 h-8 mr-1"
                              >
                                <BsShareFill className="mt-0 md:text-lg text-sm text-white" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Link
                      href={`/listings/more-info/${listing.properties.slug}`}
                    >
                      <div className="p-2 pt-2 h-32 rounded-lg dark:shadow-darkShadow shadow-lg z-10 opacity-100 bg-white dark:bg-cloud-theme-dark dark:text-white relative -top-6">
                        <p className="md:text-base text-xxs-l text-opacity-0 mb-2">
                          {width >= 1000
                            ? truncateWords(listing.properties.title, 45)
                            : width >= 840 && width < 1000
                            ? truncateWords(listing.properties.title, 55)
                            : width > 768 && width < 840
                            ? truncateWords(listing.properties.title, 40)
                            : width >= 630 && width <= 768
                            ? truncateWords(listing.properties.title, 68)
                            : width >= 500 && width < 630
                            ? truncateWords(listing.properties.title, 55)
                            : truncateWords(listing.properties.title, 72)}
                        </p>
                        <div className="flex justify-between font-bold">
                          {listing.properties.category?.category_name ===
                            "For Rent" ||
                          listing.properties.category?.category_name ===
                            "To Let"
                            ? listing.properties.rental_price && (
                                <p className="text-base">
                                  KES{" "}
                                  {NumberFormat(
                                    listing.properties.rental_price
                                  )}
                                </p>
                              )
                            : listing.properties.category?.category_name ===
                              "For Sale"
                            ? listing.properties.selling_price && (
                                <p className="text-base">
                                  KES{" "}
                                  {NumberFormat(
                                    listing.properties.selling_price
                                  )}
                                </p>
                              )
                            : listing.properties.lease_price && (
                                <p className="text-base">
                                  KES{" "}
                                  {NumberFormat(listing.properties.lease_price)}
                                </p>
                              )}
                          {listing.properties.is_negotiable && (
                            <p>negotiable</p>
                          )}
                        </div>

                        <div className="flex justify-between content-center items-center py-2 mt-0">
                          <p className="text-cloud-theme-blue text-sm flex place-content-center">
                            <IoLocationSharp
                              style={{ marginTop: 3, fontSize: 15 }}
                            />
                            {truncateWords(
                              listing.properties.location_description,
                              23
                            )}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })
            )}
          </div>
          <div className="flex items-center mb-4 justify-center content-center">
            {mainCategory === "commercial" ? (
              <SearchCommercialListingPagination
                myPostPrev={prev}
                myPostNext={next}
                dispatch={dispatch}
              />
            ) : mainCategory === "land" ? (
              <SearchLandListingPagination
                myPostPrev={prev}
                myPostNext={next}
                dispatch={dispatch}
              />
            ) : (
              <SearchResidentialListingPagination
                myPostPrev={prev}
                myPostNext={next}
                dispatch={dispatch}
              />
            )}
          </div>
        </>
      ) : (
        <>
          <div className="w-full mt-[8.8rem] px-1 h-screen relative">
            {mainCategory === "residential" ? (
              residentialListings && residentialListings.length > 0 ? (
                <>
                  {isLoaded ? (
                    <GoogleMap
                      mapContainerClassName="w-full h-full"
                      center={mapCenter}
                      zoom={13}
                    >
                      {residentialListings.flatMap((listing, index) => (
                        <ListingMarkerView
                          handleActiveMarker={handleActiveMarker}
                          setMapCenter={setMapCenter}
                          activeMarker={activeMarker}
                          setActiveMarker={setActiveMarker}
                          listing={listing}
                          index={index}
                          mapCenter={mapCenter}
                        />
                      ))}
                    </GoogleMap>
                  ) : (
                    <p>Fetching map</p>
                  )}
                </>
              ) : (
                <SpinOne />
              )
            ) : mainCategory === "land" ? (
              landListings && landListings.length > 0 ? (
                <>
                  {isLoaded ? (
                    <GoogleMap
                      mapContainerClassName="w-full h-full"
                      center={mapCenter}
                      zoom={13}
                    >
                      {landListings.flatMap((listing, index) => (
                        <ListingMarkerView
                          handleActiveMarker={handleActiveMarker}
                          setMapCenter={setMapCenter}
                          activeMarker={activeMarker}
                          setActiveMarker={setActiveMarker}
                          listing={listing}
                          index={index}
                          mapCenter={mapCenter}
                        />
                      ))}
                    </GoogleMap>
                  ) : (
                    <p>Fetching map ...</p>
                  )}
                </>
              ) : (
                <SpinOne />
              )
            ) : commercialListings && commercialListings.length > 0 ? (
              <>
                {isLoaded ? (
                  <GoogleMap
                    mapContainerClassName="w-full h-full"
                    center={mapCenter}
                    zoom={13}
                  >
                    {commercialListings.flatMap((listing, index) => (
                      <ListingMarkerView
                        handleActiveMarker={handleActiveMarker}
                        setMapCenter={setMapCenter}
                        activeMarker={activeMarker}
                        setActiveMarker={setActiveMarker}
                        listing={listing}
                        index={index}
                        mapCenter={mapCenter}
                      />
                    ))}
                  </GoogleMap>
                ) : (
                  <p>Fetching map ...</p>
                )}
              </>
            ) : (
              <SpinOne />
            )}
          </div>
          <div className="flex items-center mt-4 justify-center content-center">
            {mainCategory === "commercial" ? (
              <SearchCommercialListingPagination
                myPostPrev={prev}
                myPostNext={next}
                dispatch={dispatch}
              />
            ) : mainCategory === "land" ? (
              <SearchLandListingPagination
                myPostPrev={prev}
                myPostNext={next}
                dispatch={dispatch}
              />
            ) : (
              <SearchResidentialListingPagination
                myPostPrev={prev}
                myPostNext={next}
                dispatch={dispatch}
              />
            )}
          </div>
        </>
      )}
    </section>
  );
};

const ListingMarkerView = ({
  listing,
  setActiveMarker,
  index,
  handleActiveMarker,
  activeMarker,
  setMapCenter,
}) => {
  const google = window.google;
  const markerPosition = {
    lat: listing.geometry.coordinates[1],
    lng: listing.geometry.coordinates[0],
  };
  return (
    <>
      <Marker
        position={markerPosition}
        onClick={() => {
          handleActiveMarker(index);
          setMapCenter(markerPosition);
        }}
        key={index}
        icon={
          listing.properties.is_land
            ? {
                path: "M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z",
                fillColor: "blue",
                fillOpacity: 0.6,
                strokeWeight: 0,
                rotation: 0,
                scale: 2,
                anchor: new google.maps.Point(15, 30),
              }
            : listing.properties.is_commercial
            ? {
                path: "M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z",
                fillColor: "green",
                fillOpacity: 0.6,
                strokeWeight: 0,
                rotation: 0,
                scale: 2,
                anchor: new google.maps.Point(15, 30),
              }
            : {
                path: "M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z",
                fillColor: "yellow",
                fillOpacity: 0.6,
                strokeWeight: 0,
                rotation: 0,
                scale: 2,
                anchor: new google.maps.Point(15, 30),
              }
        }
      >
        {activeMarker === index ? (
          <InfoWindow onCloseClick={() => setActiveMarker(null)}>
            <Link href={`/listings/more-info/${listing.properties.slug}`}>
              <div className="p-0 rounded-lg mt-0 w-60 h-full">
                <div className="h-40 rounded-t-lg overflow-hidden relative">
                  <img
                    src={listing.properties.Images[0]?.images}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-white py-0 px-0 rounded-sm">
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
                        <p className="font-semibold m-0 text-xs px-1.5 py-1">
                          SALE
                        </p>
                      ) : (
                        <p className="font-semibold text-xs p-0">TO-LET</p>
                      )
                    ) : listing.properties.category?.category_name ===
                      "For Sale" ? (
                      <p className="font-semibold m-0 text-xs px-1.5 py-1">
                        SALE
                      </p>
                    ) : (
                      <p className="font-semibold text-xs p-0">RENT</p>
                    )}
                  </div>
                </div>
                <div className="p-2 pt-1 rounded-md z-10 opacity-100 bg-white relative -top-6">
                  <h5 className="text-sm text-opacity-0 mb-2">
                    {truncateWords(listing.properties.title, 60)}
                  </h5>
                  <div className="flex justify-between font-bold">
                    {listing.properties.is_land ? (
                      listing.properties.category?.category_name ===
                      "For Sale" ? (
                        <h5 className="text-xs mb-1">
                          KES {listing.properties.selling_price}
                        </h5>
                      ) : (
                        <h5 className="text-xs mb-1">
                          KES {listing.properties.lease_price}
                        </h5>
                      )
                    ) : listing.properties.category?.category_name ===
                      "For Sale" ? (
                      <h5 className="text-xs mb-1">
                        KES {listing.properties.selling_price}
                      </h5>
                    ) : (
                      <h5 className="text-xs mb-1">
                        KES {listing.properties.rental_price}
                      </h5>
                    )}

                    {listing.properties.is_negotiable ? (
                      <h5 className="text-xs mb-1">negotiable</h5>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="flex justify-between content-center items-center py-1 mt-0">
                    <p className="text-cloud-theme-blue text-xs flex place-content-center">
                      <IoLocationSharp className="mt-0.5 text-xs" />
                      {truncateWords(
                        listing.properties.location_description,
                        24
                      )}
                    </p>
                    <p className="text-cloud-theme-blue text-xs">
                      {listing.properties.is_residential ? (
                        <>
                          {NumberFormat(listing.properties.property_size)}ft
                          <sup>2</sup>
                        </>
                      ) : (
                        ""
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </InfoWindow>
        ) : null}
        {/* <Tooltip>{listing.properties.title}</Tooltip> */}
      </Marker>
    </>
  );
};

// const ListingMarkerView = ({ listing, index }) => {
//   console.log("marker view");
//   const myIcon22 = new L.Icon({
//     iconUrl: marker,
//     iconRetinaUrl: marker,
//     iconAnchor: [2, 2],
//     popupAnchor: [0, 0],
//     shadowUrl: null,
//     shadowSize: null,
//     shadowAnchor: null,
//     iconSize: [30, 30],
//     className: "leaflet-div-icon",
//   });
//   return (
//     <>
//       <Marker
//         position={[
//           listing.geometry.coordinates[1],
//           listing.geometry.coordinates[0],
//         ]}
//         key={index}
//         icon={myIcon22}
//       >
//         <Popup>
//           <div className="p-0 rounded-lg mt-0 w-60 h-full">
//             <Link to={`/listings/more-info/ggsg`}>
//               <div className="h-40 rounded-t-lg overflow-hidden relative">
//                 <img alt="" className="w-full h-full" />
//                 <div ssNae="absolute top-3 left-3 bg-white py-1px-4 rounded-sm">
//                   <p clasName="font-semibold text-}">SALE</p>
//                 </div>
//               </div>
//               <div className="p-2 pt-1 rounded-md z-10 opacity-100 bg-white relative -top-6">
//                 <p className="text-sm text-opacity-0 mb-1">A 3 Bedroom House</p>
//                 <div className="flex justify-between font-bold">
//                   <p className="text-xs">KES 30,000</p>
//                   <p className="text-xs">negotiable</p>
//                 </div>
//                 <div className="flex justify-between content-center items-center py-1 mt-0">
//                   <p className="text-cloud-theme-blue text-xs flex place-content-center">
//                     <IoLocationSharp className="mt-0.5 text-xs" />
//                     Kileleshwa
//                   </p>
//                   <p className="text-cloud-theme-blue text-xs">
//                     300m <sup>2</sup>
//                   </p>
//                 </div>
//               </div>
//             </Link>
//           </div>
//         </Popup>
//         <Tooltip>{listing.properties.title}</Tooltip>
//       </Marker>
//     </>
//   );
// };

export default Search;
