import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

function Home() {
  return (
    <>
      <Card className="mx-auto m-5" style={{ width: "40rem" }}>
        <Card.Body>
          <Card.Title className="mx-auto text-bold">
            Team Schedule and Communication Information
          </Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
            <Card.Subtitle>Meeting Schedule:</Card.Subtitle>Monday 4:00PM -
            6:45PM, Friday 7:30PM to 9:00PM
          </ListGroup.Item>
          <ListGroup.Item>
            <Card.Subtitle>Communication Channel:</Card.Subtitle> Discord
          </ListGroup.Item>
          <ListGroup.Item>
            <Card.Subtitle>Study Schedule:</Card.Subtitle>
            <>
              <ListGroup.Item>
                Google Compute Engine: Each member is reviewing Google's
                tutorials such as{" "}
                <a href="https://codelabs.developers.google.com/codelabs/cloud-webapp-hosting-gce#3">
                  this
                </a>
              </ListGroup.Item>
              <ListGroup.Item>
                Ubuntu: We will use the documentation if there are any issues;
                we used this before in previous classes such as CSC 415.
              </ListGroup.Item>
              <ListGroup.Item>
                MongoDB: Each member is reviewing this{" "}
                <a href="https://www.youtube.com/playlist?list=PL4cUxeGkcC9h77dJ-QJlwGlZlTd4ecZOA">
                  tutorial
                </a>
              </ListGroup.Item>
              <ListGroup.Item>
                ngnix: We are using the{" "}
                <a href="https://docs.nginx.com/">documentation</a>, as well as
                YouTube tutorials
              </ListGroup.Item>
              <ListGroup.Item>
                JavaScript: The front-end lead (Kevin Liu) will be holding
                meetings throughout the semester to update us on JavaScript
                standards and will be assisting other members
              </ListGroup.Item>
              <ListGroup.Item>
                Express: The back-end lead (Justin Wang) will be holding
                meetings throughout the semester to explain how Express works
                and will assist other members
              </ListGroup.Item>
              <ListGroup.Item>
                React: The front-end lead will assist other members, as
                explained for JavaScript. Each member is also independently
                going through the{" "}
                <a href="https://reactjs.org/tutorial/tutorial.html">
                  documentation
                </a>
                .
              </ListGroup.Item>
            </>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </>
  );
}

export default Home;
