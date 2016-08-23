
function renderFoundAccount(i, { account_id: accountId, nickname }) {
  return `<tr class="js-user" data-account-id="${accountId}">
                <td>${i}</td><td><span class="glyphicon glyphicon-user"></span> ${nickname}</td>
          </tr>`;
}

export default function (accounts) {
  const rows = [];
  let i = 1;

  for (const account of accounts) {
    rows.push(renderFoundAccount(i, account));
    i++;
  }

  return `<table class="table table-condensed table-hover">
                <thead><tr><th>#</th><th>Name</th></tr></thead>
                <tbody>${rows.join("")}</tbody>
          </table>`;
}
