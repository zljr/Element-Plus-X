import type { TypewriterProps } from '../Typewriter/types';

export type BubbleProps = Pick<
  TypewriterProps,
  'isFog' | 'typing' | 'content' | 'isMarkdown'
> & {
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

export interface BubbleEmits {
  (start: 'start', instance: TypewriterInstance): void;
  (finish: 'finish', instance: TypewriterInstance): void;
  (writing: 'writing', instance: TypewriterInstance): void;
  (avatarError: 'avatarError', e: Event): void;
}
