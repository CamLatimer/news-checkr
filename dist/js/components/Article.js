import React from "react";

function Article(props) {
  return (
    <div className="">
      <article className="">
        <header>
          <h3>{props.headline}</h3>
        </header>
        <summary>
          {props.description}
        </summary>
      </article>
    </div>
  );
}

export default Article;
