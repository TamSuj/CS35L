import React from 'react';
import arrowLeft from "./assets/left-arrow.svg";
import { Link } from "react-router-dom";

export default function NewPostHeader({ onSave }) {
    return (<nav className="bg-white p-4 flex justify-between items-center max-w-[90%] mx-auto">
    {/* Left Section: Back Arrow + "New Note" */}
    <div className="flex items-center gap-2">
        <Link to="/" viewTransition className="flex items-center">
            <img src={arrowLeft} alt="Back" className="w-6 h-6" />
        </Link>
        <span className="text-xl font-bold text-gray-800">New Note</span>
    </div>

    {/* Right Section: Save Button */}
    <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800" onClick={onSave}>
        {/* <Link to="/newpost" viewTransition>Save</Link> */}
        Save
    </button>
    </nav>)
}

