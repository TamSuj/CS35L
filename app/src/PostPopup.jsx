import React from "react";
import NotionFace from "./assets/notion-face.png";
import { Link } from "react-router-dom";

export default function PostPopup({ post, onClose }) {
    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <button className="popup-close" onClick={onClose}>✖</button>
                {/* <h2 className="post-popup-title">{post.postTitle || "Untitled"}</h2> */}
                <Link to={`/post/${post._id}`} className="post-title-link">
                    {post.postTitle || "Untitled"}
                </Link>
                <div className="post-popup-user-info">
                    <img src={NotionFace} className="post-popup-pfp" />
                    <p>{post.userID?.username || "Unknown User"}</p>
                </div>
                <hr className="post-popup-hr"></hr>
                <div className="post-popup-body">
                    <p>{post.textContent}</p>
                    {post.fileContent && (
                        <embed
                            src={`http://localhost:3001/uploads/${post.fileContent}`}
                            type="application/pdf"
                            width="100%"
                            height="400px"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
