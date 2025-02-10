import { fetchAllPokemon } from "../services/pokemonApi.js";
import { saveToLocalStorage, getAllPokemon, getFavorites, setAndRemoveAsFavorite } from "../helper/storageWorker.js";

const output = document.getElementById("output");

//? TestFunktion um alle Pokemons zu fetchen
async function testFetchAllPokemon()
{
    // console.log("Fetching all Pokemon...");
    const pokemonList = await fetchAllPokemon();
    // console.log("Fetched Pokemon List:", pokemonList);

    if (!Array.isArray(pokemonList) || pokemonList.length === 0)
    {
        console.error("No Pokemon data to save!");
        return;
    }

    saveToLocalStorage(pokemonList);
    // console.log("Saved Pokemon List to Local Storage!");
    output.textContent = "Fetched and saved all Pokemon!";
}

//? TestFunktion um die Favoriten abzurufen
function testGetFavorites()
{
    // console.log("Getting favorites...");
    const favorites = getFavorites();
    // console.log("Favorites:", favorites);
    output.textContent = JSON.stringify(favorites, null, 2);
}

//? NEUE Funktion welche die alte/vorherige set und remove in einer ausführt
function testSetAndRemoveFavorites()
{
    setAndRemoveAsFavorite(4);
    const updatedList = getAllPokemon();
    console.log("Update the actual storage / list", updatedList);
    output.textcontent = "Set or Remove charmander (ID: 4) as favorite!"
}

//? TestFunktion um den Lokalen Speicher zu löschen
function clearLocalStorage()
{
    // console.log("Clearing Local Storage...");
    localStorage.clear();
    output.textContent = "Local Storage cleared!";
}

//* TestBeispiele für meine aktuellen Tests, damit ich es irgendwie in der EntwicklerConsole vom Browser testen kann
document.getElementById("fetch-all").addEventListener("click", testFetchAllPokemon);
document.getElementById("get-favorites").addEventListener("click", testGetFavorites);
document.getElementById("clear-storage").addEventListener("click", clearLocalStorage);

//? Neue test für setAndRemoveAsFavorite --> Yay
document.getElementById("setAndRemove-favorite").addEventListener("click", testSetAndRemoveFavorites);


//! _____________________________________________________________________________________

//! Um die Tests im Edge Browser erfolgreich durchzuführen,
//! musste ich folgenden Befehl eingeben, 
//! da es sonst Probleme mit Berechtigungen gibt, gefahr vor Hackern und son Müll 👎👎👎

/*
"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --disable-web-security --user-data-dir="C:/edge-dev"
*/
