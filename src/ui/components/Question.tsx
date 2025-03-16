import React from "react";
import {Trans} from "react-i18next";
import {FontTypes, QuestionInterface, QuestionType} from "../../types.ts";
import SingleSelect from "./SingleSelect.tsx";
import MultiSelect from "./MultiSelect.tsx";
import BubbleSelect from "./BubbleSelect.tsx";
import {Title} from "../base/Typography.tsx";

interface QuestionProps {
  question: QuestionInterface;
  onSelect: ( answer: string | string[] ) => void;
  questionIndex: number;
  minOptions?: number;
}

const Question: React.FC<QuestionProps> = ( { question, onSelect, questionIndex, minOptions = 3 } ) => {
  const { title, description, type, options, viewType, font } = question;

  return (
    <div
      className={`${font === FontTypes.Albert ? "font-albert" : "font-nunito"} flex flex-col gap-[1.6rem] items-center w-full`}>
      <Title type={font!}>
        <Trans
          i18nKey={title}
          components={{ strong: <span className="text-[#E4229B] font-bold"/> }}
        />
      </Title>
      {description && <p className="text-[1.7rem] leading-[2.4rem] text-[#C4C8CC] font-normal text-center">
        <Trans
          i18nKey={description}
          values={{ minOptions }}
        />
      </p>}
      <div className={'pt-[.8rem] w-full'}>
        {type === QuestionType.SingleSelect &&
          <SingleSelect {...{ questionIndex, viewType: viewType!, onSelect, options }} />}
        {type === QuestionType.MultipleSelect &&
          <MultiSelect {...{ questionIndex, viewType, onSelect, options }} />}
        {type === QuestionType.Bubble && <BubbleSelect {...{ questionIndex, onSelect, options }} />}
      </div>
    </div>
  );
};

export default Question;
