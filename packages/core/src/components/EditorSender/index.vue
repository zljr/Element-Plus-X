<script setup lang="ts">
import type { SenderProps } from './types.d.ts';
import EditorInput from '../EditorInput/index.vue';
import {
  ClearButton,
  LoadingButton,
  SendButton,
  SpeechButton,
  SpeechLoadingButton,
} from './components';

const props = withDefaults(defineProps<SenderProps>(), {
  placeholder: '请输入内容',
  autoSize: () => ({
    minRows: 1,
    maxRows: 6,
  }),
  submitType: 'enter',
  headerAnimationTimer: 300,
  inputWidth: '100%',
  modelValue: '', // 显式定义value的默认值

  variant: 'default',
  showUpdown: true,

  // el-input 属性透传
  inputStyle: () => {},

  triggerStrings: () => [], // 指令字符数组，默认空数组
  triggerPopoverVisible: false,
  triggerPopoverWidth: 'fit-content',
  triggerPopoverLeft: '0px',
  triggerPopoverOffset: 8,
  triggerPopoverPlacement: 'top-start',
});

const emits = defineEmits([
  'update:modelValue',

  'update:triggerPopoverVisible',

  'submit',
  'cancel',
  'recordingChange',

  'trigger',
]);

const slots = defineSlots();

// 获取当前组件实例
const instance = getCurrentInstance();
// 判断是否存在 submit 监听器
const hasOnRecordingChangeListener = computed(() => {
  return !!instance?.vnode.props?.onRecordingChange;
});
const senderRef = ref();
const inputRef = ref();
const contentRef = ref();
const internalValue = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    if (props.readOnly || props.disabled)
      return;
    emits('update:modelValue', val);
  },
});

// 处理输入法组合状态
const isComposing = ref(false);
const popoverRef = ref();
// 判断是否存在 trigger 监听器
const hasOnTriggerListener = computed(() => {
  return !!instance?.vnode.props?.onTrigger;
});

const popoverVisible = computed({
  get() {
    return props.triggerPopoverVisible;
  },
  set(value) {
    if (props.readOnly || props.disabled)
      return;
    emits('update:triggerPopoverVisible', value);
  },
});

// 当前触发 指令的 字符
const triggerString = ref('');

// 监听输入值变化
watch(
  () => internalValue.value,
  (newVal, oldVal) => {
    if (isComposing.value)
      return;
    // 触发逻辑：当输入值等于数组中的任意一个指令字符时触发
    // 确保 oldVal 是字符串类型
    const triggerStrings = props.triggerStrings || []; // 如果为 undefined，就使用空数组
    const validOldVal = typeof oldVal === 'string' ? oldVal : '';
    const wasOldValTrigger = triggerStrings.includes(validOldVal);
    const isNewValTrigger = triggerStrings.includes(newVal);

    // 触发显示：从空变为触发字符
    if (oldVal === '' && isNewValTrigger) {
      triggerString.value = newVal;
      if (hasOnTriggerListener.value) {
        emits('trigger', {
          oldValue: oldVal, // 关闭时返回之前触发的字符
          newValue: newVal,
          triggerString: newVal,
          isOpen: true,
        });
        popoverVisible.value = true;
      }
      else {
        popoverVisible.value = true;
      }
    }
    // 关闭：从触发字符变为非触发字符
    else if (!isNewValTrigger && wasOldValTrigger) {
      if (hasOnTriggerListener.value) {
        emits('trigger', {
          oldValue: oldVal, // 关闭时返回之前触发的字符
          newValue: newVal,
          triggerString: undefined,
          isOpen: false,
        });
        popoverVisible.value = false;
      }
      else {
        popoverVisible.value = false;
      }
    }
    // 触发显示：从非空且非触发字符变为触发字符
    else if (oldVal !== '' && isNewValTrigger && !wasOldValTrigger) {
      triggerString.value = newVal;
      if (hasOnTriggerListener.value) {
        emits('trigger', {
          oldValue: oldVal, // 关闭时返回之前触发的字符
          newValue: newVal,
          triggerString: newVal,
          isOpen: true,
        });
        popoverVisible.value = true;
      }
      else {
        popoverVisible.value = true;
      }
    }
  },
  { deep: true, immediate: true },
);

/* 内容容器聚焦 开始 */
function onContentMouseDown(e: MouseEvent) {
  // 点击容器后设置输入框的聚焦，会触发 &:focus-within 样式
  if (e.target !== senderRef.value.querySelector(`.el-textarea__inner`)) {
    e.preventDefault();
  }
  inputRef.value.focus();
}
/* 内容容器聚焦 结束 */

