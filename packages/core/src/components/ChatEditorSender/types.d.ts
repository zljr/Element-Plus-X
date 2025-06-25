import type { CustomTag, SelectTag, TagInfo, UserInfo } from 'chatarea';

export interface EditorProps {
  placeholder?: string;
  autoFocus?: boolean;
  variant?: 'default' | 'updown';
  userList?: UserInfo[];
  customTrigger?: CustomTag[];
  selectList?: SelectTag[];
  maxLength?: number;
  submitType?: 'enter' | 'shiftEnter';
  customStyle?: Record<string, any>;
  loading?: boolean;
  disabled?: boolean;
  clearable?: boolean;
  headerAnimationTimer?: number;
}

export interface ChatState {
  isEmpty: boolean;
  textLength: number;
  lastFocusNode: Node | null;
  lastOffset: number;
}

export interface SubmitResult {
  text: string;
  html: string;
  inputTags: Record<string, (string | null)[]>;
  userTags?: UserInfo[];
  selectTags?: Record<string, SelectTag[]>;
  customTags?: Record<string, TagInfo[]>;
}

export type MixTagType =
  | 'gridInput'
  | 'userTag'
  | 'customTag'
  | 'selectTag'
  | 'inputTag'
  | 'htmlTag';

export interface MixTag {
  type: MixTagType;
  key?: string;
  value?: string;
  placeholder?: string;
}
