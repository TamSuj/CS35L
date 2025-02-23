import React, {useState} from "react";
import {Tag} from "./Tag.jsx";

export function Note({title, date, commentCount, likeCount}) {
    return (
        <div className="bg-gray-100 p-4 rounded-lg">
            <div className="text-gray-800 text-2xl">📄</div>
            <p className="mt-2 font-semibold text-gray-800">{title}</p>
            <p className="text-gray-600 text-sm">{date}</p>
            <div className="flex space-x-2 mt-2 text-gray-600 text-sm">
                <span>❤️  {likeCount}</span>
                <span>💬  {commentCount}</span>
            </div>
        </div>
    )
}

export function NoteGallery({noteList}) {
    return(
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {noteList.map((note, index) => (
                <Note key={index} title={note.title} date={note.createdAt.toString()} commentCount={note.comments.length} likeCount={note.likeCount}/>
            ))}
        </div>
    )
}
