import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import shark from "../../Assets/img/pfp/shark.jpg";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

function AboutJustinCard() {
  return (
    <Card className="mx-auto m-5" style={{ width: "18rem" }}>
      <Card.Img variant="top" src={shark} />
      <Card.Body>
        <Card.Title className="mx-auto text-bold">Justin Wang</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Backend Lead/Dev
        </Card.Subtitle>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          <Card.Subtitle>Major:</Card.Subtitle>Computer Science
        </ListGroup.Item>
        <ListGroup.Item>
          <Card.Subtitle>Github:</Card.Subtitle> jwang648
        </ListGroup.Item>
        <ListGroup.Item>
          <Card.Subtitle>Skills:</Card.Subtitle> C++, Java, Javascript, C, R
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

export default AboutJustinCard;
