import React from "react";
import { Navigate } from "react-router-dom";

/**
 * Wait what is this?
 * This is PrivateLink, but reversed.
 * This is mainly used for preventing logged in users from seeing the login/signup/landing pages. 
 * We would check if they have a token in their localStorage and kick them back to the dashboard if they do.
 * The way to use it is the same as PrivateLink.
 * 
 * @param {ReactNode} children The component to be protected from logged in users (i.e., login/signup/landing pages)
 * @returns {ReactNode} The protected component, or a redirect to the dashboard
 */

function ReversedPrivateLink(props) {
  const children = props.children;

  // replace this with a more secure method of checking if the user is logged in
  // would involve talking to the backend and checking the token
  const isLoggedIn = localStorage.getItem("token") !== null;

  return !isLoggedIn ? children : <Navigate to="/dashboard" replace={true} />;
}

export default ReversedPrivateLink;
