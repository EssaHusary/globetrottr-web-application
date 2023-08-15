// TODO for the future: merge this with useFetch to make it
// a general purpose hook for talking to the backend

// this does not work...

/**
 * A failed attempt at making a generic hook for POST requests.
 * Don't use it.
 */
import { useState, useEffect } from "react";

function usePost(url, data, redirect) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(true);

  //const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController(); // for cancelling fetch requests when component unmounts

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => {
        if (!resp.ok) throw Error("Can't fetch from that resourse!");
        return resp.json();
      })
      .then((data) => {
        setResponse(data);
        setPending(false);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        setPending(false);
      });

    // cleanup function that runs when the component unmounts
    return () => {
      abortController.abort();
    };
  }, [url, data]);

  return { response, error, pending };
}

export default usePost;
