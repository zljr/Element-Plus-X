<script setup lang="ts">
import { DEFAULT_MD_CONFIG } from '@components/ConfigProvider/constants';
import Shiki from '@shikijs/markdown-it';
import MarkdownIt from 'markdown-it';
import { useAttrs } from 'vue';
import ConfigProvider from '../../components/ConfigProvider/index.vue';
import Typewriter from '../../components/Typewriter/index.vue';

const md = new MarkdownIt({
  ...DEFAULT_MD_CONFIG
});

md.use(
  await Shiki({
    themes: {
      light: 'vitesse-light',
      dark: 'vitesse-dark'
    }
  })
);

const attrs = useAttrs();
</script>

<template>
  <ConfigProvider :md="md">
    <Typewriter v-bind="attrs" />
  </ConfigProvider>
</template>
