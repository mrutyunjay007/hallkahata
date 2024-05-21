import React from "react";

function TextArea() {
  return (
    <textarea
      placeholder="Enter details(items,bill no.,quantity,etc)"
      className=" w-full  p-3 border-2 rounded-lg border-primary h-36 resize-none  "
    ></textarea>
  );
}

export default TextArea;
