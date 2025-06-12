<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

// 绝对自定义
// const menuTestItems1 = ref([
//   {
//     key: 'm1',
//     label: '菜单测试项目 1 - 长文本效果演示文本长度溢出效果测试'.repeat(2),
//     group: '工作',
//   },
//   {
//     key: 'm2',
//     label: '菜单测试项目 2',
//     disabled: true,
//     group: '工作',
//   },
//   {
//     key: 'm3',
//     label: '菜单测试项目 3',
//     group: '工作',
//   },
//   {
//     key: 'm4',
//     label: '菜单测试项目 4',
//     group: '学习',
//   },
//   {
//     key: 'm5',
//     label: '菜单测试项目 5',
//     group: '学习',
//   },
//   {
//     key: 'm6',
//     label: '菜单测试项目 6',
//     group: '学习',
//   },
//   {
//     key: 'm7',
//     label: '菜单测试项目 7',
//     group: '学习',
//   },
//   {
//     key: 'm8',
//     label: '菜单测试项目 8',
//     group: '个人',
//   },
//   {
//     key: 'm9',
//     label: '菜单测试项目 9',
//     group: '个人',
//   },
//   {
//     key: 'm10',
//     label: '菜单测试项目 10',
//     group: '个人',
//   },
//   {
//     key: 'm11',
//     label: '菜单测试项目 11',
//     group: '个人',
//   },
//   {
//     key: 'm12',
//     label: '菜单测试项目 12',
//   },
//   {
//     key: 'm13',
//     label: '菜单测试项目 13',
//   },
//   {
//     key: 'm14',
//     label: '菜单测试项目 14',
//   },
// ]);

const conversationMenuItems1 = [
  {
    key: 'edit',
    label: '编辑',
    icon: '🍉',
    command: {
      self_id: '1',
      self_message: '编辑',
      self_type: 'text'
    }
  },
  {
    key: 'delete',
    label: '删除',
    icon: '🍎',
    disabled: true,
    divided: true
  },
  {
    key: 'share',
    label: '分享',
    icon: '🍆',
    command: 'share'
  }
];

const activeKey = ref('m1');
// 自定义分组选项

// 处理菜单点击
function handleMenuClick(menuKey: string, item: any) {
  // console.log('菜单点击', menuKey, item)

  switch (menuKey) {
    case 'edit':
      ElMessage.info(`编辑: ${item.label}`);
      break;
    case 'delete':
      ElMessage.warning(`删除: ${item.label}`);
      break;
    case 'share':
      ElMessage.success(`分享: ${item.label}`);
      break;
  }
}

const attrs = useAttrs();
</script>

<template>
  <div class="demo-container">
    <h2>绝对自定义-默认样式，悬停样式，选中样式，以及自定义 label</h2>
    <div class="demo-card">
      <Conversations v-bind="attrs" v-model:active="activeKey">
        <template #label="{ item }">
          <div class="custom-label">
            {{ item.label }}
          </div>
        </template>

        <template #groupTitle="{ group }">
          <div class="custom-group-title">
            <!-- 为不同组添加不同的前缀 -->
            <span v-if="group.title === '工作'">📊 </span>
            <span v-else-if="group.title === '学习'">📚 </span>
            <span v-else-if="group.title === '个人'">🏠 </span>
            <span v-else>📁 </span>
            {{ group.title }}
          </div>
        </template>

        <template
          #more-filled="{ item, isHovered, isActive, isMenuOpened, isDisabled }"
        >
          <span v-if="isHovered">✍️</span>
          <span v-if="isActive">✅</span>
          <span v-if="isMenuOpened">🥰</span>
          <span
            v-if="isDisabled"
            :style="{
              background: 'black',
              padding: '5px',
              borderRadius: '10px',
              color: 'white',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }"
          >
            🫥是否禁用：{{ item?.disabled }}
          </span>
        </template>

        <template #menu="{ item }">
          <div class="menu-buttons">
            <div
              v-for="menuItem in conversationMenuItems1"
              :key="menuItem.key"
              class="menu-self-button"
              @click.stop="handleMenuClick(menuItem.key, item)"
            >
              <span v-if="menuItem.icon">{{ menuItem.icon }}</span>
              <span v-if="menuItem.label">{{ menuItem.label }}</span>
            </div>
          </div>
        </template>
      </Conversations>
    </div>
  </div>
</template>

<style scoped lang="scss">
.demo-container {
  padding: 20px;
  height: calc(100vh - 120px);
  overflow: auto;

  h2 {
    margin-top: 30px;
    margin-bottom: 8px;
    font-size: 18px;
  }

  .description {
    color: #909399;
    font-size: 14px;
    margin-bottom: 16px;
  }

  .demo-card {
    border: 1px solid #ebeef5;
    border-radius: 8px;
    overflow: hidden;
    height: 600px;
    margin-bottom: 30px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}

.custom-group-title {
  display: flex;
  align-items: center;
  font-weight: 500;
  color: #409eff;
}

.menu-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  padding: 12px;

  // 自定义菜单按钮-el-button样式
  .el-button {
    padding: 4px 8px;
    margin-left: 0;

    .el-icon {
      margin-right: 8px;
    }
  }

  // 自定义菜单按钮-自定义样式
  .menu-self-button {
    display: flex;
    padding: 4px 8px;
    align-items: center;
    border-radius: 5px;
    margin-left: 0;
    cursor: pointer;
    gap: 8px;

    &:hover {
      background-color: #f5f7fa;
      color: #409eff;
    }
  }
}

.custom-label {
  display: flex;
  align-items: center;
  // 溢出隐藏
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}
</style>
