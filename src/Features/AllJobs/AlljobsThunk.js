import customFetch, { checkForUnAuthorizedResponse } from "../../utils/axios";

export const getAllJobsThunk = async (_, thunkAPI) => {
  const { page, search, searchStatus, searchType, sort } =
    thunkAPI.getState().alljobs;

  let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
  if (search) {
    url = url + `&search=${search}`;
  }
  try {
    const resp = await customFetch.get(url);
    // console.log(resp);
    return resp.data;
  } catch (error) {
    return checkForUnAuthorizedResponse(error, thunkAPI);
  }
};

export const showStatsThunk = async (_, thunkAPI) => {
  try {
    const resp = await customFetch("/jobs/stats");
    // console.log(resp.data);
    return resp.data;
  } catch (error) {
    return checkForUnAuthorizedResponse(error, thunkAPI);
  }
};
