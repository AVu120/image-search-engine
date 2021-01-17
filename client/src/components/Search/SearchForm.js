import React from "react";

const SearchForm = ({ css, query, setQuery, queryImages }) => {
  return (
    <form className={css.form} onSubmit={(e) => query && queryImages(e)}>
      {" "}
      <label className={css.inputLabel} htmlFor="query">
        {" "}
        📷
      </label>
      <input
        type="text"
        name="query"
        className={css.input}
        placeholder="Search images"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        required
      />
      <button type="submit" className={css.button}>
        Search
      </button>
    </form>
  );
};

export default SearchForm;
