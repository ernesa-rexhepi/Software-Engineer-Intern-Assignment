import React from 'react';
import { useTranslation } from 'react-i18next';
import style from "../style/home.module.css";

const Footer = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <footer className={style.footer}>
      <div className={style.LanguageSection}>
        <p>{t('language')}</p>
        <button className={style.LanguageSwitcher} onClick={() => handleLanguageChange('en')}>
          English
        </button>
        <button className={style.LanguageSwitcher} onClick={() => handleLanguageChange('de')}>
          Deutsch
        </button>
      </div>
      <div className={style.footerContent}>
        <p>&copy; 2025 Rick and Morty, All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
