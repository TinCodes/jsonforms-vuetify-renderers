<template>
  <v-row>
    <v-col cols="12" sm="12" md="12">
      <v-select
        :items="selectFont"
        label="Select Font"
        v-model="fontFamily"
      ></v-select>
    </v-col>
    <v-col cols="12" sm="12" md="12">
      <span>Color Primary</span>
      <v-text-field
        v-model="color.primary"
        @change="setCustom"
        hide-details
        solo
        readonly
      >
        <template v-slot:append>
          <v-menu
            v-model="menu.primary"
            top
            nudge-bottom="105"
            nudge-left="16"
            :close-on-content-click="false"
          >
            <template v-slot:activator="{ on }">
              <div :style="swatchStyle('primary')" v-on="on" />
            </template>
            <v-card>
              <v-card-text class="pa-0">
                <v-color-picker
                  v-model="color.primary"
                  dot-size="25"
                  hide-inputs
                  flat
                  hide-mode-switch
                  swatches-max-height="200"
                ></v-color-picker>
              </v-card-text>
            </v-card>
          </v-menu>
        </template>
      </v-text-field>
    </v-col>
    <v-col cols="12" sm="12" md="12">
      <span>Color secondary</span>
      <v-text-field v-model="color.secondary" readonly hide-details solo>
        <template v-slot:append>
          <v-menu
            v-model="menu.secondary"
            top
            nudge-bottom="105"
            nudge-left="16"
            :close-on-content-click="false"
            @input="setCustom"
          >
            <template v-slot:activator="{ on }">
              <div :style="swatchStyle('secondary')" v-on="on" />
            </template>
            <v-card>
              <v-card-text class="pa-0">
                <v-color-picker
                  v-model="color.secondary"
                  dot-size="25"
                  hide-inputs
                  hide-mode-switch
                  swatches-max-height="200"
                ></v-color-picker>
              </v-card-text>
            </v-card>
          </v-menu>
        </template>
      </v-text-field>
    </v-col>
    <v-col cols="12" sm="12" md="12">
      <span>Color accent</span>
      <v-text-field v-model="color.accent" readonly hide-details solo>
        <template v-slot:append>
          <v-menu
            v-model="menu.accent"
            top
            nudge-bottom="105"
            nudge-left="16"
            :close-on-content-click="false"
            @input="setCustom"
          >
            <template v-slot:activator="{ on }">
              <div :style="swatchStyle('accent')" v-on="on" />
            </template>
            <v-card>
              <v-card-text class="pa-0">
                <v-color-picker
                  v-model="color.accent"
                  dot-size="25"
                  hide-inputs
                  hide-mode-switch
                  swatches-max-height="200"
                ></v-color-picker>
              </v-card-text>
            </v-card>
          </v-menu>
        </template>
      </v-text-field>
    </v-col>
    <v-col cols="12" sm="12" md="12">
      <span>Color error</span>
      <v-text-field v-model="color.error" readonly hide-details solo>
        <template v-slot:append>
          <v-menu
            v-model="menu.error"
            top
            nudge-bottom="105"
            nudge-left="16"
            :close-on-content-click="false"
            @input="setCustom"
          >
            <template v-slot:activator="{ on }">
              <div :style="swatchStyle('error')" v-on="on" />
            </template>
            <v-card>
              <v-card-text class="pa-0">
                <v-color-picker
                  v-model="color.error"
                  dot-size="25"
                  hide-inputs
                  hide-mode-switch
                  swatches-max-height="200"
                ></v-color-picker>
              </v-card-text>
            </v-card>
          </v-menu>
        </template>
      </v-text-field>
    </v-col>
    <v-col cols="12" sm="12" md="12">
      <span>Color info</span>
      <v-text-field v-model="color.info" readonly hide-details solo>
        <template v-slot:append>
          <v-menu
            v-model="menu.info"
            top
            nudge-bottom="105"
            nudge-left="16"
            :close-on-content-click="false"
            @input="setCustom"
          >
            <template v-slot:activator="{ on }">
              <div :style="swatchStyle('info')" v-on="on" />
            </template>
            <v-card>
              <v-card-text class="pa-0">
                <v-color-picker
                  v-model="color.info"
                  dot-size="25"
                  hide-inputs
                  hide-mode-switch
                  swatches-max-height="200"
                ></v-color-picker>
              </v-card-text>
            </v-card>
          </v-menu>
        </template>
      </v-text-field>
    </v-col>
    <v-col cols="12" sm="12" md="12">
      <span>Color sucess</span>
      <v-text-field v-model="color.success" readonly hide-details solo>
        <template v-slot:append>
          <v-menu
            v-model="menu.success"
            top
            nudge-bottom="105"
            nudge-left="16"
            :close-on-content-click="false"
            @input="setCustom"
          >
            <template v-slot:activator="{ on }">
              <div :style="swatchStyle('success')" v-on="on" />
            </template>
            <v-card>
              <v-card-text class="pa-0">
                <v-color-picker
                  v-model="color.success"
                  dot-size="25"
                  hide-inputs
                  hide-mode-switch
                  swatches-max-height="200"
                ></v-color-picker>
              </v-card-text>
            </v-card>
          </v-menu>
        </template>
      </v-text-field>
    </v-col>
    <v-col cols="12" sm="12" md="12">
      <span>Color warning</span>
      <v-text-field v-model="color.warning" readonly hide-details solo>
        <template v-slot:append>
          <v-menu
            v-model="menu.warning"
            top
            nudge-bottom="105"
            nudge-left="16"
            :close-on-content-click="false"
            @input="setCustom"
          >
            <template v-slot:activator="{ on }">
              <div :style="swatchStyle('warning')" v-on="on" />
            </template>
            <v-card>
              <v-card-text class="pa-0">
                <v-color-picker
                  v-model="color.warning"
                  dot-size="25"
                  hide-inputs
                  hide-mode-switch
                  swatches-max-height="200"
                ></v-color-picker>
              </v-card-text>
            </v-card>
          </v-menu>
        </template>
      </v-text-field>
    </v-col>
    <v-col>
      <v-text-field
        v-model="customThemeName"
        label="Name of the Theme"
        required
        @blur="updateTheme"
      >
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import _ from 'lodash';
import { defineComponent } from '@vue/composition-api';
const CustomizeTheme = defineComponent({
  name: 'customize-theme',
  setup() {
    return {
      dialog: false,
      customThemeName: 'form',
      menu: {
        primary: false,
        secondary: false,
        accent: false,
        error: false,
        info: false,
        success: false,
        warning: false,
      },
      selectFont: [
        'Roboto',
        'Comic Neue',
        'Fira Code',
        'Inconsolata',
        'Oxygen',
        'Tapestry',
        'Ubuntu',
        'Water Brush',
      ],
      defaultColor: {},
    };
  },
  computed: {
    color: {
      get(): any {
        this.updateDefaultColor();
        return this.$store.getters['themes/getThemeSelected'].light;
      },
      set(): void {
        //TODO
      },
    },

    fontFamily: {
      get(): any {
        return this.$store.getters['themes/getFontFamilyTheme'];
      },
      set(value): void {
        this.updateTheme(value);
      },
    },
  },
  methods: {
    updateDefaultColor(): void {
      this.defaultColor = _.clone(
        this.$store.getters['themes/getThemeSelected'].light
      );
    },
    swatchStyle(type: string): Record<string, unknown> {
      const { color, menu } = this;
      return {
        backgroundColor: color[type],
        cursor: 'pointer',
        height: '21px',
        width: '21px',
        borderRadius: menu[type] ? '50%' : '4px',
        transition: 'border-radius 200ms ease-in-out',
      };
    },
    setCustom(): void {
      debugger;
      const name = this.customThemeName;
      const light = this.color;
      //if (!_.isEqual(light, this.defaultColor)) {
      Object.keys(light).forEach((i) => {
        this.$vuetify.theme.themes.light[i] = light[i];
      });
      this.$vuetify.theme.currentTheme.name = name;
      this.updateTheme();
      //}
    },
    updateTheme(font: string): void {
      debugger;
      let fontFamily = font ? font : _.clone(this.fontFamily);
      this.$store.set('themes/updateTheme', {
        name: this.customThemeName,
        light: _.clone(this.color),
        fontFamily: fontFamily,
      });
      this.$vuetify.theme.currentTheme.name = this.customThemeName;
    },
  },
});
export default CustomizeTheme;
</script>
