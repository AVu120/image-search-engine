import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FavouritedIcon from "@material-ui/icons/Favorite";
import UnfavouritedIcon from "@material-ui/icons/FavoriteBorder";
import DownloadButton from "../../components/Search/DownloadButton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  profileAvatar: {
    width: "32px",
    height: "32px",
    marginRight: "5px",
  },
}));

const ImageGrid = ({
  css,
  shownImages,
  showMoreImages,
  images,
  favouritedImages,
  setFavouritedImages,
  removeFromFavourites,
  isLoading,
}) => {
  const classes = useStyles();

  return (
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
          {shownImages.length ? (
            shownImages.map((image) => (
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
            ))
          ) : isLoading ? (
            <p className={css.text}>Loading...</p>
          ) : null}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default ImageGrid;
