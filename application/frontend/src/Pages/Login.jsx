import { Button, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { generalPost } from "../Toolbox/generalPost";

/**
 * Login page for the application. Allows users to login with their username 
 *     and password, or navigate to the signup page. They can also view the 
 *         team's about page.
 * @returns {ReactNode} The login page.
 */

function Login() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });  //  would have to change this back to username and password

  const handleChange = (ev) => {
    setLoginForm({
      ...loginForm,
      [ev.target.name]: ev.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    //  send loginForm to backend
    setPending(true);
    generalPost(`${process.env.REACT_APP_BASE_URL}/user/login`, loginForm)
      .then((resp) => {
        setPending(false);

        localStorage.setItem("token", resp.token);
        localStorage.setItem("userID", resp._id);
        localStorage.setItem("username", resp.username);
        //  not sure if it's a good idea to store the entire user object in local storage
        localStorage.setItem("fullUserObject", JSON.stringify(resp)); 

        navigate("/dashboard");
      })
      .catch((err) => {
        setError(JSON.parse(err.message).message);
        setPending(false);
      });
  };

  return (
    <div className="login">
      <h3>GLOBETROTTR</h3>
      <Form onSubmit={handleLogin} className="mt-5">
        <h4>Login</h4>
        <Form.Group controlId="formUsername" className="mb-3 mt-2">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            onChange={handleChange}
            required
          />{" "}
          {  /*  would need to change 'email' back to 'username' */  }
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-5">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button
          className="mb-3"
          style={{ width: "100%" }}
          variant="primary"
          type="submit"
        >
          Login
        </Button>

        {pending && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </Form>

      <Link className="mb-3" to="/signup">
        Sign up for a new account
      </Link>

      <footer>
        <Link to="/proto">The team home page</Link>
      </footer>
    </div>
  );
}

export default Login;
