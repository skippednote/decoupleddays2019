import React from "react";
import Form from "../Form";

export function EditForm({
  session,
  users,
  categories,
  submitHandler,
  status
}) {
  return (
    <>
      {status.error && (
        <div data-testid="status-error">
          There was an error updating the session.
        </div>
      )}
      {status.id && (
        <div data-testid="status-success">
          Successfully updated session. Redirecting now.
        </div>
      )}
      <Form
        users={users}
        categories={categories}
        submitHandler={submitHandler}
        session={session}
      />
    </>
  );
}

export default EditForm;
