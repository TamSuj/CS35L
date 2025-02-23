import React, { useState } from 'react';

function SearchBar() {
    const [query, setQuery] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Searched ", query);
        // do stuff
    }
    return (
        <form onSubmit={handleSubmit} className="p-2 pl-5 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all w-full">
            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)} 
                className="w-full p-2 focus:outline-none"
            />
            <button type="submit" className="hidden">Search</button>
        </form>
    );
}

export default SearchBar