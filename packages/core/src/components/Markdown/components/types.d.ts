// import type { CustomAttrs } from './core'

// export type * from './core/types'
import type { BuiltinTheme } from 'shiki';

export interface MdComponent {
  raw: any;
}
export type CodeBlockRenderer =
  | ((params: { language?: string; content: string }) => VNodeChild)
  | Component;

export interface HighlightProps {
  theme?: BuiltinTheme | null;
  isDark?: boolean;
  language?: string;
  content?: string;
}
// 定义颜色替换的类型
export interface ColorReplacements {
  [theme: string]: Record<string, string>;
}
