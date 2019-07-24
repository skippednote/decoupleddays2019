import React from "react";
import { getDate } from "../../utils/getDate";

function DateFilter({ sessions, filter, setFilter }) {
  const dates = [
    "All",
    ...new Set(sessions.map(s => getDate(s.field_date).date))
  ];

  return (
    <div className="filter-date">
      {dates.map(date => (
        <button
          className="button"
          data-testid={`date-${date}`}
          disabled={date === filter.date}
          key={date}
          onClick={() => setFilter({ ...filter, date })}
        >
          {date}
        </button>
      ))}
    </div>
  );
}

export default DateFilter;
