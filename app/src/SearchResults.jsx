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
      <p className="text-lg font-medium text-gray-800 mb-4">{user.username}</p>
    </li>
  );
}

function PostResult({post}) {
  return (
    <li className="flex items-center space-x-4 p-2 border-b border-gray-300">
      <p className="text-lg font-medium text-gray-800 mb-4">{post.postTitle || post.textContent}</p>
    </li>
  );
}

function SearchResults() {
  const location = useLocation();
  const results = location.state.results;// || [];
  const [userResults, postResults] = results;

  return (
    <div className="bg-gray-100 h-screen p-4">
      <h2 className="text-4xl font-bold text-gray-800 p-2 mb-4">Search Results</h2>
  
        {userResults.length === 0 && postResults.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-700 text-lg font-medium">No results found</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-md p-4 h-[70vh] max-w-7xl mx-auto overflow-auto">
            {userResults.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-gray-700 mb-4">Users</h3>
                    <ul className="space-y-4">
                      {userResults.map((user) => (
                        <UserResult key={user._id} user={user} />
                      ))}
                    </ul>
                </div>
            )}

            {postResults.length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">Posts</h3>
                  <ul className="space-y-4">
                    {postResults.map((post) => (
                      <PostResult key={post._id} post={post} />
                    ))}
                  </ul>
              </div>
            )}
        </div>
        )}
    </div>
  );
}
  
export default SearchResults;