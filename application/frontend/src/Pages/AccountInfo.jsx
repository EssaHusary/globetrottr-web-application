import { useState, React } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Modal } from "react-bootstrap";

/**
 * The account info editing page.
 * With a form that allows users to edit their email and password.
 * It hadn't been wired with the backend yet.
 * @returns {ReactNode} The account info editing page.
 */

function AccountInfo() {
  const navigate = useNavigate();
  let tempUser = JSON.parse(localStorage.getItem("fullUserObject"));

  const [emailState, setEmail] = useState(tempUser.email);
  const [usernameState, setUsername] = useState(tempUser.username);
  const [passwordState, setPassword] = useState(tempUser.password);

  // modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function handleSubmit(e) {
    e.preventDefault();

    tempUser.username = usernameState;
    tempUser.password = passwordState;
    tempUser.email = emailState;

    await fetch(`${process.env.REACT_APP_BASE_URL}/user/update/credentials`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tempUser),
    })
      .then((response) => {
        if (!response.ok) {
          const errorMessage = response.text();
          throw new Error(errorMessage);
        } else {
          response.json().then((resp) => {
            localStorage.setItem("fullUserObject", JSON.stringify(tempUser));
            localStorage.setItem("username", tempUser.username);
            handleShow();
          });
        }
      })
      .catch((err) => {
        alert(JSON.stringify(err));
      });
  }

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Body> Account information updated! </Modal.Body>
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
                <Form.Label>USERNAME</Form.Label>
              </td>
              <td className="w-75">
                <Form.Group controlId="formBasicUserName">
                  <Form.Control
                    type="text"
                    placeholder={usernameState}
                    value={usernameState}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </Form.Group>
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label>EMAIL</Form.Label>
              </td>
              <td className="w-75">
                <Form.Group controlId="formBasicUserName">
                  <Form.Control
                    type="text"
                    placeholder={emailState}
                    value={emailState}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Form.Group>
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label>PASSWORD</Form.Label>
              </td>
              <td className="w-75">
                <Form.Group controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    placeholder="redacted"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                  />
                </Form.Group>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="ml-2">
          <Button
            className="btn btn-light mr-5"
            type="cancel"
            onClick={() => {
              navigate("/profile");
            }}
          >
            Cancel
          </Button>
          <Button type="submit" class="btn btn-primary ml-5">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
export default AccountInfo;
