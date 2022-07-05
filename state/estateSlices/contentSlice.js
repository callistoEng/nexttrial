import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE} from "next-redux-wrapper"

const initialState = {
  videos: [],
  latestUpdate: [],
  hotTopics: [],
  popularPosts: [],
  contentList: [],
  contentByCategory: [],
  singleContent: null,
  myPostNext: null,
  myPostPrev: null,
  featuredPosts: [],
  myPostsNoThumbs:[],
  myPosts: [],
  randomPosts:[],
  loadingRandom:null,
  contentCategories: [],
  postToEdit: null,
  videosLoading: false,
  hotLoading: false,
  deletingPost: false,
  deletedPostMsg: null,
  loading: false,
  redirect: false,
  contentListLoading: false,
  featuredLoading: false,
  message: null,
  postAdded: false,
  latestLoading: false,
};
export const contentSlice = createSlice({
  name: "contents",
  initialState,
  reducers: {
    startGettingVideos: (state) => {
      state.loading = true;
    },
    startGettingRandomPosts: (state) => {
      state.loadingRandom = true;
    },
    startGettingMyPostsNoThumbs: (state) => {
      state.loading = true;
      state.myPostsNoThumbs = [];
    },
    doneGettingMyPostsNoThumbs: (state, { payload }) => {
      state.loading = false;
      state.myPostsNoThumbs = payload.results;
      state.myPostNext = payload.next;
      state.myPostPrev = payload.previous;
    },
    failedGettingMyPostsNoThumbs: (state) => {
      state.loading = false;
      state.myPostsNoThumbs = [];
    },
    doneGettingVideos: (state, { payload }) => {
      state.loadingRandom = false;
      state.videos = payload.results;
    },
    doneGettingRandomPosts: (state, { payload }) => {
      state.loadingRandom = false;
      state.randomPosts = payload.results;
    },
    doneGettingSingleContent: (state, { payload }) => {
      state.loading = false;
      state.singleContent = payload;
    },
    doneGettingPostToEdit: (state, { payload }) => {
      state.loading = false;
      state.postToEdit = payload;
    },

    startAddingPost: (state) => {
      state.loading = true;
      state.message = null;
      state.postAdded = false;
    },
    doneAddingPost: (state, { payload }) => {
      state.loading = false;
      state.postAdded = true;
      state.message = payload.message;
    },
    failedAddingPost: (state) => {
      state.loading = false;
      state.message = null;
      state.postAdded = false;
    },
    failedGettingRandomPosts: (state) => {
      state.loading = false;
      state.randomPosts = [];
    },
    startDeletingMyPost: (state) => {
      state.deletingPost = true;
      state.deletedPostMsg = null;
    },
    doneDeletingMyPost: (state, { payload }) => {
      state.deletingPost = false;
      state.deletedPostMsg = payload.message;
    },
    failedDeletingMyPost: (state) => {
      state.deletingPost = false;
      state.deletedPostMsg = null;
    },
    doneGettingCategories: (state, { payload }) => {
      state.contentCategories = payload;
    },
    failedGettingCategories: (state) => {
      state.contentCategories = null;
    },

    startEditingPost: (state) => {
      state.loading = true;
      state.redirect = false
    },
    doneEditingPost: (state) => {
      state.loading = false;
      state.redirect = true
    },
    failedEditingPost: (state) => {
      state.loading = false;
      state.postToEdit = null;
      state.redirect = false
    },
    startGettingMyPosts: (state) => {
      state.loading = true;
      state.myPosts = [];
    },
    doneGettingMyPosts: (state, { payload }) => {
      state.loading = false;
      state.myPosts = payload.results;
      state.myPostNext= payload.next;
      state.myPostPrev= payload.previous;
    },
    failedGettingMyPosts: (state) => {
      state.loading = false;
      state.myPosts = [];
    },
    failedGettingVideos: (state) => {
      state.loading = false;
      state.singleContent = null;
      state.postToEdit = null;
      state.videos = [];
    },
    startGettingFeatured: (state) => {
      state.featuredLoading = true;
    },
    doneGettingFeatured: (state, { payload }) => {
      state.featuredPosts = payload.results;
    },
    failedGettingFeatured: (state) => {
      state.featuredLoading = false;
    },
    startContentList: (state) => {
      state.contentListLoading = true;
    },
    doneContentList: (state, { payload }) => {
      state.contentList = payload.results;
    },
    failedContentList: (state) => {
      state.contentListLoading = false;
      state.contentList = [];
    },
    startContentByCategory: (state) => {
      state.contentListLoading = true;
      state.contentByCategory = [];
    },
    doneContentByCategory: (state, { payload }) => {
      state.contentListLoading = true;
      state.contentByCategory = payload.results;
      state.myPostNext= payload.next;
      state.myPostPrev= payload.previous;
    },
    failedContentByCategory: (state) => {
      state.contentListLoading = false;
      state.contentByCategory = [];
    },
    startGettingLatest: (state) => {
      state.latestLoading = true;
      state.latestUpdate = [];
    },
    doneGettingLatest: (state, { payload }) => {
      state.latestLoading = false;
      state.latestUpdate = payload.results;
    },
    startGettingPopularPosts: (state) => {
      state.popularLoading = true;
      state.popularPosts =[];
    },
    doneGettingPopularPosts: (state, { payload }) => {
      state.popularLoading = false;
      state.popularPosts = payload.results;
    },
    failedGettingPopular: (state) => {
      state.popularLoading = false;
      state.popularPosts = []
    },
    failedGettingLatest: (state) => {
      state.latestLoading = false;
      state.latestUpdate = []
    },
    startGettingHotTopics: (state) => {
      state.hotLoading = true;
    },
    doneGettingHotTopics: (state, { payload }) => {
      state.hotLoading = false;
      state.hotTopics = payload.results;
    },
    failedGettingHotTopics: (state) => {
      state.hotLoading = false;
    },
    startRegisteringSucess: (state) => {},

    doneCheckAuthenticated: (state, action) => {},
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (!action.payload.contents) {
        return state;
      }
      return {
        ...state,
        ...action.payload.contents,
      };
    },
  },
});

export const {
  startGettingVideos,
  startGettingHotTopics,
  startContentList,
  startEditingPost,
  startGettingMyPosts,
  startGettingRandomPosts, 
  startGettingMyPostsNoThumbs,
  startAddingPost,
  startDeletingMyPost,
  startGettingPopularPosts,
  startContentByCategory,
  startGettingLatestUpdates,
  startGettingFeatured,
  startGettingLatest,
  doneGettingHotTopics,
  doneGettingVideos,
  doneGettingMyPosts,
  doneGettingLatest,
  doneGettingRandomPosts,
  doneEditingPost,
  doneDeletingMyPost,
  doneGettingCategories,
  doneAddingPost,
  doneContentList,
  doneContentByCategory,
  doneGettingPostToEdit,
  doneGettingMyPostsNoThumbs,
  doneGettingPopularPosts,
  doneGettingFeatured,
  doneGettingSingleContent,
  failedGettingHotTopics,
  failedGettingVideos,
  failedGettingMyPosts,
  failedGettingPopular,
  failedDeletingMyPost,
  failedContentList,
  failedGettingRandomPosts, 
  failedAddingPost,
  failedGettingCategories,
  failedEditingPost,
  failedContentByCategory,
  failedGettingFeatured,  
  failedGettingMyPostsNoThumbs,
  failedGettingLatest,
} = contentSlice.actions;

export default contentSlice.reducer;
