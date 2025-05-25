<script setup lang="ts">
import type { AttachmentsProps } from '@components/Attachments/types';
import Attachments from '@components/Attachments/index.vue';
import { useAttachmentStubs } from './useAttachmentStubs';

type Props = Pick<AttachmentsProps, 'items'>;

const props = withDefaults(defineProps<Props>(), {
  items: () => []
});

const attrs = useAttrs();
const {
  files,
  handleBeforeUpload,
  handleHttpRequest,
  handleUploadDrop,
  handleDeleteCard
} = useAttachmentStubs(props.items);
</script>

<template>
  <div>
    <div class="component-container">
      <div class="component-title">附件上传组件- scrollY</div>
      <Attachments
        v-bind="attrs"
        :items="files"
        :before-upload="handleBeforeUpload"
        :http-request="handleHttpRequest"
        @upload-drop="handleUploadDrop"
        @delete-card="handleDeleteCard"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.component-container {
  background-color: white;
  padding: 12px;
  border-radius: 15px;
  height: calc(100vh - 10px);
  overflow-y: auto;

  .component-title {
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 12px;
    font-weight: 700;
    line-height: 1.5;
    margin-bottom: 12px;
    margin-top: 24px;

    &::after {
      position: absolute;
      content: '';
      display: block;
      width: 5px;
      height: 75%;
      border-radius: 15px;
      left: 0;
      background-color: #409eff;
    }
  }
}
</style>
