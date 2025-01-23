import { useRef } from "react";
import { useMutation } from "@apollo/client";
import USER_LOGIN from "../apollo/user-login";

function LoginPage() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [userLoginMutation, { data, loading, error }] = useMutation(USER_LOGIN);

  const submitHandler = async (event) => {
    event.preventDefault();
    const { data } = await userLoginMutation({
      variables: {
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
      },
    });

    console.log(data);
  };

  return (
    <div className="row">
      <div className="col-8 offset-2">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center">Login Page</h2>
            <form onSubmit={submitHandler}>
              {/* email */}
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder=""
                  ref={emailInputRef}
                />
                <label htmlFor="email">Email</label>
              </div>

              {/* password */}
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  placeholder=""
                  ref={passwordInputRef}
                />
                <label htmlFor="password">Password</label>
              </div>

              {/* button - login */}
              <div className="row">
                <div className="col">
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
