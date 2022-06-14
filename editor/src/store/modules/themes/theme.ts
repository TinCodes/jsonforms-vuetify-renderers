import { RootState } from '@/store/types';
import { Module } from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import defaultThemes from './defaultThemes.json';

export interface ThemeState {
  active: string;
  themes: any;
  custom: boolean;
}
const state: ThemeState = {
  active: 'Default',
  themes: defaultThemes,
  custom: false,
};
const themes: Module<ThemeState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

export default themes;
