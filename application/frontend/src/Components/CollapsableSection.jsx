import React from "react";
import { useState } from "react";
import { Collapse, Button } from "react-bootstrap";

import { FaChevronUp, FaChevronDown } from "react-icons/fa";

/**
 * A collapsable section that can be used to hide and show any content
 * Usually used for hiding and showing a group of items i.e., schedule cards, query cards
 * It looks something like this: Title---------------^
 * @param {String} title The title of the section that hints what's inside
 * @param {ReactNode} children The content that will be hidden and shown
 * @param {Boolean} isOpen Whether the section should be open or closed by default. If not specified, it will be open by default
 * @returns {ReactNode} The collapsable section
 */

function CollapsableSection({ title, children, isOpen }) {
  const [open, setOpen] = useState(isOpen === undefined ? true : isOpen);

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          margin: "20px auto",
        }}
      >
        {/* The title, the gray line and the collapse button*/}
        <div style={{ color: "gray" }}>{title}</div>
        <hr
          style={{
            flex: "1",
            margin: "0 10px",
            borderColor: "#333",
            borderWidth: "2px",
          }}
        ></hr>
        <div>
          <div
            onClick={() => setOpen(!open)}
            aria-controls="currentSchedules"
            aria-expanded={open}
          >
            {open ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </div>
      </div>
      
      {/* The content that will be hidden and shown */}
      <Collapse in={open}>
        <div style={{ width: "100%" }}>{children}</div>
      </Collapse>
      
    </div>
  );
}

export default CollapsableSection;
