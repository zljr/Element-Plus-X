import type { Meta, StoryFn } from '@storybook/vue3'
import type { ThoughtChainProps } from '../../components/ThoughtChain/types'
import { CircleCloseFilled, Loading, SuccessFilled } from '@element-plus/icons-vue'
import { ElIcon } from 'element-plus'
import ThoughtChain from '../../components/ThoughtChain/index.vue'
import './index.scss'

const meta: Meta<typeof ThoughtChain> = {
  title: 'Example/ThoughtChain',
  component: ThoughtChain as any,
  argTypes: {
    dotSize: {
      control: { type: 'select' },
      options: ['small', 'default', 'large'],
    },
    maxWidth: {
      control: { type: 'text' },
    },
    lineGradient: {
      control: { type: 'boolean' },
    },
    rowKey: {
      control: { type: 'text' },
      defaultValue: 'id',
      description: 'id字段名',
    },
    titleKey: {
      control: { type: 'text' },
      defaultValue: 'title',
      description: '标题字段名',
    },
    statusKey: {
      control: { type: 'text' },
      defaultValue: 'status',
      description: '状态字段名',

    },
    thinkContentKey: {
      control: { type: 'text' },
      defaultValue: 'content',
      description: '思考内容字段名',

    },
    thinkTitleKey: {
      control: { type: 'text' },
      defaultValue: 'title',
      description: '思考标题字段名',
    },
  },
}

export default meta

const Template: StoryFn<typeof ThoughtChain> = args => ({
  components: { ThoughtChain },
  setup() {
    return { args }
  },
  template: '<ThoughtChain v-bind="args" @handleExpand="(item) => console.log(\'ThoughtChain Expanded:\', item)" />',
})

const baseItems: ThoughtChainProps['thinkingItems'] = [
  {
    id: 1,
    title: 'Step 1',
    thinkTitle: 'Thinking about step one',
    thinkContent: 'Detailed explanation for **step one',
    status: 'success',
    isCanExpand: true,
    isDefaultExpand: false,
    isMarkdown: true,
  },
  {
    id: 2,
    title: 'Step 2',
    thinkTitle: 'Thinking about step two',
    thinkContent: 'Here is what we know about step two.',
    status: 'loading',
    isCanExpand: true,
    isDefaultExpand: true,
    isMarkdown: false,
  },
  {
    id: 3,
    title: 'Final Step',
    thinkTitle: 'Last step...',
    thinkContent: 'This is the **final step** of the process',
    status: 'error',
    isCanExpand: false,
    isMarkdown: true,
  },
]

const defaultConfig = {
  maxWidth: '600px',
  rowKey: 'id',
  titleKey: 'title',
  thinkTitleKey: 'thinkTitle',
  thinkContentKey: 'thinkContent',
  statusKey: 'status',
  lineGradient: false,
  dotBackgroundColor: {
    loading: '#f39c12',
    success: '#2ecc71',
    error: '#e74c3c',
  },
}

export const Default = Template.bind({})
Default.args = {
  thinkingItems: baseItems,
  ...defaultConfig,
  lineGradient: false,
}

export const WithGradientLine = Template.bind({})
WithGradientLine.args = {
  thinkingItems: baseItems,
  ...defaultConfig,
  lineGradient: true,
}

export const SmallDots = Template.bind({})
SmallDots.args = {
  thinkingItems: baseItems,
  ...defaultConfig,
  dotSize: 'small',
}

export const LargeDots = Template.bind({})
LargeDots.args = {
  thinkingItems: baseItems,
  ...defaultConfig,
  dotSize: 'large',

}

export const CustomMaxWidth = Template.bind({})
CustomMaxWidth.args = {
  thinkingItems: baseItems,
  ...defaultConfig,
  maxWidth: '800px',
}

const CustomIconSlot: StoryFn = args => ({
  components: { ThoughtChain, SuccessFilled, CircleCloseFilled, Loading, ElIcon },
  setup() {
    return { args }
  },
  template: `
    <ThoughtChain v-bind="args">
    <!-- 自定义 icon 插槽 -->
    <template #icon="{ item }">
        <span
            v-if="item.status === 'success'"
            class="slot-success"
        >
        <el-icon><SuccessFilled /></el-icon>
        </span>
        <span
            v-if="item.status === 'error'"
            class="slot-error"
        >
        <el-icon><CircleCloseFilled /></el-icon>
        </span>
        <span
            v-if="item.status === 'loading'"
            class="slot-loading"
        >
        <el-icon class="is-loading"><Loading /></el-icon>
        </span>
    </template>
    </ThoughtChain>
  `,
})

export const CustomIcon = CustomIconSlot.bind({})
CustomIcon.args = {
  thinkingItems: baseItems,
  ...defaultConfig,
}
