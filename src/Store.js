import { configureStore } from "@reduxjs/toolkit";
import userslice from "./Features/User/userslice";
import jobSlice from "./Features/job/jobSlice";
import AllJobsSlice from "./Features/AllJobs/AllJobsSlice";

const store = configureStore({
  reducer: {
    user: userslice,
    job: jobSlice,
    alljobs: AllJobsSlice,
  },
});

export default store;
