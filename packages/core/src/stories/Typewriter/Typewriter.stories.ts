import type TypewriterSource from '@components/Typewriter/index.vue';
// import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';
import {
  highlightMdContent,
  mathMdContent,
  mdContent,
  mermaidMdContent
} from '@assets/mock';
import PrismDemo from './CustomPrismDemo.vue';
import ShikiDemo from './CustomShikiDemo.vue';
import Typewriter from './index.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Example/Typewriter 打字器组件 ✍',
  component: Typewriter,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
    isMarkdown: { control: 'boolean' },
    typing: { control: 'object' },
    isFog: { control: 'boolean' }
  },
  args: {
    typing: {
      step: 2,
      interval: 100,
      suffix: '|',
      isRequestEnd: true
    },
    isFog: true,
    isMarkdown: true
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  }
} satisfies Meta<typeof TypewriterSource>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const TypewriterDemo: Story = {
  args: {
    content: mdContent,
    isFog: true,
    isMarkdown: true
  } as Story['args']
};

export const PrismRenderDemo: Story = {
  args: {
    content: highlightMdContent
  } as Story['args'],
  render: args => ({
    components: {
      PrismDemo
    },
    setup() {
      return {
        attrs: args
      };
    },
    template: `<PrismDemo v-bind="attrs" />`
  })
};

export const PieRenderDemo: Story = {
  args: {
    content: mermaidMdContent
  } as Story['args']
};

export const MathRenderDemo: Story = {
  args: {
    content: mathMdContent
  } as Story['args']
};

export const ShikiRenderDemo: Story = {
  args: {
    content: highlightMdContent
  } as Story['args'],
  render: args => ({
    components: {
      ShikiDemo
    },
    setup() {
      return {
        attrs: {
          ...args,
          typing: false
        }
      };
    },
    template: `
    <Suspense>
      <ShikiDemo v-bind="attrs" />
      <template #fallback>
        <div>Loading...</div>
      </template>
    </Suspense>`
  })
};
