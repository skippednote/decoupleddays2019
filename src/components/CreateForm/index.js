import React from "react";
import Form from "../Form";

export function CreateForm({ categories, users, submitHandler, status }) {
  return (
    <>
      {status.error && (
        <div data-testid="status-error" className="message">
          There was an error creating the session.
        </div>
      )}
      {status.id && (
        <div data-testid="status-success" className="message">
          Successfully create a new session. Redirecting now.
        </div>
      )}
      <Form
        users={users}
        categories={categories}
        submitHandler={submitHandler}
      />
    </>
  );
}

export default CreateForm;
