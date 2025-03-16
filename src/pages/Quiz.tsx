import React, {useEffect, useMemo, useState, memo} from "react";
import {useParams, Navigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {QuestionInterface, QuestionType} from "../types.ts";
import {Question, ProgressBar} from "../ui/components";
import {Button} from "../ui/base/Button.tsx";
import {useQuizStore} from "../store/useQuiz.ts";
import {useQuizNavigation} from "../hooks/useQuizNavigation.tsx";
import {filterOptionsByDependencies} from "../utils/filter";
import arrowLeft from '../assets/arrow-left.svg'
import {Container} from "../ui/base/Container.tsx";
import {useLanguageSwitcher} from "../hooks/useLanguageSwitcher.tsx";
import Loader from "./Loader.tsx";

const Quiz: React.FC = memo(() => {
  const { questionId } = useParams<{ questionId: string }>();
  const { t } = useTranslation();
  const { answers, setAnswer, allQuestions } = useQuizStore();
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const { language, changeLanguage } = useLanguageSwitcher();

  const dependencies = useMemo(() => {
    return allQuestions.reduce(( acc, question, index ) => {
      const answer = answers[index];

      if ( answer ) {
        const selectedOption = question.options?.find(( opt ) => opt.label === answer);
        if ( selectedOption?.dependencyValue ) {
          acc[selectedOption.dependencyValue] = true;
        }
      }
      return acc;
    }, {} as Record<string, boolean>);
  }, [answers, allQuestions, language]);

  const questions: QuestionInterface[] = useMemo(() => {
    return allQuestions.map(question => ({
      ...question,
      options: filterOptionsByDependencies(question.options || [], dependencies)
    }));
  }, [allQuestions, dependencies, language]);

  const questionIndex = Number(questionId) - 1;
  const question = questions[questionIndex];
  const { nextQuestion, prevQuestion } = useQuizNavigation(questions);

  useEffect(() => {
    if ( question?.type === QuestionType.MultipleSelect || question?.type === QuestionType.Bubble ) {
      if ( question?.options.length > question!.minOptions! ) {
        const selectedAnswers = answers[questionIndex] || [];
        setIsNextEnabled(selectedAnswers.length >= (question.minOptions || 0));
      } else {
        setIsNextEnabled(answers[questionIndex]?.length > 0 || false);
      }
    } else {
      setIsNextEnabled(!!answers[questionIndex]);
    }
  }, [answers, question, questionIndex, language]);

  if ( question === undefined ) {
    return <Loader showText={false}/>;
  }

  return (
    <Container>
      <div
        className="flex flex-col gap-[4.5rem] flex-grow">
        <div className='relative'>
          {question!.showBackButton! && <button
            className="p-1 max-h-[2rem] absolute top-0 left-0 bg-inherit cursor-pointer"
            onClick={() => prevQuestion(questionIndex, `lang=${language}`)}
            disabled={questionIndex === 0}
          >
            <img src={arrowLeft} alt={'Back button'}/>
          </button>}
          <ProgressBar quizLength={questions.length} currentQuestion={questionIndex + 1}/>
        </div>
        {question && (<div className={'h-full flex flex-col justify-between flex-grow'}>
            <Question
              minOptions={
                question.type === QuestionType.MultipleSelect ||
                question.type === QuestionType.Bubble ?
                  Math.min(question?.options.length, question!.minOptions!)
                  : 1}
              questionIndex={questionIndex}
              question={question}
              onSelect={async ( answer ) => {
                setAnswer(questionIndex, answer);
                if ( question.type === QuestionType.SingleSelect ) {
                  const { localeCode } = question.options.find(( { label } ) => label === answer)!;
                  if ( localeCode ) {
                    changeLanguage(localeCode!).then(() => {
                      nextQuestion(questionIndex + 1, `lang=${localeCode}`)
                    })
                  } else await nextQuestion(questionIndex + 1, `lang=${language}`)
                }
              }}
            />
            {question.type !== QuestionType.SingleSelect && <div className="flex justify-between mt-4">
              <Button
                disabled={!isNextEnabled}
                onClick={() => nextQuestion(questionIndex + 1, `lang=${language}`)}
              >
                {t("quiz.button")}
              </Button>
            </div>}
          </div>
        )}
      </div>
    </Container>
  );
});

const QuizWrapper: React.FC = () => {
  const { questionId } = useParams<{ questionId: string }>();
  const questionNumber = Number(questionId);

  if ( isNaN(questionNumber) || questionNumber < 1 ) {
    return <Navigate to="/quiz/1"/>;
  }
  return <Quiz/>;
};

export default memo(QuizWrapper);
