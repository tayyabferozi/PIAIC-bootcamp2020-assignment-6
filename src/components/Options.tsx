import React from "react";

import Option from "./Option";

const parts = ["A", "B", "C", "D"];

const Options: React.FC<{ options: string[]; questionNo: number }> = ({
  options,
  questionNo,
}) => {
  return (
    <div className="Options">
      {options.map((el, ix) => {
        const partNo = parts[ix];
        return <Option key={partNo} partNo={partNo} statement={el} />;
      })}
    </div>
  );
};

export default React.memo(Options, (prevProps, nextProps) => {
  if (prevProps.questionNo === nextProps.questionNo) {
    return true;
  } else {
    return false;
  }
});
