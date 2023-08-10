import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/note/noteContext";
const Login = () => {
  const {showAlert}=useContext(noteContext)
  const [user, setUser] = useState({ Email: "", Password: "" });
  const navigate = useNavigate();
  const loginUser = async (email, password) => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_DOMAIN}/api/auth/loginUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      let result = await response.json();
      if (result.success) {
        localStorage.setItem('token',result.token)
        localStorage.setItem('userEmail',email)
        showAlert("you have logged in successfully","success")
        navigate("/");
      } else {
        showAlert(result.errors,"danger")
      }
    } catch (error) {
      console.log(error)
      showAlert("something wrong.........","danger")
    }
  };
  const handelLogin = async (e) => {
    e.preventDefault();
    loginUser(user.Email, user.Password);
  };
  const onchange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container text-light mt-5 pt-5">
        <div className="jumbotron bg-dark p-5 my-5">
          <h1 className="display-4 text-warning">Welcome to inotebook ! </h1>
          <p className="lead">
            This is a simple app which allows you to create your notes and store
            them on cloud securely and safely. you can access them from any
            where any time.
          </p>
          <hr className="my-4" />
          <h4 className="mb-5">Login with your details.</h4>
          <div className="lead">
            <form onSubmit={handelLogin}>
              <div className="row mb-3">
                <label htmlFor="Email" className="col-sm-2 col-form-label">
                  Email
                </label>
                <div className="col-sm-10">
                  <input
                    type="email"
                    name="Email"
                    className="form-control"
                    id="Email"
                    required
                    onChange={onchange}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="Password" className="col-sm-2 col-form-label">
                  Password
                </label>
                <div className="col-sm-10">
                  <input
                    type="password"
                    name="Password"
                    className="form-control"
                    id="Password"
                    required
                    minLength={8}
                    onChange={onchange}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-warning text-dark">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
