import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

/* icons */
import {
  MdOutlineEventNote,
  MdSearch,
  MdAddBox,
  MdManageSearch,
  MdPerson,
} from "react-icons/md";

/**
 * This is the base layout for all pages that has a toolbar at the bottom.
 * Use it by wrapping your page with this layout.
 * 
 * @param {Object} props The props passed to this component. This should include the title (props.title) of the page, and the children (props.children) to be rendered.
 * @returns {ReactNode} The page with the toolbar at the bottom.
 */

function WithToolbar(props) {

  {/**
  * Here's a bad ascii art of how this is structured:
  * |----------------|
  * | <Title>        |
  * |----------------|
  * | <Children>     |
  * |                |
  * |                |
  * |                |
  * |----------------|
  * | <Toolbar>      |
  * |----------------|
  */}

  return (
    <div className="withToolbar">

      {/* The title of the page i.e. Dashboard, Create... */}
      <div className="title">
        <h1>{props.title}</h1>
        <div className="userNameIDCombo">
          <div className="UName">{localStorage.username}</div>
        </div>
      </div>

      {/* Container for the children */}
      <div className="mainContainer">{props.children}</div>

      {/* The bottom toolbar */}
      <Navbar
        className="justify-content-center"
        bg="light"
        variant="light"
        fixed="bottom"
      >
        <Nav className="gap-3">
          <Nav.Link as={NavLink} to="/dashboard">
            <div className="toolbarIconCombo">
              <MdOutlineEventNote className="icon" size={30} />
              <label>Schedules</label>
            </div>
          </Nav.Link>

          <Nav.Link as={NavLink} to="/search">
            <div className="toolbarIconCombo">
              <MdSearch className="icon" size={30} />
              <label>Search</label>
            </div>
          </Nav.Link>

          <Nav.Link as={NavLink} to="/create">
            <div className="toolbarIconCombo">
              <MdAddBox className="icon" size={30} />
              <label>Create</label>
            </div>
          </Nav.Link>

          <Nav.Link as={NavLink} to="/queries">
            <div className="toolbarIconCombo">
              <MdManageSearch className="icon" size={30} />
              <label>Queries</label>
            </div>
          </Nav.Link>

          <Nav.Link as={NavLink} to="/profile">
            <div className="toolbarIconCombo">
              <MdPerson className="icon" size={30} />
              <label>Profile</label>
            </div>
          </Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}

export default WithToolbar;
