import React from "react";
import { navigate, Link } from "@reach/router";
import { UseSession } from "./useSessions";
import { Picture } from "./Picture";

function Session(props) {
  const session = new UseSession(props.id, ["body"]).getSessions();
  const isLoggedIn = window.localStorage.getItem("token") || false;

  const deleteSession = async () => {
    const token = window.localStorage.getItem("token");
    await fetch(`http://testing.dd:8083/api/node/session/${props.id}`, {
      method: "DELETE",
      headers: {
        Authorization: token
      }
    });

    navigate("/");
  };

  if (session) {
    return (
      <div>
        <h1>{session.title}</h1>
        <p>{session.field_room}</p>
        <p>{session.field_date && session.field_date}</p>
        <p>{session.field_track && session.field_track.name}</p>
        <p
          dangerouslySetInnerHTML={{
            __html: session.body && session.body.value
          }}
        />
        <ul>
          {session.field_speaker &&
            session.field_speaker.map(speaker => (
              <li key={session.id + speaker.field_name}>
                <p>{speaker.field_name}</p>
                {Picture(speaker)}
              </li>
            ))}
        </ul>
        {Boolean(isLoggedIn) ? (
          <>
            <button onClick={deleteSession}>Delete this session</button>
            <Link to={`/sessions/${session.id}/edit`}>Edit session</Link>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    );
  }

  return <div>Loading...</div>;
}

export { Session };
