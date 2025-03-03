import React from "react";

export function Tag({ tag }) {
  return (
      <span
          className="bg-gray-200 text-gray-700 text-sm px-3 py-1 mt-3 rounded-full">{tag}
      </span>
  )
}

export function TagBar({tagList}) {
    return(
        <div className="flex flex-wrap space-x-2">
            {tagList.map((tag, index) => (
                <Tag key={index} tag={tag}/>
            ))}
        </div>
    )
}