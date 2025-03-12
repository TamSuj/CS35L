import React from "react";

export function Tag({ tag, color }) {
  return (
    <span
    className={color ? 
        "text-sm px-3 py-1 mt-3 rounded-full" : 
        "bg-gray-200 text-gray-700 text-sm px-3 py-1 mt-3 rounded-full"}
        style={{ backgroundColor: color }}
    >
    {tag}
</span>
  )
}

export function TagBar({tagList}) {
    return(
        <div className="flex flex-wrap space-x-2">
            {tagList.map((tag, index) => (
                <Tag key={index} tag={tag} color={tag.color}/>
            ))}
        </div>
    )
}