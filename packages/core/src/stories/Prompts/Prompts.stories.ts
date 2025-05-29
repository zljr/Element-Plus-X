import type PromptsSource from '@components/Prompts/index.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import PromptsCustomStyle from './index-custom-style.vue';
import PromptsNesting from './index-has-children.vue';
import Prompts from './index.vue';
import { CustomStyleItems, mockPromptsItems } from './mock';

const meta: Meta<typeof PromptsSource> = {
  title: 'Example/Prompts',
  component: Prompts,
  argTypes: {
    title: {
      control: 'text',
      defaultValue: '欢迎使用Element-Plus-X AI 助手',
      description: '提示集的主标题文本内容'
    },
    items: {
      control: 'object',
      defaultValue: [
        {
          title: '你好',
          content:
            '你好，我是Element-Plus-X AI 助手，你可以向我提问任何问题，我将尽力回答。'
        },
        {
          title: '你好',
          content:
            '你好，我是Element-Plus-X AI 助手，你可以向我提问任何问题，我将尽力回答。'
        }
      ],
      description:
        '提示项数组，每个元素包含标签、图标、描述等信息（具体结构见下方说明）'
    },
    wrap: {
      control: 'boolean',
      default: false,
      description: '是否允许提示项自动换行（仅水平排列时生效）'
    },
    vertical: {
      control: 'boolean',
      default: false,
      description: '是否垂直排列提示项（垂直模式下布局方向为列排列）'
    },
    style: {
      control: 'object',
      description: '自定义样式'
    }
  }
} satisfies Meta<typeof PromptsSource>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PromptsDefaultDemo: Story = {
  args: {
    title: '欢迎使用Element-Plus-X AI 助手',
    items: mockPromptsItems,
    wrap: false,
    vertical: false,
    style: {}
  }
};

export const PromptsCustomStyleDemo: Story = {
  args: {
    title: '欢迎使用Element-Plus-X AI 助手',
    items: CustomStyleItems,
    wrap: true,
    vertical: false,
    style: {}
  },
  render: (args: any) => ({
    components: {
      PromptsCustomStyle
    },
    setup() {
      return { attrs: args };
    },
    template: `<PromptsCustomStyle v-bind="attrs" />`
  })
};

export const PromptsNestingDemo: Story = {
  args: {
    title: '欢迎使用Element-Plus-X AI 助手',
    wrap: true,
    vertical: false,
    style: {}
  },
  render: (args: any) => ({
    components: {
      PromptsNesting
    },
    setup() {
      return { attrs: args };
    },
    template: `<PromptsNesting v-bind="attrs" />`
  })
};
