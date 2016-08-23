
function renderFoundAccount({ account_id: accountId, nickname }) {
  return `<div class="js-user" data-account-id="${accountId}">${nickname}</div>`;
}

export default function (accounts) {
  let htmlCache = "";

  for (const account of accounts) {
    htmlCache += renderFoundAccount(account);
  }

  return htmlCache;
}
