
function renderUserStatistics(stat) {
  return `<h3>Battles <span class="label label-default">${stat.battles}</span></h3>
<h3>Wins percent <span class="label label-default"> ${(stat.wins / stat.battles) * 100}</span></h3>
<h3>Average XP <span class="label label-default"> ${stat.xp / stat.battles}</span></h3>`;
}

export default function (userData) {
  return `<div class="panel panel-default">
  <div class="panel-heading">
    <h3 class="panel-title">Statistic</h3>
  </div>
  <div class="panel-body">
    <h1><span class="glyphicon glyphicon-star-empty"></span>
    <span class="label label-success">${userData.global_rating}</span></h1>
    ${renderUserStatistics(userData.statistics.all)}
  </div>
</div>`;
}
