import React, {useState} from "react";
import "../stylesheets/searchBar.scss";
import closeSvg from "../assets/close.svg";
import searchSvg from "../assets/search.svg";
import useFetch from "../hooks/useFetch";
import {Link} from "react-router-dom";

function SearchBar({placeholder}) {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    const {data: artists} = useFetch("/data/artists");

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = artists.filter((artist) => {
            return artist.name.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    };

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
    };

    return (<div className="search">
        <div className="searchInputs">
            <input
                type="text"
                placeholder={placeholder}
                value={wordEntered}
                onChange={handleFilter}
            />
            <div className="searchIcon">
                {wordEntered.length > 0 ? (<img src={closeSvg} alt="closeIcon" onClick={clearInput}/>) : (
                    <img src={searchSvg} alt="searchIcon"/>)}
            </div>
        </div>
        {filteredData.length !== 0 && (<div className="dataResult" key={artists.id}>
            {filteredData.slice(0, 15).map((artist) => {
                return (<div className="dataItem" onClick={() => clearInput()}>
                    <Link to={`/artist/${artist.id}`}>{artist.name}</Link>
                </div>);
            })}
        </div>)}
    </div>);
}

export default SearchBar;
