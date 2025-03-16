import React from "react";
import {Option, ViewType} from "../../types.ts";
import {useSelection} from "../../hooks/useSelection.tsx";
import {SelectButton, SelectWrap} from "../base/Select.tsx";

interface SingleSelectProps {
  questionIndex: number;
  options: Option[];
  onSelect: ( answer: string ) => void;
  viewType: ViewType;
}

const SingleSelect: React.FC<SingleSelectProps> = ( { options, onSelect, viewType, questionIndex } ) => {
  const { selected, setSelected } = useSelection<string>({ questionIndex, onSelect });

  return (
    <SelectWrap {...{ viewType }}>
      {options.map(( option ) => (
          <SelectButton
            key={option.label}
            selected={selected === option.label}
            option={option.label}
            onClick={() => {
              setSelected(option.label);
              onSelect(option.label);
            }}
            viewType={viewType}
            icon={option.icon}
          />
        )
      )}
    </SelectWrap>
  );
};

export default SingleSelect;
