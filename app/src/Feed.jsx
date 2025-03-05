import React, { useEffect, useState } from "react";
import PostListing from "./PostListing";
import PostPopup from "./PostPopup";
import { set } from "mongoose";

export default function Feed() {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = ["All", "Math", "Science", "History", "English", "Computer Science", "Engineering"]; // Should be a list of all tags

    useEffect(() => {
        fetch("/api/post/all")
            .then((res) => res.json())
            .then((data) => {
                setPosts(data);
                setFilteredPosts(data);
            })
            .catch((error) => console.error("Error fetching posts:", error));
    }, []);

    const filtered = (categorey) => {
        setSelectedCategory(categorey);
        if (categorey === "All") {
            setFilteredPosts(posts);
        }
        else {
            setFilteredPosts(posts.filter(post => post.tags.includes(categorey)));
        }
    };

    //const postListings = posts.map(post => <PostListing key={post.id} post={post} onClick={() => setSelectedPost(post)}/>);
    const postListings = filteredPosts.map((post) => (
        <div key={post._id} onClick={() => setSelectedPost(post)}>
            <PostListing post={post} />
        </div>
    ))
    console.log("selected post", selectedPost);

    return (
    <div className="feed-page bg-gray-100 h-screen p-4">
        <div className="filter-bar">
            {categories.map((category, index) => (
                <button key={index} onClick={() => filtered(category)} className={"p-2 px-4 mt-2 ml-2 text-white rounded-full " + (category == selectedCategory ? "bg-gray-600" : "bg-black")}>
                    {category}
                </button>
            ))}
        </div>
        {filteredPosts.length === 0 && (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-700 text-lg font-medium">
                    No "{selectedCategory}" posts found
                </p>
            </div>
        )}
        <div className="feed-page-content">
            {...postListings}
            {selectedPost && (
                <PostPopup post={selectedPost} onClose={() => setSelectedPost(null)} />
            )}
        </div>
    </div>);
}