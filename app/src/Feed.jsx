import React, { useEffect, useState } from "react";
import PostListing from "./PostListing";
import PostPopup from "./PostPopup";

export default function Feed() {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        fetch("/api/post/all")
            .then((res) => res.json())
            .then((data) => setPosts(data))
            .catch((error) => console.error("Error fetching posts:", error));
    }, []);

    //const postListings = posts.map(post => <PostListing key={post.id} post={post} onClick={() => setSelectedPost(post)}/>);
    const postListings = posts.map((post) => (
        <div key={post._id} onClick={() => setSelectedPost(post)}>
            <PostListing post={post} />
        </div>
    ))
    console.log("selected post", selectedPost);

    return (
    <div className="feed-page">
        <div className="feed-page-content">
            {...postListings}
            {selectedPost && (
                <PostPopup post={selectedPost} onClose={() => setSelectedPost(null)} />
            )}
        </div>
    </div>);
}