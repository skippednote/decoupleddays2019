import { useState, useEffect } from "react";
import { getDate } from "../utils/getDate";

export function useFilter(sessions) {
  const [filtered, setFiltered] = useState(sessions);
  const [filter, setFilter] = useState({
    category: "All",
    date: "All",
    input: ""
  });

  useEffect(() => {
    const filteredSession = sessions.filter(session => {
      const { date: sessionDate } = getDate(session.field_date);
      return (
        (filter.category === "All" ||
          session.field_category.name === filter.category) &&
        (filter.date === "All" || sessionDate === filter.date) &&
        (filter.input === "" || session.title.indexOf(filter.input) > -1)
      );
    });

    setFiltered(filteredSession);
  }, [sessions, filter]);

  return { filter, setFilter, filtered };
}
