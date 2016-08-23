require("./main.css");

import loadUsersData from "./users/loader";
import loadUserProfile from "./profile/loader";
import { renderSpinner, renderError } from "./core/view";
import { renderFoundAccounts } from "./users/view";
import { renderUserData } from "./profile/view";


function markActive(element) {
    const activeEl = document.getElementsByClassName("active-user");
    if (activeEl.length) {
        activeEl[0].classList.remove("active-user");
    }

    element.classList.add("active-user");
}

function searchUsersHandler() {
    const userName = document.getElementById("username");
    const searchResultsEl = document.getElementById("search-results");
    const userDataEl = document.getElementById("user-stats");

    renderSpinner(searchResultsEl);
    loadUsersData(userName.value)
    .then(resp_data => {
        if (resp_data.status == "error") {
                searchResultsEl.innerHTML = renderError(resp_data);
            } else {
        searchResultsEl.innerHTML = renderFoundAccounts(resp_data.data);
        }
        /* attach handlers*/
        let usersCollection = document.getElementsByClassName("js-user");
        for (let user of usersCollection) {
            user.addEventListener("click", event => {
            let account_id = event.currentTarget.dataset.accountId;
                markActive(event.currentTarget);
                renderSpinner(userDataEl);

            const userData =loadUserProfile(account_id);

            userData.then(user_json => {
                userDataEl.innerHTML = renderUserData(user_json.data[account_id]);
            });
        });}
      }
    );
}

document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search");
    searchButton.addEventListener("click", searchUsersHandler);
});
