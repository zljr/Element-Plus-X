import type { TypewriterProps } from '../Typewriter/types';

export type BubbleProps = Pick<TypewriterProps, 'isFog' | 'typing' | 'content' | 'isMarkdown'> & {
  reasoning_content?: string;
  placement?: 'start' | 'end';
  avatar?: string;
  loading?: boolean;
  shape?: 'round' | 'corner';
  variant?: 'filled' | 'borderless' | 'outlined' | 'shadow';
  maxWidth?: string;
  avatarSize?: string;
  avatarGap?: string;
  avatarShape?: 'circle' | 'square';
  avatarIcon?: string;
  avatarSrcSet?: string;
  avatarAlt?: string;
  avatarFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  noStyle?: boolean;
};
