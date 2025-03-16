import React from "react";
import {Trans, useTranslation} from "react-i18next";
import {useEmailValidation} from "../hooks/useEmailValidation.tsx";
import {Title} from "../ui/base/Typography.tsx";
import {Container} from "../ui/base/Container.tsx";
import {Button} from "../ui/base/Button.tsx";

const Email: React.FC = () => {
  const { t } = useTranslation();
  const { email, setEmail, error, handleSubmit, inputRef, setError } = useEmailValidation();

  return (
    <Container>
      <div
        className={`flex font-${t("email.font")} flex-col items-center justify-center gap-[5.6rem] flex-grow h-full pt-[7.2rem]`}>
        <div className="flex flex-col items-center justify-center gap-[1.2rem]">
          <Title>
            {t("email.title")}
          </Title>
          <p className="leading-[2.2rem] text-center text-[#C4C8CC] font-medium text-[1.5rem]">
            {t("email.description")}
          </p>
        </div>

        <form className="flex flex-col justify-between flex-grow w-full h-full" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-center gap-[5.6rem] relative">
            <input
              ref={inputRef}
              type="email"
              className={`py-[2.6rem] px-[2rem] rounded-[16px] w-full bg-[#36173D] leading-[2.4rem] text-[#ffffff] font-medium text-[1.7rem] tracking-[-0.01rem] border ${email.trim() ? 'border-[#D0006E]' : 'border-[#36173D]'} focus-visible:border-[#D0006E] outline-none focus:ring-0 focus:outline-none`}
              placeholder={t("email.placeholder")}
              value={email}
              onChange={( e ) => {
                setEmail(e.target.value);
                setError("");
              }}
            />
            {error && <p className="text-red-500 absolute">{error}</p>}

            <p className="leading-[1.8rem] text-center text-[#B6B8C3] font-medium text-[1.2rem] max-w-[28rem]">
              <Trans
                i18nKey="email.additionalInfo"
                components={{ strong: <span className="text-[#EB2F9A] cursor-pointer"/> }}
              />
            </p>
          </div>
          <Button
            type="submit"
            disabled={!email.trim()}
          >
            {t("email.button")}
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Email;
