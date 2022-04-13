import React from "react";
import { useTranslation } from "react-i18next";
import { ParseTextToTwemoji } from "./Twemoji";
import { ArrowBackIcon } from "../icons/";
import { SettingsIcon } from "./SettingsIcon";
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
    { value: "af", flag: "🇿🇦", label: "Afrikaans" }, // Afrikaans
    { value: "am", flag: "🇪🇹", label: "አማርኛ" }, // Amharic
    { value: "ar", flag: "🇸🇦", label: "عربي" }, // Arabic
    { value: "az", flag: "🇦🇿", label: "Azərbaycanca" }, // Azerbaijani
    { value: "bg", flag: "🇧🇬", label: "Български" }, // Bulgarian
    { value: "bn", flag: "🇧🇩", label: "বাংলা" }, // Bengali
    { value: "cs", flag: "🇨🇿", label: "Čeština" }, // Czech
    { value: "da", flag: "🇩🇰", label: "Dansk" }, // Danish
    { value: "de", flag: "🇩🇪", label: "Deutsch" }, // German
    { value: "de-AT", flag: "🇦🇹", label: "Deutsch (Österreich)" }, // German (Austria)
    { value: "gsw", flag: "🇨🇭", label: "Schwiizerdütsch" }, // Swiss German
    { value: "el", flag: "🇬🇷", label: "Ελληνικά" }, // Greek
    { value: "eo", flag: "🟢", label: "Esperanto" }, // Esperanto
    { value: "es", flag: "🇪🇸", label: "Español" }, // Spanish
    { value: "et", flag: "🇪🇪", label: "Eesti" }, // Estonian
    { value: "eu", flag: "🇪🇸", label: "Euskara" }, // Basque
    { value: "fa", flag: "🇮🇷", label: "فارسی" }, // Persian
    { value: "fi", flag: "🇫🇮", label: "Suomi" }, // Finnish
    { value: "fr", flag: "🇫🇷", label: "Français" }, // French
    { value: "he", flag: "🇮🇱", label: "עברית" }, // Hebrew
    { value: "hi", flag: "🇮🇳", label: "हिन्दी" }, // Hindi
    { value: "hr", flag: "🇭🇷", label: "Hrvatski" }, // Croatian
    { value: "hu", flag: "🇭🇺", label: "Magyar" }, // Hungarian
    { value: "id", flag: "🇮🇩", label: "Bahasa Indonesia" }, // Indonesian
    { value: "is", flag: "🇮🇸", label: "Íslenska" }, // Icelandic
    { value: "it", flag: "🇮🇹", label: "Italiano" }, // Italian
    { value: "ja", flag: "🇯🇵", label: "日本語" }, // Japanese
    { value: "kk", flag: "🇰🇿", label: "Қазақша" }, // Kazakh
    { value: "ko", flag: "🇰🇷", label: "한국어" }, // Korean
    { value: "li", flag: "🇳🇱", label: "Limburgs" }, // Limburgish
    { value: "lt", flag: "🇱🇹", label: "Lietuvių" }, // Lithuanian
  ].sort((a, b) => a.label.localeCompare(b.label));

  const noveltyLanguages = [
    /* Other languages */
    { value: "grc", flag: "🧓", label: "Αρχαία Ελληνικά" }, // Ancient Greek
    { value: "en-LOLCAT", flag: "🐈", label: "LOLCAT" },
    { value: "en-PIRATE", flag: "☠️", label: "Pirate" },
    { value: "en-AU", flag: "🇦🇺", label: "uɐᴉꞁɐɹʇsnⱯ" }, // Australian
    { value: "en-OWO", flag: "💕", label: "OwO Engwish" },
    { value: "bottom", flag: "🥺", label: "Bottom" },
    { value: "tp", flag: "💛", label: "Toki Pona" },
  ];

  const options = [...languages, ...noveltyLanguages];

  const { i18n } = useTranslation();
  const { back } = useRouter();
  const parsedOptions = options.map((e, i) => (
    <SettingsIcon
      key={e.value + i}
      classes={` focus:outline-no-chrome whitespace-nowrap overflow-ellipsis${
        i18n.language === e.value ||
        (e.value === "en" && i18n.language === "en-US")
          ? " bg-primary-100"
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

  return (
    <div className={`flex h-full w-full ${mobile ? "" : "z-20 absolute"}`}>
      <div className="block h-full w-full">
        {mobile ? null : (
          <div
            className={`block h-6 w-full border-b border-primary-700 sticky top-0 bg-primary-800`}
          >
            {onClose ? (
              <button
                onClick={onClose}
                className="absolute left-3  top-1/2 transform translate-y-n1/2 py-1 focus:outline-no-chrome hover:bg-primary-700 z-30 rounded-5"
                style={{ paddingLeft: "10px", paddingRight: "-6px" }}
              >
                <ArrowBackIcon />
              </button>
            ) : null}

            <div className="block relative text-center top-1/2 transform translate-y-n1/2 w-full font-bold">
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
