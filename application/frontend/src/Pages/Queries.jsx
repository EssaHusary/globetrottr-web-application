import React from "react";

/* components */
import QueryPreviewCard from "../Components/QueryPreviewCard";

/* functions */
import { generalPost } from "../Toolbox/generalPost";

/**
 * The queries page. This page talks to the backend to retrieve the user's queries and display them in cards.
 * On clicking a card, the user will be taken to the create form page with the query object pre-filled.
 * @returns {ReactNode} The queries page.
 */
function Queries() {
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [queries, setQueries] = React.useState(null);

  // get the user's queries from the backend upon loading the page
  React.useEffect(() => {
    setPending(true);
    generalPost(`${process.env.REACT_APP_BASE_URL}/query/getUserQueries`, {
      _id: localStorage.getItem("userID"),
    })
      .then((resp) => {
        setQueries(resp);
        setPending(false);
      })
      .catch((err) => {
        setError(err);
        setPending(false);
      });
  }, []);

  return (
    <div className="queries">
      {pending && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {queries &&
        queries.reverse().map((query, index) => {
          return <QueryPreviewCard key={index} query={query} />;
        })}
    </div>
  );
}

export default Queries;
