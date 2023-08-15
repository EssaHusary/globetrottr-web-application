import React from "react";
import { Navigate } from "react-router-dom";

/**
 * This component is used to protect routes that should only be accessible
 * to logged in users. For now, it checks if the user is logged in by checking if
 * there is a token in the local storage. If there is, it renders the
 * children of the component. If not, it redirects the user to the landing
 * page. In the future, this component should be talking to the backend to verify
 * the token.
 * This is usually used with Routes in Canvas.jsx. Wrap whatever component you'd like to protect before registering it with a Route.
 * @param {ReactNode} children The component to be protected
 * @returns {ReactNode} The protected component, or a redirect to the landing page
 */

function PrivateLink(props) {
  const children = props.children;

  const isLoggedIn = localStorage.getItem("token") !== null;

  return isLoggedIn ? children : <Navigate to="/landing" replace={true} />;
}

export default PrivateLink;
