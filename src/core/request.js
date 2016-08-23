/**
 * Created by alexander on 23.08.16.
 */


function makeRequest(url) {
  return fetch(url, { method: "GET" })
      .then(response => response.json())
      .catch(() => ({
        status: "error",
        error: {
          code: 408,
          message: "CONNECTION_ERROR",
        },
      }));
}


function buildQueryStr(queryParams) {
  const parts = [];
  for (const prop of queryParams.keys()) {
    parts.push(`${prop}=${queryParams[prop]}`);
  }
  return `?${parts.join("&")}`;
}


export {
    makeRequest,
    buildQueryStr,
};
