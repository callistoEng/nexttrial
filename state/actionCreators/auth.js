import axios from "axios";
import { toast } from "react-toastify";
import { ECAuthApiRoot, ApiFree } from "../../utils/apiCall";
import {
  activatingSucess,
  activationFail,
  resetPassFail,
  resetPassStart,
  resetPassSucess,
  authencticatingSuccess,
  authenticatingFail,
  startRegistering,
  startRegisteringFail,
  startRegisteringSucess,
  startSigningIn,
  startSigningInFail,
  startSigningInSucess,
  logOut,
  submitingPreference,
  submitingPreferenceSuccess,
  submitingPreferenceFail,
  subscriptionSuccess,
  startActivating,
  loadUserFail,
  startGettingOverview,
  doneGettingOverview,
  failedGettingOverview,
  startGettingMyListingsData,
  doneGettingMyListingsData,
  failedGettingMyListingsData,
  loadUserSuccess,
  startDeleting,
  doneDeletingSucess,
  failedDeleting,
  startGettingPrefs,
  doneGettingPrefs,
  failedGettingPrefs,
  startGettingMyListingsAnalytics,
  doneGettingMyListingsAnalytics,
  failedGettingMyListingsAnalytics,
  startRequestingProp,
  doneRequestingProp,
  failedRequestingProp,
  startAddingTodo,
  doneAddingTodo,
  failedAddingTodo,
  failedEditingTodo,
  doneEditingTodo,
  startGettingTodos,
  doneGettingTodos,
  failedGettingTodoS,
  startGettingTodoGroups, 
  doneGettingTodosGroups,
  failedGettingTodoGroups,
  gotNewRefresh,
  doneGettingAll,
  failedGettingAllUsers,
} from "../estateSlices/authSlices";

export const getNewAccessToken = async () => {
  const refreshToken = localStorage.getItem("refresh");
  const body = JSON.stringify({ refresh: refreshToken });
  const newAccessToken = await ApiFree().post(`/auth/jwt/refresh/`, body);
  gotNewRefresh(newAccessToken);
  return newAccessToken;
};

export const checkAuthenticated = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ token: localStorage.getItem("access") });
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/auth/jwt/verify/`,
        body,
        config
      );
      if (res.statusText === "OK") {
        dispatch(authencticatingSuccess());
        dispatch(loadUsers());
      } else {
        dispatch(authenticatingFail());
      }
    } catch (err) {
      dispatch(authenticatingFail());
    }
  }
};

export const loadUsers = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/auth/users/me/`,
      config
    );
    dispatch(loadUserSuccess(res.data));
  } else {
    dispatch(loadUserFail());
  }
};
// export const loadUsers = () => async (dispatch) => {
//   try {
//     const res = await ECAuthApiRoot().get("/auth/users/me/");
//     dispatch(loadUserSuccess(res.data));
//     console.log('load suc', res.data)
//   } catch {
//     dispatch(loadUserFail());
//     console.log('load faile')
//   }
// };

export const getAllRegularUsers = () => async (dispatch) => {
  try {
    const res = await ECAuthApiRoot().get("/api/v2/users/all/");
    dispatch(doneGettingAll(res.data));
  } catch {
    dispatch(failedGettingAllUsers());
  }
};

export const login = (email, password) => async (dispatch) => {
  const config ={
    headers: {
      "Content-Type": "application/json",
    },
  }
  const body = JSON.stringify({ email, password });
  dispatch(startSigningIn());
  try {
    // const res = await ApiFree().post("/auth/jwt/create/", body); 
    const res = await axios.post(`${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/auth/jwt/create/`, body,config);
    dispatch(startSigningInSucess(res.data));
    dispatch(loadUsers());
    console.log('in suc')
  } catch (err) {
    dispatch(startSigningInFail());
    console.log('in fail ')
  }
};

