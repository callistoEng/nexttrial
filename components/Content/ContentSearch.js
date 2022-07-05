import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import {
  getContentCategories,
  getContentList,
} from "../../state/actionCreators/content";
import { truncateWords } from "../../utils/Truncate";
import ContentPagination from "./ContentPagination";
import { GrClose } from "react-icons/gr";
import { useRouter } from "next/router";
// import { TrackpageView } from "../GAnalytics";

const ContentSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [contentCategory, setContentCategory] = useState("");
  const contentCategories = useSelector(
    (state) => state.contents.contentCategories
  );
  const contentList = useSelector((state) => state.contents.contentList);
  const myPostNext = useSelector((state) => state.contents.myPostNext);
  const myPostPrev = useSelector((state) => state.contents.myPostPrev);
  const query = `?search=${searchQuery}&category__category_name=${contentCategory}`;
  const dispatch = useDispatch();
  const history = useRouter();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getContentList(query));
    dispatch(getContentCategories());
    // TrackpageView("/news/feed");   
  }, [dispatch, query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push({
      pathname: "/news/feed",
      query: "?search=" + searchQuery,
    });
  };
  return (
    <section className="mt-[6rem] w-11/12 md:w-4/5 mx-auto">
      <div className="w-full relative flex py-2 items-center mb-3">
        <div className="mr-3 sm:hidden">
          <div
            className=" text-center outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FiMenu className=" text-2xl" />
          </div>

          <div
            className={
              menuOpen
                ? `top-[4.8rem] left-0 w-full z-50 fixed transition-all duration-300 backdrop-filter backdrop-blur-lg h-screen`
                : `top-[4.8rem] -left-full w-full z-50 fixed transition-all duration-300 backdrop-filter backdrop-blur-lg h-screen`
            }
          >
            <div className="h-screen bg-gray-400/80 w-56 px-2 py-2">
              <div className="w-full mb-2 flex justify-between items-center content-center">
                <div
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="p-1 bg-blue-400 shadow-md rounded-sm mb-2"
                >
                  <GrClose className="text-lg text-white" />
                </div>
                <h2
                  translate="no"
                  className="font-bold text-base text-cloud-theme-blue text-center"
                >
                  Estate Cloud
                </h2>
              </div>
              <ul className="flex flex-col py-2 text-xs sm:text-sm">
                <li
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="mr-2 mb-2 bg-cloud-theme-blue p-2 text-white hover:bg-gray-800 hover:scale-105 
                transition-all duration-300 rounded-md shadow-md font-semibold"
                >
                  News Feed
                </li>
                <li
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="font-normal bg-cloud-theme-blue p-2 text-white hover:bg-gray-800 hover:scale-105 
                transition-all duration-300 rounded-md shadow-md mr-2 mb-2"
                >
                  <Link href="#">Data</Link>
                </li>
                <li
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="font-normal bg-cloud-theme-blue p-2 text-white hover:bg-gray-800 hover:scale-105 
                transition-all duration-300 rounded-md shadow-md mr-2 mb-2"
                >
                  <Link href="#">Property Markets</Link>
                </li>
              </ul>
              <div className="px-1.5 block sm:hidden">
                <div>
                  <h4>Categories</h4>
                </div>
                <div className="flex flex-col">
                  {contentCategories.length > 0
                    ? contentCategories.map((category) => (
                        <div className="relative flex justify-between items-center py-2 hover:bg-blue-50">
                          <div className="relative">
                            <input
                              type="checkbox"
                              id={`${category.category_name}`}
                              value={category.category_name}
                              checked={
                                contentCategory === category.category_name
                              }
                              onChange={() => {
                                setContentCategory(category.category_name);
                                setMenuOpen(!menuOpen);
                              }}
                              className="opacity-0 absolute h-4 w-4"
                            />
                            <div className="bg-white border-2 rounded-sm border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-1">
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
                            htmlFor={`${category.category_name}`}
                            className="w-full md:text-sm text-xs h-full"
                          >
                            {category.category_name}
                          </label>
                        </div>
                      ))
                    : "loading"}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden sm:block">
          <ul className="flex py-2 text-xs sm:text-sm items-center">
            <li className="mr-2 font-semibold">News Feed</li>
            <li className="font-semibold mr-2">
              <Link href="#">Data</Link>
            </li>
            <li className="font-semibold mr-2">
              <Link href="#">Property Markets</Link>
            </li>
          </ul>
        </div>
        <div className="p-0 flex-1">
          <div className="flex w-full">
            <form onSubmit={handleSubmit} className="flex w-full shadow-lg">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-sm dark:bg-gray-700  dark:border-cloud-theme-blue 
                dark:placeholder-gray-400 dark:text-white  bg-gray-50 border border-1 outline-none 
                border-gray-300 text-gray-900 focus:border-cloud-theme-blue block flex-1 w-full text-sm px-2.5 py-1 sm:py-2"
                placeholder="What can we help you find?"
              />
            </form>
          </div>
        </div>
      </div>
      <div className="flex mb-5">
        <div className="px-1.5 sm:block hidden w-64 h-screen">
          <div>
            <h4 className="font-semibold">Filter </h4>
          </div>
          <div className="flex flex-col">
            {contentCategories.length > 0
              ? contentCategories.map((category) => (
                  <div className="relative flex justify-between items-center py-2 hover:bg-blue-50">
                    <div className="relative">
                      <input
                        type="checkbox"
                        id={`${category.category_name}`}
                        value={category.category_name}
                        checked={contentCategory === category.category_name}
                        onChange={() =>
                          setContentCategory(category.category_name)
                        }
                        className="opacity-0 absolute h-4 w-4"
                      />
                      <div className="bg-white border-2 rounded-sm border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-1">
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
                      htmlFor={`${category.category_name}`}
                      className="w-full md:text-sm text-xs h-full"
                    >
                      {category.category_name}
                    </label>
                  </div>
                ))
              : "loading"}
          </div>
        </div>
        <div className="w-full">
          {contentList.length > 0
            ? contentList.flatMap((item, index) => (
                <div key={index} className="mb-10">
                  <Link href={`/news/more/${item.slug}`}>
                    <div className="flex pr-3 gap-4">
                      <div className="md:h-48 h-36 w-4/12 overflow-hidden">
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
                          {truncateWords(item.overview, 100)}
                        </p>
                        <div className="flex justify-start items-center content-center">
                          <p className="md:font-semibold font-bold text-xs md:text-sm border-r border-r-gray-400 mr-2 pr-3">
                            By {item.content_owner.content_creator_name}
                          </p>
                          <span className="md:font-semibold font-bold text-xs md:text-sm">
                            {item.created_on}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            : [1, 2, 3, 4, 5].flatMap((_, index) => (
                <div key={index} className="mb-10 w-full animate-pulse">
                  <div className="flex pr-3 gap-4">
                    <div className="md:h-48 h-36 w-4/12 rounded-md bg-gray-300"></div>
                    <div className="flex justify-start flex-col w-8/12 dark:text-white">
                      <p className="p-2 w-16 mb-2 bg-gray-300 rounded-md"></p>
                      <p className="p-3 bg-gray-300 mb-4 rounded-md"></p>
                      <p className="p-2 bg-gray-300 rounded-md mb-2"></p>
                      <p className="p-2 bg-gray-300 rounded-md w-9/12 mb-2"></p>
                      <p className="p-2 bg-gray-300 rounded-md w-5/12 mb-4"></p>
                      <p className="p-2 bg-gray-300 rounded-md w-4/12"></p>
                    </div>
                  </div>
                </div>
              ))}
          <ContentPagination
            dispatch={dispatch}
            myPostPrev={myPostPrev}
            myPostNext={myPostNext}
            isContentAll={true}
          />
        </div>
      </div>
    </section>
  );
};

export default ContentSearch;
