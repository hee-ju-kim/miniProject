import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

const alramColor = {
  primary: '#8150FF',
  secondary: '#6E04D0',
  accent: '#e91e63',
  info: '#00CAE3',
  success: '#4CAF50',
  warning: '#FB8C00',
  error: '#FF5252',
}

const lightTheme = {
  main: colors.blue.accent2,
  sub: colors.blue.lighten2,
  background: colors.grey.lighten5,
  backgroundDim: colors.grey.lighten3,
  wrapBackground: colors.shades.white
}

const darkTheme = {
  main: colors.deepPurple.accent2,
  sub: colors.deepPurple.lighten2,
  background: colors.grey.darken4,
  backgroundDim: colors.grey.darken3,
  wrapBackground: '#161616'
}

const common = {
  text: colors.blueGrey.lighten1,
  subText: colors.blueGrey.lighten3,
  button: colors.blueGrey.darken1,
  active: colors.green.lighten1,
  inactive: colors.blueGrey.lighten2,
}

export default new Vuetify({
  alram: {
    color: alramColor
  },
  theme: {
    dark: false,
    themes: {
      dark: darkTheme,
      light: lightTheme,
      common: common
    }
  }
})
