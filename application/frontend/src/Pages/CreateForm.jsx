import React from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Form,
  Row,
  Col,
  InputGroup,
  Badge,
  Button,
  Modal,
} from "react-bootstrap";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { generalPatch } from "../Toolbox/generalPatch";
import { generalPost } from "../Toolbox/generalPost";

/**
 * This is the create form page, where users create queries and generate
 *     schedules.
 * Once they hit the submit button, the query will be sent to the backend to
 *     generate schedules.
 * After we get the schedules, we will navigate to the results page and bring
 *     the generated schedules with us.
 * Additionally, when the user clicks on the query history card, we'll bring
 *     the query object here to prefill the form.
 * @returns {ReactNode} The create form page.
 */

function CreateForm() {
  //  for catching whatever brought from query history page.
  const toBePrefilled = useLocation();

  // dig the hashtags and travel method that the user has selected in their profile
  const [hashtags, setHashtags] = useState([]);
  const [travelMethod, setTravelMethod] = useState([]);
  const user = JSON.parse(localStorage.getItem("fullUserObject"));
  React.useEffect(() => {
    setHashtags(
      user.userDescription?.favoriteHashtags
        ? user.userDescription.favoriteHashtags
        : []
    );
    setTravelMethod(
      user.userDescription?.preferredTravelMethods
        ? user.userDescription.preferredTravelMethods
        : []
    );
  }, []);

  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //  The query object. If there's a query object in the toBePrefilled state,
  //      then we prefill the form with it.
  const [scheduleForm, setscheduleForm] = useState({
    city: toBePrefilled.state?.query?.city
      ? toBePrefilled.state.query.city
      : "",
    country: toBePrefilled.state?.query?.country
      ? toBePrefilled.state.query.country
      : "",
    numberOfSchedules: toBePrefilled.state?.query?.numberOfSchedules
      ? toBePrefilled.state.query.numberOfSchedules
      : "",
    startDate: toBePrefilled.state?.query?.startDate
      ? toBePrefilled.state.query.startDate
      : "",
    endDate: toBePrefilled.state?.query?.endDate
      ? toBePrefilled.state.query.endDate
      : "",
    partySize: toBePrefilled.state?.query?.partySize
      ? toBePrefilled.state.query.partySize
      : "",
    budget: toBePrefilled.state?.query?.budget
      ? toBePrefilled.state.query.budget
      : "",
  });

  //  Automatically update the query object as the user fills the form
  const handleChange = (ev) => {
    setscheduleForm({
      ...scheduleForm,
      travelMeans: travelMethod,
      [ev.target.name]: ev.target.value,
    });
  };

  //  what to do when the user submits the form
  const [validated, setValidated] = useState(false);
  const handleSubmit = (e) => {
    //  prevent form from submitting until we do so manually
    e.preventDefault();

    //  show validation checks on form
    setValidated(true);

    //  validate the form to ensure all required fields have values
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }

    //  if the form is not prefilled, then we are creating a new query in the
    //      DB
    if (!toBePrefilled.state?.prefilled) {
      generalPatch(`${process.env.REACT_APP_BASE_URL}/query/add`, {
        _id: localStorage.getItem("userID"),
        query: scheduleForm,
      }).catch((err) => {
        console.log(err);
      });
    }

    //  call endpoint, if any issue, display here on this page
    setPending(true);
    generalPost(`${process.env.REACT_APP_BASE_URL}/schedule/generate`, {
      scheduleForm: scheduleForm,
    })
      .then((resp) => {
        setPending(false);
        navigate("results", { state: { resp } });
      })
      .catch((err) => {
        setError(JSON.parse(err.message).error);
      });
  };

  return (
    <div className="create">
      <Form
        noValidate
        validated={validated}
        style={{ maxWidth: "100%" }}
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <Form.Group controlId="cityAndCountry" className="mb-3 mt-2">
          <Row>
            <Col>
              <Form.Label>City</Form.Label>
              <Form.Control
                required
                type="text"
                name="city"
                defaultValue={scheduleForm.city}
              />
            </Col>
            <Col>
              <Form.Label>Country</Form.Label>
              <Form.Control
                required
                type="text"
                name="country"
                defaultValue={scheduleForm.country}
              />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group controlId="numberOfSchedules" className="mb-3 mt-2">
          <Form.Label>Number of Schedules</Form.Label>
          <Form.Control
            required
            type="number"
            name="numberOfSchedules"
            defaultValue={scheduleForm.numberOfSchedules}
            min={1}
            max={10}
          />
        </Form.Group>

        <Form.Group controlId="duration" className="mb-3 mt-2">
          <Form.Label>Duration</Form.Label>
          <InputGroup>
            <Form.Control
              required
              type="date"
              name="startDate"
              defaultValue={scheduleForm.startDate}
            />
            <InputGroup.Text>
              {" "}
              <BsFillArrowRightCircleFill />{" "}
            </InputGroup.Text>
            <Form.Control
              required
              type="date"
              name="endDate"
              defaultValue={scheduleForm.endDate}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="budgetAndPartySize" className="mb-3 mt-2">
          <Row>
            <Col>
              <Form.Label>Budget</Form.Label>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  required
                  type="text"
                  name="budget"
                  defaultValue={scheduleForm.budget}
                />
              </InputGroup>
            </Col>
            <Col>
              <Form.Label>Party Size</Form.Label>
              <Form.Control
                required
                type="number"
                name="partySize"
                defaultValue={scheduleForm.partySize}
                min={1}
              />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group controlId="hashtags" className="mb-3 mt-2">
          <Form.Label>Preferred Hashtags</Form.Label>
          <div className="flex">
            {hashtags.map((hashtag, index) => (
              <Badge pill bg="secondary me-1" key={index}>
                {hashtag}
              </Badge>
            ))}
          </div>
        </Form.Group>

        <Form.Group controlId="travelMeans">
          <Form.Label>Preferred Travel Means</Form.Label>
          <div className="flex">
            {travelMethod.map((hashtag, index) => (
              <Badge pill bg="secondary me-1" key={index}>
                {hashtag}
              </Badge>
            ))}
          </div>
        </Form.Group>

        {!pending && (
          <Button variant="primary" type="submit" className="mt-5 w-100">
            Let's GO!
          </Button>
        )}
        {pending && (
          <Button variant="secondary" className="mt-5 w-100" disabled>
            Working on it...
          </Button>
        )}
      </Form>

      <Modal
        show={error}
        onHide={() => {
          setError(null);
          setPending(false);
        }}
        centered
      >
        <Modal.Body>{error}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setError(null);
              setPending(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateForm;
