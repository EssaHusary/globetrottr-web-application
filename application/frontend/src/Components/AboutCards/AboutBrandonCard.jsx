import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import bk_pf from "../../Assets/img/pfp/brandon.jpg";
import Card from "react-bootstrap/Card";

function AboutBrandonCard() {
  return (
    <Card className="mx-auto m-4" style={{ width: "20rem" }}>
      <Card.Img variant="img-center" src={bk_pf} />
      <Card.Body className="text-center">
        <Card.Title className="mx-auto fs-4">Brandon Khuu</Card.Title>
      </Card.Body>
      <Card.Subtitle class="text-muted">Major: Computer Science</Card.Subtitle>
      <Card.Subtitle class="text-muted">Github: b-khuu</Card.Subtitle>
      <Card.Subtitle class="text-muted">
        Skills: C++, Java, HTML, CSS
      </Card.Subtitle>
      <Card.Subtitle class="text-muted">Dev</Card.Subtitle>
    </Card>
  );
}

export default AboutBrandonCard;
