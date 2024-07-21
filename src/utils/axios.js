import axios from "axios";
import { getUserFromLocalStorage } from "./localstorage";

import { clearStore } from "../Features/User/userslice";

const customFetch = axios.create({
  baseURL: "https://redux-toolkit-jobster-api-server.onrender.com/api/v1",
});

customFetch.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage();

  if (user) {
    config.headers["Authorization"] = `Bearer ${user.token} `;
  }

  return config;
});

export const checkForUnAuthorizedResponse = (error, thunkAPI) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore());
    return thunkAPI.rejectWithValue("unauthorized ! Logging out...");
  }
  thunkAPI.rejectWithValue(error.response.data.msg);
};

export default customFetch;
