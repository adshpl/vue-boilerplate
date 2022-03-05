import Vuex from 'vuex';

import counter from './modules/counter';

export default new Vuex.Store({
  modules: {
    counter,
  },
  strict: __DEV__, // eslint-disable-line no-undef
});