/* 头部显示隐藏 开始 */
const visiableHeader = ref(false);
function openHeader() {
  if (!slots.header)
    return false;

  if (props.readOnly)
    return false;

  visiableHeader.value = true;
}
function closeHeader() {
  if (!slots.header)
    return;
  if (props.readOnly)
    return;
  visiableHeader.value = false;
}
/* 头部显示隐藏 结束 */

/* 使用浏览器自带的语音转文字功能 开始 */
const recognition = ref<SpeechRecognition | null>(null);
const speechLoading = ref<boolean>(false);

function startRecognition() {
  if (props.readOnly)
    return; // 直接返回，不执行后续逻辑
  if (hasOnRecordingChangeListener.value) {
    speechLoading.value = true;
    emits('recordingChange', true);
    return;
  }
  if ('webkitSpeechRecognition' in window) {
    recognition.value = new webkitSpeechRecognition();
    recognition.value!.continuous = true;
    recognition.value.interimResults = true;
    recognition.value.lang = 'zh-CN';
    recognition.value.onresult = (event: SpeechRecognitionEvent) => {
      let results = '';
      for (let i = 0; i <= event.resultIndex; i++) {
        results += event.results[i][0].transcript;
      }
      if (!props.readOnly) {
        internalValue.value = results;
      }
    };
    recognition.value.onstart = () => {
      speechLoading.value = true;
    };
    recognition.value.onend = () => {
      speechLoading.value = false;
    };
    recognition.value.onerror = (event: SpeechRecognitionError) => {
      console.error('语音识别出错:', event.error);
      speechLoading.value = false;
    };
    recognition.value.start();
  }
  else {
    console.error('浏览器不支持 Web Speech API');
  }
}

function stopRecognition() {
  // 如果有自定义处理函数
  if (hasOnRecordingChangeListener.value) {
    speechLoading.value = false;
    emits('recordingChange', false);
    return;
  }
  if (recognition.value) {
    recognition.value.stop();
    speechLoading.value = false;
  }
}
/* 使用浏览器自带的语音转文字功能 结束 */

/* 输入框事件 开始 */
function submit() {
  if (props.readOnly || props.loading || props.disabled || !internalValue.value)
    return;
  emits('submit', internalValue.value);
}
// 取消按钮
function cancel() {
  if (props.readOnly)
    return;
  emits('cancel', internalValue.value);
}

function clear() {
  if (props.readOnly)
    return; // 直接返回，不执行后续逻辑
  inputRef.value.clear();
  internalValue.value = '';
}

// 在这判断组合键的回车键 (目前支持两种模式)
// function handleKeyDown(e: { target: HTMLTextAreaElement } & KeyboardEvent) {
//   if (props.readOnly)
//     return // 直接返回，不执行后续逻辑
//   if (props.submitType === 'enter') {
//     // 判断是否按下了 Shift + 回车键
//     if (e.shiftKey && e.keyCode === 13) {
//       e.preventDefault()
//       const cursorPosition = e.target.selectionStart // 获取光标位置
//       const textBeforeCursor = internalValue.value.slice(0, cursorPosition) // 光标前的文本
//       const textAfterCursor = internalValue.value.slice(cursorPosition) // 光标后的文本
//       internalValue.value = `${textBeforeCursor}\n${textAfterCursor}` // 插入换行符
//       e.target.setSelectionRange(cursorPosition + 1, cursorPosition + 1) // 更新光标位置
//     }
//     else if (e.keyCode === 13 && !e.shiftKey) {
//       // 阻止掉 Enter 的默认换行行为
//       e.preventDefault()
//       // 触发提交功能
//       submit()
//     }
//   }
//   else if (props.submitType === 'shiftEnter') {
//     // 判断是否按下了 Shift + 回车键
//     if (e.shiftKey && e.keyCode === 13) {
//       // 阻止掉 Enter 的默认换行行为
//       e.preventDefault()
//       // 触发提交功能
//       submit()
//     }
//     else if (e.keyCode === 13 && !e.shiftKey) {
//       e.preventDefault()
//       const cursorPosition = e.target.selectionStart // 获取光标位置
//       const textBeforeCursor = internalValue.value.slice(0, cursorPosition) // 光标前的文本
//       const textAfterCursor = internalValue.value.slice(cursorPosition) // 光标后的文本
//       internalValue.value = `${textBeforeCursor}\n${textAfterCursor}` // 插入换行符
//       e.target.setSelectionRange(cursorPosition + 1, cursorPosition + 1) // 更新光标位置
//     }
//   }
// }
/* 输入框事件 结束 */

/* 焦点 事件 开始 */
function blur() {
  if (props.readOnly) {
    return false;
  }
  inputRef.value.blur();
}

