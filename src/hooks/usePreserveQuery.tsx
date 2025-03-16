import {useNavigate, useLocation} from "react-router-dom";
import {useLanguageSwitcher} from "./useLanguageSwitcher.tsx";
import {useCallback} from "react";

export const usePreserveQuery = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguageSwitcher()

  const navigateWithQuery = useCallback(( path: string ) => {
    const params = new URLSearchParams(location.search);
    params.set('lang', language);
    navigate(`${path}?${params.toString()}`);
  }, [language])

  return { navigateWithQuery };
};
