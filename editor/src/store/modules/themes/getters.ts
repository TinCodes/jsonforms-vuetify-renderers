/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import _ from 'lodash';
const getters = {
  getSummaryThemes: (state: any) => {
    return _.map(state.themes, (value, key) => {
      return {
        name: value.name,
        light: value.light,
      };
    });
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getFontFamilyTheme: (state: any) => {
    const currentTheme = state.active;
    return state.themes[currentTheme].fontFamily;
  },
  getThemeSelected: (state: any) => {
    const currentTheme = state.active;
    return state.themes[currentTheme];
  },
  getPaddings: (state: any) => {
    const currentTheme = state.active;
    return state.themes[currentTheme].paddings;
  },
  getMargins: (state: any) => {
    const currentTheme = state.active;
    return state.themes[currentTheme].margins;
  },
  getBackground: (state: any) => {
    const currentTheme = state.active;
    return state.themes[currentTheme].background.imgSrc;
  },
  getBackgroundColor: (state: any) => {
    const currentTheme = state.active;
    return state.themes[currentTheme].background.color;
  },
};
export default getters;
