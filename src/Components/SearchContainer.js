import { useDispatch, useSelector } from "react-redux";
import FormRow from "../Components/FormRow";
import FormrowSelect from "../Components/FormrowSelect";
import { handleChange, clearFilters } from "../Features/AllJobs/AllJobsSlice";
import styled from "styled-components";
import { useState, useMemo } from "react";

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState("");

  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((store) => store.alljobs);

  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job);

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalSearch("");
    dispatch(clearFilters());
  };

  const debounce = () => {
    console.log("debounce called");
    let timeoutID;
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        dispatch(handleChange({ name: e.target.name, value: e.target.value }));
      }, 1000);
    };
  };
  const optimizedDebounce = useMemo(() => debounce(), []);
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h4>search form </h4>

        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            value={localSearch}
            handleChange={optimizedDebounce}
          />

          <FormrowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            list={["all", ...statusOptions]}
            handleChange={handleSearch}
          />

          <FormrowSelect
            labelText="type"
            name="searchType"
            value={searchType}
            list={["all", ...jobTypeOptions]}
            handleChange={handleSearch}
          />

          <FormrowSelect
            name="sort"
            value={sort}
            list={sortOptions}
            handleChange={handleSearch}
          />

          <button
            type="submit"
            className="btn btn-block btn-danger"
            disabled={isLoading}
          >
            Clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form {
    width: 100%;
    max-width: 100%;
  }
  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2rem;
    row-gap: 0.5rem;
  }
  h5 {
    font-weight: 700;
  }
  .btn-block {
    align-self: end;
    margin-top: 1rem;
  }
  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .btn-block {
      margin-top: 0;
    }
  }
`;

export default SearchContainer;
