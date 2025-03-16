import React from "react";

interface ProgressBarProps {
  quizLength: number;
  currentQuestion: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ( { quizLength, currentQuestion } ) => {
  const progress = (currentQuestion / quizLength) * 100;
  return (<div className="flex flex-col items-center gap-[1.3rem] pt-[.3rem]">
      <div className="font-albert font-extrabold text-[1.8rem] leading-[2rem]">
        <span className="text-pink-500">{currentQuestion}</span> <span className={'font-medium'}>/</span> {quizLength}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-pink-500 h-2 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
