import './Header.css'
import {useState} from "react";

export function Header({onSearch, onClick}) {
    const [searchInputData, setSearchInputData] = useState('');


    const handleTyping = (event) => {
        setSearchInputData(event.target.value)
    }
    const handleOnKeyDown = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault()
            onSearch(event.target.value);
            event.target.value.clear;
            setSearchInputData('')
        }
    }

    const handleOnClick = (event) => {
        onClick(event.target.innerText)
    }
    return (
        <header className="header">
            <nav className="">
                <h1 className="">PokeDex-Diary</h1>
                <form className="" action="">
                    <input
                        value={searchInputData}
                        type="text"
                        className=""
                        id="search"
                        placeholder="Search"
                        onKeyDown={handleOnKeyDown}
                        onChange={handleTyping}
                    />
                </form>
                <span className="">
             <button
                 className=""
                 onClick={handleOnClick}
             >Home</button>
          <button
              className=""
              onClick={handleOnClick}
          >Favorite</button>
        </span>
            </nav>
        </header>
    )
}
