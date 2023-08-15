import "bootstrap/dist/css/bootstrap.css";

import Card from "react-bootstrap/Card";
import jayImage from "../../Assets/img/pfp/jayGupta.jpeg";
import ListGroup from "react-bootstrap/ListGroup";

function AboutJayCard() {
  return (
    <Card border="secondary" className="mx-auto m-3" style={{ width: "25rem" }}>
      <Card.Body className="text-center">
        <Card.Img variant="top" src={jayImage} />
        <Card.Title className="mt-2 fs-1">Jay Gupta</Card.Title>
        <Card.Subtitle className="mb-2 fs-4 text-muted">
          Team Lead
        </Card.Subtitle>
        <ListGroup style={{ textAlign: "left" }} variant="list-group-flush">
          <ListGroup.Item>Major: Computer Science</ListGroup.Item>
          <ListGroup.Item>GitHub: jaygupt</ListGroup.Item>
          <ListGroup.Item>
            Skills: Java, Node.js, Python, React, R
          </ListGroup.Item>
          <ListGroup.Item>Interested In: Machine Learning & AI</ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default AboutJayCard;
