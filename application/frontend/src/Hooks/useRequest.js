import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Another failed attempt at making a generic hook for all kinds of requests.
 * Don't use it.
 */

function useRequest(url, { method, headers, body } = {}) {
  const [response, setResponse] = useState(null);
  const [errorStatus, setErrorStatus] = useState(null);
  const [pending, setPending] = useState(false);

  const navigate = useNavigate();

  function sendGeneralRequest() {
    fetch(url, {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
    })
      .then((resp) => {
        if (!resp.ok) throw Error("Can't fetch from that resourse!");
        if (resp.status === 401) navigate("/login");

        return resp.json();
      })
      .then((data) => {
        setResponse(data);
        setErrorStatus(null);
      })
      .catch((error) => {
        setErrorStatus(error.message);
      });
  }

  function submitData(data) {
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((resp) => {
        if (!resp.ok) throw Error("Can't fetch from that resourse!");
        if (resp.status === 401) navigate("/login");

        return resp.json();
      })
      .then((data) => {
        setResponse(data);
        //setPending(false);
        setErrorStatus(null);
      })
      .catch((error) => {
        setErrorStatus(error.message);
      });
  }

  return { sendGeneralRequest, submitData, response, errorStatus }; // return an object to lower the chance of misalignment
}

export default useRequest;
