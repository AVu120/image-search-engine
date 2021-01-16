import React, { useState } from "react";
import css from "./Search.module.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState();

  const queryImages = async (e) => {
    e.preventDefault();
    const apiEndpoint = "http://localhost:5000/images";
    const apiUrl = new URL(apiEndpoint);
    const queryParmaters = { query };
    Object.keys(queryParmaters).forEach((key) =>
      apiUrl.searchParams.append(key, queryParmaters[key])
    );
    const response = await fetch(
      apiUrl,
      process.env.NODE_ENV === "development" && { mode: "cors" }
    );

    if (response.ok) {
      const responseInJson = await response.json();
      setImages(responseInJson.response.results);
    } else {
      console.error({ response });
    }
  };

  return (
    <div className={css.search}>
      <div className={css.container}>
        <h1 className={css.title}>Image Search Engine</h1>
        <form onSubmit={(e) => queryImages(e)}>
          <label className={css.inputLabel}> 📷</label>
          <input
            type="text"
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
      </div>
      <div className={css.card_list}>
        {(images || []).map((image) => (
          <div className={css.card}>
            <img
              className="card_image"
              alt={image.alt_description}
              src={image.urls.full}
              width="50%"
              height="50%"
            ></img>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
