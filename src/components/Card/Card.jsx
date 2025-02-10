import "./card.css";
const heart = "♥";

export default function Card({ pokemon, favoritePokemons, onFavoriteClick}) {
    const handlerFavoriteOnClick = () => {
        onFavoriteClick(pokemon.id);
    }

  return (
    <div id={"poke_" + pokemon.id} className="Card-Item">
      {/* Card-Title */}
      <div className="Card-Title" id={pokemon.id}>
        <span id={"poke_" + pokemon.id + "_1"}>{pokemon?.id || "No ID"}</span>
        <span id={"poke_" + pokemon.id + "_2"} className="first-upper">
          {pokemon.name}
        </span>
        <span id={"poke_" + pokemon.id + "_3"} className="shine">
          {pokemon?.id || "No ID"}
        </span>
        <span
          id={"poke_" + pokemon.id + "_4"}
          className={favoritePokemons.find((el) => el.id === pokemon.id) ? "favorite" : ""}
          onClick={handlerFavoriteOnClick}
        >
          {heart}
        </span>
      </div>

      {/* Card-Image */}
      <div className="Card-Image">
        <img src={pokemon.sprite} alt={pokemon.name} />
      </div>

      {/* Card-Types */}
      <div className="Card-Types">
        {pokemon.types.map((type, index) => {
          return (
            <div
              key={"poke_type_" + pokemon.id + index}
              id={"poke_" + pokemon.id + "_type_" + index}
              className="type"
            >
              <img className="type-img" src={type.symbol} alt={type.name} />
              <strong className="type-name">{type.name}</strong>
            </div>
          );
        })}
      </div>

      {/* Card-Abilities */}
      <div className="Card-Abilities">
        {pokemon.abilities.map((ability, index) => {
          return (
            <div
              id={"poke_" + pokemon.id + "_ability_" + index}
              key={"poke_ability_" + pokemon.id + index}
            >
              <span className="ability-name">{ability.name}</span>
              <span className="ability-description">{ability.description}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
