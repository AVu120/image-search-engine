import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import css from "./Search.module.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [numberOfShownImages, setNumberOfShownImages] = useState(10);
  const [shownImages, setShownImages] = useState([]);

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
      setShownImages(
        responseInJson.response.results.slice(0, numberOfShownImages)
      );
    } else {
      console.error({ response });
    }
  };

  // Trigger this function when user scrolls to bottom of image grid to
  // enable infinite scrolling.
  const showMoreImages = () => {
    setShownImages(images.slice(0, numberOfShownImages + 10));
    setNumberOfShownImages((state) => state + 10);
  };

  return (
    <div className={css.search}>
      <h1 className={css.title}>Image Search Engine</h1>
      <>
        <form className={css.form} onSubmit={(e) => queryImages(e)}>
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

        <div className={css.card_list}>
          <InfiniteScroll
            dataLength={numberOfShownImages}
            next={showMoreImages}
            hasMore={true}
            loader={<h4>Loading...</h4>}
          >
            {shownImages.map((image) => (
              <div className={css.card} key={image.id}>
                <img
                  className={css.card_image}
                  alt={image.alt_description}
                  src={image.urls.full}
                  width="50%"
                  height="50%"
                ></img>
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </>
    </div>
  );
};

export default Search;
