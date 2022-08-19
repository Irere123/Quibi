import React from "react";
import { useTranslation } from "react-i18next";
import { ParseTextToTwemoji } from "./Twemoji";
import backIcon from "../icons/ArrowBackIcon";
import { SettingsIcon } from "./SettingsIcon";
import { LanguageSearch } from "./LanguageSearch";
import { useRouter } from "next/router";

interface LanguageSelectorProps {
  onClose?(): void;
  mobile?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  onClose,
  mobile = false,
}) => {
  const languages = [
    { value: "en", flag: "🇬🇧", label: "English" }, // English

    /* Languages that are in ISO 639-1, sorted by language code (A-Z) */
    { value: "fr", flag: "🇫🇷", label: "Français" }, // French
    { value: "kiny", flag: "🇫🇷", label: "Kinyarwanda" }, // Kinyarwanda
  ].sort((a, b) => a.label.localeCompare(b.label));

  const options = [...languages];

  const { i18n } = useTranslation();
  const { back } = useRouter();

  const getOptions = (search: string) => {
    return options
      .filter((v) => v.label.toLowerCase().startsWith(search.toLowerCase()))
      .map((e, i) => (
        <SettingsIcon
          key={e.value + i}
          classes={`text-primary-100 focus:outline-no-chrome whitespace-nowrap overflow-ellipsis${
            i18n.language === e.value ||
            (e.value === "en" && i18n.language === "en-US")
              ? " bg-primary-700"
              : ""
          }`}
          onClick={() => {
            i18n.changeLanguage(e.value);
            if (mobile) {
              back();
            }
          }}
          last={i === options.length - 1}
          icon={
            <ParseTextToTwemoji text={e.label} style={{ marginRight: "1ch" }} />
          }
        ></SettingsIcon>
      ));
  };

  const [parsedOptions, setParsedOptions] = React.useState(getOptions(""));

  const parseOptions = (search: string) => {
    setParsedOptions(getOptions(search));
  };

  return (
    <div
      className={`flex h-full w-full ${
        mobile ? "" : "z-20 absolute bg-primary-800"
      }`}
    >
      <div className="block h-full w-full">
        {mobile ? null : (
          <div
            className={`block h-6 w-full border-b border-primary-700 sticky top-0 bg-primary-800`}
          >
            {onClose ? (
              <button
                onClick={onClose}
                className="absolute left-3 text-primary-100 top-1/2 transform translate-y-n1/2 py-1 focus:outline-no-chrome hover:bg-primary-700 z-30 rounded-5"
                style={{ paddingLeft: "10px", paddingRight: "-6px" }}
              >
                {backIcon({ style: { transform: "rotate(180deg)" } })}
              </button>
            ) : null}

            <div className="block relative text-center top-1/2 transform translate-y-n1/2 w-full font-bold text-primary-100">
              Language
            </div>
          </div>
        )}
        <div
          className="block h-full overflow-y-auto scrollbar-thin scrollbar-thumb-primary-700 overflow-x-hidden mb-9 md:pb-0"
          style={{ height: mobile ? "auto" : "calc(100% - 40px)" }}
        >
          <div className="block">{parsedOptions}</div>
        </div>
      </div>
    </div>
  );
};
