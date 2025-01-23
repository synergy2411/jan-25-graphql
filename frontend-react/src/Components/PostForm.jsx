import classes from "./PostForm.module.css";

function PostForm() {
  return (
    <div className={classes["backdrop"]}>
      <div className={classes["my-modal"]}>
        <h4 className="text-center mb-3">Create New Post</h4>
        <form>
          {/* title */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              name="title"
              id="title"
              placeholder=""
            />
            <label htmlFor="title">Title</label>
          </div>

          {/* body */}
          <div className="mb-3">
            <label htmlFor="" className="form-label"></label>
            <textarea
              className="form-control"
              name="body"
              id="body"
              rows="3"
              placeholder="Write your message here..."
            ></textarea>
          </div>

          {/* buttons - Save & Cancel */}
          <div className="row">
            <div className="col">
              <div className="d-grid">
                <button className="btn btn-primary">Save</button>
              </div>
            </div>
            <div className="col">
              <div className="d-grid">
                <button className="btn btn-secondary">Cancel</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostForm;
