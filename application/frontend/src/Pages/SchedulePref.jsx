import { useState, React } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Modal } from "react-bootstrap";

/**
 * The schedule preference page with a form that allows users to edit their schedule preferences,
 * This is not yet wired with the backend.
 * @returns {ReactNode} The schedule preference page.
 */

function SchedulePref() {
  const navigate = useNavigate();

  let tempUser = JSON.parse(localStorage.getItem("fullUserObject"));
  let preferredTravelMethods = tempUser.userDescription.preferredTravelMethods;
  let preferredCuisine = tempUser.userDescription.preferredCuisine;
  let preferredActivities = tempUser.userDescription.preferredActivities;
  let favoriteHashtags = tempUser.userDescription.favoriteHashtags;

  const [carChecked, setCarChecked] = useState(
    preferredTravelMethods.includes("car")
  );
  const [busChecked, setBusChecked] = useState(
    preferredTravelMethods.includes("bus")
  );
  const [trainChecked, setTrainChecked] = useState(
    preferredTravelMethods.includes("train")
  );
  const [walkingChecked, setWalkingChecked] = useState(
    preferredTravelMethods.includes("walking")
  );

  const [americanChecked, setAmericanChecked] = useState(
    preferredCuisine.includes("american")
  );
  const [chineseChecked, setChineseChecked] = useState(
    preferredCuisine.includes("chinese")
  );
  const [mexicanChecked, setMexicanChecked] = useState(
    preferredCuisine.includes("mexican")
  );
  const [thaiChecked, setThaiChecked] = useState(
    preferredCuisine.includes("thai")
  );

  const [hikingChecked, setHikingChecked] = useState(
    preferredActivities.includes("hiking")
  );
  const [shoppingChecked, setShoppingChecked] = useState(
    preferredActivities.includes("shopping")
  );
  const [themeParksChecked, setThemeParksChecked] = useState(
    preferredActivities.includes("theme parks")
  );
  const [sightseeingChecked, setSightseeingChecked] = useState(
    preferredActivities.includes("sightseeing")
  );

  const [petChecked, setPetChecked] = useState(
    favoriteHashtags.includes("#pet-friendly")
  );
  const [historicalChecked, setHistoricalChecked] = useState(
    favoriteHashtags.includes("#historical")
  );
  const [artisticChecked, setArtisticChecked] = useState(
    favoriteHashtags.includes("#artistic")
  );
  const [relaxingChecked, setRelaxingChecked] = useState(
    favoriteHashtags.includes("#relaxing")
  );

  // modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function CheckboxComponent(target, number, currentValue, handleChange) {
    return (
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="checkbox"
          id={`inlineCheckbox${number}`}
          value={target}
          checked={currentValue}
          onChange={(e) => {
            handleChange(!currentValue);
          }}
        ></input>
        <label className="form-check-label">{target}</label>
      </div>
    );
  }

  async function updateTravelMethods() {
    if (
      carChecked &&
      !tempUser.userDescription.preferredTravelMethods.includes("car")
    ) {
      tempUser.userDescription.preferredTravelMethods.push("car");
    }
    if (
      busChecked &&
      !tempUser.userDescription.preferredTravelMethods.includes("bus")
    ) {
      tempUser.userDescription.preferredTravelMethods.push("bus");
    }
    if (
      trainChecked &&
      !tempUser.userDescription.preferredTravelMethods.includes("train")
    ) {
      tempUser.userDescription.preferredTravelMethods.push("train");
    }
    if (
      walkingChecked &&
      !tempUser.userDescription.preferredTravelMethods.includes("walking")
    ) {
      tempUser.userDescription.preferredTravelMethods.push("walking");
    }

    // unchecking...?
    if (
      !carChecked &&
      tempUser.userDescription.preferredTravelMethods.includes("car")
    ) {
      const idx =
        tempUser.userDescription.preferredTravelMethods.indexOf("car");
      tempUser.userDescription.preferredTravelMethods.splice(idx, 1);
    }
    if (
      !busChecked &&
      tempUser.userDescription.preferredTravelMethods.includes("bus")
    ) {
      const idx =
        tempUser.userDescription.preferredTravelMethods.indexOf("bus");
      tempUser.userDescription.preferredTravelMethods.splice(idx, 1);
    }
    if (
      !trainChecked &&
      tempUser.userDescription.preferredTravelMethods.includes("train")
    ) {
      const idx =
        tempUser.userDescription.preferredTravelMethods.indexOf("train");
      tempUser.userDescription.preferredTravelMethods.splice(idx, 1);
    }
    if (
      !walkingChecked &&
      tempUser.userDescription.preferredTravelMethods.includes("walking")
    ) {
      const idx =
        tempUser.userDescription.preferredTravelMethods.indexOf("walking");
      tempUser.userDescription.preferredTravelMethods.splice(idx, 1);
    }
  }

  async function updateCuisine() {
    if (
      americanChecked &&
      !tempUser.userDescription.preferredCuisine.includes("american")
    ) {
      tempUser.userDescription.preferredCuisine.push("american");
    }
    if (
      chineseChecked &&
      !tempUser.userDescription.preferredCuisine.includes("chinese")
    ) {
      tempUser.userDescription.preferredCuisine.push("chinese");
    }
    if (
      mexicanChecked &&
      !tempUser.userDescription.preferredCuisine.includes("mexican")
    ) {
      tempUser.userDescription.preferredCuisine.push("mexican");
    }
    if (
      thaiChecked &&
      !tempUser.userDescription.preferredCuisine.includes("thai")
    ) {
      tempUser.userDescription.preferredCuisine.push("thai");
    }

    // unchecking...?
    if (
      !americanChecked &&
      tempUser.userDescription.preferredCuisine.includes("american")
    ) {
      const idx = tempUser.userDescription.preferredCuisine.indexOf("american");
      tempUser.userDescription.preferredCuisine.splice(idx, 1);
    }
    if (
      !chineseChecked &&
      tempUser.userDescription.preferredCuisine.includes("chinese")
    ) {
      const idx = tempUser.userDescription.preferredCuisine.indexOf("chinese");
      tempUser.userDescription.preferredCuisine.splice(idx, 1);
    }
    if (
      !mexicanChecked &&
      tempUser.userDescription.preferredCuisine.includes("mexican")
    ) {
      const idx = tempUser.userDescription.preferredCuisine.indexOf("mexican");
      tempUser.userDescription.preferredCuisine.splice(idx, 1);
    }
    if (
      !thaiChecked &&
      tempUser.userDescription.preferredCuisine.includes("thai")
    ) {
      const idx = tempUser.userDescription.preferredCuisine.indexOf("thai");
      tempUser.userDescription.preferredCuisine.splice(idx, 1);
    }
  }

  async function updateActivities() {
    if (
      hikingChecked &&
      !tempUser.userDescription.preferredActivities.includes("hiking")
    ) {
      tempUser.userDescription.preferredActivities.push("hiking");
    }
    if (
      shoppingChecked &&
      !tempUser.userDescription.preferredActivities.includes("shopping")
    ) {
      tempUser.userDescription.preferredActivities.push("shopping");
    }
    if (
      sightseeingChecked &&
      !tempUser.userDescription.preferredActivities.includes("sightseeing")
    ) {
      tempUser.userDescription.preferredActivities.push("sightseeing");
    }
    if (
      themeParksChecked &&
      !tempUser.userDescription.preferredActivities.includes("theme parks")
    ) {
      tempUser.userDescription.preferredActivities.push("theme parks");
    }

    // unchecking ...?
    if (
      !hikingChecked &&
      tempUser.userDescription.preferredActivities.includes("hiking")
    ) {
      const idx =
        tempUser.userDescription.preferredActivities.indexOf("hiking");
      tempUser.userDescription.preferredActivities.splice(idx, 1);
    }
    if (
      !shoppingChecked &&
      tempUser.userDescription.preferredActivities.includes("shopping")
    ) {
      const idx =
        tempUser.userDescription.preferredActivities.indexOf("shopping");
      tempUser.userDescription.preferredActivities.splice(idx, 1);
    }
    if (
      !sightseeingChecked &&
      tempUser.userDescription.preferredActivities.includes("sightseeing")
    ) {
      const idx =
        tempUser.userDescription.preferredActivities.indexOf("sightseeing");
      tempUser.userDescription.preferredActivities.splice(idx, 1);
    }
    if (
      !themeParksChecked &&
      tempUser.userDescription.preferredActivities.includes("theme parks")
    ) {
      const idx =
        tempUser.userDescription.preferredActivities.indexOf("theme parks");
      tempUser.userDescription.preferredActivities.splice(idx, 1);
    }
  }

  async function updateHashtags() {
    if (
      petChecked &&
      !tempUser.userDescription.favoriteHashtags.includes("#pet-friendly")
    ) {
      tempUser.userDescription.favoriteHashtags.push("#pet-friendly");
    }
    if (
      historicalChecked &&
      !tempUser.userDescription.favoriteHashtags.includes("#historical")
    ) {
      tempUser.userDescription.favoriteHashtags.push("#historical");
    }
    if (
      artisticChecked &&
      !tempUser.userDescription.favoriteHashtags.includes("#artistic")
    ) {
      tempUser.userDescription.favoriteHashtags.push("#artistic");
    }
    if (
      relaxingChecked &&
      !tempUser.userDescription.favoriteHashtags.includes("#relaxing")
    ) {
      tempUser.userDescription.favoriteHashtags.push("#relaxing");
    }

    // unchecking...?
    if (
      !petChecked &&
      tempUser.userDescription.favoriteHashtags.includes("#pet-friendly")
    ) {
      const idx =
        tempUser.userDescription.favoriteHashtags.indexOf("#pet-friendly");
      tempUser.userDescription.favoriteHashtags.splice(idx, 1);
    }
    if (
      !historicalChecked &&
      tempUser.userDescription.favoriteHashtags.includes("#historical")
    ) {
      const idx =
        tempUser.userDescription.favoriteHashtags.indexOf("#historical");
      tempUser.userDescription.favoriteHashtags.splice(idx, 1);
    }
    if (
      !artisticChecked &&
      tempUser.userDescription.favoriteHashtags.includes("#artistic")
    ) {
      const idx =
        tempUser.userDescription.favoriteHashtags.indexOf("#artistic");
      tempUser.userDescription.favoriteHashtags.splice(idx, 1);
    }
    if (
      !relaxingChecked &&
      tempUser.userDescription.favoriteHashtags.includes("#relaxing")
    ) {
      const idx =
        tempUser.userDescription.favoriteHashtags.indexOf("#relaxing");
      tempUser.userDescription.favoriteHashtags.splice(idx, 1);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await updateTravelMethods();
    await updateCuisine();
    await updateActivities();
    await updateHashtags();

    await fetch(`${process.env.REACT_APP_BASE_URL}/user/update/description`, {
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
            handleShow();
          });
        }
      })
      .catch((err) => {
        alert(JSON.stringify(err));
        alert("fetch not ok");
      });
  }

  return (
    <div className="Schedule Preference">
      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Body> Schedule preference updated! </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              navigate("/profile");
            }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      <Form onSubmit={handleSubmit}>
        <table className="table">
          <Form.Group controlId="preferredTravel">
            <tbody>
              <caption className="w-100">PREFERRED TRAVEL</caption>
              <tr>
                <td>
                  {CheckboxComponent("car", "1", carChecked, setCarChecked)}

                  <div className="second two choices">
                    {CheckboxComponent("bus", "2", busChecked, setBusChecked)}
                  </div>
                </td>
                <td>
                  {CheckboxComponent(
                    "walking",
                    "3",
                    walkingChecked,
                    setWalkingChecked
                  )}

                  <div className="second two choices">
                    {CheckboxComponent(
                      "train",
                      "4",
                      trainChecked,
                      setTrainChecked
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </Form.Group>
          <Form.Group controlId="preferredFood">
            <tbody>
              <caption className="w-100">PREFERRED FOOD</caption>
              <tr>
                <td>
                  {CheckboxComponent(
                    "chinese",
                    "1",
                    chineseChecked,
                    setChineseChecked
                  )}

                  <div className="second two choices">
                    {CheckboxComponent(
                      "american",
                      "2",
                      americanChecked,
                      setAmericanChecked
                    )}
                  </div>
                </td>
                <td>
                  {CheckboxComponent(
                    "mexican",
                    "3",
                    mexicanChecked,
                    setMexicanChecked
                  )}
                  <div className="second two choices">
                    {CheckboxComponent(
                      "thai",
                      "4",
                      thaiChecked,
                      setThaiChecked
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </Form.Group>
          <Form.Group controlId="preferredActivities">
            <tbody>
              <caption className="w-100">PREFERRED ACTIVITIES</caption>
              <tr>
                <td>
                  {CheckboxComponent(
                    "hiking",
                    "1",
                    hikingChecked,
                    setHikingChecked
                  )}

                  <div className="second two choices">
                    {CheckboxComponent(
                      "shopping",
                      "2",
                      shoppingChecked,
                      setShoppingChecked
                    )}
                  </div>
                </td>
                <td>
                  {CheckboxComponent(
                    "sightseeing",
                    "3",
                    sightseeingChecked,
                    setSightseeingChecked
                  )}

                  <div className="second two choices">
                    {CheckboxComponent(
                      "theme parks",
                      "4",
                      themeParksChecked,
                      setThemeParksChecked
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </Form.Group>
          <Form.Group controlId="preferredTags">
            <tbody>
              <caption className="w-100">FAVORITE HASHTAGS</caption>
              <tr>
                <td>
                  {CheckboxComponent(
                    "#relaxing",
                    "1",
                    relaxingChecked,
                    setRelaxingChecked
                  )}

                  <div className="second two choices">
                    {CheckboxComponent(
                      "#pet-friendly",
                      "2",
                      petChecked,
                      setPetChecked
                    )}
                  </div>
                </td>
                <td>
                  {CheckboxComponent(
                    "#historical",
                    "3",
                    historicalChecked,
                    setHistoricalChecked
                  )}
                  <div className="second two choices">
                    {CheckboxComponent(
                      "#artistic",
                      "4",
                      artisticChecked,
                      setArtisticChecked
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </Form.Group>
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
          <Button type="submit" className="btn btn-primary">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
export default SchedulePref;
