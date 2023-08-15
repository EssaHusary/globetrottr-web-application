import React from "react";
import { Card, Offcanvas, Row } from "react-bootstrap";
import { useState } from "react";

import {
  MdFiberManualRecord,
  MdOutlineLocationOn,
  MdArrowDownward,
  MdArrowRightAlt,
  MdStarRate
} from "react-icons/md";

/**
 * This component is a combination of a preview of an event or a route in the schedule.
 * It should be only used within the ScheduleView component.
 * Clicking on it shows an offcanvas with the details of the event or route.
 * @param {Object} event The event object. Could be a route or an event.
 * @param {Object} prevEvent The previous event in the schedule, mainly required to displaying the starting point of a route.
 * @param {Object} nextEvent The next event in the schedule, mainly required to displaying the ending point of a route.
 * @returns {ReactNode} The event preview object.
 */

function EventPreview({ event, prevEvent, nextEvent }) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // if there's a travelMean property in the incoming event object, it's a route (true), else it's an event (false)
  const tempToggle = event?.travelMean ? false : true; 

  return (
    <div>
      <div className="eventPreview" onClick={handleShow}>

        {/* If it's an event, show the location name */}
        {tempToggle && (
          <div>
            <MdOutlineLocationOn style={{ scale: "150%" }} />
            <div className="location">
              {event?.midpoint ? event.midpoint.name : "Location"}
            </div>
          </div>
        )}

        {/* If it's an route, show the travel means */}
        {!tempToggle && (
          <div>
            <MdFiberManualRecord style={{ scale: "60%" }} />
            <div className="location">
              {event?.travelMean ? event.travelMean : "Travel Mean"}{" "}
              {event?.travelDistance ? event.travelDistance : "N/A"} km for{" "}
              {event?.travelDuration
                ? Math.round((event.travelDuration * 100) / 60) / 100
                : "N/A"}{" "}
              minutes.
            </div>
          </div>
        )}

        {/*this format is temporal until I figure out how to group events by date*/}
        <div className="startTime">
          {/* <div>{event?.startDate? (event.startDate.toString()).substring(5, 10) : "03-11"}</div>
                    <div>{event?.startDate? (event.startDate.toString()).substring(11, 16) : "10:50"}</div> */}
        </div>
      </div>

      {/**the offcanvas that shows the details of the event */}
      <Offcanvas
        show={show}
        placement={"bottom"}
        className="eventViewOffcanvas h-auto"
        onHide={handleClose}
      >
        {/* Header of the offCanvas with a button to close it. Shows "VISITING/STAYING" or "TRAVELING" based on if the current
        event to be displayed is an event or a route */}
        <Offcanvas.Header closeButton>
          <div className="eventTitle">
            {tempToggle && "VISITING / STAYING"}
            {!tempToggle && "TRAVELING"}
          </div>
        </Offcanvas.Header>

        <Offcanvas.Body className="mb-4 eventDetail">
          {/* If it's an event, show the location name, date, rating, quick knowledge and hashtags */}
          {tempToggle && (
            <div>
              <h1>{event?.midpoint ? event.midpoint.name : "Location"}</h1>

              {event?.startDate !== "N/A" &&
                <div className="mt-4 flex">
                  {event?.startDate ? event.startDate : ""}
                  &nbsp; <MdArrowRightAlt /> &nbsp;
                  {event?.endDate ? event.endDate : ""} &nbsp;
                </div>
              }

              <div>
                  <MdStarRate/>{" "}
                  {event?.midpoint?.rating ? event.midpoint.rating : "4.2"}
              </div>

              <div className="mt-2 grid">

                {event?.midpoint?.quickKnowledge[0] !== "N/A" &&
                  <div className="mt-1">
                    {event?.midpoint?.quickKnowledge
                      ? event.midpoint.quickKnowledge.map((item, index) => {
                          return <div key={index}>Quick Knowledge: {item}</div>;
                        })
                      : "Quick Knowledge"}
                  </div>
                }
                

                <div className="mt-1 hashtags">

                  {/*Don't really know why I have to use inline style to make it work... */}
                  <div style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      margin: "20px auto",
                  }}>
                    <div style={{color: 'gray'}}>Hashtags</div>
                    <hr style={{
                        flex: "1",
                        margin: "0 10px",
                        borderColor: "#333",
                        borderWidth: "1px",
                    }}/>
                  </div>

                  {event?.midpoint?.hashtags
                    ? event.midpoint.hashtags[0].split(",").map((item, index) => {
                        return <div key={index}>#{item}</div>;
                      })
                    : "Hashtags"}

                </div>
                
              </div>
            </div>
          )}

          {/* If it's an route, show the travel means, starting point, ending point, date, duration, distance and cost */}
          {!tempToggle && (
            <div>
              <div>
                <h1>
                  {prevEvent?.midpoint ? prevEvent.midpoint.name : "Point A"}
                </h1>
                <div className="mb-2">
                  <MdArrowDownward style={{ scale: "125%" }} />
                </div>
                <h1>
                  {nextEvent?.midpoint ? nextEvent.midpoint.name : "Point B"}
                </h1>
              </div>

              {event?.startDate !== "N/A" &&
                <div className="mt-4 flex">
                  <div>
                    {event?.startDate ? event.startDate : "03-11"}
                    &nbsp; <MdArrowRightAlt /> &nbsp;
                    {event?.endDate ? event.endDate : "03-11"} &nbsp;
                  </div>
                </div>
              }
              

              <div className="mt-2 grid" style={{ color: "gray" }}>
                {event?.travelMean ? event?.travelMean : "Uber • Via US101-N"}
                <div>
                  $15 &nbsp;•&nbsp;{" "}
                  {event?.travelDuration
                    ? Math.round((event.travelDuration * 100) / 60) / 100
                    : "N/A"}{" "}
                  minutes &nbsp;•&nbsp;
                  {event?.travelDistance ? event.travelDistance : "N/A"} km
                </div>
              </div>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default EventPreview;
