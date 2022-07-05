import { useEffect, useState, Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { truncateWords } from "../../utils/Truncate";
import {
  getMyPosts,
  deleteMyPosts,
  getMyPostsNoThumbs,
} from "../../state/actionCreators/content";
import { failedGettingMyPosts } from "../../state/estateSlices/contentSlice";
import { loadUsers } from "../../state/actionCreators/auth";
import Moment from "react-moment";
import MyPostPagination from "./MyPostPagination";
import { FaSearch } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
// import { TrackpageView } from "../GAnalytics";
const MyPosts = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [noImgs, setNoImgs] = useState(false);
  let currentPage = 1;
  let currentNoImgPage = 1;
  const [query, setSearchQuery] = useState("");
  const [postSlug, setPostSlug] = useState("");
  const myPosts = useSelector((state) => state.contents.myPosts);
  const myPostsNoThumbs = useSelector(
    (state) => state.contents.myPostsNoThumbs
  );
  const myPostNext = useSelector((state) => state.contents.myPostNext);
  const myPostPrev = useSelector((state) => state.contents.myPostPrev);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const onSearchContent = (e) => {
    e.preventDefault();
    dispatch(getMyPosts(currentPage, query));
    TrackpageView("/auth/agent/my-posts");
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
    dispatch(getMyPosts(currentPage, query));
    dispatch(getMyPostsNoThumbs(currentNoImgPage));
    return () => {
      dispatch(failedGettingMyPosts());
    };
  }, [dispatch, query, currentPage, currentNoImgPage]);
  if (!user) {
    return (
      <div className="mt-[6rem] h-screen w-full">
        <div className="sm:w-[38.5rem] mt-20 xs-l:w-[30rem] w-full px-5 xs-l:px-0 mx-auto mb-5">
          <p className="animate-pulse text-cloud-theme-gold">
            Please wait... Authenticating. If unable to authenticate, please
            refresh page or login or again.
          </p>
        </div>
      </div>
    );
  }
  return (
    <section className="mt-[6rem] w-full pb-10">
      <div className="sm:w-[35rem] xs-l:w-[30rem] w-full px-5 xs-l:px-0 mx-auto mb-5">
        <h4 className="text-lg text-cloud-theme-blue font-semibold">
          My Posts
        </h4>
        <div className="mt-2 flex justify-between items-center content-center">
          <Link href="/auth/agent/add-content">
            <a className="bg-cloud-theme-gold px-2.5 py-2.5 rounded-md mr-2 text-white text-sm shadow-md">
              Add More Posts
            </a>
          </Link>
          <form
            className="flex flex-1 shadow-lg opacity-100"
            onSubmit={onSearchContent}
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-none rounded-l-md  dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white  border border-1 
                  dark:border-cloud-theme-blue outline-none border-gray-300 text-gray-900 focus:border-cloud-theme-blue block flex-1 w-full text-sm p-2.5"
              placeholder="enter the title of the post"
            />
            <button
              className="inline-flex items-center px-3 text-sm dark:bg-gray-700 text-gray-900 opacity-100 bg-gray-200 rounded-r-md border
                border-r-0 border-gray-300 dark:border-cloud-theme-blue  focus:border-cloud-theme-blue"
            >
              <FaSearch />
            </button>
          </form>
        </div>
        {user?.email === "admin@estatecloud.co.ke" ? (
          <div className="flex mt-3 mb-1.5">
            <div className="relative flex mr-3 justify-between items-center py-2 hover:bg-blue-50">
              <div className="relative">
                <input
                  type="checkbox"
                  id="all"
                  value={noImgs}
                  checked={noImgs === false}
                  onChange={() => setNoImgs(false)}
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
              <label htmlFor="all" className="w-full md:text-sm text-xs h-full">
                All
              </label>
            </div>
            <div className="relative flex justify-between items-center py-2 hover:bg-blue-50">
              <div className="relative">
                <input
                  type="checkbox"
                  id="nothumbs"
                  value={noImgs}
                  checked={noImgs === true}
                  onChange={() => setNoImgs(true)}
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
              <label htmlFor="all" className="w-full md:text-sm text-xs h-full">
                No Thumbnail
              </label>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      {user ? (
        user.is_content_creator ? (
          noImgs ? (
            <main className="sm:w-[35rem] xs-l:w-[30rem] w-full px-5 xs-l:px-0 mx-auto">
              {myPostsNoThumbs && myPostsNoThumbs.length <= 0
                ? [1, 2, 3, 4, 5].flatMap((_, index) => (
                    <div key={index} className="mb-10 animate-pulse">
                      <div className="flex pr-3 gap-4">
                        <div className="h-44 w-4/12 rounded-md bg-gray-300"></div>
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
                  ))
                : myPostsNoThumbs.flatMap((item, index) => (
                    <div key={index} className="mb-10">
                      <div className="flex pr-3 gap-4">
                        <div className="md:h-44 h-36 w-4/12 rounded-md overflow-hidden">
                          <Link href={`/news/more/${item.slug}`}>
                            <img
                              src={item.thumbnail}
                              alt={item.title.substring(0, 15)}
                              className="w-full h-full object-cover"
                            />
                          </Link>
                        </div>
                        <div className="flex justify-start flex-col w-8/12 dark:text-white">
                          <Link href={`/news/more/${item.slug}`}>
                            <a>
                              <p className="text-cloud-theme-blue text-sm font-semibold mb-1 md:mb-2">
                                {item.post_tag?.tag}
                              </p>
                              <h3 className="capitalize text-sm md:text-xl font-bold mb-1 md:mb-3">
                                {truncateWords(item.title, 60)}
                              </h3>
                              <p className="font-semibold text-xs md:text-sm mb-1.5">
                                {truncateWords(item.overview, 65)}
                              </p>
                            </a>
                          </Link>
                          <div className="flex justify-between items-center content-center">
                            <div className="flex justify-start items-center content-center">
                              <p className="md:font-semibold font-bold text-xs md:text-sm border-r border-r-gray-400 mr-1 pr-1">
                                {item.content_owner.content_creator_name}
                              </p>
                              <span className="md:font-semibold font-bold text-xs">
                                <Moment fromNow>{item.created_on}</Moment>
                              </span>
                            </div>
                            <div className="flex justify-start items-center content-center">
                              <button
                                type="button"
                                onClick={() => {
                                  setOpenDeleteModal(true);
                                  setPostSlug(item.slug);
                                }}
                                className="bg-cloud-theme-gold px-1 py-1 mr-1.5 rounded-sm text-white text-sm shadow-md"
                              >
                                <RiDeleteBin5Line className="text-base" />
                              </button>
                              <Link href={`/auth/agent/edit-post/${item.slug}`}>
                                <a className="bg-cloud-theme-gold px-2 py-0.5 rounded-sm text-white text-sm shadow-md">
                                  Edit
                                </a>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              <MyPostPagination
                dispatch={dispatch}
                myPostPrev={myPostPrev}
                myPostNext={myPostNext}
                isAll={false}
              />
            </main>
          ) : (
            <main className="sm:w-[35rem] xs-l:w-[30rem] w-full px-5 xs-l:px-0 mx-auto">
              {myPosts && myPosts.length <= 0
                ? [1, 2, 3, 4, 5].flatMap((_, index) => (
                    <div key={index} className="mb-10 animate-pulse">
                      <div className="flex pr-3 gap-4">
                        <div className="h-44 w-4/12 rounded-md bg-gray-300"></div>
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
                  ))
                : myPosts.flatMap((item, index) => (
                    <div key={index} className="mb-10">
                      <div className="flex pr-3 gap-4">
                        <div className="md:h-44 h-36 w-4/12 rounded-md overflow-hidden">
                          <Link href={`/news/more/${item.slug}`}>
                            <img
                              src={item.thumbnail}
                              alt={item.title.substring(0, 15)}
                              className="w-full h-full object-cover"
                            />
                          </Link>
                        </div>
                        <div className="flex justify-start flex-col w-8/12 dark:text-white">
                          <Link href={`/news/more/${item.slug}`}>
                            <a>
                              <p className="text-cloud-theme-blue text-sm font-semibold mb-1 md:mb-2">
                                {item.post_tag?.tag}
                              </p>
                              <h3 className="capitalize text-sm md:text-xl font-bold mb-1 md:mb-3">
                                {truncateWords(item.title, 60)}
                              </h3>
                              <p className="font-semibold text-xs md:text-sm mb-1.5">
                                {truncateWords(item.overview, 65)}
                              </p>
                            </a>
                          </Link>
                          <div className="flex justify-between items-center content-center">
                            <div className="flex justify-start items-center content-center">
                              <p className="md:font-semibold font-bold text-xs md:text-sm border-r border-r-gray-400 mr-1 pr-1">
                                {item.content_owner.content_creator_name}
                              </p>
                              <span className="md:font-semibold font-bold text-xs">
                                <Moment fromNow>{item.created_on}</Moment>
                              </span>
                            </div>
                            <div className="flex justify-start items-center content-center">
                              <button
                                type="button"
                                onClick={() => {
                                  setOpenDeleteModal(true);
                                  setPostSlug(item.slug);
                                }}
                                className="bg-cloud-theme-gold px-1 py-1 mr-1.5 rounded-sm text-white text-sm shadow-md"
                              >
                                <RiDeleteBin5Line className="text-base" />
                              </button>
                              <Link href={`/auth/agent/edit-post/${item.slug}`}>
                                <a className="bg-cloud-theme-gold px-2 py-0.5 rounded-sm text-white text-sm shadow-md">
                                  Edit
                                </a>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              <MyPostPagination
                dispatch={dispatch}
                myPostPrev={myPostPrev}
                myPostNext={myPostNext}
                isAll={true}
              />
            </main>
          )
        ) : (
          <div className="sm:w-[35rem] h-screen xs-l:w-[30rem] w-full px-5 xs-l:px-0 mx-auto">
            <div>
              <Link href="/auth/signup"> Click here</Link>
              <p>to register as a content creator</p>
            </div>
          </div>
        )
      ) : (
        <div className="sm:w-[35rem] h-screen xs-l:w-[30rem] w-full px-5 xs-l:px-0 mx-auto">
          <div className="flex">
            <Link href="/auth/signup">
              <a className="text-cloud-theme-blue underline">Click here</a>
            </Link>
            <p>to register as a content creator or login</p>
          </div>
        </div>
      )}
      <DeletePost
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        deleteMyPosts={deleteMyPosts}
        slug={postSlug}
        query={query}
        currentPage={currentPage}
        dispatch={dispatch}
      />
    </section>
  );
};

const DeletePost = ({
  openDeleteModal,
  deleteMyPosts,
  slug,
  dispatch,
  query,
  currentPage,
  setOpenDeleteModal,
}) => {
  return (
    <Transition appear show={openDeleteModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => setOpenDeleteModal(true)}
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

          {/* This element is to trick the browser into centering the modal contents. */}
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
            <div className="inline-block mt-[5.5rem] w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900 mt-4"
              >
                Are You Sure?
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-gray-600">This cannot be undone</p>
                <div className="grid gap-3 grid-cols-2">
                  <button
                    className="w-full
                  py-2
                  rounded-md
                  shadow-md
                  px-3
                  mt-2
                  bg-cloud-theme-blue
                  text-white text-center text-base
                  flex justify-center items-center content-center"
                    type="button"
                    onClick={() => setOpenDeleteModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="w-full
                  py-2
                  rounded-md
                  shadow-md
                  px-3
                  mt-2
                  bg-cloud-theme-gold
                  text-white text-center text-base
                  flex justify-center items-center content-center"
                    type="button"
                    onClick={() => {
                      setOpenDeleteModal(false);
                      dispatch(deleteMyPosts(slug, currentPage, query));
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

// const UpdatePost = ({ openUpdate, setOpenUpdate }) => {
//   const [title, setTitle] = useState("");
//   const [titleErr, setTitleErr] = useState("");
//   const [image, setImage] = useState("");

//   const [imageErr, setImageErr] = useState("");
//   const [overview, setOverview] = useState("");
//   const [overviewErr, setOverviewErr] = useState("");
//   const [content, setContent] = useState("");
//   const [contentErr, setContentErr] = useState("");
//   const [contentLocation, setContentLocation] = useState("");
//   const [contentLocationErr, setContentLocationErr] = useState("");
//   const [contentCategory, setContentCategory] = useState("");
//   const [contentCategoryErr, setContentCategoryErr] = useState("");

//   const loading = useSelector((state) => state.contents.loading);
//   const handleEditorChange = (event, editor) => {
//     const data = editor.getData();
//     setContent(data);
//   };
//   const contentCategories = () => {
//     const options = [
//       { label: "Property Trends", value: "Property Trends" },
//       { label: "Market & Economy", value: "Market & Economy" },
//       { label: "Investment & Deals", value: "Investment & Deals" },
//       { label: "Research & Data", value: "Research & Data" },
//       { label: "Land Matters", value: "Land Matters" },
//       { label: "Tax and Legal", value: "Tax and Legal" },
//       { label: "Buildings & Architecture", value: "Buildings & Architecture" },
//       { label: "Opinion", value: "Opinion" },
//       { label: "Sponsored Content", value: "Sponsored Content" },
//     ];
//     return (
//       <Select
//         name="options"
//         className="mt-2"
//         onChange={(e) => setContentCategory(e)}
//         options={options}
//       />
//     );
//   };
//   const contentLocations = () => {
//     const options = [
//       { label: "International", value: "International" },
//       { label: "Africa", value: "Africa" },
//       { label: "East Africa", value: "East Africa" },
//       { label: "Kenya", value: "Kenya" },
//     ];
//     return (
//       <Select
//         name="options"
//         className="mt-2"
//         onChange={(e) => setContentLocation(e)}
//         options={options}
//       />
//     );
//   };
//   const onSubmit = (e) => {
//     e.preventDefault();
//     if (title === "") {
//       window.scrollTo(0, 0);
//       setTitleErr("Field is required");
//       return;
//     } else if (contentLocation === "" || contentLocation === undefined) {
//       window.scrollTo(0, 0);
//       setTitleErr("");
//       setContentLocationErr("Field is required");
//       return;
//     } else if (contentCategory === "" || contentCategory === undefined) {
//       window.scrollTo(0, 0);
//       setContentLocationErr("");
//       setContentCategoryErr("Field is required");
//       return;
//     } else if (overview === "") {
//       window.scrollTo(0, 0);
//       setContentCategoryErr("");
//       setOverviewErr("Field is required");
//       return;
//     } else if (content === "") {
//       window.scrollTo(0, 0);
//       setOverviewErr("");
//       setContentErr("Field is required");
//       return;
//     } else if (image === "") {
//       setContentErr("");
//       setImageErr("Field is required");
//       return;
//     } else {
//       setImageErr("");
//       const formData = new FormData();
//       formData.append("title", title);
//       formData.append("overview", overview);
//       formData.append("category", contentCategory.value);
//       formData.append("contentLocation", contentLocation.value);
//       formData.append("content", content);
//       formData.append("image", image[0]);
//       // dispatch(addPosts(formData));
//       setTitle("");
//       setOverview("");
//       setImage("");
//       setContent("");
//       setContentLocation("");
//       setContentCategory("");
//       window.scrollTo(0, 0);
//     }
//   };
//   return (
//     <Transition appear show={openUpdate} as={Fragment}>
//       <Dialog
//         as="div"
//         className="fixed inset-0 z-10 overflow-y-auto"
//         onClose={() => setOpenUpdate(true)}
//       >
//         <div className="min-h-screen px-4 text-center">
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <Dialog.Overlay className="fixed inset-0 backdrop-blur-sm bg-blue-100/30" />
//           </Transition.Child>

//           {/* This element is to trick the browser into centering the modal contents. */}
//           <span
//             className="inline-block h-screen align-middle"
//             aria-hidden="true"
//           >
//             &#8203;
//           </span>
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0 scale-95"
//             enterTo="opacity-100 scale-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100 scale-100"
//             leaveTo="opacity-0 scale-95"
//           >
//             <div className="inline-block mt-[5.5rem] w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
//               <Dialog.Title
//                 as="h3"
//                 className="text-lg font-medium leading-6 text-gray-900 mt-4"
//               >
//                 update Post
//               </Dialog.Title>
//               <form className="mt-5" onSubmit={(e) => onSubmit(e)}>
//                 <div className="relative z-0 mb-6 w-full group">
//                   <input
//                     type="text"
//                     name="title"
//                     id="title"
//                     className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0
//               border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600
//               dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-cloud-theme-blue peer"
//                     placeholder=" "
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                   />
//                   <label
//                     htmlFor="title"
//                     className="absolute text-base text-gray-500 dark:text-gray-400 duration-300
//               transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600
//               peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
//               peer-focus:scale-75 peer-focus:-translate-y-6"
//                   >
//                     Title
//                   </label>
//                   {titleErr && (
//                     <p className="mb-2 text-red-500 text-xxs">{titleErr}</p>
//                   )}
//                 </div>
//                 <div className="relative mb-4 w-full group">
//                   <p className="">Location</p>
//                   {contentLocationErr && (
//                     <p className="text-red-500 text-xxs">
//                       {contentLocationErr}
//                     </p>
//                   )}
//                   {contentLocations()}
//                 </div>
//                 <div className="relative mb-4 w-full group">
//                   <p className="">Content Category</p>
//                   {contentCategoryErr && (
//                     <p className="text-red-500 text-xxs">
//                       {contentCategoryErr}
//                     </p>
//                   )}
//                   {contentCategories()}
//                 </div>
//                 <div className="relative z-0 mb-6 w-full">
//                   <p className="">Summary</p>
//                   {overviewErr && (
//                     <p className="text-red-500 text-xxs">{overviewErr}</p>
//                   )}
//                   <textarea
//                     type="summary"
//                     name="overview"
//                     id="overview"
//                     value={overview}
//                     onChange={(e) => setOverview(e.target.value)}
//                     maxLength={240}
//                     rows="4"
//                     className="block p-2.5 w-full text-sm outline-none text-gray-900 bg-gray-50 rounded-sm border border-gray-300
//               focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
//                     placeholder="post summary..."
//                   />
//                 </div>
//                 <div className="mb-6 w-full">
//                   <p className="mb-3">Post Content</p>
//                   {contentErr && (
//                     <p className="text-red-500 text-xxs">{contentErr}</p>
//                   )}
//                   <div className="">
//                     <CKEditor
//                       editor={ClassicEditor}
//                       config={{ placeholder: "Add post content here" }}
//                       onReady={() => {}}
//                       onChange={(event, editor) =>
//                         handleEditorChange(event, editor)
//                       }
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <p className="block mb-2">Upload Post Thumbnail</p>
//                   {imageErr && (
//                     <p className="mb-2 text-red-500 text-xxs">{imageErr}</p>
//                   )}
//                   <input
//                     accept="image/png, image/jpeg"
//                     onChange={(e) => setImage(e.target.files)}
//                     multiple={false}
//                     // onChange={(e) => imageHandler(e)}
//                     className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer
//               dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 p-2"
//                     id="thumb"
//                     type="file"
//                   />
//                 </div>
//                 <div></div>
//                 <div className="mt-5 flex items-center content-center justify-center w-full">
//                   {loading ? (
//                     <SpinOne />
//                   ) : (
//                     <button
//                       type="submit"
//                       className="outline-none border-none px-10 rounded-md py-3 bg-cloud-theme-blue text-white font-semibold"
//                     >
//                       Submit
//                     </button>
//                   )}
//                 </div>
//               </form>

//               <div className="mt-4">
//                 <button
//                   type="button"
//                   className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
//                   onClick={() => setOpenUpdate(false)}
//                 >
//                   Got it, thanks!
//                 </button>
//               </div>
//             </div>
//           </Transition.Child>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// };

export default MyPosts;
