'use client';

import React from 'react';
import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  UnderlinePlugin,
} from '@udecode/plate-basic-marks/react';
import { useEditorReadOnly } from '@udecode/plate-common/react';
import {
  FontBackgroundColorPlugin,
  FontColorPlugin,
} from '@udecode/plate-font/react';
import { HighlightPlugin } from '@udecode/plate-highlight/react';
import { ListStyleType } from '@udecode/plate-indent-list';
import {
  AudioPlugin,
  FilePlugin,
  ImagePlugin,
  VideoPlugin,
} from '@udecode/plate-media/react';
import {
  BaselineIcon,
  BoldIcon,
  Code2Icon,
  HighlighterIcon,
  ItalicIcon,
  PaintBucketIcon,
  StrikethroughIcon,
  UnderlineIcon,
  WandSparklesIcon,
} from 'lucide-react';

import { MoreDropdownMenu } from '@/components/plate-ui/more-dropdown-menu';

import { AlignDropdownMenu } from './align-dropdown-menu';
import { ColorDropdownMenu } from './color-dropdown-menu';
import { CommentToolbarButton } from './comment-toolbar-button';
import { EmojiDropdownMenu } from './emoji-dropdown-menu';
import { RedoToolbarButton, UndoToolbarButton } from './history-toolbar-button';
import { IndentListToolbarButton } from './indent-list-toolbar-button';
import { IndentToolbarButton } from './indent-toolbar-button';
import { InsertDropdownMenu } from './insert-dropdown-menu';
import { LineHeightDropdownMenu } from './line-height-dropdown-menu';
import { LinkToolbarButton } from './link-toolbar-button';
import { MarkToolbarButton } from './mark-toolbar-button';
import { MediaToolbarButton } from './media-toolbar-button';
import { ModeDropdownMenu } from './mode-dropdown-menu';
import { OutdentToolbarButton } from './outdent-toolbar-button';
import { TableDropdownMenu } from './table-dropdown-menu';
import { ToggleToolbarButton } from './toggle-toolbar-button';
import { ToolbarGroup } from './toolbar';
import { TurnIntoDropdownMenu } from './turn-into-dropdown-menu';

export function FixedToolbarButtons() {
  const readOnly = useEditorReadOnly();

  return (
    <div className='flex w-full'>
      {!readOnly && (
        <>
          <ToolbarGroup>
            <UndoToolbarButton />
            <RedoToolbarButton />
          </ToolbarGroup>
          <ToolbarGroup>
            <InsertDropdownMenu />
            <TurnIntoDropdownMenu />
          </ToolbarGroup>

          <ToolbarGroup>
            <MarkToolbarButton nodeType={BoldPlugin.key} tooltip='굵게'>
              <BoldIcon />
            </MarkToolbarButton>

            <MarkToolbarButton
              nodeType={ItalicPlugin.key}
              tooltip='기울이기'
            >
              <ItalicIcon />
            </MarkToolbarButton>

            <MarkToolbarButton
              nodeType={UnderlinePlugin.key}
              tooltip='밑줄'
            >
              <UnderlineIcon />
            </MarkToolbarButton>

            <MarkToolbarButton
              nodeType={StrikethroughPlugin.key}
              tooltip='취소선'
            >
              <StrikethroughIcon />
            </MarkToolbarButton>

            <ColorDropdownMenu
              nodeType={FontColorPlugin.key}
              tooltip='글자 색'
            >
              <BaselineIcon />
            </ColorDropdownMenu>

            <ColorDropdownMenu
              nodeType={FontBackgroundColorPlugin.key}
              tooltip='배경 색'
            >
              <PaintBucketIcon />
            </ColorDropdownMenu>
          </ToolbarGroup>

          <ToolbarGroup>
            <AlignDropdownMenu />

            <IndentListToolbarButton nodeType={ListStyleType.Disc} />
            <IndentListToolbarButton nodeType={ListStyleType.Decimal} />
          </ToolbarGroup>

          <ToolbarGroup>
            <LinkToolbarButton />
          </ToolbarGroup>

          <ToolbarGroup>
            <MediaToolbarButton nodeType={ImagePlugin.key} />
          </ToolbarGroup>


        </>
      )}


    </div>
  );
}
