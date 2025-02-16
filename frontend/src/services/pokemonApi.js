import { pokeApiUrl, artworkUrl } from "./config.js";
import { typeSymbols } from "./typeSymbols.js";
import axios from "axios";

export async function fetchAllPokemon()
{
  let cachedData = null;

  if (typeof localStorage !== "undefined")
  {
    try
    {
      cachedData = localStorage.getItem("pokemonList");
    } catch (error)
    {
      console.warn("⚠️ localStorage ist nicht verfügbar:", error);
    }
  }

  console.log("Fetching Pokémon...");

  if (cachedData)
  {
    const parsedData = JSON.parse(cachedData);
    if (parsedData.length > 0)
    {
      console.log("Loaded Pokémon from cache");
      return parsedData;
    }
  }

  try
  {
    const response = await axios.get(pokeApiUrl);
    const pokemonList = response.data.results;

    const chunkSize = 10;
    let detailedPokemonList = [];

    for (let i = 0; i < pokemonList.length; i += chunkSize)
    {
      const chunk = pokemonList.slice(i, i + chunkSize);
      const promises = chunk.map(pokemon => getPokemonWithAllUsageData(pokemon.url));
      const results = await Promise.all(promises);
      detailedPokemonList = [...detailedPokemonList, ...results];
    }

    if (typeof localStorage !== "undefined")
    {
      try
      {
        localStorage.setItem("pokemonList", JSON.stringify(detailedPokemonList));
      } catch (error)
      {
        console.warn("Could not save to localStorage:", error);
      }
    }

    return detailedPokemonList;
  } catch (error)
  {
    console.error("Fehler beim Abrufen der Pokémon:", error);
    return [];
  }
}

async function fetchDetailedPokemonData(pokemonList)
{
  const chunkSize = 10;
  let detailedPokemonList = [];

  for (let i = 0; i < pokemonList.length; i += chunkSize)
  {
    const chunk = pokemonList.slice(i, i + chunkSize);
    const promises = chunk.map(pokemon => getPokemonWithAllUsageData(pokemon.url));
    const results = await Promise.all(promises);
    detailedPokemonList = [...detailedPokemonList, ...results];
  }

  console.log("Detailed Pokémon Data Loaded:", detailedPokemonList);
  return detailedPokemonList;
}

export async function getPokemonList()
{
  try
  {
    const response = await axios.get(pokeApiUrl);
    return response.data.results;
  } catch (error)
  {
    console.error("getPokemonList Error:", error);
    return [];
  }
}

export async function getPokemonWithAllUsageData(url)
{
  try
  {
    const data = await axios.get(url);
    const abilitiesWithDescriptions = await getAbilitiesWithDescription(data.data.abilities);
    const typesWithSymbols = getTypesWithSymbol(data.data.types);
    const stats = getPokemonStats(data.data.stats);
    const moves = getPokemonMoves(data.data.moves);

    const pokemonData = {
      id: data.data.id,
      name: data.data.name,
      abilities: abilitiesWithDescriptions,
      types: typesWithSymbols,
      sprite: `${artworkUrl}${data.data.id}.png`,
      stats,
      moves,
    };

    console.log(`Loaded Pokémon: ${pokemonData.name}`, pokemonData);
    return pokemonData;
  } catch (error)
  {
    console.error("getPokemonWithAllUsageData Error:", error);
    return null;
  }
}

export async function getAbilitiesWithDescription(abilities)
{
  try
  {
    return await Promise.all(
      abilities.map(async (ability) =>
      {
        const abilityData = await axios.get(ability.ability.url);
        const description = abilityData.data.effect_entries.find(
          (entry) => entry.language.name === "en"
        )?.effect;

        return {
          name: ability.ability.name,
          description: description || "No description available",
        };
      })
    );
  } catch (error)
  {
    console.error("getAbilitiesWithDescription Error:", error);
    return [];
  }
}

export function getTypesWithSymbol(types)
{
  return types?.map((type) => ({
    name: type.type.name,
    symbol: typeSymbols[type.type.name] || null,
  })) || [];
}

export function getPokemonStats(stats)
{
  return stats.reduce((acc, stat) =>
  {
    acc[stat.stat.name] = stat.base_stat;
    return acc;
  }, {});
}

export function getPokemonMoves(moves)
{
  return moves.slice(0, 4).map(move => ({
    name: move.move.name,
  }));
}