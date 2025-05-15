import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

const theme = create({
  base: 'light',
  brandTitle: 'vue-element-plus-x',
  brandUrl: 'https://element-plus-x.com',
  brandImage: '/logo.png'
})

addons.setConfig({
  theme,
});
