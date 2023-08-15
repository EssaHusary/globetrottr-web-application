import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { generalPost } from "../Toolbox/generalPost";

/**
 * The signup page with a form that allows users to create an account and log
 *     them in automatically.
 * @returns {ReactNode} The signup page.
 */

function Signup() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [signupForm, setSignupForm] = useState({
    username: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  //  change the form as the user fills it out
  const handleChange = (ev) => {
    setSignupForm({
      ...signupForm,
      [ev.target.name]: ev.target.value,
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    //  validate password. Must be at least 8 characters long and confirmed.
    if (signupForm.password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    } else if (signupForm.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    //  send signupForm to backend
    //  if successful, backend would reply with a token, userID, username, and 
    //      the complete user object
    //  we'll store the token, userID, and username in local storage as we're 
    //      logging in.
    //  then we navigate to the dashboard.
    setPending(true);
    generalPost(`${process.env.REACT_APP_BASE_URL}/user/signup`, signupForm)
      .then((resp) => {
        setPending(false);

        localStorage.setItem("token", resp.token);
        localStorage.setItem("userID", resp._id);
        localStorage.setItem("username", resp.username);
        localStorage.setItem("fullUserObject", JSON.stringify(resp));

        navigate("/dashboard");
      })
      .catch((err) => {
        setError(JSON.parse(err.message).message);
        setPending(false);
      });
  };

  return (
    <div className="signup">
      <h3>GLOBETROTTR</h3>
      <Form onSubmit={handleSignup} className="mt-4">
        <h4>Signup</h4>
        <Form.Group controlId="formUsername" className="mb-3 mt-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="username" onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-4">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formConfirmPassword" className="mb-4">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            onChange={(ev) => {
              setConfirmPassword(ev.target.value);
            }}
          />
        </Form.Group>

        <Button
          className="mb-3"
          style={{ width: "100%" }}
          variant="primary"
          type="submit"
        >
          Signup
        </Button>

        {pending && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </Form>

      <Link to="/login">Login with existing account</Link>
    </div>
  );
}

export default Signup;
