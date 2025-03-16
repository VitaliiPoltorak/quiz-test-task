import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import CircularLoader from "../ui/components/CircularLoader.tsx";
import {animationSpeed} from "../config";
import {usePreserveQuery} from "../hooks/usePreserveQuery.tsx";

const Loader: React.FC<{ showText?: boolean }> = ( { showText = true } ) => {
  const { navigateWithQuery } = usePreserveQuery();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigateWithQuery("/email");
    }, animationSpeed);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className={`font-${t("loading.font")} flex flex-col items-center justify-center min-h-screen text-white gap-[4rem] px-[4rem]`}>
      <CircularLoader {...{ animationSpeed }} />
      {showText && <p
        className="px-[1.95rem] text-[1.7rem] leading-[2.5rem] tracking-[-.02em] text-center max-w-[21rem]">{t("loading.text")}</p>}
    </div>
  );
};

export default Loader;
