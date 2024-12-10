'use client';

import React from 'react';

import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';

import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import { CodeBlockPlugin } from '@udecode/plate-code-block/react';
import {
  type PlateEditor,
  ParagraphPlugin,
  focusEditor,
  useEditorRef,
} from '@udecode/plate-common/react';
import { DatePlugin } from '@udecode/plate-date/react';
import { ExcalidrawPlugin } from '@udecode/plate-excalidraw/react';
import { HEADING_KEYS } from '@udecode/plate-heading';
import { TocPlugin } from '@udecode/plate-heading/react';
import { HorizontalRulePlugin } from '@udecode/plate-horizontal-rule/react';
import { INDENT_LIST_KEYS, ListStyleType } from '@udecode/plate-indent-list';
import { LinkPlugin } from '@udecode/plate-link/react';
import { ImagePlugin, MediaEmbedPlugin } from '@udecode/plate-media/react';
import { TablePlugin } from '@udecode/plate-table/react';
import { TogglePlugin } from '@udecode/plate-toggle/react';
import {
  CalendarIcon,
  ChevronRightIcon,
  Columns3Icon,
  FileCodeIcon,
  FilmIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ImageIcon,
  Link2Icon,
  ListIcon,
  ListOrderedIcon,
  MinusIcon,
  PenToolIcon,
  PilcrowIcon,
  PlusIcon,
  QuoteIcon,
  SquareIcon,
  TableIcon,
  TableOfContentsIcon,
} from 'lucide-react';

import {
  insertBlock,
  insertInlineElement,
} from '@/components/editor/transforms';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  useOpenState,
} from './dropdown-menu';
import { ToolbarButton } from './toolbar';

type Group = {
  group: string;
  items: Item[];
};

interface Item {
  icon: React.ReactNode;
  onSelect: (editor: PlateEditor, value: string) => void;
  value: string;
  focusEditor?: boolean;
  label?: string;
}

const groups: Group[] = [
  {
    group: '기본 블럭',
    items: [
      {
        icon: <PilcrowIcon />,
        label: '본문',
        value: ParagraphPlugin.key,
      },
      {
        icon: <Heading1Icon />,
        label: '제목 1',
        value: HEADING_KEYS.h1,
      },
      {
        icon: <Heading2Icon />,
        label: '제목 2',
        value: HEADING_KEYS.h2,
      },
      {
        icon: <Heading3Icon />,
        label: '제목 3',
        value: HEADING_KEYS.h3,
      },
      {
        icon: <Link2Icon />,
        label: '링크',
        value: LinkPlugin.key,
      },
      {
        icon: <QuoteIcon />,
        label: '인용',
        value: BlockquotePlugin.key,
      },
      {
        icon: <MinusIcon />,
        label: '구분자',
        value: HorizontalRulePlugin.key,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value);
      },
    })),
  },
  {
    group: '목록',
    items: [
      {
        icon: <ListIcon />,
        label: '글머리 목록',
        value: ListStyleType.Disc,
      },
      {
        icon: <ListOrderedIcon />,
        label: '숫자 목록',
        value: ListStyleType.Decimal,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value);
      },
    })),
  },
  {
    group: '미디어',
    items: [
      {
        icon: <ImageIcon />,
        label: '이미지',
        value: ImagePlugin.key,
      },
      {
        icon: <FilmIcon />,
        label: '영상',
        value: MediaEmbedPlugin.key,
      }
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value);
      },
    })),
  },
];

export function InsertDropdownMenu(props: DropdownMenuProps) {
  const editor = useEditorRef();
  const openState = useOpenState();

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={openState.open} tooltip='추가하기' isDropdown>
          <PlusIcon />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='flex max-h-[500px] min-w-0 flex-col overflow-y-auto'
        align='start'
      >
        {groups.map(({ group, items: nestedItems }) => (
          <DropdownMenuGroup key={group} label={group}>
            {nestedItems.map(({ icon, label, value, onSelect }) => (
              <DropdownMenuItem
                key={value}
                className='min-w-[180px]'
                onSelect={() => {
                  onSelect(editor, value);
                  focusEditor(editor);
                }}
              >
                {icon}
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
