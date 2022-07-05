import {
  getListingsCommercialNextPrevPage,
  getListingsLandNextPrevPage,
  getListingsResidentialNextPrevPage,
  getSearchListingsCommercialNextPrevPage,
  getSearchListingsLandNextPrevPage,
  getSearchListingsResidentialNextPrevPage,
} from "../../state/actionCreators/listings";

export const ListingPropertiesPagination = ({
  mainCategory,
  myPostPrev,
  myPostNext,
  dispatch,
}) => {
  const loadNextPage = () => {
    if (mainCategory === "residential") {
      dispatch(getListingsResidentialNextPrevPage(myPostNext));
    } else if (mainCategory === "land") {
      dispatch(getListingsLandNextPrevPage(myPostNext));
    } else {
      dispatch(getListingsCommercialNextPrevPage(myPostNext));
    }
    window.scrollTo(0, 0);
  };
  const loadPrevPage = () => {
    if (mainCategory === "residential") {
      dispatch(getListingsResidentialNextPrevPage(myPostPrev));
    } else if (mainCategory === "land") {
      dispatch(getListingsLandNextPrevPage(myPostPrev));
    } else {
      dispatch(getListingsCommercialNextPrevPage(myPostPrev));
    }

    window.scrollTo(0, 0);
  };
  return (
    <div className="flex items-center justify-center gap-3">
      {myPostPrev && (
        <div>
          <button
            className="px-4 py-1.5 bg-cloud-theme-blue text-white rounded-md shadow-md"
            onClick={loadPrevPage}
          >
            Prev
          </button>
        </div>
      )}

      {myPostNext && (
        <div>
          <button
            className="px-4 py-1.5 bg-cloud-theme-blue text-white rounded-md shadow-md"
            onClick={loadNextPage}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
export const SearchResidentialListingPagination = ({
  myPostPrev,
  myPostNext,
  dispatch,
}) => {
  const loadNextPage = () => {
    dispatch(getSearchListingsResidentialNextPrevPage(myPostNext));
    window.scrollTo(0, 0);
  };
  const loadPrevPage = () => {
    dispatch(getSearchListingsResidentialNextPrevPage(myPostPrev));
    window.scrollTo(0, 0);
  };
  return (
    <div className="flex items-center justify-center gap-3">
      {myPostPrev && (
        <div>
          <button
            className="px-4 py-1.5 bg-cloud-theme-blue text-white rounded-md shadow-md"
            onClick={loadPrevPage}
          >
            Prev
          </button>
        </div>
      )}

      {myPostNext && (
        <div>
          <button
            className="px-4 py-1.5 bg-cloud-theme-blue text-white rounded-md shadow-md"
            onClick={loadNextPage}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
export const SearchLandListingPagination = ({
  myPostPrev,
  myPostNext,
  dispatch,
}) => {
  const loadNextPage = () => {
    dispatch(getSearchListingsLandNextPrevPage(myPostNext));
    window.scrollTo(0, 0);
  };
  const loadPrevPage = () => {
    dispatch(getSearchListingsLandNextPrevPage(myPostPrev));
    window.scrollTo(0, 0);
  };
  return (
    <div className="flex items-center justify-center gap-3">
      {myPostPrev && (
        <div>
          <button
            className="px-4 py-1.5 bg-cloud-theme-blue text-white rounded-md shadow-md"
            onClick={loadPrevPage}
          >
            Prev
          </button>
        </div>
      )}

      {myPostNext && (
        <div>
          <button
            className="px-4 py-1.5 bg-cloud-theme-blue text-white rounded-md shadow-md"
            onClick={loadNextPage}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
export const SearchCommercialListingPagination = ({
  myPostPrev,
  myPostNext,
  dispatch,
}) => {
  const loadNextPage = () => {
    dispatch(getSearchListingsCommercialNextPrevPage(myPostNext));
    window.scrollTo(0, 0);
  };
  const loadPrevPage = () => {
    dispatch(getSearchListingsCommercialNextPrevPage(myPostPrev));
    window.scrollTo(0, 0);
  };
  return (
    <div className="flex items-center justify-center gap-3">
      {myPostPrev && (
        <div>
          <button
            className="px-4 py-1.5 bg-cloud-theme-blue text-white rounded-md shadow-md"
            onClick={loadPrevPage}
          >
            Prev
          </button>
        </div>
      )}

      {myPostNext && (
        <div>
          <button
            className="px-4 py-1.5 bg-cloud-theme-blue text-white rounded-md shadow-md"
            onClick={loadNextPage}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
