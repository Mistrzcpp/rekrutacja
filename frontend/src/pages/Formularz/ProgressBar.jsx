import React from "react";

function ProgressBar({ strona }) {
  const procent = (strona / 5) * 100;

  return (
    <div className="progress mb-4">
      <div
        className="progress-bar"
        role="progressbar"
        style={{ width: `${procent}%` }}
        aria-valuenow={strona}
        aria-valuemin="0"
        aria-valuemax="5"
      ></div>
    </div>
  );
}

export default ProgressBar;
