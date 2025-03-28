import React, { useEffect, useState } from "react";
import PostListing from "./PostListing";
import PostPopup from "./PostPopup";
import { set } from "mongoose";

export default function Feed() {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [categories, setCategories] = useState([{tagName: "All", color: "#4B5563"}]); // Default

    useEffect(() => {
        fetch("/api/post/all")
            .then((res) => res.json())
            .then((data) => {
                setPosts(data);
                setFilteredPosts(data);
            })
            .catch((error) => console.error("Error fetching posts:", error));
    }, []);

    useEffect(() => {
        fetch("/api/tag")
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setCategories([{ tagName: "All", color: "#4B5563" }, ...data.map(data => ({ 
                    tagName: data.tagName, 
                    color: data.color 
                }))]);
            })
            .catch((error) => console.error("Error fetching tags:", error))
    }, []);

    const filtered = (category) => {
        setSelectedCategory(category.tagName);
        if (category.tagName === "All") {
            setFilteredPosts(posts);
        }
        else {
            setFilteredPosts(posts.filter(post => post.tags.includes(category.tagName)));
        }
    };

    //const postListings = posts.map(post => <PostListing key={post.id} post={post} onClick={() => setSelectedPost(post)}/>);
    const postListings = filteredPosts.map((post) => (
        <div key={post._id} onClick={() => setSelectedPost(post)}>
            <PostListing post={post} />
        </div>
    ))
    return (
    <div className="feed-page bg-gray-100 p-4">
        <div className="filter-bar">
            {categories.map((category, index) => (
                <button key={index} onClick={() => filtered(category)} className={"p-2 px-4 mt-2 ml-2 text-white rounded-full"} style={{ backgroundColor: category.tagName === selectedCategory ? category.color : "#000000"}}>
                    {category.tagName}
                </button>
            ))}
        </div>
        {filteredPosts.length === 0 && (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-700 text-lg font-medium">
                    {selectedCategory == "All" ? "Posts are loading..." : `No ${selectedCategory} posts found`}
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