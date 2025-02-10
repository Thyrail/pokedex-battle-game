import {allFavorite} from "./storageWorker.js";


export function getFavoritePokemonList(pokemonList) {
    const allFavoriteList = allFavorite();
    // console.log(allFavoriteList)
    const idsToKeep = new Set(allFavoriteList);

    return pokemonList.filter((pokemon) => idsToKeep.has(pokemon.id));
}
