import { allFavorite } from "./storageWorker.js";

export function getFavoritePokemonList(pokemonList)
{
    if (!pokemonList || pokemonList.length === 0)
    {
        return [];
    }
    const favoriteIds = allFavorite();
    return pokemonList.filter(pokemon => favoriteIds.includes(pokemon.id));
}