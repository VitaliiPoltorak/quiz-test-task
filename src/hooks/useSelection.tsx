import {useState, useEffect} from "react";
import {useQuizStore} from "../store/useQuiz.ts";

interface UseSelectionProps<T> {
  questionIndex: number;
  onSelect: ( answer: T ) => void;
}

const getEmptyValue = <T extends string | string[]>(): T => {
  return (Array.isArray([]) ? [] : "") as T;
};

export const useSelection = <T extends string | string[]>( {
                                                             questionIndex,
                                                             onSelect
                                                           }: UseSelectionProps<T> ) => {
  const { answers } = useQuizStore();
  const [selected, setSelected] = useState<T>(() => {
    const initial = answers[questionIndex];
    return initial !== undefined ? (initial as T) : getEmptyValue<T>();
  });

  useEffect(() => {
    const newValue = answers[questionIndex];

    setSelected(
      (newValue !== undefined
        ? newValue
        : (Array.isArray(selected) ? [] : "")) as T
    );
  }, [answers, questionIndex]);


  const toggleSelection = ( option: string ) => {
    if ( !Array.isArray(selected) ) return;

    setSelected(( prev ) => {
      if ( !Array.isArray(prev) ) return prev;

      const newSelection = prev.includes(option)
        ? prev.filter(( item ) => item !== option)
        : [...prev, option];

      onSelect(newSelection as T);
      return newSelection as T;
    });
  };

  return { selected, toggleSelection, setSelected };
};
