import { toast } from "react-toastify";
import customFetch, { checkForUnAuthorizedResponse } from "../../utils/axios";

import { logoutUser } from "../User/userslice";
import { showLoading, hideLoading, getAlljobs } from "../AllJobs/AllJobsSlice";
import { clearValues } from "./jobSlice";

export const createJobThunk = async (job, thunkAPI) => {
  try {
    const resp = await customFetch.post("/jobs", job);
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return checkForUnAuthorizedResponse(error, thunkAPI);
  }
};
export const deletejobThunk = async (jobId, thunkAPI) => {
  console.log(jobId);
  thunkAPI.dispatch(showLoading());

  try {
    const resp = await customFetch.delete(`/jobs/${jobId}`);
    thunkAPI.dispatch(getAlljobs());
    console.log(resp);
    toast.success("job deleted");
    return resp.data.msg;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    return checkForUnAuthorizedResponse(error, thunkAPI);
  }
};

export const editJobthunk = async ({ jobId, job }, thunkAPI) => {
  console.log(jobId, job);
  try {
    const resp = await customFetch.patch(`/jobs/${jobId}`, job);
    console.log(resp);
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return checkForUnAuthorizedResponse(error, thunkAPI);
  }
};