function focus(type = 'all') {
  if (props.readOnly) {
    return false;
  }
  if (type === 'all') {
    inputRef.value.select();
  }
  else if (type === 'start') {
    inputRef.value.moveToStart();
  }
  else if (type === 'end') {
    inputRef.value.moveToEnd();
  }
}
/* 焦点 事件 结束 */

// 处理输入法开始/结束 (此方法是拼音输入法的时候用)
function handleCompositionStart() {
  isComposing.value = true;
}

function handleCompositionEnd() {
  isComposing.value = false;
}

defineExpose({
  openHeader, // 打开头部
  closeHeader, // 关闭头部
  clear, // 清空输入框
  blur, // 失去焦点
  focus, // 获取焦点
  // 按钮操作
  submit,
  cancel,
  startRecognition,
  stopRecognition,
});
</script>

<template>
  <div
    class="el-sender-wrap"
    :style="{
      'cursor': disabled ? 'not-allowed' : 'default',
      '--el-sender-trigger-popover-width': props.triggerPopoverWidth,
      '--el-sender-trigger-popover-left': props.triggerPopoverLeft,
    }"
  >
    <div
      ref="senderRef"
      class="el-sender"
      :style="{
        '--el-padding-xs': '8px',
        '--el-padding-sm': '12px',
        '--el-padding': '16px',
        '--el-box-shadow-tertiary':
          '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
        '--el-sender-input-input-font-size': '14px',
        '--el-sender-header-animation-duration': `${headerAnimationTimer}ms`,
      }"
      :class="{
        'el-sender-disabled': disabled,
      }"
    >
      <!-- 头部容器 -->
      <Transition name="slide">
        <div v-if="visiableHeader" class="el-sender-header-wrap">
          <div v-if="$slots.header" class="el-sender-header">
            <slot name="header" />
          </div>
        </div>
      </Transition>
      <!-- 内容容器 内置变体逻辑 -->
      <div
        ref="contentRef"
        class="el-sender-content"
        :class="{ 'content-variant-updown': props.variant === 'updown' }" @mousedown="onContentMouseDown"
      >
        <!-- Prefix 前缀 -->
        <div v-if="$slots.prefix && props.variant === 'default'" class="el-sender-prefix">
          <slot name="prefix" />
        </div>
        <!-- 输入框 -->
        <EditorInput
          ref="inputRef"
          v-model="internalValue"
          class="el-sender-input"
          :input-style="{
            'resize': 'none',
            'max-height': '176px',
            'max-width': inputWidth,
          }"
          :rows="1"
          :autosize="autoSize"
          type="textarea"
          :validate-event="false"
          :placeholder="placeholder"
          :read-only="readOnly || disabled"
          :disabled="disabled"
          :inpurt-style="props.inputStyle"
          :submit-type="props.submitType"
          @compositionstart="handleCompositionStart"
          @compositionend="handleCompositionEnd"
        />
        <!-- 操作列表 -->
        <div v-if="props.variant === 'default'" class="el-sender-action-list">
          <slot name="action-list">
            <div
              class="el-sender-action-list-presets"
            >
              <SendButton v-if="!loading" :disabled="!internalValue" @submit="submit" />

              <LoadingButton v-if="loading" @cancel="cancel" />

              <SpeechButton
                v-if="!speechLoading && allowSpeech"
                @click="startRecognition"
              />

              <SpeechLoadingButton
                v-if="speechLoading && allowSpeech"
                @click="stopRecognition"
              />

              <ClearButton v-if="clearable" @clear="clear" />
            </div>
          </slot>
        </div>

        <!-- 变体样式 -->
        <div v-if="props.variant === 'updown' && props.showUpdown" class="el-sender-updown-wrap">
          <!-- 变体 updown： Prefix 前缀 -->
          <div v-if="$slots.prefix" class="el-sender-prefix">
            <slot name="prefix" />
          </div>

          <!-- 变体 updown：操作列表 -->
          <div class="el-sender-action-list">
            <slot name="action-list">
              <div
                class="el-sender-action-list-presets"
              >
                <SendButton v-if="!loading" :disabled="!internalValue" @submit="submit" />

                <LoadingButton v-if="loading" @cancel="cancel" />

                <SpeechButton
                  v-if="!speechLoading && allowSpeech"
                  @click="startRecognition"
                />

                <SpeechLoadingButton
                  v-if="speechLoading && allowSpeech"
                  @click="stopRecognition"
                />

                <ClearButton v-if="clearable" @clear="clear" />
              </div>
            </slot>
          </div>
        </div>
      </div>

      <!-- 底部容器 -->
      <Transition name="slide">
        <div v-if="$slots.footer" class="el-sender-footer">
          <slot name="footer" />
        </div>
      </Transition>
    </div>

    <!-- 虚拟触发 popover -->
    <el-popover
      ref="popoverRef"
      :virtual-ref="senderRef"
      virtual-triggering
      :visible="popoverVisible"
      :disabled="props.disabled"
      :show-arrow="false"
      :placement="props.triggerPopoverPlacement"
      :offset="props.triggerPopoverOffset"
      popper-class="el-sender-trigger-popover"
      :teleported="false"
    >
      <slot name="trigger-popover" :trigger-string="triggerString" :readonly="props.readOnly">
        当前触发的字符为：{{ `${triggerString}` }} 在这里定义的内容，但注意这里的回车事件将会被 输入框 覆盖
      </slot>
    </el-popover>
  </div>
