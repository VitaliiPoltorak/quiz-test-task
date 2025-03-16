import React, {useEffect} from "react";
import {BrowserRouter, Routes, Route, Navigate, useLocation} from "react-router-dom";
import Quiz from "./pages/Quiz";
import Loader from "./pages/Loader";
import Email from "./pages/Email";
import ThankYou from "./pages/ThankYou";
import {useQuizStore} from "./store/useQuiz.ts";
import {AnimatePresence} from "framer-motion";
import {AnimatedPage} from "./ui/base/AnimatedPage.tsx";
import {useTranslation} from "react-i18next";
import {QuestionInterface} from "./types.ts";
import {useLanguageSwitcher} from "./hooks/useLanguageSwitcher.tsx";

const getLastUnansweredQuestion = ( answers: Record<number, string | string[]> ): number => {
  const answeredQuestions = Object.keys(answers).map(Number);
  return answeredQuestions.length
    ? Math.max(...answeredQuestions) + 1
    : 1;
};

const AnimatedRoutes: React.FC = () => {
  const { allQuestions, answers, setAllQuestions, email } = useQuizStore();
  const location = useLocation();
  const { t } = useTranslation();
  const { language } = useLanguageSwitcher();

  useEffect(() => {
    const rawQuestions = t("quiz.questions", { returnObjects: true }) as QuestionInterface[];
    setAllQuestions(rawQuestions);
  }, [language, location]);

  const lastUnansweredQuestion = getLastUnansweredQuestion(answers);

  const redirectTo =
    lastUnansweredQuestion === allQuestions.length
      ? email
        ? "/thank-you"
        : "/email"
      : `/quiz/${Math.max(1, lastUnansweredQuestion)}`;

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to={redirectTo} replace/>}/>
        <Route path="/quiz/:questionId" element={<AnimatedPage><Quiz/></AnimatedPage>}/>
        <Route path="/loading" element={<AnimatedPage><Loader/></AnimatedPage>}/>
        <Route path="/email" element={<AnimatedPage><Email/></AnimatedPage>}/>
        <Route path="/thank-you" element={<AnimatedPage><ThankYou/></AnimatedPage>}/>
        <Route path="*" element={<Navigate to={redirectTo} replace/>}/>
      </Routes>
    </AnimatePresence>
  )
};

const AppRoutes: React.FC = React.memo(() => {
  return <BrowserRouter>
    <AnimatedRoutes/>
  </BrowserRouter>
})

export default AppRoutes;
