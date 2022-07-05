import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from 'next/image'
import parse from "html-react-parser";
// import {
//   FacebookIcon,
//   FacebookShareButton,
//   EmailIcon,
//   EmailShareButton,
//   MailruIcon,
//   MailruShareButton,
//   LinkedinIcon,
//   LinkedinShareButton,
//   TwitterIcon,
//   TwitterShareButton,
//   WhatsappIcon,
//   WhatsappShareButton,
//   TelegramShareButton,
//   TelegramIcon,
//   PinterestShareButton,
//   PinterestIcon,
//   TumblrShareButton,
//   TumblrIcon,
//   LivejournalShareButton,
//   LivejournalIcon,
//   RedditShareButton,
//   RedditIcon,
// } from "react-share";
import {
  getContentDetail,
  getFeaturedPosts,
  getPopularPosts,
} from "../../state/actionCreators/content";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
// import { Helmet } from "react-helmet-async";
import {
  failedGettingFeatured,
  failedGettingVideos,
  failedGettingPopular,
} from "../../state/estateSlices/contentSlice";
// import { Subscribe } from "../Subscribe";
import { truncateWords } from "../../utils/Truncate";
import Head from "next/head";
// import { TrackpageView } from "../GAnalytics";

// const ContentDetail = ({singleContents}) => {
const ContentDetail = () => {
  const dispatch = useDispatch();
  const singleContent = useSelector((state) => state.contents.singleContent);
  // const singleContent = singleContents 
  const featuredPosts = useSelector((state) => state.contents.featuredPosts);
  const popularPosts = useSelector((state) => state.contents.popularPosts);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getFeaturedPosts());
    dispatch(getPopularPosts());
    // TrackpageView(`/news/more/${slug}`)
    return () => {
      dispatch(failedGettingFeatured());
      dispatch(failedGettingPopular());
      // dispatch(failedGettingVideos());
    };
  }, [dispatch,singleContent]); 
  return (
    <>
      <Head>
        <title>
          {singleContent ? singleContent.title : "Estate Cloud News Sevices"}
        </title>
        <meta name="detail" content="research, data, news and content" />
      </Head>
      <section className="px-5 md:px-20 md:mt-[6rem] mt-[5.5rem] tracking-wide">
        <div className="grid grid-cols-6 gap-12">
          <article className="md:col-span-4 col-span-6">
            <div className="w-full md:mb-7 mb-5">
              {singleContent ? (
                <>
                  <h1 className="md:font-semibold md:leading-[2.7rem] leading-snug font-bold text-xl md:text-4xl">
                    {singleContent.title}
                  </h1>
                  <h4 className="mt-3 text-sm font-semibold">
                    By {singleContent.content_owner.content_creator_name} -{" "}
                    <span className="font-normal">
                      {singleContent.created_on}
                    </span>{" "}
                    -{" "}
                    <span className="font-medium italic">
                      {singleContent.Location}
                    </span>
                  </h4>
                </>
              ) : (
                <div className="w-full md:p-5 p-3 rounded-sm bg-gray-300 animate-pulse "></div>
              )}
            </div>
            {singleContent ? (
              <>
                <div className="md:h-[21.5rem] h-60 w-full">
                  <figure className="h-full w-full">
                    {/* <Image
                    src={`https://estatecloud.co.ke${singleContent.thumbnail}`}
                    src={singleContent.thumbnail}
                    alt={singleContent.title}
                    layout='fill'
                    className="h-full w-full object-cover bg-center"  
                    /> */}
                    <img
                      className="h-full w-full object-cover bg-center"
                      // src={singleContent.thumbnail}
                      src={`https://estatecloud.co.ke${singleContent.thumbnail}`}
                      alt={singleContent.title}
                    /> 
                    {singleContent.caption ? (
                      <figcaption className="italic text-xs font-light">
                        {truncateWords(singleContent.caption, 80)}
                      </figcaption>
                    ) : (
                      ""
                    )}
                  </figure>
                </div>
                {singleContent ? (
                  <div className="w-full xs-l:mt-7 mt-10"></div>
                ) : (
                  ""
                )}

                <div className="dark:text-white leading-7 text-sm post_cont">
                  {parse(singleContent.content)}
                </div>
                <div className="mt-4 dark:bg-cloud-theme-dark grid grid-cols-2 gap-3 md:flex justify-between md:gap-4 bg-gray-50 items-center border-2 border-dotted p-3 sm:p-4">
                  {singleContent.previous_post && (
                    <Link
                      href={`/news/more/${singleContent.previous_post.slug}`}
                    >
                      <a className="border border-dotted p-2">
                        <p className="text-gray-400 text-sm">Previous</p>
                        <p className="font-medium text-xs dark:text-white text-black">
                          {truncateWords(singleContent.previous_post.title, 55)}
                        </p>
                      </a>
                    </Link>
                  )}
                  {singleContent.next_post && (
                    <>
                      <Link href={`/news/more/${singleContent.next_post.slug}`}>
                        <a className="border border-dotted p-2">
                          <p className="text-gray-400 text-sm">Next</p>
                          <p className="font-medium text-xs dark:text-white text-black">
                            {truncateWords(singleContent.next_post.title, 50)}
                          </p>
                        </a>
                      </Link>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="md:h-72 h-52 w-full bg-gray-300 animate-pulse"></div>
                <div className="dark:text-white mt-3 animate-pulse">
                  <div className="w-full mb-6">
                    <p className="w-full bg-gray-300 p-3 mb-2 rounded-md"></p>
                    <p className="w-9/12 bg-gray-300 p-3 mb-2 rounded-md"></p>
                    <p className="w-full bg-gray-300 p-3 mb-2 rounded-md"></p>
                    <p className="w-6/12 bg-gray-300 p-3 mb-2 rounded-md"></p>
                  </div>
                  <div className="w-full mb-5">
                    <p className="w-full bg-gray-300 p-3 mb-2 rounded-md"></p>
                    <p className="w-9/12 bg-gray-300 p-3 mb-2 rounded-md"></p>
                    <p className="w-full bg-gray-300 p-3 mb-2 rounded-md"></p>
                    <p className="w-6/12 bg-gray-300 p-3 mb-2 rounded-md"></p>
                  </div>
                  <div className="w-full mb-7">
                    <p className="w-full bg-gray-300 p-3 mb-2 rounded-md"></p>
                    <p className="w-9/12 bg-gray-300 p-3 mb-2 rounded-md"></p>
                    <p className="w-full bg-gray-300 p-3 mb-2 rounded-md"></p>
                    <p className="w-6/12 bg-gray-300 p-3 mb-2 rounded-md"></p>
                  </div>
                </div>
                <div className="mt-4 animate-pulse flex justify-between gap-4 bg-gray-50 items-center border-2 border-dotted p-5">
                  <div className="w-full">
                    <p className="w-4/12 bg-gray-300 mb-3 rounded-md p-2"></p>
                    <p className="w-7/12 bg-gray-300 mb-3 rounded-md p-2"></p>
                    <p className="w-7/12 bg-gray-300 mb-3 rounded-md p-2"></p>
                  </div>
                  <div className=" w-full">
                    <p className="w-4/12 bg-gray-300 mb-3 rounded-md p-2"></p>
                    <p className="w-7/12 bg-gray-300 mb-3 rounded-md p-2"></p>
                    <p className="w-7/12 bg-gray-300 mb-3 rounded-md p-2"></p>
                  </div>
                </div>
              </>
            )}
          </article>
          <aside className="md:col-span-2 col-span-6">
            <div className="mb-6">
              <div className="border-b-2 mb-6 border-cloud-theme-blue w-full pb-2">
                <h4 className="font-bold dark:text-white">FOLLOW US</h4>
              </div>
              <div className="flex h-28 justify-between items-center">
                <div className="w-full bg-[#3b5998] h-full flex justify-center items-center content-center text-center text-white">
                  <div className="flex flex-col  justify-center items-center content-center ">
                    <FaFacebookF className="text-xl mb-2" />
                    <div>
                      <p className="font-semibold">185</p>
                      <p className="font-semibold">likes</p>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-[#00acee] h-full flex justify-center items-center content-center text-center  text-white">
                 <a href="https://twitter.com/EstateCloudKe">

                  <div className="flex flex-col justify-center items-center content-center">
                    <FaTwitter className="text-xl mb-2" />
                    <div>
                      <p className="font-semibold">1013</p>
                      <p className="font-semibold">followers</p>
                    </div>
                  </div>
                 </a>
                </div>
              </div>
            </div>

            {/* <div className="mb-6 md:sticky md:top-[5.3rem] dark:bg-black bg-white">
              <div className="border-b-2 mb-6 border-cloud-theme-blue w-full pb-2">
                <h4 className="font-bold dark:text-white">
                  SUBSCRIBE FOR UPDATES
                </h4>
              </div>
              <Subscribe />
            </div> */}
            <div className="mb-6">
              <div className="border-b-2 mb-6 border-cloud-theme-blue w-full pb-2">
                <h4 className="font-bold dark:text-white">EVENTS</h4>
              </div>
              <div>
                <p className="dark:text-white">No events</p>
              </div>
            </div>
            <div className="mb-6">
              <div className="border-b-2 mb-6 border-cloud-theme-blue w-full pb-2">
                <h4 className="font-bold dark:text-white">POPULAR POSTS</h4>
              </div>
              {popularPosts.length > 0
                ? popularPosts.slice(0, 5).flatMap((post, index) => {
                    return (
                      <Link href={`/news/more/${post.slug}`} key={index}>
                        <div
                          key={post.id}
                          className="grid grid-cols-3  gap-3 mb-3 text-sm font-semibold"
                        >
                          <div className="col-span-1 h-20">
                            <img
                              src={post.thumbnail}
                              alt={post.title.substring(0, 15)}
                              className="w-full h-full  object-cover"
                            />
                          </div>
                          <div className="col-span-2 dark:text-white">
                            <h3 className="text-sm">
                              {truncateWords(post.title, 50)}
                            </h3>
                          </div>
                        </div>
                      </Link>
                    );
                  })
                : [1, 2, 3].flatMap((_, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-3 aniamte-pulse gap-3 mb-3 text-sm font-semibold"
                    >
                      <div className="col-span-1 h-20 bg-gray-300"></div>
                      <div className="col-span-2 dark:text-white">
                        <p className="bg-gray-300 w-12/12 p-2 mb-2"></p>
                        <p className="bg-gray-300 w-9/12 p-2 mb-2"></p>
                        <p className="bg-gray-300 w-6/12 p-2"></p>
                      </div>
                    </div>
                  ))}
            </div>
          </aside>
        </div>

        <div className="grid grid-cols-6 gap-5">
          <article className="md:col-span-4 col-span-6">
            {singleContent && singleContent.related && (
              <div className="border-b-2 mb-6 mt-9 border-cloud-theme-blue w-full pb-2">
                <h4 className="font-bold  dark:text-white">RELATED ARTICLES</h4>
              </div>
            )}
            <div className="grid md:grid-cols-3 grid-cols-2 gap-4">
              {singleContent
                ? singleContent.related.length > 0
                  ? singleContent.related.flatMap((item, index) => {
                      return (
                        <Link href={`/news/more/${item.slug}`} key={index}>
                          <a>
                            <div className="h-36 w-full">
                              <img
                                className="h-full w-full object-cover"
                                alt={item.title.substring(0, 40)}
                                src={`https://estatecloud.co.ke${item.thumbnail}`} 
                              />
                            </div>
                            <div className="mt-3 leading-tight dark:text-white">
                              <p>{truncateWords(item.title, 50)}</p>
                            </div>
                          </a>
                        </Link>
                      );
                    })
                  : [1, 2, 3, 4, 5, 6].flatMap((_, index) => (
                      <div key={index} className="animate-pulse">
                        <div className="h-36 w-full bg-gray-300"></div>
                        <div className="mt-3">
                          <p className="p-2 mb-2 w-12/12 bg-gray-300"></p>
                          <p className="p-2 mb-2 w-9/12 bg-gray-300"></p>
                        </div>
                      </div>
                    ))
                : [1, 2, 3, 4, 5, 6].flatMap((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="h-36 w-full bg-gray-300"></div>
                      <div className="mt-3">
                        <p className="p-2 mb-2 w-12/12 bg-gray-300 rounded-md"></p>
                        <p className="p-2 mb-2 w-9/12 bg-gray-300 rounded-md"></p>
                      </div>
                    </div>
                  ))}
            </div>
          </article>

          <aside className="w-full md:col-span-2 col-span-6">
            {singleContent && singleContent.related && (
              <div className="border-b-2 mb-6 mt-9 border-cloud-theme-blue w-full pb-2">
                <h4 className="font-bold  dark:text-white">Featured</h4>
              </div>
            )}
            <div className="">
              {featuredPosts.length > 0
                ? featuredPosts.slice(0, 4).flatMap((item, index) => {
                    return (
                      <Link href={`/news/more/${item.slug}`} key={index}>
                        <div className="border-b-2 border-dashed pb-4 mb-5">
                          <div className="w-full">
                            <h4 className="front-bold text-lg  dark:text-white">
                              {truncateWords(item.title, 50)}
                            </h4>
                          </div>
                          <div className="mt-2 flex justify-start items-center content-center">
                            <p className="bg-black mr-1 py-1  dark:text-cloud-theme-dark dark:bg-white text-white px-2 text-xs">
                              {item.Location}
                            </p>
                            <p className="mr-1 text-xs dark:text-cloud-theme-blue">
                              {item.content_owner.content_creator_name}
                            </p>
                            <p className="text-xs dark:text-cloud-theme-blue">
                              {item.created_on}
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })
                : [1, 2, 3, 4].flatMap((_, index) => (
                    <div key={index} className="animate-pulse mb-6">
                      <div className="p-2 w-full bg-gray-300 rounded-md"></div>
                      <div className="mt-3 flex items-center content-center justify-start">
                        <p className="p-2 mb-2 w-7/12 bg-gray-300 mr-2 rounded-md"></p>
                        <p className="p-2 mb-2 w-5/12 bg-gray-300 rounded-md"></p>
                      </div>
                    </div>
                  ))}
            </div>
          </aside>
        </div>
        <div className="mt-16"></div>
      </section>
    </>
  );
};

export default ContentDetail;
