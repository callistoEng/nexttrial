import axios from "axios";
import { ApiFree } from "../../utils/apiCall";
import {
  doneGettingFeatured,
  doneGettingVideos,
  doneGettingSingleContent,
  failedGettingLatest,
  failedGettingFeatured,
  failedGettingVideos,
  startGettingFeatured,
  startGettingVideos,
  doneGettingPopularPosts,
  startContentList,
  doneContentList,
  failedContentList,
  startContentByCategory,
  doneContentByCategory,
  failedContentByCategory,
  startAddingPost,
  doneAddingPost,
  failedAddingPost,
  startGettingMyPosts,
  doneGettingMyPosts,
  failedGettingMyPosts,
  startEditingPost,
  doneEditingPost,
  failedEditingPost,
  doneGettingPostToEdit,
  failedGettingCategories,
  doneGettingCategories,
  startGettingLatest,
  startGettingPopularPosts,
  failedGettingPopular,
  doneGettingLatest,
  startDeletingMyPost,
  doneDeletingMyPost,
  failedDeletingMyPost,
  startGettingRandomPosts,
  doneGettingRandomPosts,
  failedGettingRandomPosts,
  startGettingMyPostsNoThumbs,
  doneGettingMyPostsNoThumbs,
  failedGettingMyPostsNoThumbs,
} from "../estateSlices/contentSlice";
 
export const getVideos = () => async (dispatch) => {
  dispatch(startGettingVideos());
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/contents/videos/`
    );
    dispatch(doneGettingVideos(res.data));
  } catch (error) {
    dispatch(failedGettingVideos());
  }
};
export const getContentCategories = () => async (dispatch) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/contents/content-categories/`
    );
    dispatch(doneGettingCategories(res.data.results));
  } catch (error) {
    dispatch(failedGettingCategories());
  }
};
export const getContentDetail = (slug) => async (dispatch) => {
  dispatch(startGettingVideos());
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/contents/detail/${slug}/`
    );
    dispatch(doneGettingSingleContent(res.data));
  } catch (error) {
    dispatch(failedGettingVideos());
  }
};

export const getContentList = (query) => async (dispatch) => {
  dispatch(startContentList());
  try {
    const res = await ApiFree().get(
      "/api/v2/contents/"+query
    );
    dispatch(doneContentList(res.data));
  } catch (error) {
    dispatch(failedContentList());
  }
};

export const getContentByCategory = (slug) => async (dispatch) => {
  dispatch(startContentByCategory());
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/contents/category/${slug}/`
    );
    dispatch(doneContentByCategory(res.data));
    
  } catch (error) {
    dispatch(failedContentByCategory());
  }
};
export const getPostsNextPrevPage = (postNextPrev) => async (dispatch) => {
  dispatch(startContentByCategory());
  try {
    const res = await axios.get(postNextPrev);
    dispatch(doneContentByCategory(res.data));
  } catch (error) {
    dispatch(failedContentByCategory());
  }
};

export const getPopularPosts = () => async (dispatch) => {
  dispatch(startGettingPopularPosts());
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/contents/popular/`
    );
    dispatch(doneGettingPopularPosts(res.data));
  } catch (error) {
    dispatch(failedGettingPopular());
  }
};
export const getRandomPosts = () => async (dispatch) => {
  dispatch(startGettingRandomPosts());
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/contents/sampled-news/`
    );
    dispatch(doneGettingRandomPosts(res.data));
  } catch (error) {
    dispatch(failedGettingRandomPosts());
  }
};
export const getLatestPosts = () => async (dispatch) => {
  dispatch(startGettingLatest());
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/contents/latest/`
    );
    dispatch(doneGettingLatest(res.data));
  } catch (error) {
    dispatch(failedGettingLatest());
  }
};

export const getFeaturedPosts = () => async (dispatch) => {
  dispatch(startGettingFeatured());
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/contents/featured/`
    );
    dispatch(doneGettingFeatured(res.data));
  } catch (error) {
    dispatch(failedGettingFeatured());
  }
};
export const getMyPostsNoThumbs = (currentPage) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  dispatch(startGettingMyPostsNoThumbs());
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_DJANGO_SEMIBASE_URL}/api/v2/contents/no-thumbs/?page=${currentPage}`,
      config
    );
    dispatch(doneGettingMyPostsNoThumbs(res.data));
  } catch (error) {
    dispatch(failedGettingMyPostsNoThumbs());
  }
};
export const getMyPosts = (currentPage, query) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  dispatch(startGettingMyPosts());
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/contents/my-posts/?page=${currentPage}&search=${query}`,
      config
    );
    dispatch(doneGettingMyPosts(res.data));
  } catch (error) {
    dispatch(failedGettingMyPosts());
  }
};
export const deleteMyPosts = (slug, currentPage, query) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  dispatch(startDeletingMyPost());
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/contents/my-posts/`,
      { slug },
      config
    );
    dispatch(doneDeletingMyPost(res.data));
    dispatch(getMyPosts(currentPage, query));
  } catch (error) {
    dispatch(failedDeletingMyPost());
  }
};
export const getMyPostsNextPrevPage = (myPostNext) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  dispatch(startGettingMyPosts());
  try {
    const res = await axios.get(myPostNext, config);
    dispatch(doneGettingMyPosts(res.data));
  } catch (error) {
    dispatch(failedGettingMyPosts());
  }
};

export const addPosts = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  dispatch(startAddingPost());
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/contents/add-content/`,
      formData,
      config
    );
    dispatch(doneAddingPost(res.data));
  } catch (error) {
    dispatch(failedAddingPost());
  }
};

export const editPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  dispatch(startEditingPost());
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/contents/add-content/`,
      formData,
      config
    );
    dispatch(doneEditingPost(res.data));
  } catch (error) {
    dispatch(failedEditingPost());
  }
};
export const getPostEdit = (slug) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  dispatch(startGettingVideos());
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/contents/edit/${slug}/`,
      config
    );
    dispatch(doneGettingPostToEdit(res.data));
  } catch (error) {
    dispatch(failedGettingVideos());
  }
};
