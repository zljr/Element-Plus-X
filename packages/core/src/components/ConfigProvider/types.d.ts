import type MarkdownIt from 'markdown-it';

export type MarkdownItPlugin = (md: MarkdownIt) => void;

export interface ConfigProviderProps {
  mdPlugins?: MarkdownItPlugin[];
  md?: MarkdownIt;
  // highlight?: (code: string, language: string) => string;
}
