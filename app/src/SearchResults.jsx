import React, {useState} from 'react';
import { useLocation } from 'react-router-dom'

function UserResult({user}) {
  return (
    <li className="flex items-center space-x-4 p-2 border-b border-gray-300">
      {/* <img
            src={ user.profilePic } // || need default pfp picture
            alt={ user.username }
                className="w-12 h-12 rounded-full object-cover"
            /> */}
      <p className="text-lg font-medium text-gray-800">{user.username}</p>
    </li>
  );
}

function SearchResults() {
    const location = useLocation();
    const results = location.state.results;// || [];
    return (
      <div className="bg-gray-100 min-h-screen p-4">
        <h2 className="text-4xl font-bold text-gray-800 p-2">Search Results</h2>
        {results.length > 0 ? (
          <ul className="space-y-4">
            {results.map((user) => (
                <UserResult key={user._id} user={user} />
            ))}
          </ul>
        ) : (
          <div className = "flex justify-center items-center h-64">
            <p className="text-gray-700 text-lg font-medium">No results found</p>
          </div>
        )}
      </div>
    );
}
  
export default SearchResults;