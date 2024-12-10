import React from "react";

function SearchHighlighter({
  highlightedPart,
  searching,
}: {
  highlightedPart: string;
  searching: string;
}) {
  const parts = searching.split(new RegExp(`(${highlightedPart})`, "gi"));

  return (
    <>
      {parts!.map((part, index) => (
        <span
          key={index}
          className={`${
            part.toLowerCase() === highlightedPart.toLowerCase() &&
            "bg-[#ffc300]"
          }`}
        >
          {part}
        </span>
      ))}
    </>
  );
}

export default SearchHighlighter;
