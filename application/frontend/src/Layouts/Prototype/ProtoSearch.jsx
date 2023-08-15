import React from "react";
import { useState } from "react";
import ProtoListSchedules from "../../Pages/VerticalProto/ProtoListSchedules";

function ProtoSearch() {
  const [query, setQuery] = useState("");
  const [resp, setResp] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BASE_URL}/proto/test/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ destination: query }),
    })
      .then((res) => res.json())
      .then((data) => {
        setResp(data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="proto-search">
      <h3>Looking for something...?</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Search for Schedules by Destination! (Sample input: San Francisco)
        </label>
        <input
          type="text"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        ></input>
        <button>Go!</button>
      </form>

      {resp && <ProtoListSchedules schedules={resp} />}
    </div>
  );
}

export default ProtoSearch;
