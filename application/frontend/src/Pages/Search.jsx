import React from "react";

import { useState, useEffect } from "react";
import { Form, Row, Col, Button, Dropdown } from "react-bootstrap";

import { generalPost } from "../Toolbox/generalPost";

import CollapsableSection from "../Components/CollapsableSection";
import SchedulePreviewCard from "../Components/SchedulePreviewCard";

const fetchSearchHistory = () => {
  return generalPost(
    `${process.env.REACT_APP_BASE_URL}/user/getSearchHistory`,
    {
      _id: localStorage.getItem("userID"),
    }
  );
};

function Search() {
  const [validated, setValidated] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const [searchHistory, setSearchHistory] = useState([]);

  // Preloads the data within the searchHistory for the user to select from.
  // Shows the searchTerms once the user clicks the searchbar
  useEffect(() => {
    fetchSearchHistory()
      .then((resp) => {
        setSearchHistory(resp);
      })
      .catch((err) => {
        setError(JSON.parse(err.message).message);
      });
  }, []); // Empty array represents that this will only run on the first render of the page.

  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [schedules, setSchedules] = React.useState(null);

  const handleSubmit = (e) => {
    // prevent form from submitting
    e.preventDefault();

    // show validation checks on form
    setValidated(true);

    // validate the form to ensure all required fields have values
    const search = e.target.search.value;

    // call endpoint, if any issue, display here on this form
    setPending(true);
    generalPost(`${process.env.REACT_APP_BASE_URL}/query/search`, {
      _id: localStorage.getItem("userID"),
      search: search,
    })
      .then((resp) => {
        setSearchHistory(resp.user.searchHistory);
        setSchedules(resp.querySchedules);
        setPending(false);
        setDropdownVisible(false);
      })
      .catch((err) => {
        setError(JSON.parse(err.message).message);
        setPending(false);
      });
  };

  /*
  const handleClick = () => {
    // Prevents the search history from disappearing when the search bar is clicked again
    if(dropdownVisible){
      return;
    }
    setDropdownVisible(!dropdownVisible);
  }
  */

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="search">
      <Form
        validated={validated}
        style={{ maxWidth: "100%" }}
        onSubmit={handleSubmit}
      >
        <Form.Group controlId="searchBar" className="mb-3 mt-2">
          <Row className="align-items-center">
            <Col>
              <Form.Label>Search</Form.Label>
              <Form.Control
                required
                type="text"
                name="search"
                value={searchTerm}
                className="mb-4"
                // onClick={handleClick}
                onChange={(e) => {
                  handleChange(e);
                }}
                onFocus={() => {
                  setDropdownVisible(true);
                }}
                onBlur={() => {
                  setTimeout(() => setDropdownVisible(false), 100);
                }}
              />
            </Col>
            <Col xs="auto">
              <Button variant="primary" type="submit" className="mt-2 w-10">
                Submit
              </Button>
            </Col>
            {dropdownVisible ? (
              // Sets the max amount of height for the scroll bar.
              // overflowY set to auto to make it fit within maxHeight.
              <CollapsableSection
                title="Search History"
                children={
                  <Dropdown style={{ maxHeight: "100%", overflowY: "auto" }}>
                    {searchHistory.reverse().map((searchTerm, index) => {
                      return (
                        <Dropdown.Item
                          // Did some inline styling, can move this over to a css file
                          style={{
                            border: "none",
                            fontSize: "18px",
                            padding: "8px",
                          }}
                          key={index}
                          onClick={() => {
                            setSearchTerm(searchTerm);
                          }}
                        >
                          {searchTerm}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown>
                }
              />
            ) : null}

            {pending && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {!dropdownVisible && schedules && (
              <CollapsableSection
                isOpen={true}
                title="Appears in Your Schedules"
                children={
                  // reverse is for displaying the most recent schedules first
                  schedules.reverse().map((schedule, index) => {
                    return (
                      <SchedulePreviewCard key={index} schedule={schedule} />
                    );
                  })
                }
              />
            )}
          </Row>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Search;
