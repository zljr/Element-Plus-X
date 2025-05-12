<script setup lang="ts">
import { APP_CONFIG_PROVIDE_KEY, defaultAppConfig } from './constants';
import type { AppConfigProps } from './types';

const props = withDefaults(defineProps<AppConfigProps>(), {
})

provide<AppConfigProps>(APP_CONFIG_PROVIDE_KEY, {
  mdPlugins: props.mdPlugins ?? defaultAppConfig.mdPlugins,
  highlight: props.highlight ?? defaultAppConfig.highlight,
})
</script>

<template>
  <slot></slot>
</template>
