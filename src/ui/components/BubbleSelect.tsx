import React from "react";
import {useSelection} from "../../hooks/useSelection.tsx";
import {Option} from "../../types.ts";
import {bubbleRowConfig} from "../../config";

interface BubbleSelectProps {
  questionIndex: number;
  options: Option[];
  onSelect: ( answer: string[] ) => void;
}

const BubbleSelect: React.FC<BubbleSelectProps> = ( { options, onSelect, questionIndex } ) => {
  const { selected, toggleSelection } = useSelection({ questionIndex, onSelect });

  const rows: Option[][] = [];
  let tempRow: Option[] = [];
  let evenRow = true;

  for ( let i = 0; i < options.length; i++ ) {
    tempRow.push(options[i]);

    if ( (evenRow && tempRow.length === bubbleRowConfig.topRow) || (!evenRow && tempRow.length === bubbleRowConfig.bottomRow) ) {
      rows.push(tempRow);
      tempRow = [];
      evenRow = !evenRow;
    }
  }

  if ( tempRow.length ) rows.push(tempRow);

  return (
    <div className="flex flex-wrap gap-2">
      <div className="relative w-full flex flex-col items-center p-4">
        {rows.map(( row, rowIndex ) => {

          const isOffset = rowIndex > 0 && rows[rowIndex - 1].length % 2 && row.length < Math.min(bubbleRowConfig.topRow, bubbleRowConfig.bottomRow);

          return (
            <div key={rowIndex}
                 className={`flex justify-center my-[-2px] gap-[2px] ${isOffset && 'translate-x-[-50%]'}`}>
              {row.map(( bubble ) => (
                <div
                  key={bubble.label}
                  className={`flex items-center justify-center w-[8.8rem] h-[8.8rem] rounded-full cursor-pointer border-[2px] transition-all bg-[#36173D] ${
                    selected.includes(bubble.label) ? "border-[#E4229B]" : "border-transparent"
                  }`}
                  onClick={() => toggleSelection(bubble.label)}
                >
                  <div className={'flex flex-col items-center justify-center gap-[.8rem] translate-y-[-0.5rem]'}>
                    <span className='max-w-[2.5rem]'>{bubble.icon &&
                      <img src={bubble.icon} alt={bubble.label} className={'w-full aspect-square'}/>}</span>
                    <span className="text-[1.3rem] text-center leading-[1.6rem] tracking-[.006em]">{bubble.label}</span>
                  </div>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default BubbleSelect;
