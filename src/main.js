const API_PROXY_URL = 'http://188.166.73.133/wg-api'

const GAME = 'wot'

/*
full API description you can find here:
https://ru.wargaming.net/developers/api_reference

you don't have to pass application_id query param.
It will be passed automatically via proxy server
*/

function loadUsers(username) {
  const url = `${API_PROXY_URL}/${GAME}/account/list/?search=${username}`
  // create request to the url and return a promise
  return fetch(url, {"method": "GET"})
    .then(response => {
      /* return json data from response */
      console.log(response.headers.get('Content-Type'));
      console.log(response.status);
      return response.json();
    })
    .then(resp_data => resp_data)
    .catch(err => {
        console.log(err);
        return {
            "status": "error",
            "error": {
                "code": 408,
                "message": "CONNECTION_ERROR"
            }
        };
    });
}

function renderSpinner(domNode) {
  // clean all content of passed node and then render element with `spinner` classname
    domNode.innerHTML = '<div class="spinner"></div>'
}

function renderFoundAccounts(accounts) {
  // render result to the node with class name `search-results`
  // Note! it's already exist. See index.html for more info.
  // Each search result item should be rendered
  // inside node with `search-results_item` class name

  let htmlCache = '';
  for (let account of accounts) {
      htmlCache += renderFoundAccount(account)
  }
    return htmlCache;
}

function renderFoundAccount({account_id, nickname}) {
    return `<div>${account_id} - ${nickname}</div>`
}

function renderError(respData) {
    return `<div>${respData.error.message}</div>`
}

function searchUsersHandler() {
  console.log('Search Users');
  const userName = document.getElementById('username');
  const searchResultsEl = document.getElementById('search-results');

  renderSpinner(searchResultsEl);
  return loadUsers(userName.value)
    .then(resp_data => {
        if (resp_data.status == "error") {
                searchResultsEl.innerHTML = renderError(resp_data);
            } else {
        searchResultsEl.innerHTML = renderFoundAccounts(resp_data.data)
    }
      }
    )
}

document.addEventListener('DOMContentLoaded', () => {
  // add search button click handler here
  const searchButton = document.getElementById('search')

  searchButton.addEventListener('click', searchUsersHandler)
})
