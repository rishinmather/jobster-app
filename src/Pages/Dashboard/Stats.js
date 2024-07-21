import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showStats } from "../../Features/AllJobs/AllJobsSlice";
import { ChartsContainer, StatsContainer } from "../../Components";

const Stats = () => {
  const { isLoading, monthlyApplications } = useSelector(
    (store) => store.alljobs
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showStats());
  }, []);

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
