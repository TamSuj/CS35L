import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import fileUploadIcon from "./assets/file-upload-icon.svg";
import NewPostHeader from './NewPostHeader.jsx';

export default function EditPostPage() {
    const [noteTitle, setNoteTitle] = React.useState("");
    const [noteText, setNoteText] = React.useState("");
    const [fileUploads, setFileUploads] = React.useState([]);
    const [existingFile, setExistingFile] = React.useState(null);
    const { postId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPostData = async () => {
            try{
                const response = await fetch(`/api/post/${postId}`);
                if(!response.ok){
                    throw new Error(`Error fetching post ${postId}`);
                }
                const data =  await response.json();
                setNoteTitle(data.postTitle || '');
                setNoteText(data.textContent || '');
                if(data.fileContent)
                {
                    setExistingFile(data.fileContent);
                }
            } catch(error) {
                console.error("Error fetching post:", error);
                alert("Failed to load post.");
            }
        };
        fetchPostData();
    }, [postId]);

    const handleTitleChange = (event) => {
        setNoteTitle(event.target.value);
    };

    const handleTextChange = (event) => {
        setNoteText(event.target.value);
    };

    const handleFileUploadsChange = (event) => {
        const newFiles = event.target.files;
        setFileUploads((fileUploads) => [...fileUploads, ...newFiles]);
    };
    
    const handleSavePost = async () => {
        if (!noteText.trim()) {
            alert("Post content cannot be empty!");
            return;
        }

        const user = localStorage.getItem("user");
        if (!user) {
            alert("Please log in or sign up to make a post.")
            return;
        }
        const userId = JSON.parse(user).id;
    
        const formData = new FormData();
        formData.append("postTitle", noteTitle);
        formData.append("textContent", noteText);
        fileUploads.forEach((file) => formData.append("fileContent", file));
        if(existingFile){
            formData.append("existingFile", existingFile);
        }
        formData.append("userID", userId);
        formData.append("postId", postId);
    
        try {
            const response = await fetch(`/api/post/${postId}/edit`, {
                method: "PUT",
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error with status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("Post saved successfully!");

            navigate(`/post/${postId}`);
        } catch (error) {
            console.error("Error saving post:", error);
            alert("Failed to save post.");
        }
    };
    


  return (
    <>
    <NewPostHeader onSave={handleSavePost} />
    <div className="new-post">
        <div className="new-post-flexbox">
            <div className="type-note">
                <input 
                    type="text"
                    className="note-title"
                    placeholder="Title"
                    value={noteTitle}
                    onChange={handleTitleChange}
                />
                <textarea
                 className="type-note-body"
                 placeholder="Start typing your note..."
                 value={noteText}
                 onChange={handleTextChange}
                />
            </div>
            <div className="add-to-note">
                <div className="add-to-note-heading">
                    Add to Your Note
                </div>
                <hr />
                <div className="add-to-note-flexbox">
                    <label className="add-to-note-element upload-button">
                        <img src={fileUploadIcon} alt="File Upload Icon" className="invert-icon" />
                        <span>Upload File</span>
                        <input type="file" onChange={handleFileUploadsChange} hidden />
                    </label>
                </div>
            </div>
            <div className="new-post-attachments">
                <h3>Attachments</h3>
                {
                fileUploads.length > 0 ? (
                    fileUploads.map((file, index) => (
                        <div key={index} className="new-post-attachment">
                            {file.name}
                        </div>
                    ))
                ): existingFile ? (
                    <div className="new-post-attachment">
                        <a href={existingFile} target="_blank" rel="noopener noreferrer">{existingFile}</a>
                    </div>
                ) : null
                }
            </div>
        </div>
    </div>
    </>
  )
}
