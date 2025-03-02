import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

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
            navigate('/results', {
                state: { results: data.results } 
            });
            console.log("Search results: ", data.results);
        } catch (error) {
            console.error("Search error: ", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-2 pl-5 pr-5 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all w-full max-w-full flex items-center">
            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)} 
                className="flex-grow p-2 focus:outline-none overflow-hidden bg-transparent"
                style={{
                    overflow: "hidden"
                }}
            />
            {query && (
                <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="ml-5 text-gray-500 hover:text-gray-700 focus:outline-none"
                >✖</button>
            )}
            <button type="submit" className="hidden">Search</button>
        </form>
    );
}

export default SearchBar