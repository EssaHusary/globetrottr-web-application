import { useState, useEffect } from "react";

/**
 * This is a generic hook that can be used to fetch data from URLs, usually our API endpoints.
 * Feed an URL to it and it will shoot a GET request and return the data from that URL.
 * (or an error if something went wrong)
 * This is only for GET requests, use generalPatch and generalPost for other requests.
 * @param {string} url the URL to fetch data from 
 * @returns {object} the data (the body of the response) or error if something went wrong
 */

function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((resp) => {
        if (!resp.ok) throw Error("Can't fetch from that resourse!");
        return resp.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [url]);

  return { data, error };
}

export default useFetch;
