import { pokeApiUrl, artworkUrl } from "./config.js";
import { typeSymbols } from "./typeSymbols.js";
import axios from "axios";

export async function fetchAllPokemon() {
  const pokemonSimpleDataList = await getPokemonList();

  return await Promise.all(
    pokemonSimpleDataList.map(async (pokemon) => {
      return await getPokemonWithAllUsageData(pokemon?.url);
    })
  );
}

export async function getPokemonList() {
  try {
    const simplePokemonData = await axios.get(pokeApiUrl);
    return simplePokemonData.data.results;
  } catch (error) {
    console.log(error.message);
  }
}

export async function getPokemonWithAllUsageData(url) {
  try {
    const data = await axios.get(url);
    const abilitiesWithDescriptions = await getAbilitiesWithDescription(
      data.data.abilities
    );
    const typesWithSymbols = await getTypesWithSymbol(data.data.types);

    return {
      id: data.data.id,
      name: data.data.name,
      abilities: abilitiesWithDescriptions,
      types: typesWithSymbols,
      sprite: `${artworkUrl}${data.data.id}.png`,
    };
  } catch (error) {
    console.log(error.message);
  }
}

export async function getAbilitiesWithDescription(abilities) {
  try {
    return await Promise.all(
      abilities.map(async (ability) => {
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
  } catch (error) {
    console.log(error.message);
  }
}

export async function getTypesWithSymbol(types) {
  return types?.map((type) => ({
    name: type.type.name,
    symbol: typeSymbols[type.type.name] || null,
  }));
}
