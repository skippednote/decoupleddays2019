import React, { useState, useEffect, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { getDate } from "../../utils/getDate";
const Filters = lazy(() => import("../Filters"));

export function SessionList({ sessions }) {
  const [filtered, setFiltered] = useState(sessions);
  const [filter, setFilter] = useState({
    category: "All",
    date: "All",
    input: ""
  });

  useEffect(() => {
    if (sessions) {
      const filteredSession = sessions.filter(session => {
        const { date: sessionDate } = getDate(session.field_date);
        return (
          (filter.category === "All" ||
            session.field_category.name === filter.category) &&
          (filter.date === "All" || sessionDate === filter.date) &&
          (filter.input === "" ||
            session.title.toLowerCase().indexOf(filter.input) > -1)
        );
      });

      setFiltered(filteredSession);
    }
  }, [sessions, filter]);

  if (sessions && sessions.length === 0) {
    return <div>No sessions created yet.</div>;
  }

  if (sessions) {
    return (
      <div>
        <Suspense fallback={<div>Loading filters</div>}>
          <Filters sessions={sessions} filter={filter} setFilter={setFilter} />
        </Suspense>
        {filtered.length > 0 && (
          <div data-testid="session">
            {filtered.map(session => (
              <section
                key={session.id}
                data-testid="session-item"
                className="session-item"
              >
                <h4 data-testid="session-title" className="session-title">
                  <Link to={`/${session.id}`}>{session.title}</Link>
                  <span className="session-length">
                    {session.field_length} minutes
                  </span>
                </h4>
                <div className="session-meta">
                  <p data-testid="session-room" className="session-room">
                    {session.field_room}
                  </p>
                  <span className="spacer">•</span>
                  <p data-testid="session-date" className="session-date">
                    {session.field_date}
                  </p>
                  <span className="spacer">•</span>
                  <p
                    data-testid="session-category"
                    className="session-category"
                  >
                    {session.field_category.name}
                  </p>
                </div>
                <ul data-testid="session-speakers" className="session-speakers">
                  {session.field_speakers.map(speaker => (
                    <li key={session.id + speaker.id}>
                      <p>
                        {speaker.field_full_name}{" "}
                        {speaker.field_company &&
                          "(" + speaker.field_company + ")"}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    );
  }

  return <div>Loading Sessions</div>;
}

export default SessionList;
