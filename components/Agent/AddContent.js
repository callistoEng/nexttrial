import { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { SpinOne } from "../Spinners/Spinner";
import {
  addPosts,
  getContentCategories,
} from "../../state/actionCreators/content";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { loadUsers } from "../../state/actionCreators/auth";
import { failedAddingPost } from "../../state/estateSlices/contentSlice";
// import { TrackpageView } from "../GAnalytics";

const AddContent = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [titleErr, setTitleErr] = useState("");
  const [imageErr, setImageErr] = useState("");
  const [overview, setOverview] = useState("");
  const [contentErr, setContentErr] = useState("");
  const [overviewErr, setOverviewErr] = useState("");
  const [contentCategory, setContentCategory] = useState("");
  const [contentLocation, setContentLocation] = useState("");
  const [contentCaption, setContentCaption] = useState("");
  const [contentCaptionErr, setContentCaptionErr] = useState("");
  const [contentLocationErr, setContentLocationErr] = useState("");
  const [contentCategoryErr, setContentCategoryErr] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const message = useSelector((state) => state.contents.message);
  const loading = useSelector((state) => state.contents.loading);
  const postAdded = useSelector((state) => state.contents.postAdded);
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const contentCategoriesDb = useSelector(
    (state) => state.contents.contentCategories
  );
  const [editorLoaded, setEditorLoaded] = useState(false);
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
  }, []);
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(loadUsers());
    dispatch(getContentCategories());
    // TrackpageView("/auth/agent/add-content")
    return () => {
      dispatch(failedAddingPost());
    };
  }, [dispatch]);
  const contentCategories = () => {
    let options =
      contentCategoriesDb &&
      contentCategoriesDb.map((category) => ({
        value: category.id,
        label: category.category_name,
      }));
    return (
      <Select
        name="options"
        className="mt-2"
        onChange={(e) => setContentCategory(e)}
        options={options}
      />
    );
  };
  const contentLocations = () => {
    const options = [
      { label: "International", value: "International" },
      { label: "Africa", value: "Africa" },
      { label: "East Africa", value: "East Africa" },
      { label: "Kenya", value: "Kenya" },
    ];
    return (
      <Select
        name="options"
        className="mt-2"
        onChange={(e) => setContentLocation(e)}
        options={options}
        // styles={customStyles}
      />
    );
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      window.scrollTo(0, 0);
      setTitleErr("Field is required");
      return;
    }
    if (contentLocation === "" || contentLocation === undefined) {
      window.scrollTo(0, 0);
      setTitleErr("");
      setContentLocationErr("Field is required");
      return;
    } else if (contentCategory === "" || contentCategory === undefined) {
      window.scrollTo(0, 0);
      setContentLocationErr("");
      setContentCategoryErr("Field is required");
      return;
    }
    if (!overview) {
      setContentCategoryErr("");
      window.scrollTo(0, 0);
      setContentCategoryErr("");
      setOverviewErr("Field is required");
      return;
    }
    if (!content) {
      setOverviewErr("");
      window.scrollTo(0, 0);
      setContentErr("Field is required");
      return;
    }
    if (!image) {
      setContentErr("");
      setImageErr("Field is required");
      return;
    }
    if (!contentCaption) {
      setImageErr("");
      setContentCaptionErr("Field is required");
      return;
    } else {
      setContentCaptionErr("");
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("overview", overview);
    formData.append("caption", contentCaption);
    formData.append("content_owner_id", user.id);
    formData.append("category_id", contentCategory.value);
    formData.append("contentLocation", contentLocation.value);
    formData.append("content", content);
    formData.append("thumbnail", image[0]);
    // for (var key of formData.entries()) {
    //   console.log(key);
    // }
    dispatch(addPosts(formData));
    setTitle("");
    setOverview("");
    setImage("");
    setContent("");
    setContentCaptionErr("");
    setContentLocation("");
    setContentCategory("");
    window.scrollTo(0, 0);
  };
  if (!isAuthenticated) {
    return (
      <div className="mt-[6rem] h-screen w-full">
        <div className="sm:w-[37.5rem] mt-20 xs-l:w-[30rem] w-full px-5 xs-l:px-0 mx-auto mb-5">
          <p className="animate-pulse text-cloud-theme-gold">
            Please wait... Authenticating. This page is for those who are
            registered as content creators. If it's taking too long to
            authenticate, login or signup.
          </p>
        </div>
      </div>
    );
  }
  if (postAdded) {
    router.push("/auth/agent/my-posts");
  }
  return (
    <section className="mt-[6rem] mb-5">
      <div className="xs-l:w-[30rem] w-full xs-l:px-0 px-5 mx-auto mt-10">
        <div className="flex items-center justify-center gap-4 mb-3">
          <div>
            <h4 className="text-xl font-semibold text-cloud-theme-blue">
              Add Post
            </h4>
          </div>
        </div>
        {message && (
          <div className=" mb-4">
            <p className="text-cloud-theme-gold font-bold text-sm underline animate-pulse">
              {message}
            </p>
          </div>
        )}
        {user ?
          (user.is_content_creator ? (
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0
                border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 
                dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-cloud-theme-blue peer"
                  placeholder=" "
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label
                  htmlFor="title"
                  className="absolute text-base text-gray-500 dark:text-gray-400 duration-300 
                transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 
                peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Title
                </label>
                {titleErr && (
                  <p className="mb-2 text-red-500 text-xxs">{titleErr}</p>
                )}
              </div>

              <div className="relative mb-4 w-full group">
                <p className="">Location</p>
                {contentLocationErr && (
                  <p className="text-red-500 text-xxs">{contentLocationErr}</p>
                )}
                {contentLocations()}
              </div>
              <div className="relative mb-4 w-full group">
                <p className="">Content Category</p>
                {contentCategoryErr && (
                  <p className="text-red-500 text-xxs">{contentCategoryErr}</p>
                )}
                {contentCategories()}
              </div>
              <div className="relative z-0 mb-6 w-full">
                <p className="">Summary</p>
                {overviewErr && (
                  <p className="text-red-500 text-xxs">{overviewErr}</p>
                )}
                <textarea
                  type="summary"
                  name="overview"
                  id="overview"
                  value={overview}
                  onChange={(e) => setOverview(e.target.value)}
                  maxLength={240}
                  rows="4"
                  className="block p-2.5 w-full text-sm outline-none text-gray-900 bg-gray-50 rounded-sm border border-gray-300 
                focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                  placeholder="post summary..."
                />
              </div>
              <div className="mb-6 w-full">
                <p className="mb-3">Post Content</p>
                {contentErr && (
                  <p className="text-red-500 text-xxs">{contentErr}</p>
                )}
                <div className="">
                  {editorLoaded ? (
                    <CKEditor
                      editor={ClassicEditor}
                      data={content}
                      config={{ placeholder: "Add post content here" }}
                      onReady={() => {}}
                      onChange={(event, editor) =>
                        handleEditorChange(event, editor)
                      }
                    />
                  ) : (
                    <p>Loading editor</p>
                  )}
                </div>
              </div>
              <div>
                <p className="block mb-2">Upload Post Thumbnail</p>
                {imageErr && (
                  <p className="mb-2 text-red-500 text-xxs">{imageErr}</p>
                )}
                <input
                  accept="image/png, image/jpeg"
                  onChange={(e) => setImage(e.target.files)}
                  multiple={false}
                  className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer 
                dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 p-2"
                  id="thumb"
                  type="file"
                />
              </div>
              <div className="relative z-0 mt-6 w-full group">
                <input
                  type="text"
                  name="caption"
                  id="caption"
                  maxLength={100}
                  className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0
                border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 
                dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-cloud-theme-blue peer"
                  placeholder=" "
                  value={contentCaption}
                  onChange={(e) => setContentCaption(e.target.value)}
                />
                <label
                  htmlFor="caption"
                  className="absolute text-base text-gray-500 dark:text-gray-400 duration-300 
                transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 
                peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Image Caption
                </label>
                {contentCaptionErr && (
                  <p className="mb-2 text-red-500 text-xxs">
                    {contentCaptionErr}
                  </p>
                )}
              </div>
              <div></div>
              <div className="mt-5 flex items-center content-center justify-center w-full">
                {loading ? (
                  <SpinOne />
                ) : (
                  <button
                    type="submit"
                    className="outline-none border-none px-10 rounded-md py-3 bg-cloud-theme-blue text-white font-semibold"
                  >
                    Submit
                  </button>
                )}
              </div>
              {/* <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-cloud-theme-blue hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:cloud-theme-blue"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 1MB</p>
              </div>
            </div> */}
            </form>
          ) : (
            <p className="animate-bounce text-sm text-cloud-theme-gold duration-300">
              Unauthorised user! Only users registered as content creators can
              add posts
            </p>
          )):< div className="w-full h-[70vh]"></div>}
      </div>
    </section>
  );
};

export default AddContent;
