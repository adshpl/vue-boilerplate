import VueI18n from 'vue-i18n';

import locales from './locales';

export default new VueI18n({
  messages: locales,
  locale: navigator.language,
  fallbackLocale: 'en-US',
});
