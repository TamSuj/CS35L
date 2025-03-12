import React from 'react';
import NotionFace from "./assets/notion-face.png";
import { Link } from "react-router-dom";
import { TagBar } from "./Tag.jsx";
import LikeButton from "./LikeButton.jsx";

export default function PostListing({ post }) {
    const filePreview = post.fileContent && (
        post.fileContent.endsWith(".pdf") ? (
            <embed
                src={`http://localhost:3001/uploads/${post.fileContent}`}
                type="application/pdf"
                width="100%"
                height="200px"
            />
        ) : (
            <img
                src={`http://localhost:3001/uploads/${post.fileContent}`}
                alt="Uploaded file"
                className="file-thumbnail"
                style={{ maxWidth: "200px", maxHeight: "200px" }}
            />
        )
    );

    //console.log("post user",post?.userID);

    return (
        <div className="post-listing">
            <div className="post-listing-title">
                {/* <a href={`/post/${post._id}`} className="post-title-link" target="_blank" rel="noopener noreferrer">
                    {post.postTitle || "Untitled"}
                </a> */}
                <Link to={`/post/${post._id}`} className="post-title-link">
                    {post.postTitle || "Untitled"}
                </Link>
            </div>
            <div className="post-listing-user-info">
                <img src={NotionFace} alt="user avatar" className="post-listing-pfp"></img>
                { post.userID?.username ? <Link to={`/profile/${post.userID?._id}`} className="post-title-user-link">
                {post.userID?.username} </Link> : "Unknown User" }
            </div>
            <div className="post-listing-body">
                {filePreview ?
                    (<><div className="post-listing-left">
                        {filePreview}
                    </div>
                    <div className="post-listing-right">
                        {post.textContent}
                    </div></>)
                    : ( <div className="post-listing-text">
                        {post.textContent}
                    </div>
                    )
                }
            </div>
            <div className="post-listing-tags">
                <TagBar tagList={post.tagObjects || []} showColor={true} />
            </div>
            <div className="like-button">
                    <LikeButton 
                        postId={post._id} 
                        initialLikes={post.likeCount} 
                        btnSize={"small"} 
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
        </div>
    )
}