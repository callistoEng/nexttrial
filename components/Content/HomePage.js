import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import "swiper/css";
import { Pagination, Autoplay, Navigation, EffectCreative } from "swiper";
import { getLatestPosts } from "../../state/actionsCreators/content";

const HomePage = () => {
  const latestUpdate = useSelector((state) => state.contents.latestUpdate);
  const randomPosts = useSelector((state) => state.contents.randomPosts);
  const popularPosts = useSelector((state) => state.contents.popularPosts);
  const featuredPosts = useSelector((state) => state.contents.featuredPosts);
  const dispatch = useDispatch()
  // const [randomPosts, setRandomPosts] = useState(null);
  // const [latestPosts, setLatestPosts] = useState(null);
  // const [featuredPosts, setFeaturedPosts] = useState(null);
  useEffect(async () => {
    dispatch(getLatestPosts())
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
      <section className="my-3">
        <div className="flex justify-between px-0 my-3 mt-7">
          <h4 className="text-xl font-semibold text-cloud-theme-blue">
            Random 
          </h4>
        </div>
        <div className="grid gap-3 grid-cols-3">
          {randomPosts?.flatMap((item, index) => (
            <div key={index} className="w-full">
              <Link href={`/news/more/${item.slug}`}>
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
              <Link href={`/news/more/${item.slug}`}>
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
