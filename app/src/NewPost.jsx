import React from 'react';
import fileUploadIcon from "./assets/file-upload-icon.svg";
import NewPostHeader from './NewPostHeader.jsx';
import {useNavigate} from 'react-router-dom';

export default function NewPost() {
    const [noteTitle, setNoteTitle] = React.useState("");
    const [noteText, setNoteText] = React.useState("");
    const [fileUploads, setFileUploads] = React.useState([]);
    const [tag, setTag] = React.useState("");
    const navigate = useNavigate();

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
        formData.append("userID", userId);
        let tagArray;
        tagArray = tag.split(",");
        tagArray = tagArray.map(t => t.trim());
        console.log("tagArray",tagArray);
        if (tag) {
            formData.append("tag", JSON.stringify(tagArray));
        }
        
        
    
        try {
            const response = await fetch("/api/post/new", {
                method: "POST",
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error with status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("Post saved successfully!");
            //alert("Post created successfully! Feel free to create another post or go back to the feed.");
            //console.log(data);
    
            // Clear the form after saving
            setNoteTitle("");
            setNoteText("");
            setFileUploads([]);
            setTag("");
            navigate(`/post/${data.post._id}`);
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
                    fileUploads.map((file, index) => (
                        <div key={index} className="new-post-attachment">
                            {file.name}
                        </div>
                    ))
                }
            </div>
            <h3>Add Tags</h3>
            <input
                            type="text"
                            id="tags"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="e.g., AI, Web Dev, UI/UX"
            />
        </div>
    </div>
    </>
  )
}
