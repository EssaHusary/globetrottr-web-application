import React from "react";

/* components */
import CollapsableSection from "../Components/CollapsableSection";
import EventPreview from "../Components/EventPreview";

/* icons */
import { MdPerson } from "react-icons/md";

/**
 * The page that displays the details of a schedule and all events and routes 
 *     in it.
 * Eacn event or route is displayed with an EventPreview component.
 * Here's another bad ascii art that shows the structure of this page:
 * -----------------------------
 * | scheduleDetailedViewTitle |
 * -----------------------------
 * | scheduleDetailedViewEvents|
 * |                           |
 * |  | collapsableSection |   |
 * |  |    event           |   |
 * |  |    route           |   |
 * |  |    event           |   |
 * |  |    route           |   |
 * |  |    ...             |   |
 * |  |    ...             |   |
 * |  |- - - - - - - - - - |   |
 * |                           |
 * -----------------------------
 * @param {Object} schedule The schedule object to be displayed by this page.
 * @returns {ReactNode} The schedule view page.
 */

function ScheduleView({ schedule }) {
  const events = schedule.events ? schedule.events : [];
  const routes = schedule.routes ? schedule.routes : [];
  const eventsAndRoutes = [];

  //  create the eventsAndRoutes array by alternating appending events and 
  //      routes
  for (let i = 0; i < events.length; i++) {
    eventsAndRoutes.push(events[i]);
    
    //  last event doesn't need a route after it
    if (i !== events.length - 1) {
      eventsAndRoutes.push(routes[i]);
    }
  }

  return (
    <div className="scheduleDetailedView">

      {/* The title section that displays some summary of the schedule 
      Displays the destination, start date, end date, party size, total cost,
      and the average midpoint rating */}
      <div className="scheduleDetailedViewTitle">
        <div style={{ color: "gray" }}>TRIP TO</div>

        <h1>{schedule?.destination ? schedule.destination : "Somewhere!"}</h1>

        <div className="flex align-items-center mb-2">
          {schedule?.startDate
            ? schedule.startDate.toString().substring(0, 10)
            : " 2023-03-11 "}
          &nbsp;~&nbsp;
          {schedule?.endDate
            ? schedule.endDate.toString().substring(0, 10)
            : " 2023-03-27 "}
          &nbsp;•&nbsp;
          <MdPerson /> {schedule?.partySize ? schedule.partySize : 4}
          &nbsp;•&nbsp; $ {schedule ? schedule.totalCost : 4200}
        </div>

        <div style={{ color: "gray" }}>
          Avg. Midpoint Rating: {schedule ? schedule.averageMidpointRating : 5}
        </div>
      </div>
      
      {/* The list of event and routes. Each item would be displayed via an 
              EventPreview component. In the future the array of events and 
                  routes should be grouped by start and end dates (if 
                      available) */}
      
      <div className="scheduleDetailedViewEvents">
        <CollapsableSection
          title={"All Events"}
          children={
            <div>
              {/* Display all events/routes with EventPreview */}
              {eventsAndRoutes.map((ev, index, elements) => {
                return (
                  <EventPreview
                    event={ev}
                    prevEvent={elements[index - 1]}
                    nextEvent={elements[index + 1]}
                    key={index}
                  />
                );
              })}
            </div>
          }
        />
      </div>
    </div>
  );
}

export default ScheduleView;
