import "./Header.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Header({ onSearch })
{
    const [searchInputData, setSearchInputData] = useState('');
    const navigate = useNavigate();

    const handleTyping = (event) =>
    {
        setSearchInputData(event.target.value);
    };

    const handleOnKeyDown = (event) =>
    {
        if (event.key === "Enter")
        {
            event.preventDefault();
            onSearch(event.target.value);
            setSearchInputData('');
        }
    };

    return (
        <header className="header">
            <nav>
                <h1>PokeDex-Diary</h1>
                <form>
                    <input
                        value={searchInputData}
                        type="text"
                        id="search"
                        placeholder="Search"
                        onKeyDown={handleOnKeyDown}
                        onChange={handleTyping}
                    />
                </form>
                <span>
                    <button onClick={() => navigate("/")}>Home</button>
                    <button onClick={() => navigate("/favorite")}>Favorite</button>
                    <button onClick={() => navigate("/battle")}>Battle</button>
                    <button onClick={() => navigate("/leaderboard")}>Leaderboard</button>
                </span>
            </nav>
        </header>
    );

}