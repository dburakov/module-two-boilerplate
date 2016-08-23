import "./main.css";
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
    .then(respData => {
      if (respData.status === "error") {
        searchResultsEl.innerHTML = renderError(respData);
      } else {
        searchResultsEl.innerHTML = renderFoundAccounts(respData.data);
      }
        /* attach handlers*/
      const usersCollection = document.getElementsByClassName("js-user");
      for (const user of usersCollection) {
        user.addEventListener("click", event => {
          const accountId = event.currentTarget.dataset.accountId;
          markActive(event.currentTarget);
          renderSpinner(userDataEl);

          const userData = loadUserProfile(accountId);

          userData.then(userJson => {
            userDataEl.innerHTML = renderUserData(userJson.data[accountId]);
          });
        }); }
    }
    );
}

document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("search");
  searchButton.addEventListener("click", searchUsersHandler);
});
