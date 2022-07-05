import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE} from "next-redux-wrapper"

const initialState = {
  residentialListings: [],
  commercialListings: [],
  coWorkingListings: [],
  residentialHomeListings: [],
  commercialHomeListings: [],
  coWorkingHomeListings: [],
  landHomeListings: [],
  landListings: [],
  likedLandListings: [],
  likedResidentialListings: [],
  likedCommercialListings: [],
  loadingLiked: false,
  next: null,
  prev: null,   
  relatedListings: [],
  scheduleViewings: [],
  listingDetail: null,
  residentialLoading: false,
  addingImages: false,
  changingPlan: false,
  addingImagesMessage: null,
  changingPlanMessage: null,
  commercialLoading: false,
  commercialHomeLoading: false,
  coworkingLoading: false,
  landLoading: false,
  loading: false,
  addListingloading: false,
  listingAdded: false,
  liking: false,
  reporting: false,
  LikeMessage: null,
  addListingMessage: null,
  reportMessage: null,
};

export const listingSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    startGettingLikedListings: (state) => {
      state.loadingLiked = true;
      state.likedCommercialListings = [];
      state.likedLandListings = [];
      state.likedResidentialListings = [];
    },

    doneGettingLikedListings: (state, { payload }) => {
      state.loadingLiked = false;
      state.likedCommercialListings = payload.commercial;
      state.likedLandListings = payload.land;
      state.likedResidentialListings = payload.residential;
    },
    failedGettingLikedListings: (state) => {
      state.loadingLiked = false;
      state.likedCommercialListings = [];
      state.likedLandListings = [];
      state.likedResidentialListings = [];
    },
    startAddingListing: (state) => {
      state.addListingloading = true;
      state.listingAdded = false;
      state.addListingMessage = null;
    },
    doneGettingScheduledViewings: (state, { payload }) => {
      state.reporting = false;
      state.scheduleViewings = payload;
    },
    doneAddingListing: (state, { payload }) => {
      state.addListingloading = false;
      state.listingAdded = true;
      state.addListingMessage = payload.message;
    },
    failedAddingListing: (state) => {
      state.addListingloading = false;
      state.listingAdded = false;
      state.addListingMessage = "Error!Listing not added";
    },
    startLikingListing: (state) => {
      state.liking = true;
    },

    doneLikingListing: (state, { payload }) => {
      state.liking = false;
      state.LikeMessage = payload.message;
    },
    failedLikingListing: (state) => {
      state.liking = false;
    },

    startAddingImages: (state) => {
      state.addingImages = true;
      state.listingAdded = false;
      state.addingImagesMessage = null;
    },
    doneAddingImages: (state, { payload }) => {
      state.addingImages = false;
      state.listingAdded = true;
      state.addingImagesMessage = payload.message;
    },
    failedAddingImages: (state) => {
      state.addingImages = false;
      state.listingAdded = false;
      state.addingImagesMessage = null;
    },
    startChangingPlan: (state) => {
      state.changingPlan = true;
      state.listingAdded = false;
      state.changingPlanMessage = null;
    },

    doneChangingPlan: (state, { payload }) => {
      state.changingPlan = false;
      state.listingAdded = true;
      state.changingPlanMessage = payload.message;
    },
    failedChangingPlan: (state) => {
      state.changingPlan = false;
      state.listingAdded = false;
      state.changingPlanMessage = null;
    },

    startReportingListing: (state) => {
      state.reporting = true;
    },

    doneReportingListing: (state, { payload }) => {
      state.reporting = false;
      state.reportMessage = payload.message;
    },
    failedReportingListing: (state) => {
      state.reporting = false;
      state.reportMessage = null;
    },
    startGetingResidentialListing: (state) => {
      state.residentialLoading = true;
    },

    doneGetingResidentialListing: (state, { payload }) => {
      state.residentialLoading = false;
      state.residentialListings = payload.results.features;
      state.next = payload.next;
      state.prev = payload.previous;
    },
    failedGetingResidentialListing: (state) => {
      state.residentialLoading = false;
      state.residentialListings = [];
    },
    startGetingCoWorkingListing: (state) => {
      state.coworkingLoading = true;
    },

    doneGetingCoWorkingListing: (state, { payload }) => {
      state.coworkingLoading = false;
      state.coWorkingListings = payload.results.features;
    },
    failedGetingCoWorkingListing: (state) => {
      state.coworkingLoading = false;
      state.coWorkingListings = [];
    },
    startGetingListingDetail: (state) => {
      state.loading = true;
    },

    doneGetingListingDetail: (state, { payload }) => {
      state.loading = false;
      state.listingDetail = payload.single_listing;
      state.relatedListings = payload.related;
    },
    failedGetingListingDetail: (state) => {
      state.loading = false;
      state.listingDetail = null;
    },
    startGetingCommercialListing: (state) => {
      state.commercialLoading = true;
      state.commercialListings = [];
    },
    startGetingCommercialHomeListing: (state) => {
      state.commercialHomeLoading = true;
      state.commercialHomeListings = [];
    },
    doneGetingCommercialListing: (state, { payload }) => {
      state.commercialLoading = false;
      state.commercialListings = payload.results.features;
      state.next = payload.next;
      state.prev = payload.previous;
    },
    failedGetingCommercialListing: (state) => {
      state.commercialLoading = false;
      state.commercialListings = [];
    },
    failedGetingCommercialHomeListing: (state) => {
      state.commercialHomeLoading = false;
      state.commercialHomeListings = [];
    },

    startGetingLandListing: (state) => {
      state.landLoading = true;
    },
    doneGetingLandListing: (state, { payload }) => {
      state.landLoading = false;
      state.landListings = payload.results.features;
      state.next = payload.next;
      state.prev = payload.previous;
    },
    failedGetingLandListing: (state) => {
      state.landLoading = false;
      state.landListings = [];
    },

    doneGetingLandHomeListing: (state, { payload }) => {
      state.landLoading = false;
      state.landHomeListings = payload.results;
    },
    doneGetingResidentialHomeListing: (state, { payload }) => {
      state.residentialLoading = false;
      state.residentialHomeListings = payload.results;
    },
    doneGetingCoWorkingHomeListing: (state, { payload }) => {
      state.coworkingLoading = false;
      state.coWorkingHomeListings = payload.results;
    },
    doneGetingCommercialHomeListing: (state, { payload }) => {
      state.commercialHomeLoading = false;
      state.commercialHomeListings = payload.results;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      
      if(!action.payload.listings){
        return state
      }
      return{
        ...state,
        ...action.payload.listings
      }
      // state.landHomeListings = action.payload.listings.landHomeListings;
      // state.residentialHomeListings =
      //   action.payload.listings.residentialHomeListings;

    },
  },
});

