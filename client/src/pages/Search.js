import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { testImageData } from "./constant";
import Avatar from "@material-ui/core/Avatar";
import css from "./Search.module.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  profileAvatar: {
    width: "32px",
    height: "32px",
    marginRight: "5px",
  },
}));

const Search = () => {
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [shownImages, setShownImages] = useState(testImageData);
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
    if (shownImages.length < images.length)
      setShownImages(
        images.slice(0, shownImages.length + numberOfImagesToLoad)
      );
  };

  return (
    <div className={css.search}>
      <h1 className={css.title}>Image Search Engine</h1>
      <>
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
                <div className={css.card} key={image.id}>
                  <a
                    className={css.image_creator_profile}
                    href="https://unsplash.com/@rayia"
                  >
                    <Avatar
                      alt="Rayia Soderberg"
                      src="https://images.unsplash.com/profile-1577329897370-acd13024143fimage?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32"
                      className={classes.profileAvatar}
                    />
                    <p className={css.text}>{"Rayia Soderberg"}</p>
                  </a>
                  <img
                    alt={image.alt_description}
                    src={image.urls.full}
                    width="100%"
                    height="100%"
                  ></img>
                  <h1>Below Placeholder</h1>
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
