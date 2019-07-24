import React from "react";
let ids = [];

const Select = ({ options, value, onChange }) => {
  if (value === "") {
    value = [];
  }
  function handleChange(event) {
    ids.push(event.currentTarget.value);
    const filtered = options.filter(value => -1 !== ids.indexOf(value.value));
    onChange(filtered);
  }
  return (
    <>
      <select
        data-testid="select"
        value={value}
        onChange={handleChange}
        multiple
      >
        {" "}
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {" "}
            {label}{" "}
          </option>
        ))}{" "}
      </select>
      <div data-testid="select-value">{value.map(v => v.label).join(", ")}</div>
    </>
  );
};

export default Select;
