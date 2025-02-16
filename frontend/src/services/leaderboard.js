export function getLeaderboard()
{
    const leaderboard = localStorage.getItem("leaderboard");
    return leaderboard ? JSON.parse(leaderboard) : [];
}

export function saveScore(playerName, score)
{
    let leaderboard = getLeaderboard();

    const existingPlayer = leaderboard.find(player => player.name === playerName);
    if (existingPlayer)
    {
        existingPlayer.score += score;
    } else
    {
        leaderboard.push({ name: playerName, score });
    }

    // Sortieren nach Highscore
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}