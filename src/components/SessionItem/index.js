import React from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useAuthContext } from "../../hooks/useAuth";

export function SessionItem({ session, status, deleteHandler }) {
  const { token } = useAuthContext();

  return (
    <>
      {status.error && (
        <div data-testid="status-error">
          There was an error deleting the session.
        </div>
      )}
      {status.id && (
        <div data-testid="status-success">
          Successfully deleted the session. Redirecting to home.
        </div>
      )}
      <div data-testid="session-item">
        <h4 data-testid="session-title" className="session-title">
          <Link to={`/${session.id}`}>{session.title}</Link>
          <span className="session-length">{session.field_length} minutes</span>
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
          <p data-testid="session-category" className="session-category">
            {session.field_category.name}
          </p>
        </div>

        <p
          className="session-body"
          dangerouslySetInnerHTML={{
            __html: session.body.value
          }}
        />
        <hr />

        <ul data-testid="session-speakers" className="session-speakers">
          {session.field_speakers.map(speaker => (
            <li key={session.id + speaker.id}>
              <p>
                {speaker.field_full_name}{" "}
                {speaker.field_company && "(" + speaker.field_company + ")"}
              </p>
            </li>
          ))}
        </ul>
        {token ? (
          <>
            <hr />
            <Link className="button" to={`/${session.id}/edit`}>
              <FiEdit />
              &nbsp;&nbsp; Edit session
            </Link>

            <button className="button" onClick={deleteHandler}>
              <FiTrash />
              &nbsp;&nbsp; Delete this session
            </button>
          </>
        ) : null
        // <Link className="button" to="/login">
        //   <FiLogIn /> &nbsp;&nbsp;Login
        // </Link>
        }
      </div>
    </>
  );
}

export default SessionItem;
