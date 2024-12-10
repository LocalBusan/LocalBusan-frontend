'use client';

import React from 'react';

import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';

import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import { CodeBlockPlugin } from '@udecode/plate-code-block/react';
import {
  ParagraphPlugin,
  focusEditor,
  useEditorRef,
  useSelectionFragmentProp,
} from '@udecode/plate-common/react';
import { HEADING_KEYS } from '@udecode/plate-heading';
import { INDENT_LIST_KEYS, ListStyleType } from '@udecode/plate-indent-list';
import { TogglePlugin } from '@udecode/plate-toggle/react';
import {
  ChevronRightIcon,
  Columns3Icon,
  FileCodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ListIcon,
  ListOrderedIcon,
  PilcrowIcon,
  QuoteIcon,
  SquareIcon,
} from 'lucide-react';

import {
  getBlockType,
  setBlockType,
} from '@/components/editor/transforms';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  useOpenState,
} from './dropdown-menu';
import { ToolbarButton } from './toolbar';

const turnIntoItems = [
  {
    icon: <PilcrowIcon />,
    keywords: ['paragraph'],
    label: '본문',
    value: ParagraphPlugin.key,
  },
  {
    icon: <Heading1Icon />,
    keywords: ['title', 'h1'],
    label: '제목 1',
    value: HEADING_KEYS.h1,
  },
  {
    icon: <Heading2Icon />,
    keywords: ['subtitle', 'h2'],
    label: '제목 2',
    value: HEADING_KEYS.h2,
  },
  {
    icon: <Heading3Icon />,
    keywords: ['subtitle', 'h3'],
    label: '제목 3',
    value: HEADING_KEYS.h3,
  },
  {
    icon: <ListIcon />,
    keywords: ['unordered', 'ul', '-'],
    label: '글머리 목록',
    value: ListStyleType.Disc,
  },
  {
    icon: <ListOrderedIcon />,
    keywords: ['ordered', 'ol', '1'],
    label: '숫자 목록',
    value: ListStyleType.Decimal,
  },
  {
    icon: <QuoteIcon />,
    keywords: ['citation', 'blockquote', '>'],
    label: '인용',
    value: BlockquotePlugin.key,
  },
];

export function TurnIntoDropdownMenu(props: DropdownMenuProps) {
  const editor = useEditorRef();
  const openState = useOpenState();

  const value = useSelectionFragmentProp({
    defaultValue: ParagraphPlugin.key,
    getProp: (node) => getBlockType(node as any),
  });
  const selectedItem = React.useMemo(
    () =>
      turnIntoItems.find(
        (item) => item.value === (value ?? ParagraphPlugin.key)
      ) ?? turnIntoItems[0],
    [value]
  );

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={openState.open} tooltip='~로 바꾸기' isDropdown>
          {selectedItem.label}
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='ignore-click-outside/toolbar min-w-0'
        align='start'
      >
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(type) => {
            setBlockType(editor, type);
            focusEditor(editor);
          }}
          label='~로 바꾸기'
        >
          {turnIntoItems.map(({ icon, label, value: itemValue }) => (
            <DropdownMenuRadioItem
              key={itemValue}
              className='min-w-[180px]'
              value={itemValue}
            >
              {icon}
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
