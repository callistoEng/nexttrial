import { getMyPostsNextNoThumbPrevPage, getMyPostsNextPrevPage } from "../../state/actionCreators/content";
const MyPostPagination = ({
  myPostPrev,
  myPostNext,
  dispatch,
  isAll
}) => {
  const loadNextPage = () => {
    if(isAll){
      dispatch(getMyPostsNextPrevPage(myPostNext));
    }else{
      dispatch(getMyPostsNextNoThumbPrevPage(myPostNext))
    }
    window.scrollTo(0, 0);
  };
  const loadPrevPage = () => {
    if(isAll){
      dispatch(getMyPostsNextPrevPage(myPostPrev));
    }else{
      dispatch(getMyPostsNextNoThumbPrevPage(myPostPrev))
    }
    
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex items-center justify-center gap-3">
      {myPostPrev && (
        <div>
          <button className="px-4 py-1.5 bg-cloud-theme-blue text-white rounded-md" onClick={loadPrevPage}>Prev</button>
        </div>
      )}

      {myPostNext && (
        <div>
          <button className="px-4 py-1.5 bg-cloud-theme-blue text-white rounded-md" onClick={loadNextPage}>Next</button>
        </div>
      )}
    </div>
  );
};

export default MyPostPagination;
