import axios from "axios";
import { toast } from "react-toastify";
import {
  doneAddingImages,
  doneAddingListing,
  doneChangingPlan,
  doneGetingCommercialHomeListing,
  doneGetingCommercialListing,
  doneGetingCoWorkingHomeListing,
  doneGetingLandHomeListing,
  doneGetingLandListing,
  doneGetingListingDetail,
  doneGettingScheduledViewings,
  doneGetingResidentialHomeListing,
  doneGetingResidentialListing,
  doneGettingLikedListings,
  doneLikingListing,
  doneReportingListing,
  failedAddingImages,
  failedAddingListing,
  failedChangingPlan,
  failedGetingCommercialHomeListing,
  failedGetingCommercialListing,
  failedGetingCoWorkingListing,
  failedGetingLandListing,
  failedGetingListingDetail,
  failedGetingResidentialListing,
  failedGettingLikedListings,
  failedLikingListing,
  failedReportingListing,
  startAddingImages,
  startAddingListing,
  startChangingPlan,
  startGetingCommercialHomeListing,
  startGetingCommercialListing,
  startGetingCoWorkingListing,
  startGetingLandListing,
  startGetingListingDetail,
  startGetingResidentialListing,
  startGettingLikedListings,
  startLikingListing,
  startReportingListing,
} from "../estateSlices/allListingSlices";
import { agentMyListings } from "./auth";

export const likeListings = (slug) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  dispatch(startLikingListing());
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/listings/like/`,
      { slug },
      config
    );
    dispatch(doneLikingListing(res.data));
    dispatch(getLikedListings());
    toast.success(res.data.message);
  } catch (error) {
    dispatch(failedLikingListing());
    toast.warn("Error!Please Login!");
  }
};

export const reportListing = (slug, complaint) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  dispatch(startReportingListing());
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/listings/complaints/`,
      { slug, complaint },
      config
    );
    dispatch(doneReportingListing(res.data));
    toast.success(res.data.message);
  } catch (error) {
    dispatch(failedReportingListing());
    toast.error("Error. UnAuthenticated user!");
  }
};
export const getScheduledViewing = () => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  dispatch(startReportingListing());
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/listings/scheduled/`,
      config
    );
    dispatch(doneGettingScheduledViewings(res.data));
  } catch (error) {
    dispatch(failedReportingListing());
  }
};
export const getCommercialListings = () => async (dispatch) => {
  dispatch(startGetingCommercialListing());
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/listings/commercial/`
    );
    dispatch(doneGetingCommercialListing(res.data));
  } catch (error) {
    dispatch(failedGetingCommercialListing());
  }
};
export const getListingsCommercialNextPrevPage =
  (postNextPrev) => async (dispatch) => {
    dispatch(startGetingCommercialListing());
    try {
      const res = await axios.get(postNextPrev);
      dispatch(doneGetingCommercialListing(res.data));
    } catch (error) {
      dispatch(failedGetingCommercialListing());
    }
  };
export const getResidentialListings =
  (
    financing,
    propertyType,
    dealsType,
    developmentType,
    minVal,
    maxVal,
    saleConditon,
    bathrooms,
    bedrooms
  ) =>
  async (dispatch) => {
    dispatch(startGetingResidentialListing());
    try {
      const res = await axios.get(
        saleConditon === "For Rent"
          ? `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/listings/residential/?rp_gte=${minVal}&category__category_name=${saleConditon}&bedrooms=${bedrooms}&bathrooms=${bathrooms}&rp_lte=${maxVal}&financing_type=${financing}&development_type=${developmentType}&deal_type=${dealsType}&property_type=${propertyType}`
          : `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/listings/residential/?sp_gte=${minVal}&category__category_name=${saleConditon}&bedrooms=${bedrooms}&bathrooms=${bathrooms}&sp_lte=${maxVal}&financing_type=${financing}&development_type=${developmentType}&deal_type=${dealsType}&property_type=${propertyType}`
      );
      dispatch(doneGetingResidentialListing(res.data));
    } catch (error) {
      dispatch(failedGetingResidentialListing());
    }
  };

