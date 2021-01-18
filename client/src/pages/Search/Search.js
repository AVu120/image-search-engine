import React, { useEffect, useState } from "react";
import ImageGrid from "../../components/Search/ImageGrid";
import SearchForm from "../../components/Search/SearchForm";
import css from "./Search.module.css";
const axios = require("axios");

const Search = () => {
  const [query, setQuery] = useState(
    localStorage.getItem("imageSearchEngineQuery") || ""
  );
  const [images, setImages] = useState([]);
  const [favouritedImages, setFavouritedImages] = useState(
    localStorage.getItem("imageSearchEngineFavourites")?.split(",") || []
  );
  const [shownImages, setShownImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [receivedResponse, setReceivedResponse] = useState(false);

  const numberOfImagesToLoad = 10;

  const queryImages = async (e) => {
    setReceivedResponse(false);
    setIsLoading(true);
    e.preventDefault();
    /* Enable below for development. */
    const apiEndpoint = "http://localhost:5000/images";
    /* Enable below for production. */
    // const apiEndpoint = "/images";
    const queryParmaters = { query };

    const response = await axios.get(apiEndpoint, { params: queryParmaters });
    if (response.statusText === "OK") {
      setReceivedResponse(true);
      const results = response.data.response.results;
      setImages(results);
      setShownImages(results.slice(0, numberOfImagesToLoad));
    } else {
      console.error({ response });
      setReceivedResponse(true);
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

  // Set image loading status.
  useEffect(() => {
    if (!receivedResponse) return;
    setIsLoading(false);
  }, [receivedResponse]);

  return (
    <div className={css.search}>
      <h1 className="title">
        Beautiful, free images and photos that you can download and use for any
        project.
      </h1>
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
          isLoading={isLoading}
          receivedResponse={receivedResponse}
        />
      </>
    </div>
  );
};

export default Search;
