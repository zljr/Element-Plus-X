<script setup lang="ts">
import type { MessageItem } from '@assets/mock';
import type { BubbleListProps } from '@components/BubbleList/types';
import BubbleList from '@components/BubbleList/index.vue';
import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css';

const props = defineProps<Pick<BubbleListProps, 'list'>>();

const bubbleItems = ref<BubbleListProps<MessageItem>['list']>(props.list as BubbleListProps<MessageItem>['list']);

const avatar = ref('https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png');
const bubbleListRef = ref();
const num = ref(0);
const attrs = useAttrs();

function addMessage() {
  const i = bubbleItems.value.length;
  const isUser = !!(i % 2);
  const content = isUser
    ? 'Mock user content.'
    : 'Mock AI content. '.repeat(5);
  const placement = isUser ? 'end' : 'start';
  const typing = isUser ? false : { step: 2, suffix: '...' };
  const obj = {
    key: i,
    role: isUser ? 'user' : 'ai',
    content,
    placement,
    typing,
    isFog: true,
    avatar: avatar.value,
  };
  bubbleItems.value.push(obj as MessageItem);
  bubbleListRef.value.scrollToBottom();
  ElMessage.success(`条数：${bubbleItems.value.length}`);
}

function handleOnComplete(_self: unknown) {
  ElMessage.success('列表打字结束');
}

function scrollToTop() {
  bubbleListRef.value.scrollToTop();
}

function scrollToBubble() {
  bubbleListRef.value.scrollToBubble(num.value);
}

onMounted(() => {
  setTimeout(() => {
    bubbleItems.value.map((item: MessageItem) => {
      item.loading = false;
      return item;
    });
  }, 3000);
});
</script>

<template>
  <div class="component-container">
    <p>1. 气泡列表组件，同样继承 雾化效果，点击添加对话预览 </p>
    <p>2. 新版本 支持回到底部按钮，支持 鼠标悬停出现滚动条增强 交互体验 </p>
    <div class="top-wrap">
      <div class="btn-list">
        <el-button type="primary" plain @click="addMessage">
          添加对话
        </el-button>
        <el-button type="primary" plain @click="scrollToTop">
          滚动到顶部
        </el-button>
        <el-input-number v-model="num" :min="0" :max="10" controls-position="right" />
        <el-button type="primary" plain @click="scrollToBubble">
          滚动第{{ num }}个气泡框
        </el-button>
      </div>
    </div>

    <div class="component-1">
      <BubbleList
        v-bind="attrs"
        ref="bubbleListRef"
        :list="bubbleItems"
        @complete="handleOnComplete"
      >
        <template #avatar="{ item }">
          <el-avatar :size="32" :src="item.avatar" />
        </template>

        <template #header="{ item }">
          <div class="header-container">
            {{
              item.role === "ai" ? "机器人头部自定义内容" : "用户头部自定义内容"
            }}
          </div>
        </template>

        <!-- 自定义 content -->
        <!-- <template #content="{ item }">
          <div class="content-container">
            {{ item.content }}
          </div>
        </template> -->

        <template #footer="{ item }">
          <div class="footer-container">
            {{
              item.role === "ai" ? "机器人底部自定义内容" : "用户底部自定义内容"
            }}
          </div>
        </template>

        <template #loading="{ item }">
          <div class="loading-container">
            {{
              item.role === "ai" ? "机器人自定义加载动画" : "用户自定义加载动画"
            }}
          </div>
        </template>

        <!-- <template #backToBottom>
          <el-button circle style="padding: 23px; font-size: 20px;">
            💖
          </el-button>
        </template> -->
      </BubbleList>
    </div>
  </div>
</template>

<style scoped lang="scss">
.component-container {
  background-color: white;
  padding: 12px;
  border-radius: 15px;
  height: calc(100vh - 60px);
  overflow: auto;

  .btn-list {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .top-wrap {
    margin: 12px 0;
  }
}
</style>
