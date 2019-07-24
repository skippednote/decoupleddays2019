import React from "react";
import TitleFilter from "../TitleFilter";
import CategoryFilter from "../CategoryFilter";
import DateFilter from "../DateFilter";
import Toggle from "../Toggle";
import { FiToggleLeft, FiToggleRight } from "react-icons/fi";

function Filters({ filter, setFilter, sessions }) {
  return (
    <>
      <Toggle
        data-testid="show-filters"
        on={
          <>
            <FiToggleLeft /> <div className="filter-label">Show Filters</div>
          </>
        }
        off={
          <>
            <FiToggleRight /> <div className="filter-label">Hide Filters</div>
          </>
        }
      >
        <div className="filters">
          <TitleFilter setFilter={setFilter} filter={filter} />
          <br />
          <CategoryFilter
            sessions={sessions}
            setFilter={setFilter}
            filter={filter}
          />
          <br />
          <DateFilter
            sessions={sessions}
            setFilter={setFilter}
            filter={filter}
          />
        </div>
      </Toggle>
    </>
  );
}

export default Filters;
