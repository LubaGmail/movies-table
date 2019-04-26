import React from "react";

const Like = props => {
  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";

  return (
    <div style={{ cursor: "pointer" }}>
      <i
        onClick={props.toggleLike}
        className={classes}
        aria-hidden="true"
      />
    </div>
  );
};

export default Like;
