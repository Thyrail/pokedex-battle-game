import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { Header } from "./components/Header/Header.jsx";
import { fetchAllPokemon } from "./services/pokemonApi.js";
import CardList from "./components/CardList/CardList";
import { Spinner } from "./utils/Spinner/Spinner.jsx";
import { getFavoritePokemonList } from "./helper/createFavoriteList.js";
import { Footer } from "./components/Footer/Footer.jsx";
import { addFavorite, removeFavorite } from "./helper/storageWorker";
import Battle from "./components/Battle/Battle.jsx";
import Leaderboard from "./components/Leaderboard/Leaderboard.jsx";

function App()
{
    const [pokemonList, setPokemonList] = useState([]);
    const [filteredPokemonList, setFilteredPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            setIsLoading(true);
            const data = await fetchAllPokemon();

            if (data.length === 0)
            {
                console.warn("Keine Pokémon aus API geladen, versuche erneut...");
                const freshData = await fetchAllPokemon();
                setPokemonList(freshData);
            } else
            {
                setPokemonList(data);
            }

            setIsLoading(false);
        };

        fetchData();
    }, []);

    const handleFavoriteOnClick = (id) =>
    {
        if (filteredPokemonList.some(pokemon => pokemon.id === id))
        {
            removeFavorite(id);
        } else
        {
            addFavorite(id);
        }
        setFilteredPokemonList(getFavoritePokemonList(pokemonList));
    };

    return (
        <div className="w-full">
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={isLoading ? <Spinner /> : <CardList pokemonList={pokemonList} onFavoriteClick={handleFavoriteOnClick} />}
                />
                <Route path="/favorite" element={<CardList pokemonList={getFavoritePokemonList(pokemonList)} onFavoriteClick={handleFavoriteOnClick} />} />
                <Route path="/battle" element={<Battle />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;