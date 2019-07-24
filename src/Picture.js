import React from "react";

const Picture = speaker => {
  if (speaker.user_picture) {
    return (
      <img
        src={"https://sessions.lndo.site" + speaker.user_picture.uri.url}
        alt={speaker.field_name}
      />
    );
  }
  return null;
};

export { Picture };
