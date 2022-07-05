import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import {
  getContentByCategory,
  getFeaturedPosts,
  getPopularPosts,
} from "../../state/actionCreators/content";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCreative } from "swiper";
import {
  failedContentByCategory,
  failedGettingFeatured,
  failedGettingPopular,
} from "../../state/estateSlices/contentSlice";
import { truncateWords } from "../../utils/Truncate";
// import { Subscribe } from "../Subscribe";
import ContentPagination from "./ContentPagination";
import Head from "next/head";
// import { Helmet } from "react-helmet-async";
// import { TrackpageView } from "../GAnalytics";
const ContentByCategory = ({ categoryName, slug }) => {
  const dispatch = useDispatch();
  const popularPosts = useSelector((state) => state.contents.popularPosts);
  const featuredPosts = useSelector((state) => state.contents.featuredPosts);
  const contentByCategory = useSelector(
    (state) => state.contents.contentByCategory
  );
  const myPostNext = useSelector((state) => state.contents.myPostNext);
  const myPostPrev = useSelector((state) => state.contents.myPostPrev);
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getPopularPosts());
    dispatch(getFeaturedPosts());
    dispatch(getContentByCategory(slug)); 
    // TrackpageView(`/news/${categoryName}/${slug}`)
    return () => {
      dispatch(failedContentByCategory());
      dispatch(failedGettingFeatured());
      dispatch(failedGettingPopular());
    };
  }, [dispatch, categoryName, slug]);
  return (
    <>
      <Head>
        <title>
          {categoryName ? `Estate Cloud News - ${categoryName}` : "Estate Cloud News"}
        </title>
        <meta name="detail" content="more infomation about listed property" />
      </Head>

      <section className="md:px-16 px-4 pb-5 mt-[7rem] md:mt-[5.3rem] mt-[5.1rem]">
        <div className="grid grid-cols-1 md:gap-4 md:grid-cols-4 md:h-[27rem]">
          <div className="md:col-span-2 mb-4 md:mb-0 h-full">
            <Swiper
              slidesPerView={1}
              autoplay={{
                delay: 6000,
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
              {popularPosts && popularPosts.length > 0 ? (
                popularPosts.slice(0, 5).flatMap((item) => {
                  return (
                    <SwiperSlide className="w-full h-full" key={item.id}>
                      <div className="group md:h-[27rem] h-[14rem] overflow-hidden relative shadow-md rounded-md">
                        <Link href={`/news/more/${item.slug}`}>
                          <img
                            src={item.thumbnail && item.thumbnail}
                            alt={item.title}
                            className="w-full h-full group-hover:scale-125 ease-in duration-300 object-cover"
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
                              <a className="font-semibold leading-tight sm:leading-snug sm:text-lg text-sm hover:underline">
                                {item.title}
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })
              ) : (
                <div className="col-span-2 animate-pulse relative md:h-[27rem] h-[14rem] shadow-md rounded-md">
                  <div className="w-full h-full bg-gray-300"></div>

                  <div className="absolute top-0 mt-40 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-blue-900"></div>
                  <div className="absolute bottom-0 p-5 mb-5 text-white w-full">
                    <div className="flex justify-start items-center content-center mb-2 text-xs">
                      <span className="py-2 rounded-md w-5/12 bg-gray-200 mr-2"></span>
                    </div>
                    <div>
                      <p className="bg-gray-200 p-2 mb-1.5 rounded-md w-full"></p>
                      <p className="bg-gray-200 p-2 rounded-md w-full"></p>
                    </div>
                  </div>
                </div>
              )}
            </Swiper>
          </div>
          <div className=" grid grid-cols-2 gap-2 md:gap-3 grid-rows-2 col-span-2 md:h-[27rem] h-[16rem]">
            {featuredPosts && featuredPosts.length > 0
              ? featuredPosts.slice(0, 4).flatMap((item) => (
                  <div
                    className="relative group overflow-hidden shadow-md rounded-md"
                    key={item.id}
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title.substring(0, 50)}
                      className="w-full h-full object-cover group-hover:scale-125 ease-in duration-300"
                    />
                    <div className="absolute top-0 mt-25 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-blue-900"></div>
                    <div className="absolute bottom-0 p-3 mb-2 text-white">
                      <div className="flex justify-start items-center content-center mb-2 text-xs">
                        <span className="px-2 py-0.5 bg-black mr-2">
                          {item.Location}
                        </span>
                        {/* <span className="mr-2">.</span> <span>1day ago</span> */}
                      </div>
                      <div>
                        <Link href={`/news/more/${item.slug}`}>
                          <a className="font-semibold sm:leading-tight leading-none text-sm hover:underline">
                            {truncateWords(item.title, 50)}
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              : [1, 2, 3, 4].flatMap((_, index) => (
                  <div
                    className="animate-pulse relative shadow-md overflow-hidden rounded-md"
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
                        <p className="bg-gray-200 p-1 rounded-md w-full"></p>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
        <div className="mt-7">
          <h3 className="font-bold text-xl">{categoryName}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-7 mt-4">
          <main className="md:col-span-8 col-span-12">
            {contentByCategory && contentByCategory.length <= 0
              ? [1, 2, 3, 4, 5].flatMap((_, index) => (
                  <div key={index} className="mb-10 animate-pulse">
                    <div className="flex pr-3 gap-4">
                      <div className="h-44 w-4/12 rounded-md bg-gray-300"></div>
                      <div className="flex justify-start flex-col w-8/12 dark:text-white">
                        <p className="p-2 w-16 mb-2 bg-gray-300 rounded-md"></p>
                        <h3 className="p-3 bg-gray-300 mb-4 rounded-md"></h3>
                        <p className="p-2 bg-gray-300 rounded-md mb-2"></p>
                        <p className="p-2 bg-gray-300 rounded-md w-9/12 mb-2"></p>
                        <p className="p-2 bg-gray-300 rounded-md w-5/12 mb-4"></p>
                        <p className="p-2 bg-gray-300 rounded-md w-4/12"></p>
                      </div>
                    </div>
                  </div>
                ))
              : contentByCategory.flatMap((item, index) => (
                  <div key={index} className="mb-10">
                    <Link href={`/news/more/${item.slug}`}>
                      <div className="flex pr-3 gap-4">
                        <div className="md:h-44 h-36 w-4/12 rounded-md overflow-hidden">
                          <img
                            src={item.thumbnail}
                            alt={item.title.substring(0, 40)}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex justify-start flex-col w-8/12 dark:text-white">
                          <p className="text-cloud-theme-blue text-sm font-semibold mb-1 md:mb-2">
                            {item.post_tag?.tag}
                          </p>
                          <h3 className="capitalize text-sm md:text-xl font-bold mb-1 md:mb-3">
                            {truncateWords(item.title, 60)}
                          </h3>
                          <p className="font-semibold text-xs md:text-sm mb-1.5">
                            {truncateWords(item.overview, 65)}
                          </p>
                          <div className="flex justify-start items-center content-center">
                            <p className="md:font-semibold font-bold text-xs md:text-sm border-r border-r-gray-400 mr-2 pr-3">
                              {item.content_owner.content_creator_name}
                            </p>
                            <span className="md:font-semibold font-bold text-xs md:text-sm">
                              {item.created_on}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
            <ContentPagination
              dispatch={dispatch}
              myPostPrev={myPostPrev}
              myPostNext={myPostNext} 
            />
          </main>
          <aside className="md:col-span-4 col-span-12">
            <div className="mb-6 sticky top-24">
              {/* <div className="border-b-2 mb-6 border-cloud-theme-blue w-full pb-2">
                <h4 className="font-bold dark:text-white">
                  SUBSCRIBE FOR UPDATES
                </h4>
              </div>
              <Subscribe /> */}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
};

export default ContentByCategory;
