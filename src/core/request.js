/**
 * Created by alexander on 23.08.16.
 */


function makeRequest(url) {
  return fetch(url, { "method": "GET" })
        .then(response => {
            /* return json data from response */
          return response.json();
        })
        .catch(err => {
          return {
            "status": "error",
            "error": {
              "code": 408,
              "message": "CONNECTION_ERROR",
            },
          };
        });
}


function buildQueryStr(queryParams) {
  const parts = [];
  for (const prop in queryParams) {
    if (queryParams.hasOwnProperty(prop)) {
      parts.push(`${prop}=${queryParams[prop]}`);
    }
  }
  return `?${parts.join("&")}`;
}


export {
    makeRequest,
    buildQueryStr,
};
