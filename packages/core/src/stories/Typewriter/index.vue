<script setup lang="ts">
import markdownItMermaid from '@jsonlee_12138/markdown-it-mermaid';
import { useAttrs } from 'vue';
import AppConfig from '../../components/AppConfig/index.vue';
import Typewriter from '../../components/Typewriter/index.vue';

const plugins = [
  markdownItMermaid({
    forceLegacyMathML: true,
    delay: 100
  })
];

const attrs = useAttrs();
</script>

<template>
  <AppConfig :md-plugins="plugins">
    <Typewriter v-bind="attrs" />
  </AppConfig>
</template>
