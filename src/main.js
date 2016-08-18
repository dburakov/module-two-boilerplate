const API_PROXY_URL = 'http://188.166.73.133/wg-api';

const GAME = 'wot';

/*
full API description you can find here:
https://ru.wargaming.net/developers/api_reference

you don't have to pass application_id query param.
It will be passed automatically via proxy server
*/


class BaseLoader {
    /* Perform request to WG Public API and postprocess data */
    host = 'http://188.166.73.133/wg-api';
    game = 'wot';
    path = '';

    make() {
        let response = this.load();
        return this.postprocess(response);
    }

    load() {
        /* Make request and return response */
        let url = this.buildURL();
        return fetch(url)
            .then(response => {
                /* return json data from response */
                return response;
            })
            .catch(err => {
                /* hardcoded connection error catch */
                return {
                    "status": "error",
                    "error": {
                        "code": 408,
                        "message": "CONNECTION_ERROR"
                    }
                };
            });
    }

    buildURL() {
        return `${this.host}/${this.game}`;
    }

    postprocess(response) {
        return response.json();
    }
}

class UsersLoader extends BaseLoader {
    path = '/account/list/';

    constructor(nickNamePrefix) {
        this.nickNamePrefix = nickNamePrefix;
    }

    buildURL() {
        return `super.buildURL()/${path}?search=${this.nickNamePrefix}`;
    }
}

class ProfileLoader extends BaseLoader {

}

function sendRequset(url) {
    return fetch(url, {"method": "GET"})
        .then(response => {
            /* return json data from response */
            return response.json();
        })
        .catch(err => {
            return {
                "status": "error",
                "error": {
                    "code": 408,
                    "message": "CONNECTION_ERROR"
                }
            };
        });
}


class

function loadUsers(username) {
    const url = `${API_PROXY_URL}/${GAME}/account/list/?search=${username}`;

    return sendRequset(url);
}

function loadUser(account_id) {
    const url = `${API_PROXY_URL}/${GAME}/account/info/?account_id=${account_id}`;

    return sendRequset(url);
}

function renderSpinner(domNode) {
    domNode.innerHTML = '<div class="spinner"></div>'
}

function renderFoundAccounts(accounts) {
    let htmlCache = '';

    for (let account of accounts) {
      htmlCache += renderFoundAccount(account)
    }

    return htmlCache;
}

function renderFoundAccount({account_id, nickname}) {
    return `<div class="js-user" data-account-id="${account_id}">${nickname}</div>`
}

function renderError(respData) {
    return `<div>${respData.error.message}</div>`
}

function renderUserData(userData) {
    return `
        <h1>${userData.nickname}<sup>${userData.global_rating}</sup></h1>
        ${renderUserStatistics(userData.statistics.all)}`;
}

function renderUserStatistics(stat) {
    return `
        <p>Battles = ${stat.battles};</p>
        <p>Wins percent = ${stat.wins/stat.battles*100};</p>
        <p>Average XP = ${stat.xp/stat.battles};</p>
        <p>Average XP = ${stat.damage_dealt/stat.battles};</p>
    `;
}

function markActive(element) {
    const activeEl = document.getElementsByClassName('active-user');
    if (activeEl.length) {
        activeEl[0].classList.remove('active-user')
    }

    element.classList.add('active-user');
}

function searchUsersHandler() {
    const userName = document.getElementById('username');
    const searchResultsEl = document.getElementById('search-results');
    const userDataEl = document.getElementById('user-stats');

    renderSpinner(searchResultsEl);
    loadUsers(userName.value)
    .then(resp_data => {
        if (resp_data.status == "error") {
                searchResultsEl.innerHTML = renderError(resp_data);
            } else {
        searchResultsEl.innerHTML = renderFoundAccounts(resp_data.data)
        }
        /* attach handlers*/
        let usersCollection = document.getElementsByClassName('js-user');
        for (let user of usersCollection) {
            user.addEventListener('click', event => {
            let account_id = event.currentTarget.dataset.accountId;
                markActive(event.currentTarget);
                renderSpinner(userDataEl);

            const userData =loadUser(account_id);

            userData.then(user_json => {
                userDataEl.innerHTML = renderUserData(user_json.data[account_id])
            })
        })}
      }
    )
}

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search');
    searchButton.addEventListener('click', searchUsersHandler)
});
