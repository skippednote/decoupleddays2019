import React from "react";

export function CategoryFilter({ sessions, filter, setFilter }) {
  const categories = [
    "All",
    ...new Set(sessions.map(s => s.field_category.name))
  ];

  const categoryToTestId = category =>
    "category-" +
    category
      .toLowerCase()
      .split(" ")
      .join("-");

  return (
    <div className="filter-category">
      {categories.map(category => (
        <button
          className="button"
          data-testid={categoryToTestId(category)}
          disabled={category === filter.category}
          key={category}
          onClick={() => setFilter({ ...filter, category })}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
