import React from "react";

const Picture = speaker => {
  if (speaker.user_picture) {
    return (
      <img
        src={"http://testing.dd:8083" + speaker.user_picture.uri.url}
        alt={speaker.field_name}
      />
    );
  }
  return null;
};

export { Picture };
