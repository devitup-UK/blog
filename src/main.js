import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueMeta from 'vue-meta';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCalendarAlt, faUser, faFolder, faChevronLeft, faChevronRight, faSearch, faSpinner, faSadTear, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faPinterest } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome';

import App from './App.vue';
import router from './router';
import store from './store/index';
import './registerServiceWorker';
import metaData from './helpers/metadata.helper';

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('font-awesome-layers', FontAwesomeLayers);
Vue.component('font-awesome-layers-text', FontAwesomeLayersText);
Vue.config.productionTip = false;
Vue.use(VueMeta);
Vue.use(BootstrapVue);

library.add(faFacebook, faTwitter, faInstagram, faPinterest, faCalendarAlt, faUser, faFolder, faChevronLeft, faChevronRight, faSearch, faSpinner, faSadTear, faQuestionCircle);
metaData.updateMetaTags(router);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
