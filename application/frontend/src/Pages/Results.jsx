import React, { useEffect, useReducer } from "react";

/* components */
import SchedulePreviewCard from "../Components/SchedulePreviewCard";

/* hooks */
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

/* icons */
import { MdSwapVert } from "react-icons/md";
import { Dropdown } from "react-bootstrap";

/**
 * The results page where we display the generated schedules.
 * Scheudles are displayed with SchedulePreviewCards.
 * Users can choose how to sort the schedules. The default is by overall
 *     rating.
 * This is also where users review the generated schedules and save the ones
 *     they like.
 * @returns {ReactNode} The results page.
 */

function Results() {
  //  should be the same as ScheduleView but turn on save buttons on for each
  //      card
  //  also the sorting happens here so add that sorting dropdown
  //  idea: have a dropdown that says "Sort by" and then have options for cost
  //      and overall rating (which is the default)
  //  each item of the dropdown would be tied with a onclick that changes a
  //      state indicating the sorting method
  //  then have a useEffect that sorts the schedules based on the state

  const { state } = useLocation();
  const [sortingMethod, setSortingMethod] = useState(null);
  const [displaySortingMethod, setDisplay] = useState("Overall Rating");

  const resultSchedules = state.resp; //useState

  //  Will sort by a certain criteria depending on the drop down option the
  //      user selects. The nature of useEffect is such that the state of the
  //          array will be sorted when a DIFFERENT option is selected, never
  //              by the same option.
  useEffect(() => {
    //  Consider sorting by averageMidpointRating and totalTravelTime
    //  The type of sort will be performed depending on the selected sorting
    //      method
    switch (sortingMethod) {
      case "Overall Rating":
        resultSchedules.sort(
          (a, b) => parseFloat(b.overallRating) - parseFloat(a.overallRating)
        );
        break;
      case "Total Travel Time":
        resultSchedules.sort(
          (a, b) =>
            parseFloat(a.totalTravelTime) - parseFloat(b.totalTravelTime)
        );
        break;
      case "Average Spot Rating":
        resultSchedules.sort(
          (a, b) =>
            parseFloat(b.averageMidpointRating) -
            parseFloat(a.averageMidpointRating)
        );
        break;
    }

    setSortingMethod(null);
  }, [sortingMethod]);

  return (
    <div className="results mt-2 justify-items-center">
      <Dropdown>
        <Dropdown.Toggle variant="" id="dropdown-basic" className="px-0">
          <MdSwapVert size={30} />
          {displaySortingMethod}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              setSortingMethod("Overall Rating");
              setDisplay("Overall Rating");
            }}
          >
            Overall Rating
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setSortingMethod("Total Travel Time");
              setDisplay("Shortest Total Travel Time");
            }}
          >
            Shortest Total Travel Time
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setSortingMethod("Average Spot Rating");
              setDisplay("Average Spot Rating");
            }}
          >
            Average Spot Rating
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <div>
        {resultSchedules.map((schedule, index) => {
          return (
            <SchedulePreviewCard
              key={index}
              saveButton={true}
              schedule={schedule}
            />
          );
        })}
      </div>

      <div className="d-flex flex-row justify-content-center mt-5">
        <Link to={"/create"} className="">
          Fill in a new create form!
        </Link>
      </div>
    </div>
  );
}

export default Results;
