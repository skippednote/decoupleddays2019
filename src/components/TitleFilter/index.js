import React from "react";

function TitleFilter({ filter, setFilter }) {
  return (
    <div className="filter-title">
      <input
        data-testid="filter-input"
        type="text"
        placeholder="Filter by title"
        className="filter-title"
        onChange={e => setFilter({ ...filter, input: e.target.value })}
      />
    </div>
  );
}

export default TitleFilter;
