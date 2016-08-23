
function renderUserData(userData) {
  return `
        <h1>${userData.nickname}<sup>${userData.global_rating}</sup></h1>
        ${renderUserStatistics(userData.statistics.all)}`;
}

function renderUserStatistics(stat) {
  return `
        <p>Battles = ${stat.battles};</p>
        <p>Wins percent = ${stat.wins / stat.battles * 100};</p>
        <p>Average XP = ${stat.xp / stat.battles};</p>
        <p>Average XP = ${stat.damage_dealt / stat.battles};</p>
    `;
}

export {
    renderUserData,
};
