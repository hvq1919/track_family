import { I18n } from "i18n-js";
import * as Localization from 'expo-localization';
import en from './en';
import vi from './vi';

const i18n = new I18n({
  en,
  vi,
});

i18n.locale = Localization.getLocales()?.[0]?.languageCode || 'vi';
i18n.defaultLocale = "vi";
i18n.enableFallback = true;

export default i18n;