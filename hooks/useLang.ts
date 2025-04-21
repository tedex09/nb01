"use client";

import { useTranslation } from "react-i18next";

export const useLang = (ns: string = "common") => {
  const { t, i18n } = useTranslation(ns);

  const safeT = (key: string, fallback?: string) =>
    t(key) || fallback || `[${key}]`;

  return {
    t: safeT,
    changeLanguage: i18n.changeLanguage,
    currentLang: i18n.language,
  };
};