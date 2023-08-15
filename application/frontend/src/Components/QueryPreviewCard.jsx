import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

/* icons */
import { MdPerson } from "react-icons/md";

/**
 * This component is used to display a preview of query objects. It is only used in Queries.jsx.
 * This displays some brief information about the queries the user has made before
 * and allows the user to click on it to go to the create page with the query form prefilled.
 * @param {Object} query The query object to be displayed and passed to the create page when clicked 
 * @returns {ReactNode} The clickable query preview card
 */

function QueryPreviewCard({ query }) {
  const navigate = useNavigate();

  return (
    <Card
      style={{ width: "100%", padding: "8px", margin: "20px 0px" }}
      onClick={() => {
        navigate("/create", { state: { prefilled: true, query } }); // brings the query object to the create page
      }}
    >
      <div>
        <h1>
          {query?.city ? query.city : "City"},{" "}
          {query?.country ? query.country : "Country"}
        </h1>
        <div>
          {query?.startDate ? query.startDate : "Start Date"} to{" "}
          {query?.endDate ? query.endDate : "End Date"}
        </div>
        <div className="flex align-items-center" style={{ color: "gray" }}>
          <MdPerson /> {query?.partySize ? query.partySize : "8"}
          &nbsp;•&nbsp; $ {query?.budget ? query.budget : "4200"}
        </div>
      </div>
    </Card>
  );
}

export default QueryPreviewCard;
