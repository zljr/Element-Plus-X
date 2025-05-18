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
    lineGradient: {
      control: { type: 'boolean' },
    },
    maxWidth: {
      control: { type: 'text' },
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

export const Default = Template.bind({})
Default.args = {
  thinkingItems: baseItems,
  dotSize: 'default',
  lineGradient: false,
  maxWidth: '600px',
}

export const WithGradientLine = Template.bind({})
WithGradientLine.args = {
  thinkingItems: baseItems,
  lineGradient: true,
  dotBackgroundColor: {
    loading: '#f39c12',
    success: '#2ecc71',
    error: '#e74c3c',
  },
}

export const SmallDots = Template.bind({})
SmallDots.args = {
  thinkingItems: baseItems,
  dotSize: 'small',
}

export const LargeDots = Template.bind({})
LargeDots.args = {
  thinkingItems: baseItems,
  dotSize: 'large',
}

export const CustomMaxWidth = Template.bind({})
CustomMaxWidth.args = {
  thinkingItems: baseItems,
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
}
