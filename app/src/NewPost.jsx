import React from 'react';
import fileUploadIcon from "./assets/file-upload-icon.svg";

export default function NewPost() {
    const [noteTitle, setNoteTitle] = React.useState("");
    const [noteText, setNoteText] = React.useState("");
    const [fileUploads, setFileUploads] = React.useState([]);

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

  return (
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
        </div>
    </div>
  )
}
