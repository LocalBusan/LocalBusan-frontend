'use client';

import { Plate } from '@udecode/plate-common/react';

import { useCreateEditor } from '@/components/editor/use-create-editor';
import { Editor, EditorContainer } from '@/components/plate-ui/editor';
import { FixedToolbar } from '../plate-ui/fixed-toolbar';
import { FixedToolbarButtons } from '../plate-ui/fixed-toolbar-buttons';

export function PlateEditor() {
  const editor = useCreateEditor();

  return (
    <Plate editor={editor}>
      <FixedToolbar>
        <FixedToolbarButtons/>
      </FixedToolbar>
      <EditorContainer>
        <Editor variant='demo' placeholder='Type...' />
      </EditorContainer>
    </Plate>
  );
}
