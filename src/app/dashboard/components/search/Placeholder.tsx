import React, { useEffect, useState } from "react";

function Placeholder({ focusHandler }: { focusHandler: () => void }) {
  const placeholder = ["search", "user name", "phone number"];

  const [currentElement, setCurrentElement] = useState(0);

  // auto change placeholder
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentElement((prev) => (prev + 1) % placeholder.length);
    }, 4000);

    return () => clearTimeout(timer);
  });

  return (
    <div
      className="w-full relative font-poppins text-sm cursor-pointer"
      onClick={
        // handle focus of search-bar
        focusHandler
      }
    >
      <span className=" relative bg-white">
        {/* moving cursor */}
        <span className="w-full bg-white animate-placeholder_animation absolute top-0 left-0 text-primary  text-lg">
          <div className="  animate-caret-blink h-5 border-l-[1.5px] border-primary"></div>
        </span>

        {/* placeholder */}
        <span className="text-slate-700">{placeholder[currentElement]}</span>
      </span>
    </div>
  );
}

export default Placeholder;
