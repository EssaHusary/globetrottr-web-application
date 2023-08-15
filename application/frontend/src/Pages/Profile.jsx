import { Button, Row, Col, Container, ListGroup } from "react-bootstrap";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
/**
 * The profile page with links to edit account info, personal info, and set schedule preferences.
 * Comes with a logout button and a display of the user's ID.
 * @returns {ReactNode} The profile page.
 */
function Profile() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/landing");
  };

  return (
    <div className="Profile">
      <ListGroup className="mt-3">
        <ListGroup.Item
          as="li"
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("AccountInfo");
          }}
        >
          Account Credentials
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("PersonalInfo");
          }}
        >
          Personal Info
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("SchedulePref");
          }}
        >
          Schedule Preferences
        </ListGroup.Item>
      </ListGroup>

      <Button variant="danger w-100 mt-4 mb-3" onClick={logout}>
        Logout
      </Button>

      <div className="UID">UserID: {localStorage.userID}</div>
    </div>
  );
}
export default Profile;
