import React, { useState, useEffect } from "react";
import css from "./Search.module.css";
import SearchForm from "../components/Search/SearchForm";
import ImageGrid from "../components/Search/ImageGrid";

const Search = () => {
  const [query, setQuery] = useState(
    localStorage.getItem("imageSearchEngineQuery") || ""
  );
  const [images, setImages] = useState([]);
  const [favouritedImages, setFavouritedImages] = useState(
    localStorage.getItem("imageSearchEngineFavourites")?.split(",") || []
  );
  const [shownImages, setShownImages] = useState([]);

  const numberOfImagesToLoad = 10;

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
        responseInJson.response.results.slice(0, numberOfImagesToLoad)
      );
    } else {
      console.error({ response });
    }
  };

  // Trigger this function when user scrolls to bottom of image grid to
  // enable infinite scrolling.
  const showMoreImages = () => {
    if (shownImages.length < images.length) {
      setShownImages(
        images.slice(0, shownImages.length + numberOfImagesToLoad)
      );
    }
  };

  // Remove image from favourites.
  const removeFromFavourites = (imageIdToRemove) => {
    const indexToRemove = favouritedImages.indexOf(imageIdToRemove);
    let currentFavourites = JSON.parse(JSON.stringify(favouritedImages));
    currentFavourites.splice(indexToRemove, 1);
    return currentFavourites;
  };

  // Query persists after browser refresh.
  useEffect(() => {
    localStorage.setItem("imageSearchEngineQuery", query);
  }, [query]);

  // Persist record of favourited images after browser-refresh/different-query.
  useEffect(() => {
    localStorage.setItem("imageSearchEngineFavourites", favouritedImages);
  }, [favouritedImages]);

  return (
    <div className={css.search}>
      <h1 className={css.title}>Image Search Engine</h1>
      <>
        <SearchForm
          css={css}
          query={query}
          setQuery={setQuery}
          queryImages={queryImages}
        />
        <ImageGrid
          css={css}
          shownImages={shownImages}
          showMoreImages={showMoreImages}
          images={images}
          favouritedImages={favouritedImages}
          setFavouritedImages={setFavouritedImages}
          removeFromFavourites={removeFromFavourites}
        />
      </>
    </div>
  );
};

export default Search;
