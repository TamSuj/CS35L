import React, { useState } from 'react';

function SearchBar() {
    const [query, setQuery] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Searched ", query);
        if(query === ""){
            console.error("Please enter a search query");
            return;
        }

        try {
            const response = await fetch('/api/search', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ query })
            });

            if(!response.ok){
                throw new Error("Search failed");
            }

            const data = await response.json();
            console.log("Search results: ", data);
        } catch (error) {
            console.error("Search error: ", error);
        }

    };
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