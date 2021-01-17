import React from "react";
import css from "./Instructions.module.css";

const Instructions = () => {
  return (
    <div className={css.instructions}>
      <h1 className="title">Instructions</h1>
      <ol className={css.instructions_list}>
        <li>Go to search page.</li>
        <li>
          Enter keywords/tags relating to the images you want to see. If you're
          entering multiple at once, ensure you separate them with a space.
        </li>
        <li>Wait for some images to appear below the search form.</li>
        <li>
          Scroll down to see more images (e.g. like a Facebook or Reddit feed).
        </li>
        <li>
          Click the heart button to favourite an image. If your refresh your
          browser, close your tab/browser or navigate to a different page then
          return to the search, you should still see your favourited images
          (shown by filled pink heart).
        </li>
        <li>
          Click the download button than select the desired size from the
          dropdown menu that appears.
        </li>
        <li>Enjoy and have fun!</li>
      </ol>
    </div>
  );
};

export default Instructions;
