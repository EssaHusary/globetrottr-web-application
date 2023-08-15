/**
 * A general purpose function for sending PATCH requests to the backend.
 * Returns the response body as a JSON object, or throws an error if the request failed.
 * 
 * @param {String} url The URL to send the request to
 * @param {Object} data The body of the request, if any
 * @param {Object} headers The headers of the request, default value would be used if not provided.
 * @returns 
 */
export async function generalPatch(
  url,
  data = {},
  headers = { "Content-Type": "application/json" }
) {
  const response = await fetch(url, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  } else {
    const responseJson = await response.json();
    return responseJson;
  }
}
