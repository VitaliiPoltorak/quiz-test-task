import React from 'react';
import {QuestionType, ViewType} from "../../types.ts";
import check from "../../assets/check.svg";

interface SelectWrapProps {
  children?: React.ReactNode;
  viewType?: ViewType;
}

interface SelectButtonProps {
  option: string;
  selected: boolean;
  onClick: () => void;
  viewType?: ViewType;
  questionType?: Extract<QuestionType, QuestionType.SingleSelect | QuestionType.MultipleSelect>;
  icon?: string;
}

export const SelectWrap = ( { children, viewType = ViewType.Column }: SelectWrapProps ) => {
  return <div className={`flex flex-${viewType} gap-[1.2rem] w-full ${viewType === ViewType.Row && 'mt-[2rem]'}`}>
    {children}
  </div>;
}

export const SelectButton = ( {
                                option,
                                selected,
                                onClick,
                                viewType = ViewType.Column,
                                icon,
                                questionType = QuestionType.SingleSelect
                              }: SelectButtonProps ) => {
  return <button
    className={`px-[2rem] rounded-[16px] border border-[#36173D] ${selected ? "bg-[rgba(228,34,155,0.2)] border-[#E4229B] " : "bg-[#36173D] text-white"} ${viewType === ViewType.Column ? 'text-[1.7rem] text-left py-[1.8rem]' : 'text-2xl flex-1 text-center flex gap-[1rem] flex-col py-[3rem]'} hover:bg-[#E4229B] transition-all ease-linear group cursor-pointer`}
    onClick={onClick}
  >
    {icon && <img src={icon} alt={option} className={'w-full aspect-square'}/>}
    <span className={`flex items-center ${viewType === ViewType.Column ? 'justify-between' : 'justify-center'}`}>
      {option}
      {questionType === QuestionType.MultipleSelect && <span
        className={`flex items-center justify-center w-[2.3rem] h-[2.3rem] border border-[#E4229B] rounded-[8px] 
        ${selected ? 'bg-[#E4229B] group-hover:border-[#6D4376]' : 'bg-[#6D4376]'}`}>{selected &&
        <img src={check} alt={'check'}/>}</span>}
      </span>
  </button>;
}
