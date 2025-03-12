import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NotionFace from "./assets/notion-face.png";
import DeleteButton from "./DeleteButton";
import EditButton from './EditButton';
import LikeButton from "./LikeButton";
import { TagBar } from "./Tag.jsx";
import { Link } from "react-router-dom";

export default function PostPage() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/api/post/${postId}`)
            .then((res) => res.json())
            .then((data) => setPost(data))
            .catch(() => navigate("/feed"));
    }, [postId, navigate]);

    if (!post) return <p>Loading post...</p>;

    return (
        <div className="post-page-wrapper">
            <div className="post-page">
                <button onClick={() => navigate(-1)} className="post-page-back-button">← Back</button>
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
                            { post.userID?.username ? <Link to={`/profile/${post.userID?._id}`} className="post-title-user-link">
                            {post.userID?.username} </Link> : "Unknown User" }
                        </div>
                        {!post.fileContent && <hr className="post-page-hr" />}
                        <div className="post-page-text">
                            <p>{post.textContent}</p>
                        </div>
                    </div>
                </div>
                <div className="poster-buttons-container">
                    <EditButton postId={postId}/>
                    <DeleteButton postId={post._id} />
                </div>

                <div className="like-button">
                    <LikeButton postId={post._id} initialLikes={post.likeCount} />
                </div>

                <div className="post-listing-tags">
                    <TagBar tagList={post.tags || []} />
                </div>
            </div>
        </div>
    );
}
