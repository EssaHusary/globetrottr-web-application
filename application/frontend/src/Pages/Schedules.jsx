import React from "react";

import { generalPost } from "../Toolbox/generalPost";

/* components */
import CollapsableSection from "../Components/CollapsableSection";
import SchedulePreviewCard from "../Components/SchedulePreviewCard";
import { Button } from "react-bootstrap";

/**
 * The schedules page (aka dashboard).
 * This page talks to the backend to retrieve the user's schedules and display
 *     them in SchedulePreviewCards.
 * This is also the first page the users sees afrer logging in.
 * @returns {ReactNode} The schedules page.
 */

function Schedules() {
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [schedules, setSchedules] = React.useState(null);

  const [currentSchedules, setCurrentSchedules] = React.useState([]);
  const [plannedSchedules, setPlannedSchedules] = React.useState([]);
  const [pastSchedules, setPastSchedules] = React.useState([]);

  //  get the user's schedules from the backend upon loading the page
  //  we use a post request because we need to send the user's id
  React.useEffect(() => {
    setPending(true);
    generalPost(`${process.env.REACT_APP_BASE_URL}/schedule/getUserSchedules`, {
      //  logged in user's id should be stored in localStorage
      _id: localStorage.getItem("userID"),
    })
      .then((resp) => {
        setSchedules(resp);
        setPending(false);
      })
      .catch((err) => {
        setError(err);
        setPending(false);
      });
  }, []);

  //  sort the schedules into current, planned, and past
  React.useEffect(() => {
    let current = [];
    let planned = [];
    let past = [];
    const today = new Date();

    if (schedules === null) return;

    schedules.map((schedule) => {
      if (Date.parse(schedule.startDate) > today) {
        planned.push(schedule);
      } else if (Date.parse(schedule.endDate) < today) {
        past.push(schedule);
      } else {
        current.push(schedule);
      }
    });

    current.sort((a, b) => Date.parse(a.startDate) - Date.parse(b.startDate));
    planned.sort((a, b) => Date.parse(a.startDate) - Date.parse(b.startDate));
    past.sort((a, b) => Date.parse(a.startDate) - Date.parse(b.startDate));
    setCurrentSchedules(current);
    setPlannedSchedules(planned);
    setPastSchedules(past);
  }, [schedules]);

  return (
    <div className="dashboard">
      {pending && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {/* Once we got the schedules we display them */}
      <CollapsableSection
        title="Current"
        children={
          //  reverse is for displaying the most recent schedules first
          currentSchedules.map((schedule, index) => {
            return (
              <SchedulePreviewCard
                key={index}
                schedule={schedule}
                removeButton={true}
              />
            );
          })
        }
      />

      <CollapsableSection
        title="Planned"
        children={
          //  reverse is for displaying the most recent schedules first
          plannedSchedules.map((schedule, index) => {
            return (
              <SchedulePreviewCard
                key={index}
                schedule={schedule}
                removeButton={true}
              />
            );
          })
        }
      />

      <CollapsableSection
        title="Past"
        children={
          //  reverse is for displaying the most recent schedules first
          pastSchedules.map((schedule, index) => {
            return (
              <SchedulePreviewCard
                key={index}
                schedule={schedule}
                removeButton={true}
              />
            );
          })
        }
        isOpen={false}
      />
    </div>
  );
}

export default Schedules;
