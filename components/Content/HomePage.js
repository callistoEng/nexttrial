import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import hm from "../../public/hm.jpg" 
import { useDispatch, useSelector } from "react-redux";
import "swiper/css";
import { Pagination, Autoplay, Navigation, EffectCreative } from "swiper";
import { getLatestPosts } from "../../state/actionsCreators/content";
import { FaSearch } from "react-icons/fa";

const HomePage = () => {
  const latestUpdate = useSelector((state) => state.contents.latestUpdate);
  const randomPosts = useSelector((state) => state.contents.randomPosts);
  const dispatch = useDispatch();
  // const [randomPosts, setRandomPosts] = useState(null);
  // const [latestPosts, setLatestPosts] = useState(null);
  // const [featuredPosts, setFeaturedPosts] = useState(null);
  useEffect(() => {
    dispatch(getLatestPosts());
    //https://estatecloud.co.ke/api/v2/contents/sampled-news/
    // const random = await fetch(
    //   "https://estatecloud.co.ke/api/v2/contents/sampled-news/"
    // ).then((random) => random.json());
    // const latest = await fetch(
    //   "https://estatecloud.co.ke/api/v2/contents/latest/"
    // ).then((latest) => latest.json());
    // const featured = await fetch(
    //   "https://estatecloud.co.ke/api/v2/contents/featured/"
    // ).then((featured) => featured.json());

    // // update the state
    // setRandomPosts(random.results);
    // setLatestPosts(latest.results);
    // setFeaturedPosts(featured.results);
  }, [dispatch]);
  const truncateWords = (str, length, ending) => {
    if (length == null) {
      length = 100;
    }
    if (ending == null) {
      ending = "...";
    }
    if (str.length > length) {
      return str.substring(0, length - ending.length) + " " + ending;
    } else {
      return str;
    }
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
      <section className="mb-5 md:mb-8 mt-[4.85rem] md:h-[85vh] sm:h-[60vh] h-[40vh] relative px-0">
        <div className="w-full flex justify-center content-center items-center h-full">
          <div
            className="flex flex-col w-11/12 xs-l:w-4/5 sm:w-2/3 bg-opacity-30
          sm:p-10 p-5 justify-center content-center items-center rounded-lg bg-cloud-theme-blue mx-auto shadow-lg"
          >
            <h2 className="font-bold md:text-5xl md:mb-10 sm:text-3xl text-2xl text-white opacity-100 text-left">
              Explore Property With Us 
            </h2>
            <div className="xs-l:w-4/5 w-full">
              <form
                className="flex w-full sm:mt-8 mt-5 md:mt-16 shadow-lg opacity-100"
              >
                <input
                  type="text"
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
      <section className="my-3">
        <div className="flex justify-between px-0 my-3 mt-7">
          <h4 className="text-xl font-semibold text-cloud-theme-blue">
            Random
          </h4>
        </div>
        <div className="grid gap-3 grid-cols-3">
          {randomPosts?.flatMap((item, index) => (
            <div key={index} className="w-full">
              <Link href={`/more/${item.slug}`}>
                <a>
                  <div className="h-64 rounded-t-xl overflow-hidden relative">
                    <img
                      src={item.thumbnail}
                      alt={item.title.substring(0, 50)}
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
                      <p className="text-cloud-theme-blue text-xs font-medium">
                        {item.content_owner.content_creator_name}
                      </p>
                      <p className="text-cloud-theme-blue text-xs font-medium">
                        {item.created_on}
                      </p>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </section>
      <section className="my-3">
        <div className="flex justify-between px-0 my-3 mt-7">
          <h4 className="text-xl font-semibold text-cloud-theme-blue">
            Latest
          </h4>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {latestUpdate?.flatMap((item, index) => (
            <div key={index} className=" w-full">
              <Link href={`/more/${item.slug}`}>
                <a>
                  <div className="h-64 rounded-t-xl overflow-hidden relative">
                    <img
                      src={item.thumbnail}
                      alt={item.title.substring(0, 50)}
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
                      <p className="text-cloud-theme-blue text-xs font-medium">
                        {item.content_owner.content_creator_name}
                      </p>
                      <p className="text-cloud-theme-blue text-xs font-medium">
                        {item.created_on}
                      </p>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default HomePage;