export const {
  startGetingLandListing,
  startGetingCommercialListing,
  startAddingImages,
  startChangingPlan,
  startGetingCommercialHomeListing,
  startLikingListing,
  startAddingListing,
  startGettingLikedListings,
  startReportingListing,
  startGetingListingDetail,
  startGetingResidentialListing,
  doneGetingLandListing,
  startGetingCoWorkingListing,
  doneLikingListing,
  doneGetingCommercialListing,
  doneGetingListingDetail,
  doneGettingCom,
  doneAddingImages,
  doneChangingPlan,
  doneAddingListing,
  doneReportingListing,
  doneGetingCommercialHomeListing,
  doneGetingLandHomeListing,
  doneGettingScheduledViewings,
  doneGetingCoWorkingHomeListing,
  doneGetingResidentialListing,
  doneGettingLikedListings,
  doneGetingResidentialHomeListing,
  doneGetingCoWorkingListing,
  failedGetingLandListing,
  failedGettingLikedListings,
  failedGetingCommercialListing,
  failedGetingResidentialListing,
  failedLikingListing,
  failedAddingListing,
  failedAddingImages,
  failedChangingPlan,
  failedReportingListing,
  failedGetingCommercialHomeListing,
  failedGetingListingDetail,
  failedGetingCoWorkingListing,
} = listingSlice.actions;

export default listingSlice.reducer;