</template>

<style scoped lang="scss">
.el-sender {
  width: 100%;
  display: flex;
  flex-direction: column;

  position: relative;
  box-sizing: border-box;
  box-shadow: var(--el-box-shadow-tertiary);
  transition: background var(--el-transition-duration);
  border-radius: calc(var(--el-border-radius-base) * 2);
  border-color: var(--el-border-color);
  border-width: 0;
  border-style: solid;
  transition: width var(--el-sender-header-animation-duration);

  &:after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    transition: border-color var(--el-transition-duration);
    border-radius: inherit;
    border-style: inherit;
    border-color: inherit;
    border-width: var(--el-border-width);
  }
  &:focus-within {
    box-shadow: var(--el-box-shadow);
    border-color: var(--el-color-primary);
    &::after {
      border-width: 2px;
    }
  }

  .el-sender-header-wrap {
    display: flex;
    flex-direction: column;
    gap: var(--el-padding-xs);
    width: 100%;
    margin: 0;
    padding: 0;
  }

  // 展开收起动画
  // calc-size 新特性，解决无法对某些非固定尺寸（如 auto、min-content、max-content 等）进行动画过渡的新特性
  .slide-enter-active,
  .slide-leave-active {
    height: calc-size(max-content, size);
    opacity: 1;
    transition:
      height var(--el-sender-header-animation-duration),
      opacity var(--el-sender-header-animation-duration),
      border var(--el-sender-header-animation-duration);
    overflow: hidden;
  }

  .slide-enter-from,
  .slide-leave-to {
    height: 0;
    opacity: 0 !important;
  }

  .el-sender-header {
    border-bottom-width: var(--el-border-width);
    border-bottom-style: solid;
    border-bottom-color: var(--el-border-color);
  }

  .el-sender-content {
    display: flex;
    gap: var(--el-padding-xs);
    width: 100%;
    padding-block: var(--el-padding-sm);
    padding-inline-start: var(--el-padding);
    padding-inline-end: var(--el-padding-sm);
    box-sizing: border-box;
    align-items: flex-end;
    // 前缀
    .el-sender-prefix {
      flex: none;
    }
    // 输入框
    .el-sender-input {
      height: 100%;
      display: flex;
      align-items: center;
      align-self: center;

      :deep(.el-textarea__inner) {
        padding: 0;
        margin: 0;
        color: var(--el-text-color-primary);
        font-size: var(--el-sender-input-input-font-size);
        line-height: var(--el-font-line-height-primary);
        list-style: none;
        position: relative;
        display: inline-block;
        box-sizing: border-box;
        width: 100%;
        min-width: 0;
        max-width: 100%;
        height: auto;
        min-height: auto !important;
        border-radius: 0;
        border: none;
        flex: auto;
        align-self: center;
        vertical-align: bottom;
        resize: none;
        background-color: transparent;
        transition:
          all var(--el-transition-duration),
          height 0s;
        box-shadow: none !important;
      }
    }
    // 操作列表
    .el-sender-action-list-presets {
      display: flex;
      gap: var(--el-padding-xs);
      flex-direction: row-reverse;
    }
  }

  // 变体样式 --variant
  .content-variant-updown {
    display: flex;
    flex-direction: column;
    align-items: initial;
    .el-sender-updown-wrap {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      // 前缀
      .el-sender-prefix {
        flex: initial;
      }
    }
  }

  // 底部容器
  .el-sender-footer {
    border-top-width: var(--el-border-width);
    border-top-style: solid;
    border-top-color: var(--el-border-color);
  }
}

.el-sender-disabled {
  background-color: var(--el-fill-color);
  pointer-events: none;
}

:deep(.el-sender-trigger-popover) {
  width: var(--el-sender-trigger-popover-width) !important;
  max-width: calc(100% - 54px) !important;
  margin-left: var(--el-sender-trigger-popover-left) !important;
}
</style>
