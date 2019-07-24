import React, { lazy, Suspense } from "react";
import { API } from "../../api";
const SessionList = lazy(() => import("../../components/SessionList"));

function Sessions() {
  const sessions = API.getSessions();

  if (sessions) {
    return (
      <Suspense fallback={<div>Loading component...</div>}>
        <SessionList sessions={sessions} />
      </Suspense>
    );
  }

  return <div data-testid="loading-data">Loading data...</div>;
}

export default Sessions;
