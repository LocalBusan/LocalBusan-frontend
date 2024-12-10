'use client';

import React, { useCallback, useState } from 'react';

import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';

import { insertNodes, isUrl } from '@udecode/plate-common';
import { useEditorRef } from '@udecode/plate-common/react';
import {
  AudioPlugin,
  FilePlugin,
  ImagePlugin,
  VideoPlugin,
} from '@udecode/plate-media/react';
import {
  AudioLinesIcon,
  FileUpIcon,
  FilmIcon,
  ImageIcon,
  LinkIcon,
} from 'lucide-react';
import { toast } from 'sonner';
import { useFilePicker } from 'use-file-picker';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  useOpenState,
} from './dropdown-menu';
import { FloatingInput } from './input';
import {
  ToolbarSplitButton,
  ToolbarSplitButtonPrimary,
  ToolbarSplitButtonSecondary,
} from './toolbar';

const MEDIA_CONFIG: Record<
  string,
  {
    accept: string[];
    icon: React.ReactNode;
    title: string;
    tooltip: string;
  }
> = {
  [ImagePlugin.key]: {
    accept: ['image/*'],
    icon: <ImageIcon className='size-4' />,
    title: '이미지 삽입',
    tooltip: '이미지',
  },
  [VideoPlugin.key]: {
    accept: ['video/*'],
    icon: <FilmIcon className='size-4' />,
    title: '비디오 삽입',
    tooltip: '비디오',
  },
};

export function MediaToolbarButton({
  children,
  nodeType,
  ...props
}: DropdownMenuProps & { nodeType: string }) {
  const currentConfig = MEDIA_CONFIG[nodeType];

  const editor = useEditorRef();
  const openState = useOpenState();
  const [dialogOpen, setDialogOpen] = useState(false);

  const { openFilePicker } = useFilePicker({
    accept: currentConfig.accept,
    multiple: true,
    onFilesSelected: ({ plainFiles: updatedFiles }) => {
      updatedFiles.map((file : File) => {
      const url = URL.createObjectURL(file);
      console.log(url);
      insertNodes(editor, {
        children: [{ text: '' }],
        name: nodeType === FilePlugin.key ? url.split('/').pop() : undefined,
        type: nodeType,
        url,
      });
        
      })
    },
  });

  return (
    <>
      <ToolbarSplitButton
        onClick={() => {
          openFilePicker();
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            openState.onOpenChange(true);
          }
        }}
        pressed={openState.open}
        tooltip={currentConfig.tooltip}
      >
        <ToolbarSplitButtonPrimary>
          {currentConfig.icon}
        </ToolbarSplitButtonPrimary>

        <DropdownMenu {...openState} modal={false} {...props}>
          <DropdownMenuTrigger asChild>
            <ToolbarSplitButtonSecondary />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            onClick={(e) => e.stopPropagation()}
            align='start'
            alignOffset={-32}
          >
            <DropdownMenuGroup>
              <DropdownMenuItem onSelect={() => openFilePicker()}>
                {currentConfig.icon}
                내 컴퓨터에서 업로드
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setDialogOpen(true)}>
                <LinkIcon />
                URL로 삽입
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ToolbarSplitButton>

      <AlertDialog
        open={dialogOpen}
        onOpenChange={(value) => {
          setDialogOpen(value);
        }}
      >
        <AlertDialogContent className='gap-6'>
          <MediaUrlDialogContent
            currentConfig={currentConfig}
            nodeType={nodeType}
            setOpen={setDialogOpen}
          />
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function MediaUrlDialogContent({
  currentConfig,
  nodeType,
  setOpen,
}: {
  currentConfig: (typeof MEDIA_CONFIG)[string];
  nodeType: string;
  setOpen: (value: boolean) => void;
}) {
  const editor = useEditorRef();
  const [url, setUrl] = useState('');

  const embedMedia = useCallback(() => {
    if (!isUrl(url)) return toast.error('Invalid URL');
    setOpen(false);
    insertNodes(editor, {
      children: [{ text: '' }],
      name: nodeType === FilePlugin.key ? url.split('/').pop() : undefined,
      type: nodeType,
      url,
    });
  }, [url, editor, nodeType, setOpen]);

  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>{currentConfig.title}</AlertDialogTitle>
      </AlertDialogHeader>

      <AlertDialogDescription className='group relative w-full'>
        <FloatingInput
          id='url'
          className='w-full'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') embedMedia();
          }}
          label='URL'
          placeholder=''
          type='url'
          autoFocus
        />
      </AlertDialogDescription>

      <AlertDialogFooter>
        <AlertDialogCancel>취소</AlertDialogCancel>
        <AlertDialogAction
          onClick={(e) => {
            e.preventDefault();
            embedMedia();
          }}
        >
          확인
        </AlertDialogAction>
      </AlertDialogFooter>
    </>
  );
}
