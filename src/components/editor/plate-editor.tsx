'use client';

import { Plate, PlateProps } from '@udecode/plate-common/react';

import { useCreateEditor } from '@/components/editor/use-create-editor';
import { Editor, EditorContainer } from '@/components/plate-ui/editor';
import { FixedToolbar } from '../plate-ui/fixed-toolbar';
import { FixedToolbarButtons } from '../plate-ui/fixed-toolbar-buttons';

export function PlateEditor({editor,onChange,...props}:PlateProps) {
  return (
    <Plate onChange={onChange} editor={editor}>
      <FixedToolbar>
        <FixedToolbarButtons/>
      </FixedToolbar>
      <EditorContainer>
        <Editor variant='demo' placeholder='글을 입력해주세요...' />
      </EditorContainer>
    </Plate>
  );
}
