import React, { useEffect, useState } from "react";
import PostListing from "./PostListing";

export default function Feed() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("/api/post/all")
            .then((res) => res.json())
            .then((data) => setPosts(data))
            .catch((error) => console.error("Error fetching posts:", error));
    }, []);

    const postListings = posts.map(post => <PostListing key = {post.id} post={post} />);

    return (
    <div className="feed-page">
        <div className="feed-page-content">
            {...postListings}
        </div>
    </div>);
}