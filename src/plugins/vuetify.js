import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import colors from 'vuetify/lib/util/colors'
Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.blue.darken2, // #E53935
                secondary: colors.blue.lighten4, // #FFCDD2
                accent: colors.orange.lighten1, // #3F51B5
                header: colors.indigo.darken4
            },
        },
    },
});
