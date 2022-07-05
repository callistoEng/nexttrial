import { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { SpinOne, SpinThree } from "../Spinners/Spinner";
import {
  editPost,
  getPostEdit,
  getContentCategories,
} from "../../state/actionCreators/content";
import { useDispatch, useSelector } from "react-redux";
import { failedEditingPost } from "../../state/estateSlices/contentSlice";
// import { TrackpageView } from "../GAnalytics";
import { loadUsers } from "../../state/actionCreators/auth";
import { useRouter } from "next/router";

const EditPost = ({ slug }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const message = useSelector((state) => state.contents.message);
  const loading = useSelector((state) => state.contents.loading);
  const redirect = useSelector((state) => state.contents.redirect);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const contentCategoriesDb = useSelector(
    (state) => state.contents.contentCategories
  );
  const singleContent = useSelector((state) => state.contents.postToEdit);
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

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getPostEdit(slug));
    dispatch(loadUsers());
    dispatch(getContentCategories());
    // TrackpageView(`/auth/agent/edit-post/${slug}`);
    return () => {
      dispatch(failedEditingPost());
    };
  }, [dispatch, slug]);
  if (!isAuthenticated) {
    return (
      <div className="mt-[6rem] h-screen w-full">
        <div className="sm:w-[38.5rem] mt-20 xs-l:w-[30rem] w-full px-5 xs-l:px-0 mx-auto mb-5">
          <p className="animate-pulse text-cloud-theme-blue">
            Please wait... Authenticating. If not redirected you can login again
          </p>
        </div>
      </div>
    );
  }
  if (redirect) {
    router.push("/auth/agent/my-posts")
  }
  return (
    <section className="mt-[6rem]">
      <div className="xs-l:w-[30rem] w-full xs-l:px-0 px-5 mx-auto mt-10">
        <div className="flex items-center justify-center mb-3">
          <h4 className="text-xl font-semibold text-cloud-theme-blue">
            Edit Post
          </h4>
        </div>
        {message && (
          <div className=" mb-4">
            <p className="text-red-600 font-bold text-sm underline animate-pulse">
              {message}
            </p>
          </div>
        )}
        {singleContent ? (
          <UpdateForm
            loading={loading}
            editorLoaded={editorLoaded}
            CKEditor={CKEditor} 
            ClassicEditor={ClassicEditor}
            singleContent={singleContent}
            contentCategoriesDb={contentCategoriesDb}
          />
        ) : (
          <div className="h-screen">
            <p className="mb-32">In a minute ...</p>
            <SpinThree />
          </div>
        )}
      </div>
    </section>
  );
};

const UpdateForm = ({
  singleContent,
  editorLoaded,
  loading,
  CKEditor, ClassicEditor,
  contentCategoriesDb,
}) => {
  const [title, setTitle] = useState(singleContent.title);
  const [contentCaption, setContentCaption] = useState(singleContent.caption);
  const [contentCaptionErr, setContentCaptionErr] = useState("");
  const [image, setImage] = useState("");
  const [imageErr, setImageErr] = useState("");
  const [content, setContent] = useState(singleContent.content);
  const [overview, setOverview] = useState(singleContent.overview);
  const [contentCategory, setContentCategory] = useState("");
  const [contentLocation, setContentLocation] = useState("");
  const dispatch = useDispatch();
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };
  const contentCategories = () => {
    const options =
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
      />
    );
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", singleContent.slug);
    formData.append("overview", overview);
    if (!contentCaption) {
      window.scrollTo(0, 0);
      setContentCaptionErr("Field required");
      return;
    }
    formData.append("caption", contentCaption);
    if (contentCategory.value) {
      formData.append("category_id", contentCategory.value);
    }
    if (contentLocation.value) {
      formData.append("Location", contentLocation.value);
    }
    if (image) {
      formData.append("thumbnail", image[0]);
    }
    formData.append("content", content);
    dispatch(editPost(formData));
  };
  return (
    <>
      <form onSubmit={(e) => onSubmit(e)} className="mb-5">
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
            className="absolute text-base dark:text-gray-400 duration-300 
                transform font-bold -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0
                peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Title
          </label>
        </div>
        <div className="relative mb-4 w-full group">
          <p className="font-semibold">Location</p>
          <p className="italic font-semibold text-xs">
            Current Location: {singleContent.Location}
          </p>
          {contentLocations()}
        </div>
        <div className="relative mb-4 w-full group">
          <p className="font-semibold">Content Category</p>
          <p className="italic font-semibold text-xs">
            Current Category: {singleContent.category?.category_name}
          </p>
          {contentCategories()}
        </div>
        <div className="relative z-0 mb-6 w-full">
          <p className="font-semibold">Summary</p>
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
          <p className="mb-3 font-semibold">Post Content</p>
          <div className="">
            {editorLoaded ? (
              <CKEditor
                editor={ClassicEditor}
                data={content}
                config={{ placeholder: "Add post content here" }}
                onChange={(event, editor) => handleEditorChange(event, editor)}
              />
            ) : (
              <div>Editor loading</div>
            )}
          </div>
        </div>
        <div className="w-full shadow-md mt-4 grid grid-cols-2 p-2 gap-2">
          <div className="">
            <p className="block font-semibold mb-2">Change Post Thumbnail</p>
            {imageErr && (
              <p className="mb-2 text-red-500 text-xxs">{imageErr}</p>
            )}
            <input
              accept="image/png, image/jpeg"
              onChange={(e) => setImage(e.target.files)}
              multiple={false}
              className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer 
            dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 p-2"
              type="file"
            />
          </div>
          <div className="h-40 overflow-hidden">
            <img
              className="w-full h-full object-cover roudent md"
              src={singleContent.thumbnail && singleContent.thumbnail}
              alt={singleContent.title}
            />
          </div>
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
            className="absolute text-base font-bold dark:text-gray-400 duration-300 
                transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0
                peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Image Caption
          </label>
          {contentCaptionErr && (
            <p className="mb-2 text-red-500 text-xxs">{contentCaptionErr}</p>
          )}
        </div>
        <div className="mt-5 flex items-center content-center justify-center w-full">
          {loading ? (
            <SpinOne />
          ) : (
            <button
              type="submit"
              className="outline-none border-none px-10 rounded-md py-3 bg-cloud-theme-gold text-white font-semibold"
            >
              Update
            </button>
          )}
        </div>
      </form>
    </>
  );
};
export default EditPost;
