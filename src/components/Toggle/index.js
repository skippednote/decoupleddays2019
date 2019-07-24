import React, { useState } from "react";

function Toggle({ children, on, off, ...rest }) {
  const [state, setState] = useState(false);
  return (
    <div>
      <button
        data-testid="show-filters"
        className="button"
        onClick={() => setState(!state)}
      >
        {state ? on : off}
      </button>
      {state ? children : null}
    </div>
  );
}

export default Toggle;
