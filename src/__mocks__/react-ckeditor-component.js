import React from "react";

const CKEditor = ({ content, events: { change, blur } }) => {
  if (content === "") {
    content = {
      body: ""
    };
  }
  function handleChange(event) {
    const customEvent = {
      editor: {
        getData() {
          return { body: event.currentTarget.value };
        }
      }
    };
    change(customEvent);
  }
  function handleBlur(e) {
    blur();
  }
  return (
    <>
      <textarea
        data-testid="textarea"
        onChange={handleChange}
        onBlur={handleBlur}
        value={content.body}
      />
      <div data-testid="textarea-value">{content.body}</div>
    </>
  );
};

export default CKEditor;
