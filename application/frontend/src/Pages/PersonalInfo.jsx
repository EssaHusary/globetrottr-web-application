import { useState, React} from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

/**
 * The personal info editing page.
 * With a form that allows users to edit their name, email, age and gender.
 * @returns {ReactNode} The personal info editing page.
 */

function PersonalInfo() {
  const navigate = useNavigate();
  let tempUser = JSON.parse(localStorage.getItem("fullUserObject"));
  
  const [ageState,     setAgeState]     = useState(tempUser.userDescription.age);
  const [genderState,  setGenderState]  = useState(tempUser.userDescription.gender);
  const [aboutMeState, setAboutMeState] = useState(tempUser.userDescription.aboutMe);

  // modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function handleSubmit(e) {
    e.preventDefault();

    tempUser.userDescription.age     = ageState;
    tempUser.userDescription.gender  = genderState;
    tempUser.userDescription.aboutMe = aboutMeState;
    
    await fetch(`${process.env.REACT_APP_BASE_URL}/user/update/information`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(tempUser)
    }) 
    .then ((response) => {
      if (!response.ok) {
        const errorMessage = response.text();
        throw new Error(errorMessage);
      } 
      else {
        localStorage.setItem("fullUserObject", JSON.stringify(tempUser));
        handleShow();
      }
    })
    .catch ((err) => {
      alert(JSON.stringify(err));
    });
  }

  return (
    <div className="personalInfo">
      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Body> Personal information updated! </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => {handleClose(); navigate('/profile')}}>
              OK
            </Button>
          </Modal.Footer>
      </Modal>
      <Form onSubmit={handleSubmit}>
        <table className="table">
          <tbody>
            <tr>
              <td>
                <Form.Label>AGE</Form.Label>
              </td>
              <td className="w-75">
                <Form.Group controlId="formBasicAge">
                  <Form.Control 
                  type="number"
                  value={ageState} 
                  onChange={(e) => {
                    setAgeState(e.target.value);
                  }}
                  placeholder={ageState} 
                />
                </Form.Group>
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label>GENDER</Form.Label>
              </td>
              <td className="w-75">
                <Form.Group controlId="formBasicGender">
                  <Form.Control 
                    type="text" 
                    value={genderState} 
                    onChange={(e) => {
                      setGenderState(e.target.value)
                    }}
                    placeholder={genderState}
                  />
                </Form.Group>
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label>TELL US ABOUT YOURSELF</Form.Label>
              </td>
              <td className="w-75">
                <Form.Group controlId="formBasicAboutMe">
                  <Form.Control 
                    type="tet"
                    value={aboutMeState} 
                    onChange={(e) => {
                      setAboutMeState(e.target.value)
                    }} 
                    placeholder={aboutMeState}
                  />
                </Form.Group>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="btn-toolbar">
          <Button
            className="btn btn-light mx-3"
            type="cancel"
            onClick={() => {
              navigate("/profile");
            }}
          >
            Cancel
          </Button>
          <Button type="submit" class="btn btn-primary">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
export default PersonalInfo;
