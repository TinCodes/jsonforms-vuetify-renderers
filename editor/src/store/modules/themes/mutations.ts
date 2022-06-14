import _ from 'lodash';
const custom = 'custom';
const mutations = {
  SET_ADD_THEME: (state: any, payload: any) => {
    state.themes.push(payload);
  },
  SET_ACTIVE_THEME: (state: any, payload: string) => {
    state.active = payload;
  },
  SET_UPDATE_THEME: (state: any, payload: any) => {
    debugger;
    /*if (!state.themes[custom]) {
      state.themes[custom] = payload;
    }*/
    const themes = _.cloneDeep(state.themes);
    let customTheme = false;
    _.forEach(themes, (value, key) => {
      if (value.name === payload.name) {
        customTheme = true;
        state.active = payload.name;
        state.themes[key].light = payload.light;
        state.themes[key].fontFamily = payload.fontFamily;
      }
    });
    if (!customTheme) {
      state.themes = { ...state.themes, custom: payload };
      state.active = payload.name;
    }
  },
  UPDATE_PADDINGS: (state: any, payload: any) => {
    const currentTheme = state.active;
    state[currentTheme].paddings = payload;
  },
  UPDATE_MARGINS: (state: any, payload: any) => {
    const currentTheme = state.active;
    state[currentTheme].margins = payload;
  },
  UPDATE_BACKGROUND: (state: any, payload: any) => {
    const currentTheme = state.active;
    state[currentTheme].background.imgSrc = payload;
  },
  UPDATE_BACKGROUND_COLOR: (state: any, payload: any) => {
    const currentTheme = state.active;
    state[currentTheme].background.color = payload;
  },
};
export default mutations;
