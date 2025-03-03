import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NotionFace from "./assets/notion-face.png";


export default function PostPage() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/api/post/${postId}`)
            .then((res) => res.json())
            .then((data) => setPost(data))
            .catch(() => navigate("/feed"));
    }, [postId, navigate]);

    const handleLikeClick = () => {
        const newLikeState = !isLiked;
        setIsLiked(newLikeState);
        setLikeCount(prevCount => newLikeState ? prevCount + 1 : prevCount - 1);

    };

    if (!post) return <p>Loading post...</p>;
    
    return (
        <div className="post-page-wrapper">
            <div className="post-page">
                <button onClick={() => navigate(-1)} className="post-page-back-button">← Back to Feed</button>
                <h2 className="post-page-title">{post.postTitle || "Untitled"}</h2>
                <div className="post-page-body">
                    <div className="post-page-right">
                        {post.fileContent && (
                            <embed
                                src={`http://localhost:3001/uploads/${post.fileContent}`}
                                type="application/pdf"
                                width="100%"
                                height="400px"
                            />
                        )}
                    </div>
                    <div className={post.fileContent? "post-page-left" : "post-page-text-only"}>
                        <div className="post-page-user-info">
                            <img src={NotionFace} className="post-page-pfp" />
                            <p>{post.userID?.username || "Unknown User"}</p>
                        </div>
                        {!post.fileContent && <hr className="post-page-hr" />}
                        <div className="post-page-text">
                            <p>{post.textContent}</p>
                        </div>
                        <div className="post-page-like-section" style={{ display: 'flex', flexDirection: 'column', 
                            justifyContent: 'flex-end', alignItems: 'center', height: '300px'}}>
                            <button
                                onClick={handleLikeClick}
                                className={`like-button ${isLiked ? "liked" : ""}`}
                            >
                                {isLiked ? "❤️" : "🤍"}
                            </button>
                            <span>{likeCount} Likes</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
