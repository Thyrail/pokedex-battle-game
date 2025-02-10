import Card from "../Card/Card";
import "./cardlist.css";
import {getFavoritePokemonList} from "../../helper/createFavoriteList.js";

export default function CardList({pokemonList, onFavoriteClick}) {
//     console.log(pokemonList)
const favoritePokemons = getFavoritePokemonList(pokemonList)

  return (
    <>
      <div className="Card-List">
        {pokemonList.map((pok, index) => {
          // console.log(index, pok);
          return (
            <>
              <Card key={"card_" + index} pokemon={pok} favoritePokemons = {favoritePokemons} onFavoriteClick={onFavoriteClick}/>
            </>
          );
        })}
      </div>
    </>
  );
}
