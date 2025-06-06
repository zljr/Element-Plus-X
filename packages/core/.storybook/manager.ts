import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

const theme = create({
  base: 'light',
  brandTitle: 'vue-element-plus-x',
  brandUrl: 'https://element-plus-x.com',
  brandImage: '/logo.svg',
});

const darkTheme = create({
  base: 'dark',
  brandTitle: 'vue-element-plus-x',
  brandUrl: 'https://element-plus-x.com',
  brandImage: '/logo.svg',
});

addons.setConfig({
  theme,
  darkTheme,
});
