import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE} from "next-redux-wrapper"

function access() {
  if (typeof window !== "undefined") {
    const access = localStorage.getItem("access");
    return access;
  }
  return null;
}
function refresh() {
  if (typeof window !== "undefined") {
    const refresh = localStorage.getItem("refresh");
    return refresh;
  }
  return null;
}

const initialState = {
  access: access(),
  refresh: refresh(),
  isAuthenticated: false,
  isRegistered: false,
  isActivated: false,
  activating: false,
  isSubmitingPreference: false,
  user: null,
  loginerror: null,
  registering: false,
  deleting: false,
  registeringSuccess: false,
  registration_fail: false,
  logingIn: false,
  gettingTodos: false,
  todosGroups: [],
  todos: [],
  requestingProperty: null,
  loadinRequest: false,
  loadOverview: false,
  overviewData: null,
  loadMyListings: false,
  myListingsData: null,
  myAnalytics: null,
  subscriptionMessages: "",
  loadingPreferences: null,
  userPreferences: null,
  messages: null,
  agentContact: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startSigningIn: (state) => {
      state.logingIn = true;
      state.loginerror = false;
      state.isAuthenticated = false; 
    },
    startGettingTodos: (state) => {
      state.gettingTodos = true;
      state.todos = [];
    },
    doneGettingTodos: (state, { payload }) => {
      state.gettingTodos = false;
      state.todos = payload;
    },  
    failedGettingTodoS: (state) => {
      state.gettingTodos = false;
      state.todos = [];
    },
    startAddingTodo: (state) => {
      state.addingTodo = true;
    },
    doneAddingTodo: (state) => {
      state.addingTodo = false;
    },
    doneEditingTodo: (state) => {
      state.addingTodo = false;
    },
    failedEditingTodo: (state) => {
      state.addingTodo = false;
    },
    doneGettingAll: (state, { payload }) => {
      state.allUsers = payload.users;
      state.allSubscriberUsers = payload.subscribers;
    },
    failedGettingAllUsers: (state) => {
      state.allUsers = [];
      state.allSubscriberUsers = [];
    },
    failedAddingTodo: (state) => {
      state.addingTodo = false;
      state.todos = [];
    },
    gotNewRefresh: (state, { payload }) => {
      if (typeof window !== "undefined") {
      state.access = payload.data.access;
      }
    },
    startSigningInSucess: (state) => {
      state.isAuthenticated = true;
      state.logingIn = false;
      state.loginerror = false;
    },
    startSigningInFail: (state) => {
      state.isAuthenticated = false;
      state.logingIn = false;
      state.loginerror = true;
    },
    startDeleting: (state) => {
      state.deleting = true;
    },
    doneDeletingSucess: (state) => {
      state.isAuthenticated = false;
      state.deleting = false;
    },
    failedDeleting: (state) => {
      state.isAuthenticated = false;
      state.deleting = false;
    },

    startGettingPrefs: (state) => {
      state.loadingPreferences = true;
    },
    doneGettingPrefs: (state, { payload }) => {
      state.userPreferences = payload.user_preferences;
      state.loadingPreferences = false;
    },
    failedGettingPrefs: (state) => {
      state.userPreferences = null;
      state.loadingPreferences = false;
    },
    doneGettingAgentContact: (state, { payload }) => {
      state.agentContact = payload;
    },
    failedGettingAgentContact: (state) => {
      state.agentContact = null;
    },
    authencticatingSuccess: (state) => {
      state.isAuthenticated = true;
    },
    startGettingTodoGroups: (state) => {
      state.gettingTodos = true;
      state.todosGroups = [];
    },
    doneGettingTodosGroups: (state, { payload }) => {
      state.gettingTodos = false;
      state.todosGroups = payload;
    },
    failedGettingTodoGroups: (state) => {
      state.gettingTodosGroups = false;
      state.todosGroups = [];
    },
    subscriptionSuccess: (state, { payload }) => {
      state.subscriptionMessages = payload.message;
    },
    subscriptionFail: (state) => {
      state.subscriptionMessages = "";
    },
    authenticatingFail: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = false;
    },
    submitingPreference: (state) => {
      state.isSubmitingPreference = true;
    },
    submitingPreferenceFail: (state) => {
      state.isSubmitingPreference = false;
    },
    submitingPreferenceSuccess: (state) => {
      state.isSubmitingPreference = false;
    },
    startRegistering: (state) => {
      state.registering = true;
      state.registeringSuccess = false;
      state.messages = null;
    },
    startRegisteringSucess: (state) => {
      state.registering = false;
      state.registeringSuccess = true;
      state.messages =
        "User registered successfully. Check your email to activate your account";
    },
    startRegisteringFail: (state) => {
      state.registering = false;
      state.registeringSuccess = false;
      state.messages = "Registration failed";
    },
    startGettingOverview: (state) => {
      state.loadOverview = true;
      state.overviewData = null;
    },
    doneGettingOverview: (state, { payload }) => {
      state.loadOverview = false;
      state.overviewData = payload;
    },
    failedGettingOverview: (state) => {
      state.loadOverview = true;
      state.overviewData = null;
    },
    startGettingMyListingsData: (state) => {
      state.loadMyListings = true;
      state.myListingsData = null;
    },
    doneGettingMyListingsData: (state, { payload }) => {
      state.loadMyListings = false;
      state.myListingsData = payload;
    },
    failedGettingMyListingsData: (state) => {
      state.loadMyListings = false;
      state.myListingsData = null;
    },
    startGettingMyListingsAnalytics: (state) => {
      state.myAnalytics = null;
    },
    doneGettingMyListingsAnalytics: (state, { payload }) => {
      state.myAnalytics = payload;
    },
    failedGettingMyListingsAnalytics: (state) => {
      state.myAnalytics = null;
    },
    startRequestingProp: (state) => {
      state.requestingProperty = false;
      state.loadinRequest = true;
    },
    doneRequestingProp: (state) => {
      state.requestingProperty = true;
      state.loadinRequest = false;
    },
    failedRequestingProp: (state) => {
      state.requestingProperty = false;
      state.loadinRequest = false;
    },

    startActivating: (state) => {
      state.isAuthenticated = false;
      state.activating = true;
    },
    activatingSucess: (state) => {
      state.isAuthenticated = false;
      state.activating = false;
      state.isActivated = true;
    },
    logOut: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = false;
    },
    activationFail: (state) => {
      localStorage.removeItem("access");
      state.activating = false;
      state.isActivated = false;
    },
    resetPassStart: (state) => {
      state.isAuthenticated = false;
      state.isActivated = false;
      state.error = null;
    },
    resetPassSucess: (state) => {
      state.isAuthenticated = false;
      state.isActivated = false;
      state.error = false;
    },
    resetPassFail: (state) => {
      state.isAuthenticated = false;
      state.isActivated = false;
      state.error = true;
    },
    loadUserSuccess: (state, { payload }) => {
      state.user = payload;
      state.isActivated = true;
    },
    loadUserFail: (state) => {
      state.error = true;
      state.user = null;
      state.isActivated = false;
    },

    doneCheckAuthenticated: (state, action) => {
      state.messages = action.payload.message;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (!action.payload.auth) {
        return state;
      }
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});
export const {
  startRegistering,
  startGettingMyListingsAnalytics,
  startDeleting,
  startGettingTodos,
  startAddingTodo,
  startGettingPrefs,
  submitingPreference,
  startRegisteringSucess,
  startRequestingProp,
  startActivating,
  failedEditingTodo,
  submitingPreferenceSuccess,
  subscriptionSuccess,
  startRegisteringFail,
  activatingSucess,
  gotNewRefresh,
  activationFail,
  subscriptionFail,
  resetPassSucess,
  doneAddingTodo,
  doneEditingTodo,
  doneDeletingSucess,
  doneGettingTodosGroups,
  doneGettingTodos,
  doneGettingAll,
  doneGettingMyListingsAnalytics,
  doneGettingAgentContact,
  doneRequestingProp,
  resetPassFail,
  startSigningIn,
  startSigningInFail,
  startSigningInSucess,
  startGettingTodoGroups,
  startGettingMyListingsData,
  startGettingOverview,
  authenticatingFail,
  submitingPreferenceFail,
  authencticatingSuccess,
  resetPassStart,
  logOut,
  loadUserSuccess,
  loadUserFail,
  failedGettingOverview,
  failedGettingAllUsers,
  failedGettingMyListingsAnalytics,
  failedGettingMyListingsData,
  failedDeleting,
  failedGettingTodoGroups, 
  failedGettingTodoS, 
  failedAddingTodo,
  failedRequestingProp,
  failedGettingAgentContact,
  failedGettingPrefs,
  doneGettingPrefs,
  doneGettingOverview,
  doneGettingMyListingsData,
} = authSlice.actions;
export default authSlice.reducer;
