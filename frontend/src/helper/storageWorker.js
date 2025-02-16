const localStorageKey = "favoritePokemonList";
const sessionStorageKey = "activeSite";
const leaderboardKey = "leaderboard";
const validSites = ["home", "favorite", "battle", "leaderboard"];

export function setPage(name)
{
    name = name.trim().toLowerCase();
    let valid = validSites.includes(name);

    if (!valid)
    {
        return validSites[0];
    }

    try
    {
        sessionStorage.setItem(sessionStorageKey, name);
    } catch (error)
    {
        console.warn("sessionStorage not accessible:", error);
    }

    return name;
}

export function getPage()
{
    try
    {
        return sessionStorage.getItem(sessionStorageKey) || "home";
    } catch (error)
    {
        console.warn("sessionStorage not accessible:", error);
        return "home";
    }
}

function validate(id)
{
    if (typeof id === "string" && /^[0-9]+$/.test(id.trim()))
    {
        id = parseInt(id.trim());
    }

    if (typeof id === "number" && id >= 1 && Number.isInteger(id))
    {
        return id;
    }

    return false;
}

export function addFavorite(id)
{
    let valid = validate(id);

    if (valid === false)
    {
        console.error("Invalid ID:", id);
        return false;
    }

    let favorites = allFavorite();
    if (!favorites.includes(id))
    {
        favorites.push(id);
        localStorage.setItem(localStorageKey, JSON.stringify(favorites));
    }
}

export function allFavorite()
{
    try
    {
        return JSON.parse(localStorage.getItem(localStorageKey)) || [];
    } catch (error)
    {
        console.warn("localStorage not accessible:", error);
        return [];
    }
}

export function findFavorite(id)
{
    let valid = validate(id);
    if (valid === false)
    {
        console.error("Invalid ID check:", id);
        return false;
    }
    return allFavorite().includes(id);
}

export function removeFavorite(id)
{
    let valid = validate(id);

    if (valid === false)
    {
        console.error("Invalid ID:", id);
        return false;
    }

    let favorites = allFavorite().filter((favId) => favId !== id);
    localStorage.setItem(localStorageKey, JSON.stringify(favorites));
}

export function clearFavorites()
{
    localStorage.removeItem(localStorageKey);
}

// Leaderboard-Funktionen
export function saveScore(playerName, score)
{
    try
    {
        const leaderboard = JSON.parse(localStorage.getItem(leaderboardKey)) || [];
        leaderboard.push({ name: playerName, score });
        leaderboard.sort((a, b) => b.score - a.score);
        localStorage.setItem(leaderboardKey, JSON.stringify(leaderboard));
    } catch (error)
    {
        console.warn("localStorage not accessible for leaderboard:", error);
    }
}

export function getLeaderboard()
{
    try
    {
        return JSON.parse(localStorage.getItem(leaderboardKey)) || [];
    } catch (error)
    {
        console.warn("localStorage not accessible for leaderboard:", error);
        return [];
    }
}