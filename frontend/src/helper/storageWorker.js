const localStorageKey = "pokemonList";
const sessionStorageKey = "activeSite";
const validSites = ["home", "favorite"];

function validate(id) {
    if (typeof id === "string" && /^[0-9]+$/.test(id.trim())) {
        id = parseInt(id.trim());
    }

    if (typeof id === "number" && id >= 0 && id % 1 === 0) {
        return id;
    }

    return false;
}

export function addFavorite(id) {
    let valid = validate(id);

    if (valid === false) {
        return false;
    }

    if (findFavorite(id)) {
        return;
    }

    localStorage.setItem(
        localStorageKey,
        JSON.stringify(
            [...allFavorite(), id].sort(function (a, b) {
                return a - b;
            })
        )
    );
}

export function allFavorite() {
    let data = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    data = data.sort(function (a, b) {
        return a - b;
    });
    return data;
}

export function findFavorite(id) {
    let valid = validate(id);

    if (valid === false) {
        console.log("Error: id is not valid", id);
        return false;
    }

    let res = false;
    allFavorite().forEach(function (fav) {
        if (fav === id) {
            res = true;
        }
    });

    return res;
}

export function removeFavorite(id) {
    let valid = validate(id);

    if (valid === false) {
        console.log("Error: id is not valid", id);
        return false;
    }

    let data = allFavorite();

    data = data.filter((item) => {
        return item !== id;
    });

    clear();

    localStorage.setItem(
        localStorageKey,
        JSON.stringify(
            data.sort(function (a, b) {
                return a - b;
            })
        )
    );
}

export function clear() {
    localStorage.clear();
}



export function setPage(name) {
    name = name.trim().toLowerCase();
    let valid = validSites.includes(name);

    if (valid === false) {
        return validSites[0]; // fallback Site
    }

    sessionStorage.setItem(sessionStorageKey, name)

    return name;
}

export function getPage() {
    return sessionStorage.getItem(sessionStorageKey) || [];
}


// const storageKey = "pokemonList";
//
// //* Speichert die PokemonListe im Local Storage
// export function saveToLocalStorage(pokemonList) {
//     if (!pokemonList || typeof pokemonList !== "object") {
//         console.error("Invalid data passed to saveToLocalStorage:", pokemonList);
//         return;
//     }
//     localStorage.setItem(storageKey, JSON.stringify(pokemonList));
// }
//
// //* Ruft die PokemonListe aus dem Local Storage ab
// export function getAllPokemon() {
//     const data = JSON.parse(localStorage.getItem(storageKey)) || [];
//     return data;
// }
//
// //* Ruft nur die Favoriten ab
// export function getFavorites() {
//     const allPokemon = getAllPokemon();
//     return allPokemon.filter((pokemon) => pokemon.favorite);
// }
//
// //* Setzt den FavoritenStatus eines Pokemon auf true oder false
// export function setAndRemoveAsFavorite(pokemonId) {
//     const allPokemon = getAllPokemon();
//     const updatedPokemon = allPokemon.map(pokemon => pokemon.id === pokemonId
//         ? pokemon.favorite === true
//             ? {...pokemon, favorite: false} : {...pokemon, favorite: true}
//         : pokemon);
//     saveToLocalStorage(updatedPokemon);
// }
//
// //? ____________________________________________________________________________
// //? Fügt zusätzliche PokemonDaten hinzu oder aktualisiert bestehende (OPTIONAL)
// // export function updatePokemon(pokemonId, updates)
// // {
// //     const allPokemon = getAllPokemon();
// //     const updatedPokemon = allPokemon.map((pokemon) =>
// //         pokemon.id === pokemonId ? { ...pokemon, ...updates } : pokemon
// //     );
// //     saveToLocalStorage(updatedPokemon);
// // }
