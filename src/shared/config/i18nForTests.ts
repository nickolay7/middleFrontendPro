import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: { ru: { translation: {} } },
        lng: 'ru',

        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;
