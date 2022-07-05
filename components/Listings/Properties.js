import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsHeartFill } from "react-icons/bs";
import { FaAngleDown, FaAngleUp, FaSearch } from "react-icons/fa";
import { IoListSharp } from "react-icons/io5";
import Link from "next/link";
import { GoFlame } from "react-icons/go";
import { AiOutlineHeart } from "react-icons/ai";
import { GrMap } from "react-icons/gr";
// import {
//   FacebookIcon,
//   FacebookShareButton,
//   TelegramIcon,
//   TelegramShareButton,
//   TwitterIcon,
//   TwitterShareButton,
//   WhatsappIcon,
//   WhatsappShareButton,
// } from "react-share";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";
import { RiMenuFoldLine } from "react-icons/ri";
import { IoLocationSharp } from "react-icons/io5";
import { BsShareFill } from "react-icons/bs";
import { SpinOne } from "../Spinners/Spinner";
import {
  getCommercialListings,
  getResidentialListings,
  getLandListings,
  likeListings,
} from "../../state/actionCreators/listings";
import { Swiper, SwiperSlide } from "swiper/react";
import { truncateWords, NumberFormat } from "../../utils/Truncate";
import { ListingPropertiesPagination } from "./ListingPagination";
import { useRouter } from "next/router";
// import { TrackpageView } from "../GAnalytics";
const Properties = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const residentialListings = useSelector(
    (state) => state.listings.residentialListings
  );
  const residentialLoading = useSelector(
    (state) => state.listings.residentialLoading
  );
  const commercialListings = useSelector(
    (state) => state.listings.commercialListings
  );
  const commercialLoading = useSelector(
    (state) => state.listings.commercialLoading
  );
  const landListings = useSelector((state) => state.listings.landListings);
  const landLoading = useSelector((state) => state.listings.landLoading);
  const next = useSelector((state) => state.listings.next);
  const prev = useSelector((state) => state.listings.prev);
  const [activeMarker, setActiveMarker] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: -1.26538479248,
    lng: 36.81293735403939,
  });
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  const handleActiveMarker = (index) => {
    if (index === activeMarker) {
      return;
    }
    setActiveMarker(index);
  };
  let min = 0;
  let max = 100000000;
  const range = useRef(null);
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeAccordion3, setActiveAcordion3] = useState(false);
  const [isGrid, setIsGrid] = useState(true);
  const [activeAccordion4, setActiveAcordion4] = useState(false);
  const [activeAccordion5, setActiveAcordion5] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [activeAccordion6, setActiveAcordion6] = useState(false);
  const [activeAccordion7, setActiveAcordion7] = useState(false);
  const [activeAccordion8, setActiveAcordion8] = useState(false);
  const [activePropertyTypeAccordion, setActivePropertyTypeAccordion] =
    useState(false);
  const [mainCategory, setMainCategory] = useState("residential");

  const [propTypeHeight, setPropTypeHeight] = useState("0px");
  const [propertyType, setPropertyType] = useState("");

  const [dealsTypeHeight, setDealsTypeHeight] = useState("0px");
  const [dealsType, setDealsType] = useState("");

  const [financingTypeHeight, setFinancingTypeHeight] = useState("0px");
  const [financing, setFinancingType] = useState("");
  const [landType, setLandType] = useState("");
  const [listing_availability, setListingAvailability] = useState("");

  const [developmentTypeHeight, setDevelopmentTypeHeight] = useState("0px");
  const [developmentType, setDevelopmentType] = useState("");

  const [bedroomTypeHeight, setBedroomTypeHeight] = useState("0px");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");

  const [priceTypeHeight, setPriceTypeHeight] = useState("0px");

  const [marketPriceTypeHeight, setMarketPriceTypeHeight] = useState("0px");
  const [saleConditon, setSaleCondition] = useState("For Sale");
  // Convert to percentage
  const getPercent = useCallback(
    (value) => {
      Math.round(((value - min) / (max - min)) * 100);
    },
    [min, max]
  );
  // Set width of the range to decrease from the left side or right
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, maxVal, getPercent]);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (mainCategory === "land") {
      dispatch(
        getLandListings(
          financing,
          propertyType,
          minVal,
          maxVal,
          saleConditon,
          listing_availability
        )
      );
    } else if (mainCategory === "commercial") {
      dispatch(getCommercialListings());
    } else {
      dispatch(
        getResidentialListings(
          financing,
          propertyType,
          dealsType,
          developmentType,
          minVal,
          maxVal,
          saleConditon,
          bedrooms,
          bathrooms
        )
      );
    }
  }, [
    dispatch,
    minVal,
    mainCategory,
    maxVal,
    bedrooms,
    bathrooms,
    financing,
    propertyType,
    landType,
    listing_availability,
    developmentType,
    dealsType,
    saleConditon,
  ]);
  const propertyHeight = useRef(null);
  const marketPriceHeight = useRef(null);
  const developmentHeight = useRef(null);
  const bedroomHeight = useRef(null);
  const priceHeight = useRef(null);
  const dealTypeHeight = useRef(null);
  const financingHeight = useRef(null);
  const toggleDevelopmentType = () => {
    setActiveAcordion3(activeAccordion3 === false ? true : false);
    setDevelopmentTypeHeight(
      !activeAccordion3 ? `${developmentHeight.current.scrollHeight}px` : "0px"
    );
  };
  const toggleBathBedType = () => {
    setActiveAcordion8(activeAccordion8 === false ? true : false);
    setBedroomTypeHeight(
      !activeAccordion8 ? `${bedroomHeight.current.scrollHeight}px` : "0px"
    );
  };
  const togglePrice = () => {
    setActiveAcordion7(activeAccordion7 === false ? true : false);
    setPriceTypeHeight(
      !activeAccordion7 ? `${priceHeight.current.scrollHeight}px` : "0px"
    );
  };
  const toggleMarketPrice = () => {
    setActiveAcordion4(activeAccordion4 === false ? true : false);
    setMarketPriceTypeHeight(
      !activeAccordion4 ? `${marketPriceHeight.current.scrollHeight}px` : "0px"
    );
  };
  const toggleDealType = () => {
    setActiveAcordion5(activeAccordion5 === false ? true : false);
    setDealsTypeHeight(
      !activeAccordion5 ? `${dealTypeHeight.current.scrollHeight}px` : "0px"
    );
  };
  const toggleFinancing = () => {
    setActiveAcordion6(activeAccordion6 === false ? true : false);
    setFinancingTypeHeight(
      !activeAccordion6 ? `${financingHeight.current.scrollHeight}px` : "0px"
    );
  };
  const togglePropertyType = () => {
    setActivePropertyTypeAccordion(
      activePropertyTypeAccordion === false ? true : false
    );
    setPropTypeHeight(
      !activePropertyTypeAccordion
        ? `${propertyHeight.current.scrollHeight}px`
        : "0px"
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: '/listings/search/properties',
      query: { q: searchQuery},
    })
  };
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
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    // TrackpageView("/listings")
  }, []);
  return (
    <section className="pb-10">
      <div className="md:flex hidden w-full justify-between items-center z-1010 p-5 bg-blue-50 content-center fixed top-[4.75rem]">
        <div className="flex w-1/4 mr-8 px-3">
          {mainCategory === "residential" ? (
            <>
              <div className="flex relative mr-2">
                <button
                  onClick={() => setSaleCondition("For Rent")}
                  className={
                    saleConditon === "For Rent"
                      ? `bg-cloud-theme-gold px-2 text-xxs-s rounded shadow-md text-white py-1.5`
                      : `bg-cloud-theme-blue px-2 text-xxs-s rounded shadow-md text-white py-1.5`
                  }
                >
                  FOR RENT
                </button>
                <div
                  className={
                    saleConditon === "For Rent"
                      ? `absolute inline-flex w-2 h-2 duration-800 rounded-full animate-ping bg-red-500`
                      : `hidden`
                  }
                ></div>
              </div>
              <div className="flex relative">
                <button
                  type="button"
                  onClick={() => setSaleCondition("For Sale")}
                  className={
                    saleConditon === "For Sale"
                      ? `bg-cloud-theme-gold px-2 text-xxs-s rounded shadow-md text-white py-1.5`
                      : `bg-cloud-theme-blue px-2 text-xxs-s rounded shadow-md text-white py-1.5`
                  }
                >
                  FOR SALE
                </button>
                <div
                  className={
                    saleConditon === "For Sale"
                      ? `absolute inline-flex w-2 h-2 duration-800 rounded-full animate-ping bg-red-500`
                      : `hidden`
                  }
                ></div>
              </div>
            </>
          ) : mainCategory === "land" ? (
            <>
              <div className="flex relative mr-2">
                <button
                  type="button"
                  onClick={() => setSaleCondition("For Sale")}
                  className={
                    saleConditon === "For Sale"
                      ? `bg-cloud-theme-gold px-2 text-xxs-s rounded shadow-md text-white py-1.5`
                      : `bg-cloud-theme-blue px-2 text-xxs-s rounded shadow-md text-white py-1.5`
                  }
                >
                  FOR SALE
                </button>
                <div
                  className={
                    saleConditon === "For Sale"
                      ? `absolute inline-flex w-2 h-2 duration-800 rounded-full animate-ping bg-red-500`
                      : `hidden`
                  }
                ></div>
              </div>
              <div className="flex relative">
                <button
                  type="button"
                  onClick={() => setSaleCondition("For Lease")}
                  className={
                    saleConditon === "For Lease"
                      ? `bg-cloud-theme-gold px-2 text-xxs-s rounded shadow-md text-white py-1.5`
                      : `bg-cloud-theme-blue px-2 text-xxs-s rounded shadow-md text-white py-1.5`
                  }
                >
                  FOR LEASE
                </button>
                <div
                  className={
                    saleConditon === "For Lease"
                      ? `absolute inline-flex w-2 h-2 duration-800 rounded-full animate-ping bg-red-500`
                      : `hidden`
                  }
                ></div>
              </div>
            </>
          ) : (
            <>
              <div className="flex relative mr-2">
                <button
                  type="button"
                  onClick={() => setSaleCondition("For Rent")}
                  className={
                    saleConditon === "For Rent"
                      ? `bg-cloud-theme-gold px-2 text-xxs-s rounded shadow-md text-white py-1.5`
                      : `bg-cloud-theme-blue px-2 text-xxs-s rounded shadow-md text-white py-1.5`
                  }
                >
                  TO-LET
                </button>
                <div
                  className={
                    saleConditon === "For Rent"
                      ? `absolute inline-flex w-2 h-2 duration-800 rounded-full animate-ping bg-red-500`
                      : `hidden`
                  }
                ></div>
              </div>
              <div className="flex relative">
                <button
                  type="button"
                  onClick={() => setSaleCondition("For Sale")}
                  className={
                    saleConditon === "For Sale"
                      ? `bg-cloud-theme-gold px-2 text-xxs-s rounded shadow-md text-white py-1.5`
                      : `bg-cloud-theme-blue px-2 text-xxs-s rounded shadow-md text-white py-1.5`
                  }
                >
                  FOR SALE
                </button>
                <div
                  className={
                    saleConditon === "For Sale"
                      ? `absolute inline-flex w-2 h-2 duration-800 rounded-full animate-ping bg-red-500`
                      : `hidden`
                  }
                ></div>
              </div>
            </>
          )}
        </div>
        <div className="flex flex-1 mx-5 items-center justify-between content-center">
          <form onSubmit={handleSubmit} className="flex flex-1 shadow-lg mr-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-none rounded-l-md  dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white bg-gray-50 border border-1 dark:border-cloud-theme-blue outline-none border-gray-300 text-gray-900 focus:border-cloud-theme-blue block flex-1 w-full text-sm px-2.5 py-1.5"
              placeholder="e.g. location, area, title etc"
            />
            <span className="inline-flex items-center text-sm dark:bg-gray-700 text-gray-900 bg-gray-200 rounded-r-md border border-l-0 border-gray-300 dark:border-cloud-theme-blue  focus:border-cloud-theme-blue">
              <button
                type="submit"
                className="outline-bone w-full px-3 h-full border-none"
              >
                <FaSearch className="" />
              </button>
            </span>
          </form>
          <div className="text-sm flex justify-between items-center content-center">
            <ul className="flex">
              <li className="flex text-sm mr-3">
                <Link href="/auth/user/my-preferences">
                  <a className="flex justify-center items-center content-center">
                    <BsHeartFill className="mr-2 text-base" />
                    Liked
                  </a>
                </Link>
              </li>
              {isGrid ? (
                <li
                  onClick={() => setIsGrid(!isGrid)}
                  className="flex justify-center shadow-md px-1 items-center content-center text-sm  mr-3"
                >
                  <GrMap className="mr-1 text-base" />
                  map
                </li>
              ) : (
                <li
                  onClick={() => setIsGrid(!isGrid)}
                  className="flex justify-center shadow-md px-1  items-center content-center text-sm  mr-3"
                >
                  <IoListSharp className="mr-1 text-base" />
                  grid
                </li>
              )}
            </ul>
            {/* <div className="flex justify-center items-center content-center">
              <li className="flex justify-center items-center content-center font-semibold text-sm mr-3">
                Sort:
              </li>
              <li className="flex justify-center items-center content-center text-sm">
                recomended
                <FaAngleDown className="mr-l text-base" />
              </li>
            </div> */}
          </div>
        </div>
      </div>
      <div className="md:hidden z-1010 w-full fixed top-[4.75rem]">
        <div className="bg-blue-50  py-5 px-4">
          <div className="flex flex-1 items-center justify-between content-center">
            <form
              onSubmit={handleSubmit}
              className="flex flex-1 shadow-lg mr-4"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-none rounded-l-md  dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white bg-gray-50 border border-1 dark:border-cloud-theme-blue outline-none border-gray-300 text-gray-900 focus:border-cloud-theme-blue block flex-1 w-full text-sm px-2.5 py-1.5"
                placeholder="e.g. location, area, project"
              />
              <span className="inline-flex items-center px-3 text-sm dark:bg-gray-700 text-gray-900 bg-gray-200 rounded-r-md border border-l-0 border-gray-300 dark:border-cloud-theme-blue  focus:border-cloud-theme-blue">
                <button className="outline-bone w-full h-full border-none">
                  <FaSearch className="text-lg" />
                </button>
              </span>
            </form>
            <div>
              <button
                className="border-none outline-none cursor-pointer"
                type="button"
                onClick={() => setOpenFilter(!openFilter)}
              >
                <RiMenuFoldLine className="text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex md:flex-row flex-col gap-1 w-full mt-[9.76rem] pt-3">
        <div className="w-full md:w-[18rem] z-1020 md:z-20">
          <div
            className={
              openFilter
                ? "fixed right-0 top-0 bg-blue-50 mb:bg-white md:sticky md:top-[10rem] h-screen w-full myScrollBar overflow-y-auto duration-500 transition-all"
                : "hidden -right-full md:sticky md:block md:top-[10rem] h-screen w-full myScrollBar overflow-y-auto duration-500 transition-all"
            }
          >
            <div
              className={
                width >= 768
                  ? "hidden"
                  : "w-full flex justify-between items-center content-center p-5"
              }
            >
              <p className="font-semibold text-lg underline">Filters</p>
              <button
                type="button"
                className="border-none outline-none bg-cloud-theme-gold px-6 py-2 text-white rounded-md shadow-md"
                onClick={() => setOpenFilter(!openFilter)}
              >
                Apply
              </button>
            </div>
            <div className="flex flex-col w-full justify-between items-center mb-3 p-3 pt-0">
              <div className="flex items-center mt-4 justify-between content-center w-full">
                <Swiper
                  slidesPerView={3}
                  spacing={2}
                  className="text-black font-semibold w-full"
                >
                  <SwiperSlide>
                    <div className="flex relative h-12  flex-col rounded-md bg-gray-200 md:bg-blue-50 justify-center items-center text-xs text-center content-center mr-2 place-content-center">
                      <button type="button" className="w-full h-full">
                        <label
                          htmlFor="residential"
                          className="px-1 py-2 text-xs font-bold w-full h-full"
                        >
                          Residential
                        </label>
                      </button>
                      <input
                        type="checkbox"
                        checked={mainCategory === "residential"}
                        id="residential"
                        value="residential"
                        className="p-2 hidden"
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
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="flex rounded-md relative h-12 flex-col bg-gray-200 md:bg-blue-50 justify-center items-center text-xs text-center content-center mr-2 place-content-center">
                      <button type="button" className="w-full h-full">
                        <label
                          htmlFor="commercial"
                          className="text-xs px-1 py-2 font-bold w-full h-full"
                        >
                          Commercial
                        </label>
                      </button>
                      <input
                        type="checkbox"
                        checked={mainCategory === "commercial"}
                        id="commercial"
                        className="p-2 hidden"
                        value="commercial"
                        onChange={(e) => setMainCategory(e.target.value)}
                      />
                      <div className="bg-white absolute bottom-2 rounded-full w-3 h-3 flex flex-shrink-0 justify-center items-center">
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
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="flex rounded-md w-full md:w-20 relative h-12 flex-col bg-gray-200 md:bg-blue-50  justify-center items-center text-xs text-center content-center mr-2 place-content-center">
                      <button type="button" className="w-full h-full">
                        <label
                          htmlFor="landss"
                          className="text-xs px-1 py-2 font-bold w-full h-full"
                        >
                          Land
                        </label>
                      </button>
                      <input
                        type="checkbox"
                        checked={mainCategory === "land"}
                        id="landss"
                        className="p-2 hidden"
                        value="land"
                        onChange={(e) => setMainCategory(e.target.value)}
                      />
                      <div className="bg-white absolute bottom-2 rounded-full w-3 h-3 flex flex-shrink-0 justify-center items-center">
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
                  </SwiperSlide>
                </Swiper>
              </div>

              <div className="overflow-hidden w-full">
                <button
                  type="button"
                  onClick={togglePrice}
                  className="flex w-full justify-between items-center mb-0 px-2 py-3"
                >
                  <p className="font-bold">Price</p>
                  {activeAccordion7 ? <FaAngleUp /> : <FaAngleDown />}
                </button>
                <div
                  ref={priceHeight}
                  style={{ maxHeight: `${priceTypeHeight}` }}
                  className="transition-max-height ease-in duration-300"
                >
                  <div className="relative pt-3 px-2 h-20">
                    <div className="flex items-center content-center mb-3 justify-between">
                      <div className="font-semibold">
                        {NumberFormat(minVal)}
                      </div>
                      <div className="font-semibold">
                        {NumberFormat(maxVal)}
                      </div>
                    </div>
                    <input
                      type="range"
                      min={min}
                      max={max}
                      value={minVal}
                      ref={minValRef}
                      onChange={(event) => {
                        const value = Math.min(
                          +event.target.value,
                          maxVal - 10000
                        );
                        setMinVal(value);
                        event.target.value = value.toString();
                      }}
                      // className={`thumb thumb--zindex-3`}
                      className={
                        minVal > max - 10000 ? "thumb z-40" : "thumb z-30"
                      }
                    />
                    <input
                      type="range"
                      min={min}
                      max={max}
                      value={maxVal}
                      ref={maxValRef}
                      onChange={(event) => {
                        const value = Math.max(
                          +event.target.value,
                          minVal + 10000
                        );
                        setMaxVal(value);
                        event.target.value = value.toString();
                      }}
                      // className="thumb z-40"
                      className={
                        maxVal < min + 10000 ? "thumb z-40" : "thumb z-30"
                      }
                    />
                    <div className="relative w-full flex items-center content-center justify-center">
                      <div className="h-[0.26rem] rounded bg-blue-200 z-10 w-full" />
                      <div ref={range} className="[0.26rem] rounded z-20" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden w-full">
                <button
                  type="button"
                  onClick={togglePropertyType}
                  className="flex w-full justify-between items-center mb-0 px-2 py-3"
                >
                  <p className="font-bold">Property Type</p>
                  {activePropertyTypeAccordion ? (
                    <FaAngleUp />
                  ) : (
                    <FaAngleDown />
                  )}
                </button>
                <div
                  ref={propertyHeight}
                  style={{ maxHeight: `${propTypeHeight}` }}
                  className="transition-max-height ease-in duration-300 pl-5"
                >
                  {mainCategory === "residential" ? (
                    <>
                      <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                        <label htmlFor="Townhouse" className="w-full h-full">
                          Townhouse
                        </label>
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="Townhouse"
                            value="Townhouse"
                            checked={propertyType === "Townhouse"}
                            onChange={(e) => setPropertyType(e.target.value)}
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
                      <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                        <label
                          htmlFor="Semi-detatched"
                          className="w-full h-full"
                        >
                          Semi-detatched
                        </label>
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="Semi-detatched"
                            value="Semi-detatched"
                            checked={propertyType === "Semi-detatched"}
                            onChange={(e) => setPropertyType(e.target.value)}
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

                      <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                        <label htmlFor="Apartment" className="w-full h-full">
                          Apartment
                        </label>
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="Apartment"
                            value="Apartment"
                            checked={propertyType === "Apartment"}
                            onChange={(e) => setPropertyType(e.target.value)}
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
                      <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                        <label
                          htmlFor="Furnished-Apartment"
                          className="w-full h-full"
                        >
                          Furnished-Apartment
                        </label>
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="Furnished-Apartment"
                            value="Furnished-Apartment"
                            checked={propertyType === "Furnished-Apartment"}
                            onChange={(e) => setPropertyType(e.target.value)}
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
                      <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                        <label htmlFor="Maissonete" className="w-full h-full">
                          Maissonete
                        </label>
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="Maissonete"
                            value="Maissonete"
                            checked={propertyType === "Maissonete"}
                            onChange={(e) => setPropertyType(e.target.value)}
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
                      <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                        <label htmlFor="Bungalow" className="w-full h-full">
                          Bungalow
                        </label>
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="Bungalow"
                            value="Bungalow"
                            checked={propertyType === "Bungalow"}
                            onChange={(e) => setPropertyType(e.target.value)}
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
                      <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                        <label htmlFor="Duplex" className="w-full h-full">
                          Duplex
                        </label>
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="Duplex"
                            value="Duplex"
                            checked={propertyType === "Duplex"}
                            onChange={(e) => setPropertyType(e.target.value)}
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
                      <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                        <label htmlFor="Beachfront" className="w-full h-full">
                          Beachfront
                        </label>
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="Beachfront"
                            value="Beachfront"
                            checked={propertyType === "Beachfront"}
                            onChange={(e) => setPropertyType(e.target.value)}
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
                      <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                        <label htmlFor="Condo" className="w-full h-full">
                          Condo
                        </label>
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="Condo"
                            value="Condo"
                            checked={propertyType === "Condo"}
                            onChange={(e) => setPropertyType(e.target.value)}
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
                      <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                        <label htmlFor="Penthouse" className="w-full h-full">
                          Penthouse
                        </label>
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="Penthouse"
                            value="Penthouse"
                            checked={propertyType === "Penthouse"}
                            onChange={(e) => setPropertyType(e.target.value)}
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
                    </>
                  ) : mainCategory === "commercial" ? (
                    <>
                      <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                        <label
                          htmlFor="Commercial-Offices"
                          className="w-full h-full"
                        >
                          Commercial Offices
                        </label>
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="Commercial-Offices"
                            value="Commercial-Offices"
                            checked={propertyType === "Commercial-Offices"}
                            onChange={(e) => setPropertyType(e.target.value)}
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
                      <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                        <label htmlFor="Retail-Shops" className="w-full h-full">
                          Retail Shops
                        </label>
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="Retail-Shops"
                            value="Retail-Shops"
                            checked={propertyType === "Retail-Shops"}
                            onChange={(e) => setPropertyType(e.target.value)}
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
                      <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                        <label htmlFor="Mall-Space" className="w-full h-full">
                          Mall Space
                        </label>
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="Mall-Space"
                            value="Mall-Space"
                            checked={propertyType === "Mall-Space"}
                            onChange={(e) => setPropertyType(e.target.value)}
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
                      <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                        <label
                          htmlFor="Co-Working-Space"
                          className="w-full h-full"
                        >
                          Co-Working Space
                        </label>
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="Co-Working-Space"
                            value="Co-Working-Space"
                            checked={propertyType === "Co-Working-Space"}
                            onChange={(e) => setPropertyType(e.target.value)}
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
                      <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                        <label htmlFor="Restaurant" className="w-full h-full">
                          Restaurant
                        </label>
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="Restaurant"
                            value="Restaurant"
                            checked={propertyType === "Restaurant"}
                            onChange={(e) => setPropertyType(e.target.value)}
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
                      <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                        <label htmlFor="Hotel" className="w-full h-full">
                          Hotel
                        </label>
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="Hotel"
                            value="Hotel"
                            checked={propertyType === "Hotel"}
                            onChange={(e) => setPropertyType(e.target.value)}
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
                      <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                        <label htmlFor="School" className="w-full h-full">
                          School
                        </label>
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="School"
                            value="School"
                            checked={propertyType === "School"}
                            onChange={(e) => setPropertyType(e.target.value)}
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
                      <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                        <label htmlFor="Warehouse" className="w-full h-full">
                          Warehouse
                        </label>
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="Warehouse"
                            value="Warehouse"
                            checked={propertyType === "Warehouse"}
                            onChange={(e) => setPropertyType(e.target.value)}
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
                    </>
                  ) : (
                    <>
                      <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                        <label
                          htmlFor="For-Commercial"
                          className="w-full h-full"
                        >
                          For Commercial
                        </label>
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="For-Commercial"
                            value="For-Commercial"
                            checked={propertyType === "For-Commercial"}
                            onChange={(e) => setPropertyType(e.target.value)}
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
                      <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                        <label
                          htmlFor="For-Residential"
                          className="w-full h-full"
                        >
                          For Residential
                        </label>
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="For-Residential"
                            value="For-Residential"
                            checked={propertyType === "For-Residential"}
                            onChange={(e) => setPropertyType(e.target.value)}
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
                      <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                        <label
                          htmlFor="For-Joint-Venture"
                          className="w-full h-full"
                        >
                          For Joint Venture
                        </label>
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="For-Joint-Venture"
                            value="For-Joint-Venture"
                            checked={propertyType === "For-Joint-Venture"}
                            onChange={(e) => setPropertyType(e.target.value)}
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
                      <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                        <label htmlFor="Agricultural" className="w-full h-full">
                          Agricultural
                        </label>
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="Agricultural"
                            value="Agricultural"
                            checked={propertyType === "Agricultural"}
                            onChange={(e) => setPropertyType(e.target.value)}
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
                      <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                        <label
                          htmlFor="institutional-development"
                          className="w-full h-full"
                        >
                          For Institutional Development
                        </label>
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="institutional-development"
                            value="institutional-development"
                            checked={
                              propertyType === "institutional-development"
                            }
                            onChange={(e) => setPropertyType(e.target.value)}
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
                      <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                        <label htmlFor="Recreational" className="w-full h-full">
                          Recreational
                        </label>
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="Recreational"
                            value="Recreational"
                            checked={propertyType === "Recreational"}
                            onChange={(e) => setPropertyType(e.target.value)}
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
                      <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                        <label htmlFor="Industrial" className="w-full h-full">
                          Industrial
                        </label>
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="Industrial"
                            value="Industrial"
                            checked={propertyType === "Industrial"}
                            onChange={(e) => setPropertyType(e.target.value)}
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
                    </>
                  )}
                </div>
              </div>
              {mainCategory === "residential" && (
                <>
                  <div className="overflow-hidden w-full">
                    <button
                      type="button"
                      onClick={toggleDevelopmentType}
                      className="flex w-full justify-between items-center mb-0 px-2 py-3"
                    >
                      <p className="font-bold">Development Type</p>
                      {activeAccordion3 ? <FaAngleUp /> : <FaAngleDown />}
                    </button>
                    <div
                      ref={developmentHeight}
                      style={{ maxHeight: `${developmentTypeHeight}` }}
                      className="transition-max-height ease-in duration-300 pl-5"
                    >
                      <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                        <label htmlFor="Stand-Alone" className="w-full h-full">
                          Stand-Alone
                        </label>
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="Stand-Alone"
                            value="Stand-Alone"
                            checked={developmentType === "Stand-Alone"}
                            onChange={(e) => setDevelopmentType(e.target.value)}
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
                      <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                        <label
                          htmlFor="Gated-Communities"
                          className="w-full h-full"
                        >
                          Gated Communities
                        </label>
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="Gated-Communities"
                            value="Gated-Communities"
                            checked={developmentType === "Gated-Communities"}
                            onChange={(e) => setDevelopmentType(e.target.value)}
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
                      <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                        <label htmlFor="Mixed-Use" className="w-full h-full">
                          Mixed-Use
                        </label>
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="Mixed-Use"
                            value="Mixed-Use"
                            checked={developmentType === "Mixed-Use"}
                            onChange={(e) => setDevelopmentType(e.target.value)}
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
                  {propertyType !== "Studio" && (
                    <div className="overflow-hidden w-full">
                      <button
                        type="button"
                        onClick={toggleBathBedType}
                        className="flex w-full justify-between items-center mb-0 px-2 py-3"
                      >
                        <p className="font-bold">Bedrooms & Bathrooms</p>
                        {activeAccordion8 ? <FaAngleUp /> : <FaAngleDown />}
                      </button>
                      <div
                        ref={bedroomHeight}
                        style={{ maxHeight: `${bedroomTypeHeight}` }}
                        className="transition-max-height ease-in duration-300 pl-3"
                      >
                        <div className="relative pl-0 py-1.5">
                          <h5 htmlFor="Stand-Alone" className="w-full h-full">
                            Bedrooms
                          </h5>
                          <div className="relative flex">
                            <div className="relative flex justify-between items-center pl-0 py-2 mr-1.5">
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  value={0}
                                  checked={bedrooms == 0}
                                  onChange={(e) => setBedrooms(e.target.value)}
                                  className="opacity-0 absolute h-7 w-8"
                                />
                                <div
                                  className={
                                    bedrooms == 0
                                      ? "bg-cloud-theme-gold border-2 border-cloud-theme-blue text-white rounded-md shadow-md h-7 px-1 text-sm flex justify-center items-center"
                                      : "bg-cloud-theme-blue border-2 border-cloud-theme-gold text-white rounded-md shadow-md h-7 px-1 text-sm flex justify-center items-center"
                                  }
                                >
                                  Studio
                                </div>
                              </div>
                            </div>
                            <div className="relative flex justify-between items-center pl-0 py-2 mr-1.5">
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  value={1}
                                  checked={bedrooms == 1}
                                  onChange={(e) => setBedrooms(e.target.value)}
                                  className="opacity-0 absolute h-7 w-8"
                                />
                                <div
                                  className={
                                    bedrooms == 1
                                      ? "bg-white border-2 border-cloud-theme-gold rounded-full shadow-md h-7 w-8 text-sm flex justify-center items-center"
                                      : "bg-white border-2 border-cloud-theme-blue rounded-full shadow-md h-7 w-8 text-sm flex justify-center items-center"
                                  }
                                >
                                  1
                                </div>
                              </div>
                            </div>
                            <div className="relative flex justify-between items-center pl-0 py-2 mr-1.5">
                              <div className="relative ">
                                <input
                                  type="checkbox"
                                  value={2}
                                  checked={bedrooms == 2}
                                  onChange={(e) => setBedrooms(e.target.value)}
                                  className="opacity-0 absolute h-7 w-8"
                                />
                                <div
                                  className={
                                    bedrooms == 2
                                      ? "bg-white border-2 border-cloud-theme-gold rounded-full shadow-md h-7 w-8 text-sm flex justify-center items-center"
                                      : "bg-white border-2 border-cloud-theme-blue rounded-full shadow-md h-7 w-8 text-sm flex justify-center items-center"
                                  }
                                >
                                  2
                                </div>
                              </div>
                            </div>
                            <div className="relative flex justify-between items-center pl-0 py-2 mr-1.5">
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  value={3}
                                  checked={bedrooms == 3}
                                  onChange={(e) => setBedrooms(e.target.value)}
                                  className="opacity-0 absolute h-7 w-8"
                                />
                                <div
                                  className={
                                    bedrooms == 3
                                      ? "bg-white border-2 border-cloud-theme-gold rounded-full shadow-md h-7 w-8 text-sm flex justify-center items-center"
                                      : "bg-white border-2 border-cloud-theme-blue rounded-full shadow-md h-7 w-8 text-sm flex justify-center items-center"
                                  }
                                >
                                  3
                                </div>
                              </div>
                            </div>
                            <div className="relative flex justify-between items-center pl-0 py-2 mr-1.5">
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  value={4}
                                  checked={bedrooms == 4}
                                  onChange={(e) => setBedrooms(e.target.value)}
                                  className="opacity-0 absolute h-7 w-8"
                                />
                                <div
                                  className={
                                    bedrooms == 4
                                      ? "bg-white border-2 border-cloud-theme-gold rounded-full shadow-md h-7 w-8 text-sm flex justify-center items-center"
                                      : "bg-white border-2 border-cloud-theme-blue rounded-full shadow-md h-7 w-8 text-sm flex justify-center items-center"
                                  }
                                >
                                  4
                                </div>
                              </div>
                            </div>
                            <div className="relative flex justify-between items-center pl-0 py-2 mr-1.5">
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  value={5}
                                  checked={bedrooms == 5}
                                  onChange={(e) => setBedrooms(e.target.value)}
                                  className="opacity-0 absolute h-7 w-8"
                                />
                                <div
                                  className={
                                    bedrooms == 5
                                      ? "bg-white border-2 border-cloud-theme-gold rounded-full shadow-md h-7 w-8 text-sm flex justify-center items-center"
                                      : "bg-white border-2 border-cloud-theme-blue rounded-full shadow-md h-7 w-8 text-sm flex justify-center items-center"
                                  }
                                >
                                  5
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="relative pl-0 py-1.5">
                          <h5 htmlFor="Stand-Alone" className="w-full h-full">
                            Bathrooms
                          </h5>
                          <div className="relative flex">
                            <div className="relative flex justify-between items-center pl-0 py-2 mr-1.5">
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  id="Stand-Alone"
                                  value={1}
                                  checked={bathrooms == 1}
                                  onChange={(e) => setBathrooms(e.target.value)}
                                  className="opacity-0 absolute h-7 w-8"
                                />
                                <div
                                  className={
                                    bathrooms == 1
                                      ? "bg-white border-2 border-cloud-theme-gold rounded-full shadow-md h-7 w-8 text-sm flex justify-center items-center"
                                      : "bg-white border-2 border-cloud-theme-blue rounded-full shadow-md h-7 w-8 text-sm flex justify-center items-center"
                                  }
                                >
                                  1
                                </div>
                              </div>
                            </div>
                            <div className="relative flex justify-between items-center pl-0 py-2 mr-1.5">
                              <div className="relative ">
                                <input
                                  type="checkbox"
                                  id="Stand-Alone"
                                  value={2}
                                  checked={bathrooms == 2}
                                  onChange={(e) => setBathrooms(e.target.value)}
                                  className="opacity-0 absolute h-7 w-8"
                                />
                                <div
                                  className={
                                    bathrooms == 2
                                      ? "bg-white border-2 border-cloud-theme-gold rounded-full shadow-md h-7 w-8 text-sm flex justify-center items-center"
                                      : "bg-white border-2 border-cloud-theme-blue rounded-full shadow-md h-7 w-8 text-sm flex justify-center items-center"
                                  }
                                >
                                  2
                                </div>
                              </div>
                            </div>
                            <div className="relative flex justify-between items-center pl-0 py-2 mr-1.5">
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  id="Stand-Alone"
                                  value={3}
                                  checked={bathrooms == 3}
                                  onChange={(e) => setBathrooms(e.target.value)}
                                  className="opacity-0 absolute h-7 w-8"
                                />
                                <div
                                  className={
                                    bathrooms == 3
                                      ? "bg-white border-2 border-cloud-theme-gold rounded-full shadow-md h-7 w-8 text-sm flex justify-center items-center"
                                      : "bg-white border-2 border-cloud-theme-blue rounded-full shadow-md h-7 w-8 text-sm flex justify-center items-center"
                                  }
                                >
                                  3
                                </div>
                              </div>
                            </div>
                            <div className="relative flex justify-between items-center pl-0 py-2 mr-1.5">
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  id="Stand-Alone"
                                  value={4}
                                  checked={bathrooms == 4}
                                  onChange={(e) => setBathrooms(e.target.value)}
                                  className="opacity-0 absolute h-7 w-8"
                                />
                                <div
                                  className={
                                    bathrooms == 4
                                      ? "bg-white border-2 border-cloud-theme-gold rounded-full shadow-md h-7 w-8 text-sm flex justify-center items-center"
                                      : "bg-white border-2 border-cloud-theme-blue rounded-full shadow-md h-7 w-8 text-sm flex justify-center items-center"
                                  }
                                >
                                  4
                                </div>
                              </div>
                            </div>
                            <div className="relative flex justify-between items-center pl-0 py-2 mr-1.5">
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  id="Stand-Alone"
                                  value={5}
                                  checked={bathrooms == 5}
                                  onChange={(e) => setBathrooms(e.target.value)}
                                  className="opacity-0 absolute h-7 w-8"
                                />
                                <div
                                  className={
                                    bathrooms == 5
                                      ? "bg-white border-2 border-cloud-theme-gold rounded-full shadow-md h-7 w-8 text-sm flex justify-center items-center"
                                      : "bg-white border-2 border-cloud-theme-blue rounded-full shadow-md h-7 w-8 text-sm flex justify-center items-center"
                                  }
                                >
                                  5
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="overflow-hidden w-full">
                    <button
                      type="button"
                      onClick={toggleMarketPrice}
                      className="flex w-full justify-between items-center mb-0 px-2 py-3"
                    >
                      <p className="font-bold">Market Price</p>
                      {activeAccordion4 ? <FaAngleUp /> : <FaAngleDown />}
                    </button>
                    <div
                      ref={marketPriceHeight}
                      style={{ maxHeight: `${marketPriceTypeHeight}` }}
                      className="transition-max-height ease-in duration-300 pl-5"
                    >
                      <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                        <label
                          htmlFor="Premium-Properties"
                          className="w-full h-full"
                        >
                          Premium Properties
                        </label>
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="Premium-Properties"
                            value="Premium-Properties"
                            checked={propertyType === "Premium-Properties"}
                            onChange={(e) => setPropertyType(e.target.value)}
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
                      <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                        <label
                          htmlFor="Mid-Range-Properties"
                          className="w-full h-full"
                        >
                          Mid Range Properties
                        </label>
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="Mid-Range-Properties"
                            value="Mid-Range-Properties"
                            checked={propertyType === "Mid-Range-Properties"}
                            onChange={(e) => setPropertyType(e.target.value)}
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
                      <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                        <label
                          htmlFor="Entry-Level-Properties"
                          className="w-full h-full"
                        >
                          Entry Level Properties
                        </label>
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="Entry-Level-Properties"
                            value="Entry-Level-Properties"
                            checked={propertyType === "Entry-Level-Properties"}
                            onChange={(e) => setPropertyType(e.target.value)}
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
                  <div className="overflow-hidden w-full">
                    <button
                      type="button"
                      onClick={toggleDealType}
                      className="flex w-full justify-between items-center mb-0 px-2 py-3"
                    >
                      <p className="font-bold">Deal Type</p>
                      {activeAccordion5 ? <FaAngleUp /> : <FaAngleDown />}
                    </button>
                    <div
                      ref={dealTypeHeight}
                      style={{ maxHeight: `${dealsTypeHeight}` }}
                      className="transition-max-height ease-in duration-300 pl-5"
                    >
                      <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
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
                            checked={dealsType === "Flipping-deals"}
                            onChange={(e) => setDealsType(e.target.value)}
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
                      <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                        <label htmlFor="Off-Plan" className="w-full h-full">
                          Off-Plan
                        </label>
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="Off-Plan"
                            value="Off-Plan"
                            checked={dealsType === "Off-Plan"}
                            onChange={(e) => setDealsType(e.target.value)}
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
                      <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
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
                            checked={dealsType === "Joint-Venture"}
                            onChange={(e) => setDealsType(e.target.value)}
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
                      <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
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
                            checked={dealsType === "Income-Properties"}
                            onChange={(e) => setDealsType(e.target.value)}
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
                      <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
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
                            checked={dealsType === "For-Redevelopment"}
                            onChange={(e) => setDealsType(e.target.value)}
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
                      <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
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
                            checked={dealsType === "Incomplete-Buildings"}
                            onChange={(e) => setDealsType(e.target.value)}
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
                      <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
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
                            checked={dealsType === "Institutional-Properties"}
                            onChange={(e) => setDealsType(e.target.value)}
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
                      <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                        <label
                          htmlFor="Destressed-Sale"
                          className="w-full h-full"
                        >
                          Destressed Sale
                        </label>
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="Destressed-Sale"
                            value="Destressed-Sale"
                            checked={dealsType === "Destressed-Sale"}
                            onChange={(e) => setDealsType(e.target.value)}
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
                      <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                        <label htmlFor="Quick-Sale" className="w-full h-full">
                          Quick Sale
                        </label>
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="Quick-Sale"
                            value="Quick-Sale"
                            checked={dealsType === "Quick-Sale"}
                            onChange={(e) => setDealsType(e.target.value)}
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
                </>
              )}
              <div className="overflow-hidden w-full">
                <button
                  type="button"
                  onClick={toggleFinancing}
                  className="flex w-full justify-between items-center mb-0 px-2 py-3"
                >
                  <p className="font-bold">Financing</p>
                  {activeAccordion6 ? <FaAngleUp /> : <FaAngleDown />}
                </button>
                <div
                  ref={financingHeight}
                  style={{ maxHeight: `${financingTypeHeight}` }}
                  className="transition-max-height ease-in duration-300 pl-5"
                >
                  <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                    <label htmlFor="Cash-Buyers-Only" className="w-full h-full">
                      Cash Buyers Only
                    </label>
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="Cash-Buyers-Only"
                        value="Cash-Buyers-Only"
                        checked={financing === "Cash-Buyers-Only"}
                        onChange={(e) => setFinancingType(e.target.value)}
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
                  <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                    <label htmlFor="Mortgage" className="w-full h-full">
                      Financing Available
                    </label>
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="Mortgage"
                        value="Financing Available"
                        checked={financing === "Financing Available"}
                        onChange={(e) => setFinancingType(e.target.value)}
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
          </div>
        </div>
        <div className="w-full h-full md:px-0 px-4">
          <div className="md:hidden z-1010">
            <div className="grid grid-cols-2 gap-4 mb-4">
              {mainCategory === "residential" ? (
                <>
                  <div className="flex relative mr-2">
                    <button
                      onClick={() => setSaleCondition("For Rent")}
                      className={
                        saleConditon === "For Rent"
                          ? `bg-cloud-theme-gold w-full px-5 text-xs rounded shadow-md text-white py-2.5`
                          : `bg-cloud-theme-blue w-full px-5 text-xs rounded shadow-md text-white py-2.5`
                      }
                    >
                      FOR RENT
                    </button>
                    <div
                      className={
                        saleConditon === "For Rent"
                          ? `absolute inline-flex w-2 h-2 duration-800 rounded-full animate-ping bg-red-500`
                          : `hidden`
                      }
                    ></div>
                  </div>
                  <div className="flex relative">
                    <button
                      type="button"
                      onClick={() => setSaleCondition("For Sale")}
                      className={
                        saleConditon === "For Sale"
                          ? `bg-cloud-theme-gold w-full px-5 text-xs rounded shadow-md text-white py-2.5`
                          : `bg-cloud-theme-blue w-full px-5 text-xs rounded shadow-md text-white py-2.5`
                      }
                    >
                      FOR SALE
                    </button>
                    <div
                      className={
                        saleConditon === "For Sale"
                          ? `absolute inline-flex w-2 h-2 duration-800 rounded-full animate-ping bg-red-500`
                          : `hidden`
                      }
                    ></div>
                  </div>
                </>
              ) : mainCategory === "land" ? (
                <>
                  <div className="flex relative mr-2">
                    <button
                      type="button"
                      onClick={() => setSaleCondition("For Sale")}
                      className={
                        saleConditon === "For Sale"
                          ? `bg-cloud-theme-gold w-full px-5 text-xs rounded shadow-md text-white py-2.5`
                          : `bg-cloud-theme-blue w-full px-5 text-xs rounded shadow-md text-white py-2.5`
                      }
                    >
                      FOR SALE
                    </button>
                    <div
                      className={
                        saleConditon === "For Sale"
                          ? `absolute inline-flex w-2 h-2 duration-800 rounded-full animate-ping bg-red-500`
                          : `hidden`
                      }
                    ></div>
                  </div>
                  <div className="flex relative">
                    <button
                      type="button"
                      onClick={() => setSaleCondition("For Lease")}
                      className={
                        saleConditon === "For Lease"
                          ? `bg-cloud-theme-gold w-full px-5 text-xs rounded shadow-md text-white py-2.5`
                          : `bg-cloud-theme-blue w-full px-5 text-xs rounded shadow-md text-white py-2.5`
                      }
                    >
                      FOR LEASE
                    </button>
                    <div
                      className={
                        saleConditon === "For Lease"
                          ? `absolute inline-flex w-2 h-2 duration-800 rounded-full animate-ping bg-red-500`
                          : `hidden`
                      }
                    ></div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex relative mr-2">
                    <button
                      type="button"
                      onClick={() => setSaleCondition("For Rent")}
                      className={
                        saleConditon === "For Rent"
                          ? `bg-cloud-theme-gold w-full px-5 text-xs rounded shadow-md text-white py-2.5`
                          : `bg-cloud-theme-blue w-full px-5 text-xs rounded shadow-md text-white py-2.5`
                      }
                    >
                      TO-LET
                    </button>
                    <div
                      className={
                        saleConditon === "For Rent"
                          ? `absolute inline-flex w-2 h-2 duration-800 rounded-full animate-ping bg-red-500`
                          : `hidden`
                      }
                    ></div>
                  </div>
                  <div className="flex relative">
                    <button
                      type="button"
                      onClick={() => setSaleCondition("For Sale")}
                      className={
                        saleConditon === "For Sale"
                          ? `bg-cloud-theme-gold w-full px-5 text-xs rounded shadow-md text-white py-2.5`
                          : `bg-cloud-theme-blue w-full px-5 text-xs rounded shadow-md text-white py-2.5`
                      }
                    >
                      FOR SALE
                    </button>
                    <div
                      className={
                        saleConditon === "For Sale"
                          ? `absolute inline-flex w-2 h-2 duration-800 rounded-full animate-ping bg-red-500`
                          : `hidden`
                      }
                    ></div>
                  </div>
                </>
              )}
            </div>
            <div className="flex flex-1 items-center justify-between mb-3 content-center">
              <div className="text-sm flex justify-between items-center content-center">
                <ul className="flex">
                  <li className="text-sm mr-3">
                    <Link href="/auth/user/my-preferences">
                      <a className="flex justify-center items-center content-center">
                        <BsHeartFill className="mr-2 text-base" />
                        Liked
                      </a>
                    </Link>
                  </li>
                  {isGrid ? (
                    <li
                      onClick={() => setIsGrid(!isGrid)}
                      className="flex justify-center shadow-md px-1 items-center content-center text-sm  mr-3"
                    >
                      <GrMap className="mr-1 text-base" />
                      map
                    </li>
                  ) : (
                    <li
                      onClick={() => setIsGrid(!isGrid)}
                      className="flex justify-center shadow-md px-1  items-center content-center text-sm  mr-3"
                    >
                      <IoListSharp className="mr-1 text-base" />
                      grid
                    </li>
                  )}
                </ul>
                {/* <div className="flex justify-center items-center content-center">
                  <li className="flex justify-center items-center content-center font-semibold text-sm mr-3">
                    Sort:
                  </li>
                  <li className="flex justify-center items-center content-center text-sm">
                    recomended
                    <FaAngleDown className="mr-l text-base" />
                  </li>
                </div> */}
              </div>
            </div>
          </div>
          <div className="md:mt-4">
            <h4 className="font-semibold text-lg">Properties For You</h4>
          </div>
          {isGrid ? (
            <>
              <div className="w-full h-full grid grid-cols-1 xs-l:grid-cols-2 md-xl:grid-cols-3 gap-3 md:gap-5 md:pr-4">
                {mainCategory === "land" ? (
                  landLoading ? (
                    <div className="flex sticky top- col-span-3 w-full h-[24rem] items-center justify-center content-center">
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
                        <div className="pt-3 pl-0" key={index}>
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
                                <div className=" bg-cloud-theme-red py-2 px-4 rounded-md mr-1.5">
                                  <p className="font-bold">
                                    <GoFlame className="text-xs dark:text-black" />
                                  </p>
                                </div>
                                <div className="bg-white py-1.5 px-2.5 rounded-md dark:bg-cloud-theme-dark">
                                  {listing.properties.category
                                    ?.category_name === "For Sale" ? (
                                    <p className="font-semibold text-xs text-cloud-theme-blue ">
                                      SALE
                                    </p>
                                  ) : (
                                    <p className="font-semibold text-xs text-cloud-theme-blue ">
                                      LEASE
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
                                    <AiOutlineHeart className="mt-1 text-base" />
                                  </button>
                                </div>
                                <div className="rounded-md group">
                                  <button
                                    type="button"
                                    className="bg-transparent dark:bg-cloud-theme-dark ring-cloud-theme-blue ring-1 flex justify-center rounded-full w-6 h-6"
                                  >
                                    <BsShareFill className="mt-1 text-base text-white" />
                                  </button>
                                  {/* <ul
                                    className="absolute bg-white top-0 group-hover:right-0 duration-200 ease-in py-1 px-2 
                                    -right-full transition-all duration-50"
                                  >
                                    <li>
                                      <FacebookShareButton
                                        quote={listing.properties.title}
                                        // url = {String(window.location.href)}
                                        url={`${process.env.REACT_APP_DJANGO_SEMIBASE_URL}/listings/more-info/${listing.properties.slug}`}
                                      >
                                        <FacebookIcon size={20} round={true} />
                                      </FacebookShareButton>
                                    </li>
                                    <li>
                                      <TwitterShareButton
                                        title={listing.properties.title}
                                        related={['@EstateCloudKe']}
                        hashtags={['1EstateCloud']}
                                        url={`${process.env.REACT_APP_DJANGO_SEMIBASE_URL}/listings/more-info/${listing.properties.slug}`}
                                      >
                                        <TwitterIcon size={20} round={true} />
                                      </TwitterShareButton>
                                    </li>
                                    <li>
                                      <WhatsappShareButton
                                        title={listing.properties.title}
                                        url={`${process.env.REACT_APP_DJANGO_SEMIBASE_URL}/listings/more-info/${listing.properties.slug}`}
                                      >
                                        <WhatsappIcon size={20} round={true} />
                                      </WhatsappShareButton>
                                    </li>
                                    <li>
                                      <TelegramShareButton
                                        title={listing.properties.title}
                                        url={`${process.env.REACT_APP_DJANGO_SEMIBASE_URL}/listings/more-info/${listing.properties.slug}`}
                                      >
                                        <TelegramIcon size={20} round={true} />
                                      </TelegramShareButton>
                                    </li>
                                  </ul> */}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="p-2 pt-2 h-32 rounded-lg dark:shadow-darkShadow shadow-lg z-10 opacity-100 bg-white dark:bg-cloud-theme-dark dark:text-white relative -top-6">
                            <Link
                              href={`/listings/more-info/${listing.properties.slug}`}
                            >
                              <a>
                                <p className="md:text-base text-xxs-l text-opacity-0 mb-2">
                                  {width >= 1000
                                    ? truncateWords(
                                        listing.properties.title,
                                        45
                                      )
                                    : width >= 840 && width < 1000
                                    ? truncateWords(
                                        listing.properties.title,
                                        55
                                      )
                                    : width > 768 && width < 840
                                    ? truncateWords(
                                        listing.properties.title,
                                        40
                                      )
                                    : width >= 630 && width <= 768
                                    ? truncateWords(
                                        listing.properties.title,
                                        68
                                      )
                                    : width >= 500 && width < 630
                                    ? truncateWords(
                                        listing.properties.title,
                                        55
                                      )
                                    : truncateWords(
                                        listing.properties.title,
                                        72
                                      )}
                                </p>
                                <div className="flex justify-between font-bold">
                                  {listing.properties.category
                                    ?.category_name === "For Lease" ||
                                  listing.properties.category?.category_name ===
                                    "To Let"
                                    ? listing.properties.lease_price && (
                                        <p className="text-base">
                                          KES{" "}
                                          {NumberFormat(
                                            listing.properties.lease_price
                                          )}
                                        </p>
                                      )
                                    : listing.properties.selling_price && (
                                        <p className="text-base">
                                          KES{" "}
                                          {NumberFormat(
                                            listing.properties.selling_price
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
                                      20
                                    )}
                                  </p>
                                  {listing.properties.property_size && (
                                    <p className="text-blue-500 text-base">
                                      {NumberFormat(
                                        listing.properties.property_size
                                      )}
                                      ft
                                      <sup>2</sup>
                                    </p>
                                  )}
                                </div>
                              </a>
                            </Link>
                          </div>
                        </div>
                      );
                    })
                  )
                ) : mainCategory === "residential" ? (
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
                        <div className="pt-3 pl-0" key={index}>
                          <div className="h-52 rounded-t-xl overflow-hidden relative">
                            <Link
                              href={`/listings/more-info/${listing.properties.slug}`}
                            >
                              <img
                                src={listing.properties.Images[0]?.images}
                                alt={listing.properties.title.substring(0, 50)}
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
                                  {listing.properties.category
                                    ?.category_name === "For Sale" ? (
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
                                    <AiOutlineHeart className="mt-1 text-base" />
                                  </button>
                                </div>
                                <div className="rounded-md group">
                                  <button
                                    type="button"
                                    className="bg-transparent dark:bg-cloud-theme-dark ring-cloud-theme-blue ring-1 flex justify-center rounded-full w-6 h-6"
                                  >
                                    <BsShareFill className="mt-1.5 text-base text-white" />
                                  </button>
                                  {/* <ul
                                    className="absolute bg-white top-0 group-hover:right-0 duration-200 ease-in py-1 px-2 
                                -right-full transition-all duration-50"
                                  >
                                    <li>
                                      <FacebookShareButton
                                        quote={listing.title}
                                        // url = {String(window.location.href)}
                                        url={`${process.env.REACT_APP_DJANGO_SEMIBASE_URL}/listings/more-info/${listing.properties.slug}`}
                                      >
                                        <FacebookIcon size={20} round={true} />
                                      </FacebookShareButton>
                                    </li>
                                    <li>
                                      <TwitterShareButton
                                        title={listing.title}
                                        related={['@EstateCloudKe']}
                        hashtags={['1EstateCloud']}
                                        url={`${process.env.REACT_APP_DJANGO_SEMIBASE_URL}/listings/more-info/${listing.properties.slug}`}
                                      >
                                        <TwitterIcon size={20} round={true} />
                                      </TwitterShareButton>
                                    </li>
                                    <li>
                                      <WhatsappShareButton
                                        title={listing.title}
                                        url={`${process.env.REACT_APP_DJANGO_SEMIBASE_URL}/listings/more-info/${listing.properties.slug}`}
                                      >
                                        <WhatsappIcon size={20} round={true} />
                                      </WhatsappShareButton>
                                    </li>
                                    <li>
                                      <TelegramShareButton
                                        title={listing.title}
                                        url={`${process.env.REACT_APP_DJANGO_SEMIBASE_URL}/listings/more-info/${listing.properties.slug}`}
                                      >
                                        <TelegramIcon size={20} round={true} />
                                      </TelegramShareButton>
                                    </li>
                                  </ul> */}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="p-2 pt-2 h-32 rounded-lg dark:shadow-darkShadow shadow-lg z-10 opacity-100 bg-white dark:bg-cloud-theme-dark dark:text-white relative -top-6">
                            <Link
                              href={`/listings/more-info/${listing.properties.slug}`}
                            >
                              <a>
                                <p className="md:text-base text-xxs-l text-opacity-0 mb-2">
                                  {width >= 1000
                                    ? truncateWords(
                                        listing.properties.title,
                                        45
                                      )
                                    : width >= 840 && width < 1000
                                    ? truncateWords(
                                        listing.properties.title,
                                        55
                                      )
                                    : width > 768 && width < 840
                                    ? truncateWords(
                                        listing.properties.title,
                                        40
                                      )
                                    : width >= 630 && width <= 768
                                    ? truncateWords(
                                        listing.properties.title,
                                        68
                                      )
                                    : width >= 500 && width < 630
                                    ? truncateWords(
                                        listing.properties.title,
                                        55
                                      )
                                    : truncateWords(
                                        listing.properties.title,
                                        72
                                      )}
                                </p>
                                <div className="flex justify-between font-bold">
                                  {listing.properties.category
                                    ?.category_name === "For Rent" ||
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
                                    : listing.properties.category
                                        ?.category_name === "For Sale"
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
                                      20
                                    )}
                                  </p>
                                  <p className="text-blue-500 text-sm">
                                    {NumberFormat(
                                      listing.properties.living_area
                                    )}
                                    ft<sup>2</sup>
                                  </p>
                                </div>
                              </a>
                            </Link>
                          </div>
                        </div>
                      );
                    })
                  )
                ) : commercialLoading ? (
                  <div className="flex col-span-3 w-full h-[24rem] items-center justify-center content-center">
                    <SpinOne />
                  </div>
                ) : !commercialLoading && commercialListings.length <= 0 ? (
                  <div className="flex sticky top- col-span-3 w-full h-[24rem] items-center justify-center content-center">
                    <p className="font-semibold mt-24">
                      No items found. Filter more
                    </p>
                  </div>
                ) : commercialListings ? (
                  commercialListings.flatMap((listing, index) => {
                    return (
                      <div className="pt-3 pl-0" key={index}>
                        <div className="h-52 rounded-t-xl overflow-hidden relative">
                          <Link
                            href={`/listings/more-info/${listing.properties.slug}`}
                          >
                            <img
                              src={listing.properties.Images[0]?.images}
                              alt={listing.properties.title.substring(0, 50)}
                              className="w-full h-full object-cover"
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
                                    dispatch(
                                      likeListings(listing.properties.slug)
                                    )
                                  }
                                  className="bg-transparent dark:bg-cloud-theme-dark ring-cloud-theme-blue ring-1 flex justify-center rounded-full w-6 h-6 mr-4"
                                >
                                  <AiOutlineHeart className="mt-1 text-base" />
                                </button>
                              </div>
                              <div className="rounded-md group">
                                <button
                                  type="button"
                                  className="bg-transparent dark:bg-cloud-theme-dark ring-cloud-theme-blue ring-1 flex justify-center rounded-full w-6 h-6"
                                >
                                  <BsShareFill className="mt-1.5 text-base text-white" />
                                </button>
                                {/* <ul
                                  className="absolute bg-white top-0 group-hover:right-0 duration-200 ease-in py-1 px-2 
                                    -right-full transition-all duration-50"
                                >
                                  <li>
                                    <FacebookShareButton
                                      quote={listing.properties.title}
                                      // url = {String(window.location.href)}
                                      url={`${process.env.REACT_APP_DJANGO_SEMIBASE_URL}/listings/more-info/${listing.properties.slug}`}
                                    >
                                      <FacebookIcon size={20} round={true} />
                                    </FacebookShareButton>
                                  </li>
                                  <li> 
                                    <TwitterShareButton
                                      title={listing.properties.title}
                                      related={['@EstateCloudKe']}
                        hashtags={['1EstateCloud']}
                                      url={`${process.env.REACT_APP_DJANGO_SEMIBASE_URL}/listings/more-info/${listing.properties.slug}`}
                                    >
                                      <TwitterIcon size={20} round={true} />
                                    </TwitterShareButton>
                                  </li>
                                  <li>
                                    <WhatsappShareButton
                                      title={listing.properties.title}
                                      url={`${process.env.REACT_APP_DJANGO_SEMIBASE_URL}/listings/more-info/${listing.properties.slug}`}
                                    >
                                      <WhatsappIcon size={20} round={true} />
                                    </WhatsappShareButton>
                                  </li>
                                  <li>
                                    <TelegramShareButton
                                      title={listing.properties.title}
                                      url={`${process.env.REACT_APP_DJANGO_SEMIBASE_URL}/listings/more-info/${listing.properties.slug}`}
                                    >
                                      <TelegramIcon size={20} round={true} />
                                    </TelegramShareButton>
                                  </li>
                                </ul> */}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-2 pt-2 h-32 rounded-lg dark:shadow-darkShadow shadow-lg z-10 opacity-100 bg-white dark:bg-cloud-theme-dark dark:text-white relative -top-6">
                          <Link
                            href={`/listings/more-info/${listing.properties.slug}`}
                          >
                            <a>
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
                                  : listing.properties.category
                                      ?.category_name === "For Sale"
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
                                    20
                                  )}
                                </p>
                                {listing.properties.property_size && (
                                  <p className="text-blue-500 text-base">
                                    {NumberFormat(
                                      listing.properties.property_size
                                    )}
                                    ft
                                    <sup>2</sup>
                                  </p>
                                )}
                              </div>
                            </a>
                          </Link>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex sticky top- col-span-3 w-full h-[24rem] items-center justify-center content-center">
                    <p className="font-semibold mt-24">
                      No items found. Filter more
                    </p>
                  </div>
                )}
              </div>
              {/* <div className="flex w-full justify-center items-center content-center">
                <ListingPropertiesPagination
                  myPostNext={next}
                  myPostPrev={prev}
                  mainCategory={mainCategory}
                  dispatch={dispatch}
                />
              </div> */}
            </>
          ) : (
            <div className="w-full h-screen relative">
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
                  residentialListings && (
                    <>
                      {isLoaded ? (
                        <GoogleMap
                          mapContainerClassName="w-full h-full"
                          center={mapCenter}
                          zoom={12}
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
                  )
                )
              ) : mainCategory === "land" ? (
                landLoading ? (
                  <div className="flex sticky top- col-span-3 w-full h-[24rem] items-center justify-center content-center">
                    <SpinOne />
                  </div>
                ) : !landLoading && landListings.length <= 0 ? (
                  <div className="flex sticky top- col-span-3 w-full h-[24rem] items-center justify-center content-center">
                    <p className="font-semibold mt-24">
                      No items found. Filter more
                    </p>
                  </div>
                ) : (
                  landListings && (
                    <>
                      {isLoaded ? (
                        <GoogleMap
                          mapContainerClassName="w-full h-full"
                          center={mapCenter}
                          zoom={12}
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
                  )
                )
              ) : commercialLoading ? (
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
                commercialListings && (
                  <>
                    {isLoaded ? (
                      <GoogleMap
                        mapContainerClassName="w-full h-full"
                        center={mapCenter}
                        zoom={12}
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
                )
              )}
            </div>
          )}
        </div>
      </div>
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
            ? listing.properties.category?.category_name === "For Sale"
              ? {
                  path: "M12 1c-3.148 0-6 2.553-6 5.702 0 3.148 2.602 6.907 6 12.298 3.398-5.391 6-9.15 6-12.298 0-3.149-2.851-5.702-6-5.702zm0 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm8 6h-3.135c-.385.641-.798 1.309-1.232 2h3.131l.5 1h-4.264l-.344.544-.289.456h.558l.858 2h-7.488l.858-2h.479l-.289-.456-.343-.544h-2.042l-1.011-1h2.42c-.435-.691-.848-1.359-1.232-2h-3.135l-4 8h24l-4-8zm-12.794 6h-3.97l1.764-3.528 1.516 1.528h1.549l-.859 2zm8.808-2h3.75l1 2h-3.892l-.858-2z",
                  fillColor: "#FB911B",
                  fillOpacity: 0.9,
                  strokeWeight: 0,
                  rotation: 0,
                  scale: 2,
                  anchor: new google.maps.Point(15, 30),
                }
              : {
                  path: "M12 1c-3.148 0-6 2.553-6 5.702 0 3.148 2.602 6.907 6 12.298 3.398-5.391 6-9.15 6-12.298 0-3.149-2.851-5.702-6-5.702zm0 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm8 6h-3.135c-.385.641-.798 1.309-1.232 2h3.131l.5 1h-4.264l-.344.544-.289.456h.558l.858 2h-7.488l.858-2h.479l-.289-.456-.343-.544h-2.042l-1.011-1h2.42c-.435-.691-.848-1.359-1.232-2h-3.135l-4 8h24l-4-8zm-12.794 6h-3.97l1.764-3.528 1.516 1.528h1.549l-.859 2zm8.808-2h3.75l1 2h-3.892l-.858-2z",
                  fillColor: "#0467C7",
                  fillOpacity: 0.9,
                  strokeWeight: 0,
                  rotation: 0,
                  scale: 2,
                  anchor: new google.maps.Point(15, 30),
                }
            : listing.properties.is_commercial
            ? listing.properties.category?.category_name === "For Sale"
              ? {
                  path: "M24 24h-23v-16h6v-8h11v12h6v12zm-12-5h-3v4h3v-4zm4 0h-3v4h3v-4zm6 0h-2v4h2v-4zm-17 0h-2v4h2v-4zm11-5h-2v2h2v-2zm-5 0h-2v2h2v-2zm11 0h-2v2h2v-2zm-17 0h-2v2h2v-2zm11-4h-2v2h2v-2zm-5 0h-2v2h2v-2zm-6 0h-2v2h2v-2zm11-4h-2v2h2v-2zm-5 0h-2v2h2v-2zm5-4h-2v2h2v-2zm-5 0h-2v2h2v-2z",
                  fillColor: "#FB911B",
                  fillOpacity: 0.9,
                  strokeWeight: 0,
                  rotation: 0,
                  scale: 2,
                  anchor: new google.maps.Point(15, 30),
                }
              : {
                  path: "M24 24h-23v-16h6v-8h11v12h6v12zm-12-5h-3v4h3v-4zm4 0h-3v4h3v-4zm6 0h-2v4h2v-4zm-17 0h-2v4h2v-4zm11-5h-2v2h2v-2zm-5 0h-2v2h2v-2zm11 0h-2v2h2v-2zm-17 0h-2v2h2v-2zm11-4h-2v2h2v-2zm-5 0h-2v2h2v-2zm-6 0h-2v2h2v-2zm11-4h-2v2h2v-2zm-5 0h-2v2h2v-2zm5-4h-2v2h2v-2zm-5 0h-2v2h2v-2z",
                  fillColor: "#0467C7",
                  fillOpacity: 0.9,
                  strokeWeight: 0,
                  rotation: 0,
                  scale: 2,
                  anchor: new google.maps.Point(15, 30),
                }
            : listing.properties.is_residential
            ? listing.properties.category?.category_name === "For Sale"
              ? {
                  path: "M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z",
                  fillColor: "FB911B",
                  fillOpacity: 0.9,
                  strokeWeight: 0,
                  rotation: 0,
                  scale: 2,
                  anchor: new google.maps.Point(15, 30),
                }
              : {
                  path: "M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z",
                  fillColor: "#0467C7",
                  fillOpacity: 0.9,
                  strokeWeight: 0,
                  rotation: 0,
                  scale: 2,
                  anchor: new google.maps.Point(15, 30),
                }
            : ""
        }
      >
        {activeMarker === index ? (
          <InfoWindow onCloseClick={() => setActiveMarker(null)}>
            <div className="p-0 rounded-lg mt-0 w-60 h-full">
              <Link href={`/listings/more-info/${listing.properties.slug}`}>
                <a>
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
                </a>
              </Link>
            </div>
          </InfoWindow>
        ) : null}
        {/* <Tooltip>{listing.properties.title}</Tooltip> */}
      </Marker>
    </>
  );
};
export default Properties;
