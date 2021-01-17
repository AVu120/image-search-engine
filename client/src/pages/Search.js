import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { testImageData } from "./constant";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FavouritedIcon from "@material-ui/icons/Favorite";
import UnfavouritedIcon from "@material-ui/icons/FavoriteBorder";
import css from "./Search.module.css";
import { makeStyles } from "@material-ui/core/styles";
import DownloadButton from "../components/Search/DownloadButton";
import SearchForm from "../components/Search/SearchForm";

const useStyles = makeStyles((theme) => ({
  profileAvatar: {
    width: "32px",
    height: "32px",
    marginRight: "5px",
  },
}));

const Search = () => {
  const classes = useStyles();
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

  // Favourites persists after browser-refresh/different-query.
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
        <div className={css.card_list_container} id="scrollableDiv">
          <InfiniteScroll
            dataLength={shownImages.length}
            next={showMoreImages}
            hasMore={shownImages.length < images.length}
            loader={<p className={css.text}>Loading...</p>}
            endMessage={
              images.length ? (
                <p className={css.text}>
                  Loading complete. It may take some time for all images to
                  completely appear.
                </p>
              ) : null
            }
            scrollableTarget="scrollableDiv"
          >
            <div className={css.card_list}>
              {shownImages.map((image) => (
                <div className={css.card} key={`${image.id}`}>
                  <a
                    className={css.image_creator_profile}
                    href={`${image.user.links.html}?utm_source=AnthonyHienVusImageSearchEngine&utm_medium=referral`}
                  >
                    <Avatar
                      alt={image.user?.name}
                      src={image.user.profile_image?.small}
                      className={classes.profileAvatar}
                    />
                    <p className={css.text}>{image.user?.name}</p>
                  </a>
                  <img
                    alt={image.alt_description}
                    src={image.urls?.full}
                    width="100%"
                    height="100%"
                  ></img>
                  <div className={css.image_actions_container}>
                    <IconButton
                      onClick={() =>
                        setFavouritedImages(
                          favouritedImages.includes(image.id)
                            ? removeFromFavourites(image.id)
                            : favouritedImages.concat(image.id)
                        )
                      }
                      className={css.favourite_button}
                    >
                      {favouritedImages.includes(image.id) ? (
                        <FavouritedIcon color="secondary" fontSize="large" />
                      ) : (
                        <UnfavouritedIcon color="secondary" fontSize="large" />
                      )}
                    </IconButton>
                    <div className={css.download_button}>
                      <DownloadButton
                        title="Download"
                        options={Object.keys(image.urls).map((key) => {
                          return { label: key, url: image.urls[key] };
                        })}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </>
    </div>
  );
};

export default Search;