export const getListingsResidentialNextPrevPage =
  (postNextPrev) => async (dispatch) => {
    dispatch(startGetingResidentialListing());
    try {
      const res = await axios.get(postNextPrev);
      dispatch(doneGetingResidentialListing(res.data));
    } catch (error) {
      dispatch(failedGetingResidentialListing());
    }
  };

export const getLandListings =
  (
    financing,
    propertyType,
    minVal,
    maxVal,
    saleConditon,
    listing_availability
  ) =>
  async (dispatch) => {
    dispatch(startGetingLandListing());
    try {
      const res = await axios.get(
        saleConditon === "For Sale"
          ? `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/listings/land/?financing_type=${financing}&sp_gte=${minVal}&category__category_name=${saleConditon}&sp_lte=${maxVal}&property_type=${propertyType}&listing_availability=${listing_availability}`
          : `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/listings/land/?financing_type=${financing}&lp_gte=${minVal}&category__category_name=${saleConditon}&lp_lte=${maxVal}&property_type=${propertyType}&listing_availability=${listing_availability}`
      );
      dispatch(doneGetingLandListing(res.data));
    } catch (error) {
      dispatch(failedGetingLandListing());
    }
  };

export const getListingsLandNextPrevPage =
  (postNextPrev) => async (dispatch) => {
    dispatch(startGetingLandListing());
    try {
      const res = await axios.get(postNextPrev);
      dispatch(doneGetingLandListing(res.data));
    } catch (error) {
      dispatch(failedGetingLandListing());
    }
  };
export const scheduleViewing = (formData) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  dispatch(startReportingListing());
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_DJANGO_SEMIBASE_URL}/api/v2/listings/scheduled/`,
      formData,
      config
    );
    dispatch(doneReportingListing(res.data));
    toast.success(res.data.message);
  } catch (error) {
    dispatch(failedReportingListing());
    toast.error("Error. UnAuthenticated user!");
  }
};
export const searchCommercialListings = (query) => async (dispatch) => {
  dispatch(startGetingCommercialListing());
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/listings/commercial/` +
        query
    );
    dispatch(doneGetingCommercialListing(res.data));
  } catch (error) {
    dispatch(failedGetingCommercialListing());
  }
};
export const getSearchListingsCommercialNextPrevPage =
  (postNextPrev) => async (dispatch) => {
    dispatch(startGetingCommercialListing());
    try {
      const res = await axios.get(postNextPrev);
      dispatch(doneGetingCommercialListing(res.data));
    } catch (error) {
      dispatch(failedGetingCommercialListing());
    }
  };
export const searchResidentialListings = (query) => async (dispatch) => {
  dispatch(startGetingResidentialListing());
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/listings/residential/` +
        query
    );
    dispatch(doneGetingResidentialListing(res.data));
  } catch (error) {
    dispatch(failedGetingResidentialListing());
  }
};
export const getSearchListingsResidentialNextPrevPage =
  (postNextPrev) => async (dispatch) => {
    dispatch(startGetingResidentialListing());
    try {
      const res = await axios.get(postNextPrev);
      dispatch(doneGetingResidentialListing(res.data));
    } catch (error) {
      dispatch(failedGetingResidentialListing());
    }
  };
export const searchLandListings = (query) => async (dispatch) => {
  dispatch(startGetingLandListing());
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/listings/land/` +
        query
    );
    dispatch(doneGetingLandListing(res.data));
  } catch (error) {
    dispatch(failedGetingLandListing());
  }
};

export const getSearchListingsLandNextPrevPage =
  (postNextPrev) => async (dispatch) => {
    dispatch(startGetingLandListing());
    try {
      const res = await axios.get(postNextPrev);
      dispatch(doneGetingLandListing(res.data));
    } catch (error) {
      dispatch(failedGetingLandListing());
    }
  };
