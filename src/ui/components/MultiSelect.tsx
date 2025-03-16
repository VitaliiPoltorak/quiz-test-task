import React from "react";
import {useSelection} from "../../hooks/useSelection.tsx";
import {SelectButton, SelectWrap} from "../base/Select.tsx";
import {Option, QuestionType} from "../../types.ts";

interface MultiSelectProps {
  questionIndex: number;
  options: Option[];
  onSelect: ( answer: string[] ) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ( { options, onSelect, questionIndex } ) => {
  const { selected, toggleSelection } = useSelection<string[]>({ questionIndex, onSelect });

  return (
    <SelectWrap>
      {options.map(( option ) => (
        <SelectButton
          questionType={QuestionType.MultipleSelect}
          key={option.label}
          selected={Boolean(selected && selected.length && selected.includes(option.label))}
          option={option.label}
          onClick={() => toggleSelection(option.label)}
        />
      ))}
    </SelectWrap>
  );
};

export default MultiSelect;
