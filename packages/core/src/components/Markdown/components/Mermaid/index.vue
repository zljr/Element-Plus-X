<script setup lang="ts">
import type { MdComponent } from '../types';
import mermaid from 'mermaid';
import { onMounted, ref, watch } from 'vue';

const props = withDefaults(defineProps<MdComponent>(), {
  // codeKey: '',
  // lang: '',
  // content: '',
  // codeData: () => ({}),
  // mermaidConfig: () => ({
  //   delay: 500,
  //   securityLevel: 'loose',
  // }),
  raw: () => ({})
});

const loading = ref(true);
const svg = ref('');
const id = useId();

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

async function renderMermaid() {
  try {
    const valid = await mermaid.parse(props.raw.content);
    if (valid) {
      mermaid.initialize({
        securityLevel: 'loose'
      });
      const { svg: renderedSvg } = await mermaid.render(id, props.raw.content);
      svg.value = renderedSvg;
    }
  } catch (err) {
    console.log('Mermaid parse/render error:', err);
  }
}

function scheduleRender() {
  loading.value = true;
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    loading.value = false;
    renderMermaid();
  }, 300);
}

watch(
  () => props.raw.content,
  () => {
    scheduleRender();
  }
);

onMounted(() => {
  scheduleRender();
});
</script>

<template>
  <div :key="props.raw.key" class="markdown-mermaid" v-html="svg" />
</template>

<style src="./style.scss"></style>
