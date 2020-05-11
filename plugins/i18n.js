import Vue from 'vue'
import VueI18n from 'vue-i18n'
import moment from 'moment'

Vue.use(VueI18n)

export default ({ app, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  //app.$cookiz.set('locale', app.$cookiz.get('locale') || 'ko')
  app.i18n = new VueI18n({
    locale: 'ko', //app.$cookiz.get('locale'),
    fallbackLocale: 'ko',
    silentTranslationWarn: true,
    messages: {
      ko: require('~/locales/ko.json'),
      //en: require('~/locales/en.json'),
      //vn: require('~/locales/vn.json'),
    }
  })
  //moment.locale(app.$cookiz.get('locale'))

}

