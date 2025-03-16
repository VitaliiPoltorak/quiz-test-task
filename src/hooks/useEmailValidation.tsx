import {useEffect, useRef, useState, FormEvent} from "react";
import {useTranslation} from "react-i18next";
import {storage} from "../utils/storage.ts";
import {usePreserveQuery} from "./usePreserveQuery.tsx";

export const useEmailValidation = ( navigateFn?: ( path: string ) => void ) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const { navigateWithQuery } = usePreserveQuery();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const validateEmail = ( email: string ) => {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,5})+$/
      .test(email);
  };

  const handleSubmit = ( e?: FormEvent ) => {
    e?.preventDefault();
    if ( !email.trim() ) {
      setError(t("email.validationMessage"));
      return;
    }
    const isValid = validateEmail(email);
    setError(isValid ? "" : t("email.validationMessage"));
    if ( !isValid ) return;

    storage.save("user_email", email);
    (navigateFn || navigateWithQuery)("/thank-you");
  };

  return { email, setEmail, error, handleSubmit, inputRef, setError };
};
