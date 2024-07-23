import { useRouter } from "next/router";
import lang from "../utils/lang";

export const useTranslation = () => {
  const { locales = [], defaultLocale, ...nextRouter } = useRouter();
  const locale = locales.includes(nextRouter.locale || "") ? nextRouter.locale : defaultLocale;

  return {
    translate: (term) => {
      const translation = lang[locale][term];

      return Boolean(translation) ? translation : term;
    },
  };
};