export const userPreferences =
  (
    property_trend,
    market_economy,
    investment_property,
    infrustructure,
    is_land,
    tax_legal,
    is_building,
    is_opinion,
    is_sponsored,
    is_landProp,
    is_houses,
    is_commercial,
    is_sale,
    is_let,
    market_price_range,
    others,
    priceRange
  ) =>
  async (dispatch) => {
    const conf = {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    dispatch(submitingPreference());
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/users/preferences/`,
        {
          property_trend,
          market_economy,
          investment_property,
          infrustructure,
          is_land,
          tax_legal,
          is_building,
          is_opinion,
          is_sponsored,
          is_landProp,
          is_houses,
          is_commercial,
          is_sale,
          is_let,
          market_price_range,
          others,
          priceRange,
        },
        conf
      );
      dispatch(submitingPreferenceSuccess());
    } catch (err) {
      dispatch(submitingPreferenceFail());
    }
  };

export const updateUserPreferences =
  (
    property_trend,
    market_economy,
    investment_property,
    infrustructure,
    is_land,
    tax_legal,
    is_building,
    is_opinion,
    is_sponsored,
    is_landProp,
    is_houses,
    is_commercial,
    is_sale,
    is_let,
    others,
    priceRange,
    offPlan,
    flipingDeals,
    jv,
    forDev,
    incompleteBuildings,
    instProperties,
    distressed,
    quickSale
  ) =>
  async (dispatch) => {
    const conf = {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    dispatch(submitingPreference());
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/users/preferences/`,
        {
          property_trend,
          market_economy,
          investment_property,
          infrustructure,
          is_land,
          tax_legal,
          is_building,
          is_opinion,
          is_sponsored,
          is_landProp,
          is_houses,
          is_commercial,
          is_sale,
          is_let,
          others,
          priceRange,
          offPlan,
          flipingDeals,
          jv,
          forDev,
          incompleteBuildings,
          instProperties,
          distressed,
          quickSale,
        },
        conf
      );
      dispatch(getUserPreferences());
      dispatch(submitingPreferenceSuccess());
    } catch (err) {
      dispatch(submitingPreferenceFail());
    }
  };
export const addUserPreferences =
  (
    property_trend,
    market_economy,
    investment_property,
    infrustructure,
    is_land,
    tax_legal,
    is_building,
    is_opinion,
    is_sponsored,
    is_landProp,
    is_houses,
    user,
    is_commercial,
    is_sale,
    is_let,
    others,
    priceRange,
    offPlan,
    flipingDeals,
    jv,
    forDev,
    incompleteBuildings,
    instProperties,
    distressed,
    quickSale
  ) =>
  async (dispatch) => {
    const conf = {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    dispatch(submitingPreference());
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/users/preferences/`,
        {
          property_trend,
          market_economy,
          investment_property,
          infrustructure,
          is_land,
          tax_legal,
          is_building,
          is_opinion,
          is_sponsored,
          is_landProp,
          is_houses,
          user,
          is_commercial,
          is_sale,
          is_let,
          others,
          priceRange,
          offPlan,
          flipingDeals,
          jv,
          forDev,
          incompleteBuildings,
          instProperties,
          distressed,
          quickSale,
        },
        conf
      );
      dispatch(getUserPreferences());
      dispatch(submitingPreferenceSuccess());
    } catch (err) {
      dispatch(submitingPreferenceFail());
    }
  };
export const getUserPreferences = () => async (dispatch) => {
  if(typeof window !== "undefined"){

    const conf = {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    dispatch(startGettingPrefs());
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/users/preferences/`,
        conf
      );
      dispatch(doneGettingPrefs(res.data));
    } catch (err) {
      dispatch(failedGettingPrefs());
    }
  }
};

