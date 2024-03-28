import React from "react";
import FadeLoader from "react-spinners/FadeLoader";

const Loader2 = () => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-gray-900 opacity-80">
      <FadeLoader className=" mt-[-50px]" color="#F04E23" />
    </div>
  );
};

export default Loader2;
