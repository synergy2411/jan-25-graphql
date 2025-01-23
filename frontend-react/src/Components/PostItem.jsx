import React from "react";

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

export default function PostItem(props) {
  return (
    <div className="col-4 mb-3">
      <div className="card">
        <div className="card-header">
          <h5 className="text-center">{props.title.toUpperCase()}</h5>
        </div>
        <div className="card-body">
          <p>{props.body}</p>
          <p className="float-end">-{toTitleCase(props.author.name)}</p>
        </div>
      </div>
    </div>
  );
}