export const register =
  (
    location,
    locality,
    user_name,
    about_me,
    content_creator_name,
    agency_name,
    country,
    is_agent,
    is_investor,
    is_regular,
    is_content_creator,
    mobile_phone,
    email,
    password,
    re_password
  ) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      location,
      locality,
      user_name,
      about_me,
      content_creator_name,
      agency_name,
      country,
      is_agent,
      is_investor,
      is_regular,
      is_content_creator,
      mobile_phone,
      email,
      password,
      re_password,
    });
    dispatch(startRegistering());
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/auth/users/`,
        body,
        config
      );
      dispatch(startRegisteringSucess());
    } catch (err) {
      dispatch(startRegisteringFail());
      toast.error("Registration failed!", { autoClose: false });
    }
  };

export const updateUser =
  (
    location,
    locality,
    user_name,
    about_me,
    content_creator_name,
    agency_name,
    country,
    is_agent,
    is_investor,
    is_regular,
    is_content_creator,
    mobile_phone
  ) =>
  async (dispatch) => {
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `JWT ${localStorage.getItem("access")}`,
    //   },
    // };

    const body = JSON.stringify({
      location,
      locality,
      user_name,
      about_me,
      content_creator_name,
      agency_name,
      country,
      is_agent,
      is_investor,
      is_regular,
      is_content_creator,
      mobile_phone,
    });
    dispatch(startRegistering());
    try {
      await ECAuthApiRoot().patch("/auth/users/me/", body);
      // await axios.patch(
      //   `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/auth/users/me/`,
      //   body,
      //   config
      // );
      dispatch(startRegisteringSucess());

      toast.success("Profile updated successfully", { autoClose: false });
    } catch (err) {
      dispatch(startRegisteringFail());
      toast.error("Profile update failed!", { autoClose: false });
    }
  };
export const deleteUserAccount = (current_password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };

  const body = JSON.stringify({
    current_password,
  });
  dispatch(startDeleting());
  try {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/auth/users/me/`,
      body,
      config
    );
    dispatch(doneDeletingSucess());
    toast.success("Deleted Successfully", { autoClose: false });
    dispatch(checkAuthenticated());
  } catch (err) {
    dispatch(failedDeleting());
    toast.error("Account deletion failed!", { autoClose: false });
  }
};
export const activateAccount = (uid, token) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ uid, token });
  dispatch(startActivating());
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/auth/users/activation/`,
      body,
      config
    );

    dispatch(activatingSucess());
    toast.success(
      "Your account was activated successfully. You can now now login."
    );
  } catch (err) {
    dispatch(activationFail());
    toast.error("Account activation failed");
  }
};
export const reset_password = (email) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email });
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/auth/users/reset_password/`,
      body,
      config
    );

    dispatch(resetPassSucess());
    toast.success("Your account password reset request was successful");
  } catch (err) {
    dispatch(resetPassFail());
    toast.error("The request failed.");
  }
};
export const reset_password_confirm =
  (uid, token, new_password, re_new_password) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });
    dispatch(resetPassStart());
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/auth/users/reset_password_confirm/`,
        body,
        config
      );

      dispatch(resetPassSucess());
      toast.error("Your account password was reset successfully");
    } catch (err) {
      dispatch(resetPassFail());
      toast.error("Your account password was not reset");
    }
  };
export const reset_email = (email) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email });

  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/auth/users/reset_email/`,
      body,
      config
    );

    dispatch(resetPassSucess());
  } catch (err) {
    dispatch(resetPassFail());
  }
};

export const reset_email_confirm =
  (uid, token, new_email, re_new_email) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ uid, token, new_email, re_new_email });

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/auth/users/reset_email_confirm/`,
        body,
        config
      );

      dispatch(resetPassSucess());
      toast.error("Your account email was reset successfully");
    } catch (err) {
      dispatch(resetPassFail());
      toast.error("Your account email failed to reset");
    }
  };

export const reset_phone = (mobile_phone) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };
  const body = JSON.stringify({ mobile_phone });

  try {
    await axios.patch(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/auth/users/me/`,
      body,
      config
    );

    dispatch(resetPassSucess());
    toast.success("Your account email reset request was successful");
  } catch (err) {
    dispatch(resetPassFail());
    toast.error("The request failed.");
  }
};

