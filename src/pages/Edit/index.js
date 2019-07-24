import React, { useState, lazy, Suspense } from "react";
import { API } from "../../api";
import { useAuthContext } from "../../hooks/useAuth";
const EditForm = lazy(() => import("../../components/EditForm"));

function Edit({ match, history }) {
  const { token } = useAuthContext();
  if (!token) {
    history.push("/login");
  }

  const [status, setStatus] = useState({ id: null, error: null });
  const session = API.getSessions(match.params.id, ["body"]);
  const categories = API.getCategories();
  const users = API.getUsers();

  const submitHandler = async values => {
    const { id, error } = await API.updateSession(values, session.id);
    setStatus({ id, error });

    if (id) {
      history.push(`/${id}`);
    }
  };

  if (session && users && categories) {
    return (
      <Suspense fallback={<div>loading component...</div>}>
        <EditForm
          session={session}
          categories={categories}
          users={users}
          status={status}
          submitHandler={submitHandler}
        />
      </Suspense>
    );
  }

  return <div data-testid="loading-data">Loading data...</div>;
}

export default Edit;
