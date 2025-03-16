import {create} from "zustand";
import {IStorage, storage} from "../utils/storage.ts";
import {QuestionInterface} from "../types.ts";

export interface QuizState {
  answers: Record<number, string | string[]>;
  currentQuestion: number;
  email: string;
  setEmail: ( email: string ) => void
  allQuestions: QuestionInterface[];
  setAllQuestions: ( questions: QuestionInterface[] ) => void;
  setAnswer: ( questionIndex: number, answer: string | string[] ) => void;
  setCurrentQuestion: ( index: number ) => void;
  clearAnswers: () => void;
  removeAnswer: ( questionIndex: number ) => void;
}

const quizStore = ( storage: IStorage ) => create<QuizState>(( set ) => ({
  answers: storage.load("quiz_answers", {}),
  currentQuestion: storage.load("quiz_current", 1),
  allQuestions: [],
  email: storage.load("user_email", ""),
  setEmail: ( email ) => {
    storage.save("user_email", email);
    set(() => ({ email }));
  },
  setAllQuestions: ( questions ) => set(() => ({ allQuestions: questions })),
  setAnswer: ( questionIndex, answer ) => {
    set(( state ) => {
      const updatedAnswers = { ...state.answers, [questionIndex]: answer };
      storage.save("quiz_answers", updatedAnswers);
      return { answers: updatedAnswers };
    });
  },
  setCurrentQuestion: ( index ) => {
    storage.save("quiz_current", index);
    set(() => ({ currentQuestion: index }));
  },
  clearAnswers: () => {
    storage.remove("quiz_answers");
    storage.remove("user_email");
    set(() => ({ answers: {}, currentQuestion: 0 }));
  },
  removeAnswer: ( questionIndex ) => {
    set(( state ) => {
      const updatedAnswers = { ...state.answers };
      delete updatedAnswers[questionIndex];
      storage.save("quiz_answers", updatedAnswers);
      return { answers: updatedAnswers };
    });
  },
}));

export const useQuizStore = quizStore(storage);
