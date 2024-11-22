import React from "react";

function DataLoader({ numberOfItems }: { numberOfItems: number }) {
  const items = new Array(numberOfItems).fill(null);
  return (
    <div className="w-full h-full">
      {items.map((_, inx) => (
        <div
          key={inx}
          className="w-full h-[5.1rem] my-3 bg-slate-200 animate-pulse rounded-xl "
        ></div>
      ))}
    </div>
  );
}

export default DataLoader;
