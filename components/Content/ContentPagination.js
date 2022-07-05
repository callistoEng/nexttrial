import {
  getPostsNextPrevPage,
  getAllPostsNextPrevPage,
} from "../../state/actionCreators/content";

const ContentPagination = ({
  myPostPrev,
  isContentAll,
  myPostNext,
  dispatch,
}) => {
  const loadNextPage = () => {
    if (isContentAll) {
      dispatch(getAllPostsNextPrevPage(myPostNext));
    } else {
      dispatch(getPostsNextPrevPage(myPostNext));
    }
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  };
  const loadPrevPage = () => {
    if (isContentAll) {
      dispatch(getAllPostsNextPrevPage(myPostPrev));
    } else {
      dispatch(getPostsNextPrevPage(myPostPrev));
    }
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  };
  return (
    <div className="flex items-center justify-center gap-3">
      {myPostPrev && (
        <div>
          <button
            className="px-4 py-1.5 bg-cloud-theme-blue text-white rounded-md"
            onClick={loadPrevPage}
          >
            Prev
          </button>
        </div>
      )}

      {myPostNext && (
        <div>
          <button
            className="px-4 py-1.5 bg-cloud-theme-blue text-white rounded-md"
            onClick={loadNextPage}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ContentPagination;
