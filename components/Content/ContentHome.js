import { useEffect, useMemo, useRef, useState } from "react";
import { BsBuilding, BsFillHouseFill, BsGraphUp } from "react-icons/bs";
import { FaHandsHelping, FaSearch } from "react-icons/fa";
import { GiArchiveResearch, GiNewspaper, GiReceiveMoney } from "react-icons/gi";
import { BiLandscape } from "react-icons/bi";
import Moment from "react-moment";
import { HiOutlineReceiptTax } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
// import videojs from "video.js";
// import "video.js/dist/video-js.css";
import { Pagination, Autoplay, Navigation, EffectCreative } from "swiper";

import { truncateWords } from "../../utils/Truncate";
// import { TrackpageView } from "../GAnalytics";
import Head from "next/head";
import { getFeaturedPosts, getLatestPosts, getPopularPosts } from "../../state/actionCreators/content";
import { useRouter } from "next/router";

const ContentHome = () => {
  const dispatch = useDispatch();
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("");
  const videos = useSelector((state) => state.contents.videos);
  const latestUpdate = useSelector((state) => state.contents.latestUpdate);
  const randomPosts = useSelector((state) => state.contents.randomPosts);
  const popularPosts = useSelector((state) => state.contents.popularPosts);
  const featuredPosts = useSelector((state) => state.contents.featuredPosts);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getPopularPosts());
    dispatch(getLatestPosts());
    dispatch(getFeaturedPosts());
    // TrackpageView("/news"); 
  }, [dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();
    // history({
    //   pathname: "/listings/search/properties",
    //   search: "?search=" + searchQuery,
    // });
    router.push({
      pathname:  "/news/feed",
      query: { q: searchQuery},
    })
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
      1536: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      640: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      490: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      0: {
        slidesPerView: 1.5,
        spaceBetween: 10,
      },
    },
  };
  const swiperParams2 = {
    spaceBetween: 15,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: { clickable: true, dynamicBullets: true },
    slidesPerView: 4,
    // navigation:{
    //   navigation:true
    // },
    modules: [Autoplay, Navigation],
    breakpoints: {
      768: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      640: {
        slidesPerView: 3,
        spaceBetween: 10,
      },

      0: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
    },
  };
  return (
    <>
      <Head>
        <title>Estate Cloud News and Insights </title>
        <meta name="detail" content="research, data and news" />
      </Head>
      <section className="p-4">
        <div className="mt-[5.5rem] mb-8">
          <div className="text-cloud-theme-blue mb-4">
            <div className="">
              <h2 className="font-bold text-2xl">News & Insights</h2>
            </div>
          </div>
          <div className="p-0 rounded-md shadow-lg">
            <div className="flex w-full">
              <form onSubmit={handleSubmit} className="flex w-full shadow-lg">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-none rounded-l-lg dark:bg-gray-700  dark:border-cloud-theme-blue dark:placeholder-gray-400 dark:text-white  bg-gray-50 border border-1 outline-none border-gray-300 text-gray-900 focus:border-cloud-theme-blue block flex-1 w-full text-sm p-2.5"
                  placeholder="e.g. location, area, name"
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
            </div>
          </div>
        </div>
        <div
          className="grid grid-cols-1 md:grid-cols-7 mb-5 md:mb-7 rounded-md overflow-hidden
         sm:h-[52vh] h-[35vh] gap-4"
        >
          {randomPosts && randomPosts.length > 0 ? (
            <article  className="col-span-4 h-full rounded-md overflow-hidden shadow-lg">
              <Swiper
                slidesPerView={1}
                autoplay={{
                  delay: 10000,
                  disableOnInteraction: false,
                }}
                grabCursor={true}
                effect={"creative"}
                spaceBetween={3}
                creativeEffect={{
                  prev: {
                    shadow: true,
                    translate: [0, 0, -400],
                  },
                  next: {
                    translate: ["100%", 0, 0],
                  },
                }}
                pagination={{ clickable: true }}
                modules={[Pagination, Autoplay, EffectCreative]}
              >
                {randomPosts.flatMap((item, index) => (
                  <SwiperSlide className="w-full h-full" key={item.id}>
                    <div className="w-full sm:h-[52vh] h-[35vh] rounded-md">
                      <Link href={`/news/more/${item.slug}`}>
                        <img
                          src={item.thumbnail && item.thumbnail}
                          alt={item.title.substring(0, 40)}
                          className="w-full h-full group-hover:scale-125 ease-in rounded-md duration-300 object-cover"
                        />
                      </Link>
                      <div className="absolute top-0 mt-40 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-blue-900"></div>
                      <div className="absolute bottom-0 p-5 mb-5 text-white">
                        <div className="flex justify-start items-center content-center mb-2 text-xs">
                          <span className="px-2 py-0.5 bg-black text-sm mr-2">
                            {item.Location}
                          </span>
                        </div>
                        <div>
                          <Link
                            href={`/news/more/${item.slug}`}
                            className="font-semibold leading-tight sm:leading-snug sm:text-lg text-sm hover:underline"
                          >
                            {truncateWords(item.title, 85)}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </article>
          ) : (
            <div className="w-full col-span-4 animate-pulse bg-gray-300 h-full rounded-md">
              <div className=" bg-gray-300"></div>
              <div className=" bg-gray-300"></div>
              <div className=" p-5 mb-5 bg-gray-300">
                <div className="flex justify-start items-center content-center mb-2 text-xs">
                  <span className="px-2 py-0.5 animate-pulse text-sm mr-2"></span>
                </div>
                <div className="py-3 animate-pulse"></div>
              </div>
            </div>
          )}
          <div className="col-span-3 rounded-md sm:h-[52vh] h-[35vh] grid grid-cols-2 gap-3 ">
            {randomPosts?.length > 0 
              ? randomPosts.slice(0, 2).flatMap((item) => (
                  <article key={item.id} className="rounded-md h-full bg-blue-900 overflow-hidden relative shadow-lg">
                    <Link href={`/news/more/${item.slug}`}>
                      <img
                        src={item.thumbnail && item.thumbnail}
                        alt={item.title}
                        className="w-full h-full group-hover:scale-125 ease-in rounded-md duration-300 object-cover"
                      />
                    </Link>
                    <div className="absolute top-0 mt-40 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-blue-900"></div>
                    <div className="absolute bottom-0 p-5 mb-5 text-white">
                      <div className="flex justify-start items-center content-center mb-2 text-xs">
                        <span className="px-2 py-0.5 bg-black text-sm mr-2">
                          {item.Location}
                        </span>
                      </div>
                      <div>
                        <Link
                          href={`/news/more/${item.slug}`}
                          className="font-semibold leading-tight sm:leading-snug sm:text-base text-sm hover:underline"
                        >
                          {truncateWords(item.title, 42)}
                        </Link>
                      </div>
                    </div>
                  </article>
                ))
              : [1, 2].flatMap((_, index) => (
                  <div
                    className="animate-pulse w-full h-full relative shadow-md overflow-hidden rounded-md"
                    key={index}
                  >
                    <div className="w-full h-full bg-gray-300"></div>

                    <div className="absolute top-0 mt-40 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-blue-900"></div>
                    <div className="absolute bottom-0 p-3 mb-2 text-white w-full">
                      <div className="flex justify-start items-center content-center mb-2 text-xs">
                        <span className="py-1 rounded-md w-5/12 bg-gray-200 mr-2"></span>
                      </div>
                      <div>
                        <p className="bg-gray-200 p-1 mb-1.5 rounded-md w-full"></p>
                        <p className="bg-gray-200 p-1 rounded-md w-2/3"></p>
                      </div>
                    </div>
                  </div>
                ))}
            {/* <div className="w-full h-full rounded-md">
                      <Link href={`/news/more/${item.slug}`}>
                        <img
                          src={item.thumbnail && item.thumbnail}
                          alt={item.title}
                          className="w-full h-full group-hover:scale-125 ease-in rounded-md duration-300 object-cover"
                        />
                      </Link>
                      <div className="absolute top-0 mt-40 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-blue-900"></div>
                      <div className="absolute bottom-0 p-5 mb-5 text-white">
                        <div className="flex justify-start items-center content-center mb-2 text-xs">
                          <span className="px-2 py-0.5 bg-black text-sm mr-2">
                            {item.Location}
                          </span>
                        </div>
                        <div>
                          <Link
                            href={`/news/more/${item.slug}`}
                            className="font-semibold leading-tight sm:leading-snug sm:text-lg text-sm hover:underline"
                          >
                            {item.title}
                          </Link>
                        </div>
                      </div>
                    </div> */}
          </div>
        </div>
        <section className="mt-7 ">
          <div className="flex justify-start content-center items-center">
            <h3 className="text-cloud-theme-blue font-bold text-base mr-3">
              All Categories
            </h3>
            <i className="fas fa-long-arrow-alt-left "></i>
          </div>
          <div className="py-3 px-0">
            <Swiper {...swiperParams2}>
              <SwiperSlide>
                <Link href="/news/Property Trends/property-trends">
                  <a className="bg-cloud-theme-blue flex flex-col justify-center content-center items-center rounded-lg text-center text-white py-4 px-2">
                    <BsGraphUp className="text-3xl mb-3" />
                    <p className="text-sm">Property Trends</p>
                  </a>
                </Link>
              </SwiperSlide>

              <SwiperSlide>
                <Link href="/news/Markets & Economy/market-economy">
                  <a className="bg-cloud-theme-blue  flex flex-col justify-center content-center items-center rounded-lg text-center text-white p-4 pl-0">
                    <GiReceiveMoney className="text-3xl mb-3" />
                    <p className="text-sm">Markets & Economy</p>
                  </a>
                </Link>
              </SwiperSlide>

              <SwiperSlide>
                <Link href="/news/Investments & Deals/investment-and-deals">
                  <a className="bg-cloud-theme-blue flex flex-col justify-center content-center items-center rounded-lg text-center text-white py-4 px-2">
                    <FaHandsHelping className="text-3xl mb-3" />
                    <p className="text-sm">Investments & Deals</p>
                  </a>
                </Link>
              </SwiperSlide>

              <SwiperSlide>
                <Link href="/news/Research & Data/research-data">
                  <a className="bg-cloud-theme-blue flex flex-col justify-center content-center items-center rounded-lg text-center text-white py-4 px-2">
                    <GiArchiveResearch className="text-3xl mb-3" />
                    <p className="text-sm">Research & Data</p>
                  </a>
                </Link>
              </SwiperSlide>

              <SwiperSlide>
                <Link href="/news/Land Matters/land-matters">
                  <a className="bg-cloud-theme-blue flex flex-col justify-center content-center items-center rounded-lg text-center text-white py-4 px-2">
                    <BiLandscape className="text-3xl mb-3" />
                    <p className="text-sm">Land Matters</p>
                  </a>
                </Link>
              </SwiperSlide>

              <SwiperSlide>
                <Link href="/news/Tax & Legal/tax-and-legal">
                  <a className="bg-cloud-theme-blue flex flex-col justify-center content-center items-center rounded-lg text-center text-white py-4 px-2">
                    <HiOutlineReceiptTax className="text-3xl mb-3" />
                    <p className="text-sm">Tax & Legal</p>
                  </a>
                </Link>
              </SwiperSlide>

              <SwiperSlide>
                <Link href="/news/Buildings & Infrustructure/buildings-infrustructure">
                  <a className="bg-cloud-theme-blue flex flex-col justify-center content-center items-center rounded-lg text-center text-white py-4 px-2">
                    <BsBuilding className="sm:text-3xl text-xl mb-3" />
                    <p className="text-sm">Buildings & Infrustructure</p>
                  </a>
                </Link>
              </SwiperSlide>

              <SwiperSlide>
                <Link href="/news/Opinion/opinion">
                  <a className="bg-cloud-theme-blue flex flex-col justify-center content-center items-center rounded-lg text-center text-white py-4 px-2">
                    <GiNewspaper className="text-3xl mb-3" />
                    <p className="text-sm">Opinion</p>
                  </a>
                </Link>
              </SwiperSlide>

              <SwiperSlide>
                <Link href="/news/Affordable Housing/affordable-housing">
                  <a className="bg-cloud-theme-blue flex flex-col justify-center content-center items-center rounded-lg text-center text-white py-4 px-2">
                    <BsFillHouseFill className="text-3xl mb-3" />
                    <p className="text-sm">Affordable Housing</p>
                  </a>
                </Link>
              </SwiperSlide>
            </Swiper>
          </div>
        </section>
        <section className="my-3">
          <div className="flex justify-between px-0 my-3 mt-7">
            <h4 className="text-xl font-semibold text-cloud-theme-blue">
              Latest
            </h4>
          </div>
          <Swiper {...swiperParams}>
            {latestUpdate
              ? latestUpdate.length > 0
                ? latestUpdate.flatMap((item) => (
                    <SwiperSlide key={item.id}>
                      <Link href={`/news/more/${item.slug}`}>
                        <a>
                          <div className="h-64 rounded-t-xl overflow-hidden relative">
                            <img
                              src={item.thumbnail}
                              alt={item.title.substring(0, 50)}
                              className="w-full h-full object-cover"
                            />
                            {/* <div
                          className="
                          absolute
                          top-2
                          left-0
                          text-white
                          py-1
                          md:px-4
                          px-2
                          rounded-md
                        "
                        >
                          <div className="dark:bg-cloud-theme-dark font-semibold mb-4 p-2 rounded-full bg-white text-black text-center">
                            <FcReading className="text-lg" />
                          </div>
                          <div className="font-semibold p-2 rounded-full bg-cloud-theme-blue text-center">
                            <GiReceiveMoney className="text-lg" />
                          </div>
                        </div> */}
                            <div
                              className="
                        absolute
                        top-2
                        right-2
                        text-white
                        py-1
                        md:px-4
                        px-2
                        rounded-md
                      "
                            >
                              <p className="text-xs md:text-sm font-bold dark:bg-cloud-theme-dark dark:text-white rounded-lg px-2 py-1 bg-white text-black text-center">
                                {item.Location}
                              </p>
                            </div>
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
                        dark:bg-cloud-theme-dark
                        dark:text-white
                        dark:shadow-darkShadow
                        -top-6
                        h-24
                      "
                          >
                            <p className="md:text-sm text-xs text-opacity-0 mb-2 font-semibold capitalize">
                              {truncateWords(item.title, 62)}
                            </p>
                            <div className="flex justify-between content-center items-center pt-0 pb-1">
                              <p className="text-cloud-theme-blue text-xs font-medium">
                                {item.content_owner.content_creator_name}
                              </p>
                              <p className="text-cloud-theme-blue text-xs font-medium">
                                <Moment fromNow>{item.created_on}</Moment>
                              </p>
                            </div>
                          </div>
                        </a>
                      </Link>
                    </SwiperSlide>
                  ))
                : [1, 2, 3, 4, 5, 6].flatMap((_, index) => (
                    <SwiperSlide>
                      <div className="animate-pulse" key={index}>
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
                          <p className="bg-gray-300 p-2 mb-2 rounded-md w-12/12"></p>
                          <p className="bg-gray-300 p-2 mb-10 rounded-md w-9/12"></p>
                          <div className="flex justify-between content-center items-center pt-0 pb-1">
                            <p className="p-2 w-7/12 mr-6 bg-gray-300 rounded-md"></p>
                            <p className="p-2 w-7/12 bg-gray-300 rounded-md"></p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))
              : [1, 2, 3, 4, 5, 6].flatMap((_, index) => (
                  <SwiperSlide>
                    <div className="animate-pulse" key={index}>
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
                        <p className="bg-gray-300 p-2 mb-2 rounded-md w-12/12"></p>
                        <p className="bg-gray-300 p-2 mb-10 rounded-md w-9/12"></p>
                        <div className="flex justify-between content-center items-center pt-0 pb-1">
                          <p className="p-2 w-7/12 mr-6 bg-gray-300 rounded-md"></p>
                          <p className="p-2 w-7/12 bg-gray-300 rounded-md"></p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
          </Swiper>
        </section>
        {isAuthenticated ? (
          ""
        ) : (
          <section className="p-4 shadow-md flex flex-col justify-center items-center content-center ">
            <div className="mb-4 flex content-center items-center">
              <p>
                Are you an agent, developer or home owner looking to grow your
                potential?
              </p>
            </div>

            <div className="flex flex-col md:flex-row content-center items-center">
              <Link
                href="/auth/signup"
                className="py-4 px-16 text-white bg-cloud-theme-gold text-sm md:text-base font-bold rounded-lg mr-3 md:mr-5"
              >
                JOIN US!
              </Link>
              <p className="mr-5">or</p>
              <Link
                href="/auth/login"
                className="mr-5 underline text-sm md:text-base  text-cloud-theme-gold font-bold"
              >
                SIGN IN
              </Link>
            </div>
          </section>
        )}
        <section className="my-3">
          <div className="flex justify-between px-0 my-3 mt-7">
            <h4 className="text-xl font-semibold text-cloud-theme-blue">
              Popular
            </h4>
          </div>
          <Swiper {...swiperParams}>
            {popularPosts
              ? popularPosts.length > 0
                ? popularPosts.map((item) => (
                    <SwiperSlide key={item.id}>
                      <Link href={`/news/more/${item.slug}`}>
                        <a>
                          <div className="h-64 rounded-t-xl overflow-hidden relative">
                            <img
                              src={item.thumbnail}
                              alt={item.title.substring(0, 40)}
                              className="w-full h-full object-cover"
                            />
                            <div
                              className="
                        absolute
                        top-2
                        right-2
                        text-white
                        py-1
                        md:px-4
                        px-2
                        rounded-md
                      "
                            >
                              <p className="text-xs md:text-sm font-bold dark:bg-cloud-theme-dark dark:text-white rounded-lg px-2 py-1 bg-white text-black text-center">
                                {item.Location}
                              </p>
                            </div>
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
                          dark:bg-cloud-theme-dark
                          dark:text-white
                          dark:shadow-darkShadow
                          -top-6
                          h-24
                        "
                          >
                            <p className="md:text-sm text-xs text-opacity-0 mb-2 font-semibold capitalize">
                              {truncateWords(item.title, 62)}
                            </p>
                            <div className="flex justify-between content-center items-center pt-0 pb-1">
                              <p className="text-cloud-theme-blue text-sm font-medium">
                                {item.content_owner.content_creator_name}
                              </p>
                              <p className="text-cloud-theme-blue text-sm font-medium">
                                <Moment fromNow>{item.created_on}</Moment>
                              </p>
                            </div>
                          </div>
                        </a>
                      </Link>
                    </SwiperSlide>
                  ))
                : [1, 2, 3, 4, 5, 6].flatMap((_, index) => (
                    <SwiperSlide>
                      <div className="animate-pulse" key={index}>
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
                          <p className="bg-gray-300 p-2 mb-2 rounded-md w-12/12"></p>
                          <p className="bg-gray-300 p-2 mb-10 rounded-md w-9/12"></p>
                          <div className="flex justify-between content-center items-center pt-0 pb-1">
                            <p className="p-2 w-7/12 mr-6 bg-gray-300 rounded-md"></p>
                            <p className="p-2 w-7/12 bg-gray-300 rounded-md"></p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))
              : [1, 2, 3, 4, 5, 6].flatMap((_, index) => (
                  <SwiperSlide>
                    <div className="animate-pulse" key={index}>
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
                        <p className="bg-gray-300 p-2 mb-2 rounded-md w-12/12"></p>
                        <p className="bg-gray-300 p-2 mb-10 rounded-md w-9/12"></p>
                        <div className="flex justify-between content-center items-center pt-0 pb-1">
                          <p className="p-2 w-7/12 mr-6 bg-gray-300 rounded-md"></p>
                          <p className="p-2 w-7/12 bg-gray-300 rounded-md"></p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
          </Swiper>
        </section>
        <section>
          <div className="flex justify-between px-0 my-3 mt-7">
            <h4 className="text-xl font-semibold text-cloud-theme-blue">
              Featured Posts
            </h4>
          </div>
          <Swiper {...swiperParams}>
            {featuredPosts
              ? featuredPosts.length > 0
                ? featuredPosts.map((item) => {
                    return (
                      <SwiperSlide key={item.id}>
                        <Link href={`/news/more/${item.slug}`}>
                          <a>
                          <div className="h-64 rounded-t-xl overflow-hidden relative">
                            <img
                              src={item.thumbnail}
                              alt={item.title.substring(0, 40)}
                              className="w-full h-full object-cover"
                            />
                            <div
                              className="
                        absolute
                        top-2
                        right-2
                        text-white
                        py-1
                        md:px-4
                        px-2
                        rounded-md
                      "
                            >
                              <p className="text-xs md:text-sm font-bold dark:bg-cloud-theme-dark dark:text-white rounded-lg px-2 py-1 bg-white text-black text-center">
                                {item.Location}
                              </p>
                            </div>
                          </div>
                          <div
                            className="
                            p-3
                            rounded-lg
                            shadow-lg
                            z-10
                            opacity-100
                            bg-white
                            dark:bg-cloud-theme-dark
                            dark:text-white
                            dark:shadow-darkShadow
                            relative
                            -top-6
                            h-24
                            leading-4
                          "
                          >
                            <p className="md:text-sm text-xs text-opacity-0 mb-2 font-semibold capitalize">
                              {truncateWords(item.title, 62)}
                            </p>
                            <div className="flex justify-between content-center items-center pt-0 pb-1">
                              <p className="text-cloud-theme-blue text-sm font-medium">
                                {item.content_owner.content_creator_name}
                              </p>
                              <p className="text-cloud-theme-blue text-sm font-medium">
                                <Moment fromNow>{item.created_on}</Moment>
                              </p>
                            </div>
                          </div>
                          </a> 
                        </Link>
                      </SwiperSlide>
                    );
                  })
                : [1, 2, 3, 4, 5, 6].flatMap((_, index) => (
                    <SwiperSlide>
                      <div className="animate-pulse" key={index}>
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
                          <p className="bg-gray-300 p-2 mb-2 rounded-md w-12/12"></p>
                          <p className="bg-gray-300 p-2 mb-10 rounded-md w-9/12"></p>
                          <div className="flex justify-between content-center items-center pt-0 pb-1">
                            <p className="p-2 w-7/12 mr-6 bg-gray-300 rounded-md"></p>
                            <p className="p-2 w-7/12 bg-gray-300 rounded-md"></p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))
              : [1, 2, 3, 4, 5, 6].flatMap((_, index) => (
                  <SwiperSlide>
                    <div className="animate-pulse" key={index}>
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
                        <p className="bg-gray-300 p-2 mb-2 rounded-md w-12/12"></p>
                        <p className="bg-gray-300 p-2 mb-10 rounded-md w-9/12"></p>
                        <div className="flex justify-between content-center items-center pt-0 pb-1">
                          <p className="p-2 w-7/12 mr-6 bg-gray-300 rounded-md"></p>
                          <p className="p-2 w-7/12 bg-gray-300 rounded-md"></p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
          </Swiper>
        </section>
        <section className="mt-7">
          <div className="flex justify-start content-center items-center">
            <h3 className="text-cloud-theme-blue font-bold text-base mr-3">
              VIDEOS
            </h3>
            <i className="fas fa-long-arrow-alt-left "></i>
          </div>
          {/* <div className="">
            {videos &&
              videos.map((video) => {
                return <VideoComponent key={video} video={video} />;
              })} 
          </div> */}
        </section>
        <section className="p-4 shadow-md h-28 mt-8">
          <div className="mb-4">
            <p>Advertisement space</p>
          </div>
        </section>
      </section>
    </>
  );
};

// const VideoComponent = ({ video }) => {
//   const videoRef = useRef(null);
//   const playerRef = useRef(null);
//   const player = playerRef.current;
//   const opts = useMemo(() => {
//     const vOpts = {
//       autoplay: false,
//       controls: true,
//       // fluid: true,
//       height: 160,
//       width: 200,
//       poster: video.thumbnail,
//       sources: [
//         {
//           src: video.video_file,
//           type: "video/mp4",
//         },
//       ],
//     };
//     return vOpts;
//   }, [video]);
//   const vidOnReady = (player) => {
//     playerRef.current = player;
//     // hadle player events here
//     player.on("waiting", () => {});
//     player.on("dispose", () => {});
//   };

//   useEffect(() => {
//     if (!playerRef.current) {
//       const videoElement = videoRef.current;
//       if (!videoElement) return;
//       const player = (playerRef.current = videojs(videoElement, opts, () => {
//         // console.log("vid-js elemet ready");
//         vidOnReady(player);
//       }));
//     } else {
//       const player = playerRef.current;
//       player.autoplay(opts.autoplay);
//       player.src(opts.sources);
//     }
//   }, [videoRef, opts]);
//   useEffect(() => {
//     return () => {
//       if (player) {
//         player.dispose();
//         playerRef.current = null;
//       }
//     };
//   }, [player]);

//   return (
//     <div
//       className="flex justify-start items-center content-center h-40 bg-gray-100 mt-6 mb-3 overflow-hidden"
//       key={video.id}
//     >
//       <div className="h-full mr-5">
//         <div className="h-full w-full" data-vjs-player>
//           <video ref={videoRef} className="video-js vjs-big-play-centered" />
//         </div>
//       </div>
//       <div className="dark:bg-cloud-theme-dark dark:text-white">
//         <h4 className="font-semibold md:text-base text-xs  mb-2">
//           {video.title}
//         </h4>
//         <p className="md:text-sm text-xs text-gray-500">
//           Kenya’s real estate sector was set to see significant growth…
//         </p>
//         <p className="font-medium md:text-sm text-xs ">
//           8 Jan 2021 Global Business Outlook
//         </p>
//       </div>
//     </div>
//   );
// };

export default ContentHome;
