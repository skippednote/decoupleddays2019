import React from "react";
import { Link } from "@reach/router";
import { Picture } from "./Picture";
import { UseSession } from "./useSessions";

function Home() {
  const sessions = new UseSession().getSessions();
  if (sessions) {
    return (
      <div>
        {Array.isArray(sessions) &&
          sessions.map(
            ({
              id,
              title,
              field_room,
              field_date,
              field_track,
              field_speaker,
              field_len
            }) => (
              <section key={id}>
                <h4>
                  <Link to={`/sessions/${id}`}>
                    {id} - {title} - {field_len}
                  </Link>
                </h4>
                <p>{field_room}</p>
                <p>{field_date}</p>
                <p>{field_track && field_track.name}</p>
                <ul>
                  {field_speaker &&
                    field_speaker.map(speaker => (
                      <li key={id + "sub" + speaker.field_name}>
                        <p>{speaker.field_name}</p>
                        {Picture(speaker)}
                      </li>
                    ))}
                </ul>
              </section>
            )
          )}
      </div>
    );
  }

  return <div>Loading</div>;
}

export { Home };
