import React from 'react';
import NotionFace from "./assets/notion-face.png";

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

    return (
        <div className="post-listing">
            <div className="post-listing-title">
                {post.postTitle || "Untitled" }
            </div>
            <div className="post-listing-user-info">
                <img src={NotionFace} alt="user avatar" className="post-listing-pfp"></img>
                { post.userID?.username || "Unknown User" }
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
        </div>
    )
}