export const getCommercialHomeListings = () => async (dispatch) => {
  dispatch(startGetingCommercialHomeListing());
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/listings/commercial-home/`
    );
    dispatch(doneGetingCommercialHomeListing(res.data));
  } catch (error) {
    dispatch(failedGetingCommercialHomeListing());
  }
};
export const getCowokingHomeListings = () => async (dispatch) => {
  dispatch(startGetingCoWorkingListing());
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/listings/commercial/coworking-home/`
    );
    dispatch(doneGetingCoWorkingHomeListing(res.data));
  } catch (error) {
    dispatch(failedGetingCoWorkingListing());
  }
};
export const getLandHomeListings = () => async (dispatch) => {
  dispatch(startGetingLandListing());
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/listings/land-home/`
    );
    dispatch(doneGetingLandHomeListing(res.data));
  } catch (error) {
    dispatch(failedGetingLandListing());
  }
};
export const getResidentialHomeListings = () => async (dispatch) => {
  dispatch(startGetingResidentialListing());
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/listings/residential-home/`
    );
    dispatch(doneGetingResidentialHomeListing(res.data));
  } catch (error) {
    dispatch(failedGetingResidentialListing());
  }
};
export const getASingleListingDetail = (slug) => async (dispatch) => {
  dispatch(startGetingListingDetail());
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/listings/retrieve/${slug}/`
    );
    dispatch(doneGetingListingDetail(res.data));
  } catch (error) {
    dispatch(failedGetingListingDetail());
  }
};
export const getRelatedListings = (slug) => async (dispatch) => {
  dispatch(startGetingListingDetail());
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/listings/retrieve/${slug}/`
    );
    dispatch(doneGetingListingDetail(res.data));
  } catch (error) {
    dispatch(failedGetingListingDetail());
  }
};
export const addListings = (formData) => async (dispatch) => {
  dispatch(startAddingListing());
  const config = {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/listings/add/`,
      formData,
      config
    );
    dispatch(doneAddingListing(res.data));
  } catch (error) {
    dispatch(failedAddingListing());
  }
};
export const editListings = (formData) => async (dispatch) => {
  dispatch(startAddingListing());
  const config = {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  // for (var key of formData.entries()) {
  //   console.log(key);
  // }
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/listings/add/`,
      formData,
      config
    );
    dispatch(doneAddingListing(res.data));
  } catch (error) {
    dispatch(failedAddingListing());
  }
};
export const deleteListings = (slug) => async (dispatch) => {
  // dispatch(startAddingListing());
  const config = {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/listings/add/?slug=${slug}`,
      config
    );
    dispatch(agentMyListings());
    // dispatch(doneAddingListing(res.data));
  } catch (error) {
    // dispatch(failedAddingListing());
  }
};
export const getDeveloperStats = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/listings/add/`,
        config
      );
    } catch (error) {}
  }
};
export const getLikedListings = () => async (dispatch) => {
  if (typeof window !== "undefined") {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    dispatch(startGettingLikedListings());
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/listings/favourites/`,
        config
      );
      dispatch(doneGettingLikedListings(res.data));
    } catch (error) {
      dispatch(failedGettingLikedListings());
    }
  }
};
export const deleteListingImage = (id, slug) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/listings/images/${id}/${slug}/`,
      config
    );
    toast.info(res.data.message);
  } catch (error) {
    dispatch(failedGettingLikedListings());
  }
};
export const addListingImagesAndPlans =
  (planChange, id, slug, formData) => async (dispatch) => {
    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    if (planChange) {
      dispatch(startChangingPlan());
    } else {
      dispatch(startAddingImages());
    }
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/listings/images/${id}/${slug}/`,
        formData,
        config
      );
      if (planChange) {
        dispatch(doneChangingPlan(res.data));
      } else {
        dispatch(doneAddingImages(res.data));
      }
      // toast.info(res.data.message)
    } catch (error) {
      if (planChange) {
        dispatch(failedChangingPlan());
      } else {
        dispatch(failedAddingImages());
      }
    }
  };
