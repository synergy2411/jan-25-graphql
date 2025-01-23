import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import classes from "./PostForm.module.css";
import CREATE_POST from "../apollo/create-post";

function PostForm() {
  const navigate = useNavigate();
  const titleInputRef = useRef();
  const bodyInputRef = useRef();

  const [createPostMutation] = useMutation(CREATE_POST);

  const saveHandler = async (e) => {
    e.preventDefault();
    console.log(titleInputRef.current.value, bodyInputRef.current.value);
    try {
      const { data } = await createPostMutation({
        variables: {
          title: titleInputRef.current.value,
          body: bodyInputRef.current.value,
        },
      });
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const cancelHandler = () => {
    navigate("/posts");
  };

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
              ref={titleInputRef}
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
              ref={bodyInputRef}
            ></textarea>
          </div>

          {/* buttons - Save & Cancel */}
          <div className="row">
            <div className="col">
              <div className="d-grid">
                <button onClick={saveHandler} className="btn btn-primary">
                  Save
                </button>
              </div>
            </div>
            <div className="col">
              <div className="d-grid">
                <button onClick={cancelHandler} className="btn btn-secondary">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostForm;
