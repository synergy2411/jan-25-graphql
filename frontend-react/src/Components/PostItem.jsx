import React from "react";

export default function PostItem(props) {
  return (
    <div className="col-4">
      <div className="card">
        <div className="card-header">
          <h5 className="text-center">{props.title.toUpperCase()}</h5>
        </div>
        <div className="card-body">
          <p>{props.body}</p>
          <p className="float-end">{props.author.name}</p>
        </div>
      </div>
    </div>
  );
}
