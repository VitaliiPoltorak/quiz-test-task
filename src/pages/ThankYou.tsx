import React from "react";
import {useTranslation} from "react-i18next";
import {useQuizStore} from "../store/useQuiz.ts";
import {useCSVGenerator} from "../hooks/useCSVGenerator.tsx";
import {Container} from "../ui/base/Container.tsx";
import {Button} from "../ui/base/Button.tsx";
import checkmark from '../assets/checkmark.png'
import download from '../assets/download.svg'
import {usePreserveQuery} from "../hooks/usePreserveQuery.tsx";

const ThankYou: React.FC = () => {
  const { navigateWithQuery } = usePreserveQuery();
  const { t } = useTranslation();
  const { clearAnswers } = useQuizStore();
  const { generateCSV } = useCSVGenerator()
  return (
    <Container>
      <div className={`flex flex-col flex-grow justify-between "font-${t("thankYou.font")}"`}>
        <div className="flex flex-col gap-[6.2rem] items-center pt-[10rem]">
          <div className={'text-center'}>
            <h2 className="text-[3.6rem] font-niconne">{t("thankYou.title")}</h2>
            <p
              className="text-[1.7rem] leading-[2.5rem] font-semibold tracking-[-0.01rem]">{t("thankYou.description")}</p>
          </div>
          <div className="max-w-[11.8rem] w-full">
            <img className={'w-full h-full'} src={checkmark} alt="check"/>
          </div>
        </div>
        <div className="flex flex-col gap-[.9rem]">
          <Button
            viewType={'secondary'}
            onClick={generateCSV}
          >
            <img src={download} alt="download icon"/>{t("thankYou.subButton")}
          </Button>
          <Button
            onClick={() => {
              clearAnswers()
              navigateWithQuery("/")
            }}
          >
            {t("thankYou.button")}
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default ThankYou;
