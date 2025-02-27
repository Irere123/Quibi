import { useTranslation } from "react-i18next";
import { TranslationKeys } from "../generated/translationKeys";

interface DateTranslationType {
  time?: Date;
  date?: Date;
  membersNum?: any;
  messageNum?: any;
}

export const useTypeSafeTranslation = () => {
  const { t } = useTranslation();

  return {
    t: (s: TranslationKeys, f?: DateTranslationType) => t(s, f),
  };
};
