require('./main.css');

import loadUsersData from './users/loader';
import loadUserProfile from './profile/loader';


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
    loadUsersData(userName.value)
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

            const userData =loadUserProfile(account_id);

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
