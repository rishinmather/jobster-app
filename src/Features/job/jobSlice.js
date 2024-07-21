import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import { getUserFromLocalStorage } from "../../utils/localstorage";
import { logoutUser } from "../User/userslice";
import { showLoading, hideLoading, getAlljobs } from "../AllJobs/AllJobsSlice";
import { createJobThunk, editJobthunk, deletejobThunk } from "./jobThunk";
const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};

export const createJob = createAsyncThunk("job/createJob", createJobThunk);

export const deleteJob = createAsyncThunk("job/deleteJob", deletejobThunk);

export const editJobs = createAsyncThunk("job/editJobs", editJobthunk);

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleCHange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || "",
      };
    },
    editJob: (state, action) => {
      return { ...state, isEditing: true, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success("Job Created");
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        toast.success(action.payload);
      })
      .addCase(deleteJob.rejected, (state, action) => {
        toast.error(action.payload);
      })
      .addCase(editJobs.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(editJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success("Job Modified");
      })
      .addCase(editJobs.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      });
  },
});

export const { handleCHange, clearValues, editJob } = jobSlice.actions;

export default jobSlice.reducer;
