import React, { useState } from "react";
import css from "./Search.module.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState();

  return (
    <div className={css.search}>
      <div>
        <h1 className={css.title}>Image Search Engine</h1>
        <form onSubmit={() => alert("Images queried!")}>
          <label className={css.inputLabel}> 📷</label>
          <input
            type="text"
            className={css.input}
            placeholder="Search images"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className={css.button}>
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Search;
