<script setup lang="ts">
import { ElMessage } from 'element-plus';

const handleOnExpand = () => {
  ElMessage.success('展开')
}
</script>

<template>
  <ThoughtChain v-bind="$attrs" @handleExpand="handleOnExpand" />
</template>


<style lang="scss" scoped></style>
