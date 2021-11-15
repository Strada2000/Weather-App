import React from "react";

export default function currdate() {
  let date = new Date();

  return (
    <div>
      <p>
        {date.toLocaleString("en-US", {
          weekday: "short",
          day: "numeric",
          year: "numeric",
          month: "short",
        })}
      </p>
    </div>
  );
}
