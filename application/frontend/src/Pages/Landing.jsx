import React from "react";
import { Link } from "react-router-dom";

/**
 * Landing page for the application with links to login and signup pages.
 * @returns {ReactNode} The landing page.
 */

function Landing() {
  return (
    <div className="landing">
      <h3>GLOBETROTTR</h3>
      <span>
        <Link
          className="btn btn-primary mt-5 mb-3"
          style={{ width: "14rem" }}
          variant="primary"
          type="button"
          to="/signup"
        >
          Sign up for a new account
        </Link>
      </span>
      <span>
        <Link
          className="btn btn-primary mt-3"
          style={{ width: "14rem" }}
          variant="primary"
          type="button"
          to="/login"
        >
          Login with existing account
        </Link>
      </span>
    </div>
  );
}
export default Landing;
