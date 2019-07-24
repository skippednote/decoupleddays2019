import React, { useState, lazy, Suspense } from "react";
import { API } from "../../api";
const SessionItem = lazy(() => import("../../components/SessionItem"));

function Session({
  history,
  match: {
    params: { id }
  }
}) {
  const [status, setStatus] = useState({ id: null, error: null });
  const session = API.getSessions(id, ["body"]);

  const deleteHandler = async () => {
    const { error, success } = await API.deleteSession(session.id);

    setStatus({ error, success });

    if (success) {
      history.push("/");
    }
  };

  if (session) {
    return (
      <Suspense
        fallback={
          <div data-testid="loading-component">Loading component...</div>
        }
      >
        <SessionItem
          session={session}
          status={status}
          deleteHandler={deleteHandler}
        />
      </Suspense>
    );
  }

  return <div data-testid="loading-data">Loading data...</div>;
}

export default Session;
