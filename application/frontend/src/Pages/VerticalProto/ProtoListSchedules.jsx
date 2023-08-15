import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

function ProtoListSchedules({ schedules }) {
  for (let j = 0; j < schedules.length; j++) {
    let schedule = schedules[j];

    const events = schedule.events ? schedule.events : [];
    const routes = schedule.routes ? schedule.routes : [];
    const eventsAndRoutes = [];

    // create the eventsAndRoutes array by alternating appending events and routes
    for (let i = 0; i < events.length; i++) {
      eventsAndRoutes.push(events[i]);
      
      // last event doesn't need a route after it
      if (i !== events.length - 1) {
        eventsAndRoutes.push(routes[i]);
      }
    }

    schedule["eventsAndRoutes"] = eventsAndRoutes;
  }

  return (
    <div className="listSchedules">
      {schedules.map((schedule, index) => (
        <Card key={index} className="mb-4">
          <Card.Header>Schedule #{schedule.scheduleId}</Card.Header>
          <Card.Body>
            <Card.Title className="mt-1">{schedule.destination}</Card.Title>
            <Card.Text>Total Cost: {schedule.totalCost}</Card.Text>
            <Card.Text>
              Avg. Midpoint Rating: {schedule.averageMidpointRating}
            </Card.Text>
            <Card.Text>
              Number of Midpoints: {schedule.numberOfMidpoints}
            </Card.Text>
            <Card.Text>
              Overall Schedule Rating (internal): {schedule.overallRating}
            </Card.Text>
            <Card.Text>User Schedule Rating: {schedule.userRating}</Card.Text>
            <Card.Text>
              Total travel time: {schedule.totalTravelTime} seconds
            </Card.Text>
            <Card.Title>Party Info </Card.Title>
            <Card.Text>Party Size: {schedule.partySize}</Card.Text>
            <Card.Text>Members: {schedule.party.join(", ")}</Card.Text>
            <Card.Title>Main Schedule Content</Card.Title>
            <ListGroup>
              {schedule.eventsAndRoutes.map((ev, index) => {
                if (ev.eventId) {
                  return (
                    <ListGroup.Item key={index}>
                      <Card className="mb-2">
                        <Card.Header>Event #{ev.eventId}</Card.Header>
                        <Card.Body>
                          <Card.Title>
                            Dates (Yes they are in UNIX timestamp)
                          </Card.Title>
                          <Card.Text>
                            {ev.startDate} to {ev.endDate}{" "}
                          </Card.Text>
                          <Card.Title>Midpoint Info</Card.Title>
                          <Card.Text>
                            Location: {ev.midpoint.location}, {ev.midpoint.midpointType}
                          </Card.Text>
                          <Card.Text>Rating: {ev.midpoint.rating}</Card.Text>
                          <Card.Text>
                            Hashtags: {ev.midpoint.hashtags.join(", ")}
                          </Card.Text>
                          <Card.Text>
                            Contact Information:{" "}
                            {ev.midpoint.contactInformation}
                          </Card.Text>
                          <Card.Text>
                            Quick Knowledge:{" "}
                            {ev.midpoint.quickKnowledge.join(", ")}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </ListGroup.Item>
                  );
                } else {
                  return (
                    <ListGroup.Item key={index}>
                      <Card className="mb-2">
                        <Card.Header>Route #{ev.routeId}</Card.Header>
                        <Card.Body>
                          <Card.Text>Travel Mean: {ev.travelMean}</Card.Text>
                          <Card.Title>
                            Dates (Yes they are in UNIX timestamp)
                          </Card.Title>
                          <Card.Text>
                            {ev.startDate} to {ev.endDate}{" "}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </ListGroup.Item>
                  );
                }
              })}
            </ListGroup>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default ProtoListSchedules;
