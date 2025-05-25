import type { Meta, StoryObj } from '@storybook/vue3';
import Attachments from '@components/Attachments/index.vue';
import { pick } from 'radash';
import CustomButtons from './CustomButtons.vue';
import CustomList from './CustomList.vue';
import DefaultScrollX from './DefaultScrollX.vue';
import ScrollY from './ScrollY.vue';
import { genDefaultFiles } from './useAttachmentStubs';
import Wrap from './Wrap.vue';

//
const files = genDefaultFiles();

const meta: Meta = {
  title: 'Example/Attachments',
  tags: ['autodocs'],
  component: Attachments,
  argTypes: {
    items: {
      control: 'object'
    },
    overflow: {
      control: 'radio',
      options: ['scrollX', 'scrollY', 'wrap']
    },
    listStyle: {
      control: 'object'
    },
    limit: {
      control: 'number'
    },
    hideUpload: {
      control: 'boolean'
    },
    uploadIconSize: {
      control: 'text'
    },
    dragTarget: {
      control: 'text'
    }
  },
  args: {
    overflow: 'scrollX',
    listStyle: {},
    limit: 0,
    hideUpload: false,
    uploadIconSize: '64px',
    dragTarget: ''
  }
} satisfies Meta<typeof Attachments>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CustomListDemo: Story = {
  name: 'CustomList',
  args: {
    drag: true,
    items: files,
    listStyle: {
      padding: '0 12px'
    }
  },
  render: (args) => ({
    components: { CustomList },
    setup() {
      const attrs = pick(args, [
        'items',
        'hideUpload',
        'listStyle',
        'overflow',
        'limit',
        'uploadIconSize',
        'dragTarget',
        'drag'
      ] as (keyof Story['args'])[]);
      return {
        attrs
      };
    },
    template: '<CustomList v-bind="attrs" />'
  })
};

export const CustomButtonsDemo: Story = {
  name: 'CustomButtons',
  args: {
    drag: true,
    items: files,
    listStyle: {
      padding: '0 12px'
    },
    hideUpload: false,
    overflow: 'scrollX'
  } as Story['args'],
  render: (args) => ({
    components: { CustomButtons },
    setup() {
      const attrs = pick(args, [
        'items',
        'listStyle',
        'hideUpload',
        'overflow',
        'limit',
        'uploadIconSize',
        'dragTarget',
        'drag'
      ] as (keyof Story['args'])[]);
      return {
        attrs
      };
    },
    template: '<CustomButtons v-bind="attrs" />'
  })
};

export const DefaultScrollXDemo: Story = {
  name: 'ScrollX',
  args: {
    drag: true,
    items: files,
    listStyle: {
      padding: '0 12px'
    },
    hideUpload: false,
    overflow: 'scrollX'
  } as Story['args'],
  render: (args) => ({
    components: { DefaultScrollX },
    setup() {
      const attrs = pick(args, [
        'items',
        'listStyle',
        'hideUpload',
        'overflow',
        'drag',
        'overflow',
        'limit',
        'uploadIconSize',
        'dragTarget'
      ] as (keyof Story['args'])[]);
      return {
        attrs
      };
    },
    template: '<DefaultScrollX v-bind="attrs" />'
  })
};
export const ScrollYDemo: Story = {
  name: 'ScrollY',
  args: {
    drag: true,
    items: files,
    listStyle: {
      padding: '0 12px'
    },
    overflow: 'scrollY'
  },
  render: (args) => ({
    components: { ScrollY },
    setup() {
      const attrs = pick(args, [
        'items',
        'listStyle',
        'hideUpload',
        'overflow',
        'drag',
        'overflow',
        'limit',
        'uploadIconSize',
        'dragTarget'
      ] as (keyof Story['args'])[]);
      return {
        attrs
      };
    },
    template: '<ScrollY v-bind="attrs"/>'
  })
};
export const WrapDemo: Story = {
  name: 'Wrap',
  args: {
    drag: true,
    items: files,
    listStyle: {
      padding: '0 12px'
    },
    overflow: 'wrap'
  },
  render: (args) => ({
    components: { Wrap },
    setup() {
      const attrs = pick(args, [
        'items',
        'listStyle',
        'hideUpload',
        'overflow',
        'drag',
        'overflow',
        'limit',
        'uploadIconSize',
        'dragTarget'
      ] as (keyof Story['args'])[]);
      return {
        attrs
      };
    },
    template: '<Wrap v-bind="attrs"/>'
  })
};
