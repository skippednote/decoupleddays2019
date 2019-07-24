import React, { lazy, Suspense, useState } from "react";
import { API } from "../../api";
import { useAuthContext } from "../../hooks/useAuth";
const CreateForm = lazy(() => import("../../components/CreateForm"));

function Create({ history }) {
  const { token } = useAuthContext();
  if (!token) {
    history.push("/login");
  }

  const [status, setStatus] = useState({ id: null, error: null });
  const categories = API.getCategories();
  const users = API.getUsers();

  const submitHandler = async values => {
    const { id, error } = await API.createSession(values);
    setStatus({ id, error });

    if (id) {
      history.push(`/${id}`);
    }
  };

  if (categories && users) {
    return (
      <Suspense fallback={<div>Loading component...</div>}>
        <CreateForm
          categories={categories}
          users={users}
          submitHandler={submitHandler}
          status={status}
        />
      </Suspense>
    );
  }

  return <div data-testid="loading-data">Loading data...</div>;
}

export default Create;
