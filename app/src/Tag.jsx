import React from "react";

export function Tag({ tag, color }) {
    const isDarkColor = (hexColor) => {
        if (!hexColor) return false;
        const r = parseInt(hexColor.substring(1, 3), 16);
        const g = parseInt(hexColor.substring(3, 5), 16);
        const b = parseInt(hexColor.substring(5, 7), 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance < 0.5;
    };

  return (
    <span
    className={color ? 
        "text-sm px-3 py-1 mt-3 rounded-full" : 
        "bg-gray-200 text-gray-700 text-sm px-3 py-1 mt-3 rounded-full"}
    style={{ 
        backgroundColor: color,
        color: (isDarkColor && color) ? "white" : "black"
    }}
    >
    {tag}
</span>
  )
}

export function TagBar({tagList, showColor}) {

    console.log("tagList",tagList);
    return(
        showColor ?
            <div className="flex flex-wrap space-x-2">
            {tagList.map((tag, index) => (
                <Tag key={index} tag={tag.tagName} color={tag.color}/>
            ))}
        </div> :
        <div className="flex flex-wrap space-x-2">
            {tagList.map((tag, index) => (
                <Tag key={index} tag={tag} color={tag.color}/>
            ))}
        </div>
        
    )
}