import React from "react";

import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Offcanvas } from "react-bootstrap";

/* pages and components */
import ScheduleView from "../Pages/ScheduleView";

/* icons */
import {
  MdOutlineSaveAlt,
  MdArrowBackIosNew,
  MdPerson,
  MdDelete,
  MdAccessTime,
  MdStar,
  MdDone,
} from "react-icons/md";

/* functions */
import { generalPatch } from "../Toolbox/generalPatch";

/**
 * This preview card takes in a schedule object and will display some preview
 *     information on the card itself.
 * Binded with this preview card is a offCanvas component that displays the
 *     details of the schedule, and a page that shows all the events
 *         (ScheduleView).
 * This also comes with a save button that can be toggled on and off. The save
 *     button will save the schedule to the user's account.
 * @param {Schedule} schedule the schedule to be viewed in detail
 * @param {boolean} saveButton whether the save button should be shown
 * @param {boolean} removeButton whether the remove button should be shown;
 *     false implies it won't be shown
 * @returns {ReactNode} the preview card itself and the offCanvas component
 *     that shows the details of the schedule
 */
function SchedulePreviewCard({
  schedule,
  saveButton = false,
  removeButton = false,
}) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [showSave, setShowSave] = useState(saveButton);

  const handleSave = () => {
    generalPatch(`${process.env.REACT_APP_BASE_URL}/schedule/add`, {
      _id: localStorage.getItem("userID"),
      schedule: schedule,
    }).then((resp) => {
      // make the save button disappear after it got saved
      setShowSave(false);
    });
  };

  const handleRemove = () => {
    generalPatch(`${process.env.REACT_APP_BASE_URL}/schedule/remove`, {
      _id: localStorage.getItem("userID"),
      schedule: schedule,
    }).then(window.location.reload(true)); // refresh the page
  };

  return (
    <div className="schedulePreviewCard">
      <Card className="w-100 generalCard">
        <div className="d-flex flex-row">
          <div className="w-100" onClick={handleShow}>
            <label style={{ color: "gray" }}>TRIP TO</label>
            <h1>
              {schedule?.destination ? schedule.destination : "Somewhere!"}
            </h1>

            <div>
              {schedule?.startDate
                ? schedule.startDate.toString().substring(0, 10)
                : " 2023-03-11 "}
              &nbsp;~&nbsp;
              {schedule?.endDate
                ? schedule.endDate.toString().substring(0, 10)
                : " 2023-03-27 "}
              <div style={{ color: "gray" }} className="mt-1">
                <MdPerson /> {schedule?.partySize ? schedule.partySize : 4}
                &nbsp;•&nbsp; ${" "}
                {schedule?.totalCost ? schedule.totalCost : 4200}
                &nbsp;• <MdAccessTime />{" "}
                {schedule?.totalTravelTime ? schedule.totalTravelTime : "N/A"}
                &nbsp;• <MdStar />{" "}
                {schedule?.averageMidpointRating
                  ? schedule.averageMidpointRating
                  : "N/A"}
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center">
            {removeButton && (
              <Button
                variant="outline-link"
                className="removeButton"
                onClick={handleRemove}
              >
                <MdDelete style={{ scale: "150%" }} />
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* The offCanvas component binded with the preview card. 
          The header shows a close button, a title ("Schedule") and a save 
              button (if toggled on)*/}
      <Offcanvas
        show={show}
        placement={"end"}
        className="scheduleViewOffcanvas w-100"
      >
        <Offcanvas.Header className="p-0">
          <div className="scheduleViewTitle flex align-items-center">
            <Button
              variant="outline-link"
              className="p-0"
              onClick={handleClose}
            >
              <MdArrowBackIosNew style={{ scale: "175%" }} />
            </Button>
            <h1>Schedule</h1>

            {showSave && (
              <Button
                variant="outline-link"
                className="saveButton"
                onClick={handleSave}
              >
                <MdOutlineSaveAlt style={{ scale: "175%" }} />
              </Button>
            )}

            {!showSave && (
              <div className="saveButton">
                <MdDone style={{ scale: "175%" }} className="saveButton me-1" />{" "}
                Saved
              </div>
            )}
          </div>
        </Offcanvas.Header>

        {/* Below the header is a page (ScheduleView) that takes the schedule 
                in and displays all the details and events of that schedule */}
        <Offcanvas.Body>
          <ScheduleView schedule={schedule} />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default SchedulePreviewCard;
