import React from "react";

const Question: React.FC<{ qStatement: string; questionNo: number }> = ({
  qStatement,
  questionNo,
}) => {
  return (
    <div>
      <div
        className="Callout top-right"
        dangerouslySetInnerHTML={{
          __html: `<div class='qNo'>${questionNo + 1} / 10</div> ${qStatement}`,
        }}
      ></div>
    </div>
  );
};

export default Question;
