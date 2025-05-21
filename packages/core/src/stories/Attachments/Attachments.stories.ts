import type { Meta, StoryObj } from '@storybook/vue3';
import Attachments from '@components/Attachments/index.vue';
import { pick } from 'radash';
import CustomButtons from './CustomButtons.vue';
import CustomList from './CustomList.vue';
import DefaultScrollX from './DefaultScrollX.vue';
import ScrollY from './ScrollY.vue';
import { genDefaultFiles } from './useAttachmentStubs';
import Wrap from './Wrap.vue';

const files = genDefaultFiles();

const meta: Meta = {
  title: 'Example/Attachments',
  tags: ['autodocs'],
  component: Attachments,
  argTypes: {
    items: {
      control: 'object',
    },
    overflow: {
      control: 'radio',
      options: ['scrollX', 'scrollY', 'wrap'],
    },
    listStyle: {
      control: 'object',
    },
    limit: {
      control: 'number',
    },
    hideUpload: {
      control: 'boolean',
    },
    uploadIconSize: {
      control: 'text',
    },
    dragTarget: {
      control: 'text',
    },
  },
  args: {
    overflow: 'scrollX',
    listStyle: {},
    limit: 0,
    hideUpload: false,
    uploadIconSize: '',
    dragTarget: '',
  },
} satisfies Meta<typeof Attachments>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CustomListDemo: Story = {
  name: 'CustomList',
  args: {
    items: files,
    listStyle: {
      padding: '0 12px',
    },
  },
  render: args => ({
    components: { CustomList },
    setup() {
      const attrs = pick(args, ['items', 'hideUpload', 'listStyle'] as (keyof Story['args'])[]);
      return {
        attrs,
      };
    },
    template: '<CustomList v-bind="attrs" />',
  }),
};

export const CustomButtonsDemo: Story = {
  name: 'CustomButtons',
  args: {
    items: files,
    listStyle: {
      padding: '0 12px',
    },
    hideUpload: false,
    overflow: 'scrollX',
  } as Story['args'],
  render: args => ({
    components: { CustomButtons },
    setup() {
      const attrs = pick(args, ['items', 'listStyle', 'hideUpload', 'overflow'] as (keyof Story['args'])[]);
      return {
        attrs,
      };
    },
    template: '<CustomButtons v-bind="attrs" />',
  }),
};

export const DefaultScrollXDemo: Story = {
  name: 'ScrollX',
  args: {
    items: files,
    listStyle: {
      padding: '0 12px',
    },
    hideUpload: false,
    overflow: 'scrollX',
    drag: true,
  } as Story['args'],
  render: args => ({
    components: { DefaultScrollX },
    setup() {
      const attrs = pick(args, ['items', 'listStyle', 'hideUpload', 'overflow', 'drag'] as (keyof Story['args'])[]);
      return {
        attrs,
      };
    },
    template: '<DefaultScrollX v-bind="attrs" />',
  }),
};
export const ScrollYDemo: Story = {
  name: 'ScrollY',
  render: () => ({ components: { ScrollY }, template: '<ScrollY/>' }),
};
export const WrapDemo: Story = {
  name: 'Wrap',
  render: () => ({ components: { Wrap }, template: '<Wrap/>' }),
};