export const logout = () => async (dispatch) => {
  dispatch(logOut());
};
export const userSubscribe = (email) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/users/subscribe/`,
        { email },
        config
      );
      dispatch(subscriptionSuccess(res.data));
    } catch (err) {
      dispatch(resetPassFail());
    }
  } else {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/users/subscribe/`,
        { email }
      );
      dispatch(subscriptionSuccess(res.data));
    } catch (err) {
      dispatch(resetPassFail());
    }
  }
};

export const agentOverview = () => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  dispatch(startGettingOverview());
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/users/overview/`,
      config
    );
    dispatch(doneGettingOverview(res.data));
  } catch (err) {
    dispatch(failedGettingOverview());
  }
};

export const agentGetTodos = (groupName) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  dispatch(startGettingTodos());
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/tasks/?group_name=${groupName}`,
      config
    );
    dispatch(doneGettingTodos(res.data));
  } catch (err) {
    dispatch(failedGettingTodoS());
  }
};
export const agentGetTodosGroup = () => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  dispatch(startGettingTodoGroups());
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/tasks/add-todo-group/`,
      config
    );
    dispatch(doneGettingTodosGroups(res.data));
  } catch (err) {
    dispatch(failedGettingTodoGroups());
  }
};
export const agentAddTodoGroup = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  dispatch(startAddingTodo());
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/tasks/add-todo-group/`,
      formData,
      config
    );
    dispatch(doneAddingTodo());
    dispatch(agentGetTodosGroup());
  } catch (err) {
    dispatch(failedAddingTodo());
  }
};
export const agentAddTodo = (formData, taskGroupName) => async (dispatch) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  dispatch(startAddingTodo());
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/tasks/`,
      formData,
      config
    );
    dispatch(doneAddingTodo());
    dispatch(agentGetTodos(taskGroupName));
  } catch (err) {
    dispatch(failedAddingTodo());
  }
};
export const agentManageTodos =
  (todoId, method, todosGroup) => async (dispatch) => {
    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    dispatch(startAddingTodo());
    try {
      if (method === "patch") {
        await axios.patch(
          `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/tasks/?grp_name=${todosGroup}`,
          todoId,
          config
        );
        dispatch(doneEditingTodo());
        dispatch(agentGetTodos(todosGroup));
      } else if (method === "delete") {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/tasks/?task_id=${todoId}`,
          config
        );
        dispatch(doneEditingTodo());
        dispatch(agentGetTodos(todosGroup));
      } else toast.warn("unknown method");
    } catch (err) {
      dispatch(failedEditingTodo());
    }
  };

export const agentMyListings = () => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  dispatch(startGettingMyListingsData());
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/users/mylistings/`,
      config
    );
    dispatch(doneGettingMyListingsData(res.data));
  } catch (err) {
    dispatch(failedGettingMyListingsData());
  }
};

export const agentAnalytics = () => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  dispatch(startGettingMyListingsAnalytics());
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/users/analytics/`,
      config
    );
    dispatch(doneGettingMyListingsAnalytics(res.data));
  } catch (err) {
    dispatch(failedGettingMyListingsAnalytics());
  }
};

export const userRequestProperty = (formdata) => async (dispatch) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  dispatch(startRequestingProp());
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/users/property-request/`,
      formdata,
      config
    );
    dispatch(doneRequestingProp(res.data));
  } catch (err) {
    dispatch(failedRequestingProp());
  }
};
export const userFeedback = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  dispatch(startRequestingProp());
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/users/feedback/`,
      formData,
      config
    );
    dispatch(doneRequestingProp(res.data));
  } catch (err) {
    dispatch(failedRequestingProp());
  }
};
