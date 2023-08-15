import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

/**
 * This was for testing if PrivateLink worked in early stages of development.
 * @returns {ReactNode} The placeholder for private pages.
 */

function PrivatePagePlaceholder() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="privatePlaceholder">
      <p>You're not supposed to see it if you're not logged in!</p>
      <Button
        className="mb-3"
        style={{ width: "100%" }}
        variant="primary"
        onClick={handleLogout}
      >
        Logout
      </Button>
      <div style={{ height: 60 }}></div>
    </div>
  );
}

export default PrivatePagePlaceholder;
