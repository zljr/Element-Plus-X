<script setup lang="ts">
import type { MdComponent } from '../types';

const props = withDefaults(defineProps<MdComponent>(), {
  raw: () => ({})
});
</script>

<template>
  <span style="background-color: red">TODO:{{ props.raw.content }}</span>
</template>
