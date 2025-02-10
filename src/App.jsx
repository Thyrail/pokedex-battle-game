import {Header} from "./components/Header/Header.jsx";
import {useEffect, useState} from "react";
import {fetchAllPokemon} from "./services/pokemonApi.js";

import CardList from "./components/CardList/CardList";
import {Spinner} from "./utils/Spinner/Spinner.jsx";
import {search} from "./helper/search.js";
import {getFavoritePokemonList} from "./helper/createFavoriteList.js";
import {Footer} from "./components/Footer/Footer.jsx";
import {addFavorite, getPage, removeFavorite, setPage} from "./helper/storageWorker.js";

function App() {
    const [pokemonList, setPokemonList] = useState('')
    const [filteredPokemonList, setFilteredPokemonList] = useState('')
    const [renderTrigger, setRenderTrigger] = useState(true);
    const [isPage, setIsPage] = useState('')

    const handleDataFromSearch = (data) => {
        const searchedPokemon = search(data, pokemonList)
        if (searchedPokemon) {
            setFilteredPokemonList([searchedPokemon])
            setIsPage('search');
        } else {
            alert("Couldn't find a Pokemon with that name or index!")
        }
    };

    const handleNavButtonClick = (data) => {
        if (data.toLowerCase() === 'home') {
            setFilteredPokemonList('')
            setIsPage('home')
            setPage('home')
        } else if (data.toLowerCase() === 'favorite') {
            const favoritePokemonList = getFavoritePokemonList(pokemonList)
            setFilteredPokemonList(favoritePokemonList)
            setIsPage('favorite')
            setPage('favorite')
        } else {
            console.log("Invalid value!")
        }
    }

    const handleFavoriteOnClick = (id) => {
        const favoritePokemonsList = getFavoritePokemonList(pokemonList);
        if (favoritePokemonsList.find((el) => el.id === id)) {
            removeFavorite(id);
        } else {
            addFavorite(id)
        }

        if (isPage === 'favorite') {
            const favoritePokemonList = getFavoritePokemonList(pokemonList)
            setFilteredPokemonList(favoritePokemonList)
        } else {
            setRenderTrigger(!renderTrigger);
        }

    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchAllPokemon();
            setPokemonList(data)

            if (getPage() === 'favorite') {
                setIsPage(getPage())
                const favoritePokemonList = getFavoritePokemonList(data)
                setFilteredPokemonList(favoritePokemonList)
            } else  {
                setIsPage('home')
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="w-full">
                <Header onSearch={handleDataFromSearch} onClick={handleNavButtonClick}/>
                {pokemonList ?
                    <CardList key={"cardList"} pokemonList={filteredPokemonList ? filteredPokemonList : pokemonList}
                              onFavoriteClick={handleFavoriteOnClick}/> : <Spinner/>}
                <Footer/>
            </div>
        </>
    );
}

export default App;
