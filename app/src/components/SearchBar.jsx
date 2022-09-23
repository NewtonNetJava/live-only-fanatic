import React, { useState, useEffect } from "react";
import "../stylesheets/searchBar.scss";
import closeSvg from "../assets/close.svg";
import searchSvg from "../assets/search.svg";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";

function SearchBar({ placeholder }) {
    const [filteredArtists, setFilteredArtists] = useState([]);
    const [filteredVenues, setFilteredVenues] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const [hasMatches, setHasMatches] = useState(false);

    const { data: artists } = useFetch("/data/artists");
    const { data: venues } = useFetch("/data/venues");

    function filterArrays(array, searchWord) {
        array = array.filter(item => item.name.toLowerCase().includes(searchWord.toLowerCase()))
        return array.filter(item => item.name !== "ONLINE");
    }

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        if (searchWord === "") {
            setFilteredArtists([]);
            setFilteredVenues([]);
        } else {
            setFilteredArtists(filterArrays(artists, searchWord));
            setFilteredVenues(filterArrays(venues, searchWord));
        }
    };

    const clearInput = () => {
        setFilteredArtists([]);
        setFilteredVenues([]);
        setWordEntered("");
    };

    useEffect(() => {
        function run() {
            if (filteredArtists.length !== 0 || filteredVenues.length !== 0) setHasMatches(true)
            else setHasMatches(false);
        }
        void run()

    }, [filteredArtists, filteredVenues]);

    return (<div className="search">
        <div className="searchInputs">
            <input
                type="text"
                placeholder={placeholder}
                value={wordEntered}
                onChange={handleFilter}
            />
            <div className="searchIcon">
                {wordEntered.length > 0 ? (<img src={closeSvg} alt="closeIcon" onClick={clearInput} />) : (
                    <img src={searchSvg} alt="searchIcon" />)}
            </div>
        </div>
        {hasMatches && (<div className="dataResult">
            {filteredArtists.slice(0, 15).map((artist) => {
                return (<div className="dataItem" key={artist.id} onClick={() => clearInput()}>
                    <Link to={`/artists/${artist.id}`}>
                        {artist.name}
                    </Link>


                </div>);
            })}
            {filteredVenues.slice(0, 15).map((venue) => {
                return (<div className="dataItem" key={venue.id} onClick={() => clearInput()}>
                    <Link to={`/venues/${venue.id}`}>
                        {venue.name}
                    </Link>


                </div>);
            })}
        </div>)}
    </div>);
}

export default SearchBar;
