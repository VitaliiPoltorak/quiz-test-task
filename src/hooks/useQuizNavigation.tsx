import {useQuizStore} from "../store/useQuiz.ts";
import {QuestionInterface} from "../types.ts";
import {useNavigate} from "react-router-dom";


export const useQuizNavigation = ( questions: QuestionInterface[] ) => {

  const navigate = useNavigate();
  const { removeAnswer } = useQuizStore();

  const nextQuestion = async ( questionIndex: number, query?: string ) => {
    if ( questionIndex < questions.length ) {
      navigate(`/quiz/${questionIndex + 1}${query && `?${query}`}`);
    } else {
      navigate(`/loading${query && `?${query}`}`);
    }
  };

  const prevQuestion = ( questionIndex: number, query?: string ) => {
    if ( isNaN(questionIndex) || questionIndex <= 0 ) return;
    if ( questionIndex > 0 ) removeAnswer(questionIndex);
    navigate(`/quiz/${questionIndex}${query && `?${query}`}`);
  };

  return { nextQuestion, prevQuestion };
};
