import Card from "../Card/Card";
import "./cardlist.css";
import { getFavoritePokemonList } from "../../helper/createFavoriteList.js";

export default function CardList({ pokemonList, onFavoriteClick })
{
  if (!pokemonList || pokemonList.length === 0)
  {
    return <p className="Card-List-Empty">Keine Pokémon gefunden.</p>;
  }

  const favoritePokemons = getFavoritePokemonList(pokemonList);

  return (
    <div className="Card-List">
      {pokemonList.length === 0 ? (
        <p>Loading Pokémon...</p>
      ) : (
        pokemonList.map((pok, index) => (
          <Card
            key={pok.id || `card_${index}`}
            pokemon={pok}
            favoritePokemons={favoritePokemons}
            onFavoriteClick={onFavoriteClick}
          />
        ))
      )}
    </div>
  );
}