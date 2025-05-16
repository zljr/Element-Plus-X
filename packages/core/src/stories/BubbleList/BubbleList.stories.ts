// import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';
import BubbleList from './index.vue';
import BubbleListSource from '@components/BubbleList/index.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/BubbleList',
  component: BubbleList,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    maxHeight: { control: 'text' },
    showBackButton: { control: 'boolean' },
    backButtonPosition: { control: 'object' },
    backButtonThreshold: { control: 'number' },
    btnLoading: { control: 'boolean' },
    btnColor: { control: 'color' },
    btnIconSize: { control: 'number' }
  },
  args: {
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    maxHeight: '500px',
    showBackButton: true,
    backButtonPosition: { bottom: '20px', left: 'calc(50% - 19px)' },
    backButtonThreshold: 80,
    btnLoading: true,
    btnColor: '#409EFF',
    btnIconSize: 24
  },
} satisfies Meta<typeof BubbleListSource>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const BubbleListDemo: Story = {
  args: {
    maxHeight: '500px',
    showBackButton: true,
    backButtonPosition: { bottom: '20px', left: 'calc(50% - 19px)' },
    backButtonThreshold: 80,
    btnLoading: true,
    btnColor: '#409EFF',
    btnIconSize: 24
  } as Story['args'],
};
