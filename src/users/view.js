
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

export {
  renderFoundAccounts
};