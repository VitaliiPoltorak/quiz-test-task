import {useTranslation} from "react-i18next";
import {useQuizStore} from "../store/useQuiz.ts";

export const useCSVGenerator = () => {
  const { t } = useTranslation();
  const { answers } = useQuizStore();

  const generateCSV = () => {
    const questions = t("quiz.questions", { returnObjects: true }) as unknown as { title: string; type: string }[];
    if ( !questions.length ) {
      alert(t("thankYou.noAnswers"));
      return;
    }

    const csvContent = [
      "order,title,type,answer",
      ...questions.map(( q, index ) => {
        const userAnswer = answers[index] || "";
        const formattedAnswer = Array.isArray(userAnswer) ? userAnswer.join("; ") : userAnswer;
        return `${index + 1},"${q.title}",${q.type},"${formattedAnswer}"`;
      })
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quiz_results.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return { generateCSV };
};
