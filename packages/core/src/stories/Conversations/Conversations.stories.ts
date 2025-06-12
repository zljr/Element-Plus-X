import type { Meta, StoryObj } from '@storybook/vue3';
import Conversations from '@components/Conversations/index.vue';
import { pick } from 'radash';
import AbsoluteCustom from './AbsoluteCustom.vue';

const meta: Meta = {
  title: 'Example/Conversations',
  tags: ['autodocs'],
  component: Conversations as any,
  argTypes: {
    items: {
      control: 'object'
    },
    labelMaxWidth: {
      control: 'number'
    },
    labelHeight: {
      control: 'number'
    },
    showTooltip: {
      control: 'boolean'
    },
    tooltipPlacement: {
      control: 'radio',
      options: ['top', 'bottom', 'left', 'right']
    },
    tooltipOffset: {
      control: 'number'
    },
    showBuiltInMenu: {
      control: 'boolean'
    },
    groupable: {
      control: 'object'
    },
    rowKey: {
      control: 'text'
    },
    itemsStyle: {
      control: 'object'
    },
    itemsActiveStyle: {
      control: 'object'
    },
    itemsHoverStyle: {
      control: 'object'
    },
    itemsMenuOpenedStyle: {
      control: 'object'
    },
    menuStyle: {
      control: 'object'
    }
  },
  args: {
    items: [
      {
        key: 'm1',
        label: '菜单测试项目 1 - 长文本效果演示文本长度溢出效果测试'.repeat(2),
        group: '工作'
      },
      {
        key: 'm2',
        label: '菜单测试项目 2',
        disabled: true,
        group: '工作'
      },
      {
        key: 'm3',
        label: '菜单测试项目 3',
        group: '工作'
      },
      {
        key: 'm4',
        label: '菜单测试项目 4',
        group: '学习'
      },
      {
        key: 'm5',
        label: '菜单测试项目 5',
        group: '学习'
      },
      {
        key: 'm6',
        label: '菜单测试项目 6',
        group: '学习'
      },
      {
        key: 'm7',
        label: '菜单测试项目 7',
        group: '学习'
      },
      {
        key: 'm8',
        label: '菜单测试项目 8',
        group: '个人'
      },
      {
        key: 'm9',
        label: '菜单测试项目 9',
        group: '个人'
      },
      {
        key: 'm10',
        label: '菜单测试项目 10',
        group: '个人'
      },
      {
        key: 'm11',
        label: '菜单测试项目 11',
        group: '个人'
      },
      {
        key: 'm12',
        label: '菜单测试项目 12'
      },
      {
        key: 'm13',
        label: '菜单测试项目 13'
      },
      {
        key: 'm14',
        label: '菜单测试项目 14'
      }
    ]
  }
} satisfies Meta<typeof Conversations>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AbsoluteCustomDemo: Story = {
  name: 'AbsoluteCustom',
  argTypes: {
    tooltipPlacement: {
      control: 'radio',
      options: ['top', 'bottom', 'left', 'right']
    },
    labelHeight: {
      control: 'number'
    }
  },
  args: {
    items: [
      {
        key: 'm1',
        label: '菜单测试项目 1 - 长文本效果演示文本长度溢出效果测试'.repeat(2),
        group: '工作'
      },
      {
        key: 'm2',
        label: '菜单测试项目 2',
        disabled: true,
        group: '工作'
      },
      {
        key: 'm3',
        label: '菜单测试项目 3',
        group: '工作'
      },
      {
        key: 'm4',
        label: '菜单测试项目 4',
        group: '学习'
      },
      {
        key: 'm5',
        label: '菜单测试项目 5',
        group: '学习'
      },
      {
        key: 'm6',
        label: '菜单测试项目 6',
        group: '学习'
      },
      {
        key: 'm7',
        label: '菜单测试项目 7',
        group: '学习'
      },
      {
        key: 'm8',
        label: '菜单测试项目 8',
        group: '个人'
      },
      {
        key: 'm9',
        label: '菜单测试项目 9',
        group: '个人'
      },
      {
        key: 'm10',
        label: '菜单测试项目 10',
        group: '个人'
      },
      {
        key: 'm11',
        label: '菜单测试项目 11',
        group: '个人'
      },
      {
        key: 'm12',
        label: '菜单测试项目 12'
      },
      {
        key: 'm13',
        label: '菜单测试项目 13'
      },
      {
        key: 'm14',
        label: '菜单测试项目 14'
      }
    ],
    groupable: {
      // 自定义分组排序，学习 > 工作 > 个人 > 未分组
      sort: (a: any, b: any) => {
        const order: Record<string, number> = {
          学习: 0,
          工作: 1,
          个人: 2,
          未分组: 3
        };
        const orderA = order[a] !== undefined ? order[a] : 999;
        const orderB = order[b] !== undefined ? order[b] : 999;
        return orderA - orderB;
      }
    },
    menu: [
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
    ],
    labelMaxWidth: 200,
    showTooltip: true,
    tooltipPlacement: 'right',
    tooltipOffset: 35,
    showBuiltInMenu: true,
    rowKey: 'key',
    itemsStyle: {
      padding: '10px 20px',
      borderRadius: '10px',
      fontSize: '16px',
      fontWeight: 'bold',
      textAlign: 'center',
      boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s',
      marginBottom: '20px',
      border: '2px dashed transparent'
    },
    itemsHoverStyle: {
      background: '#FAFAD2',
      border: '2px dashed #006400'
    },
    itemsActiveStyle: {
      background: '#006400',
      color: '#FFFAFA',
      border: '2px dashed transparent'
    },
    itemsMenuOpenedStyle: {
      border: '2px dashed transparent'
    },
    menuStyle: {
      backgroundColor: 'red',
      boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.1)',
      padding: '10px 20px'
    }
  },
  render: args => ({
    components: { AbsoluteCustom },
    setup() {
      const attrs = pick(args, [
        'items',
        'groupable',
        'menu',
        'labelMaxWidth',
        'showTooltip',
        'tooltipPlacement',
        'tooltipOffset',
        'showBuiltInMenu',
        'rowKey',
        'itemsStyle',
        'itemsHoverStyle',
        'itemsActiveStyle',
        'itemsMenuOpenedStyle',
        'menuStyle'
      ] as (keyof Story['args'])[]);
      return {
        attrs
      };
    },
    template: '<AbsoluteCustom v-bind="attrs" />'
  })
};
