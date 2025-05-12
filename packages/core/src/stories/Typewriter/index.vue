<template>
  <AppConfig :md-plugins="plugins">
    <Typewriter v-bind="attrs" />
  </AppConfig>
</template>

<script setup lang="ts">
import AppConfig from '../../components/AppConfig/index.vue';
import Typewriter from '../../components/Typewriter/index.vue';
import markdownItMermaid from '@jsonlee_12138/markdown-it-mermaid';
// import type { TypewriterProps } from '../../components/Typewriter/types';
import '../../../public/styles/prism.min.css';
import { useAttrs } from 'vue';

const plugins = [markdownItMermaid({
  forceLegacyMathML: true,
  delay: 100
})]

const attrs = useAttrs();
</script>
