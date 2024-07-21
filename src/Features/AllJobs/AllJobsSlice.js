import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { getAllJobsThunk, showStatsThunk } from "./AlljobsThunk";

const initialFiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: true,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAlljobs = createAsyncThunk("allJobs/getjobs", getAllJobsThunk);

export const showStats = createAsyncThunk("allJobs/showStats", showStatsThunk);

const allJobsSlice = createSlice({
  name: "allJobs",
  initialState: initialState,

  reducers: {
    showLoading: (state, action) => {
      state.isLoading = true;
    },

    hideLoading: (state, action) => {
      state.isLoading = false;
    },

    handleChange: (state, action) => {
      console.log(action.payload);
      const { name, value } = action.payload;
      state.page = 1;
      state[name] = value;
    },

    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },

    changePage: (state, action) => {
      state.page = action.payload;
    },

    clearAllJobsState: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAlljobs.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAlljobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs = action.payload.jobs;
        state.numOfPages = action.payload.numOfPages;
        state.totalJobs = action.payload.totalJobs;
      })
      .addCase(getAlljobs.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(showStats.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(showStats.fulfilled, (state, action) => {
        state.isLoading = false;

        state.stats = action.payload.defaultStats;
        state.monthlyApplications = action.payload.monthlyApplications;
      })
      .addCase(showStats.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      });
  },
});
export const {
  showLoading,
  hideLoading,
  clearFilters,
  handleChange,
  changePage,
  clearAllJobsState,
} = allJobsSlice.actions;
export default allJobsSlice.reducer;
