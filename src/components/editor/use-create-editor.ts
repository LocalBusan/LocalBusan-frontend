'use client';

import { withProps } from '@udecode/cn';
import { BasicElementsPlugin } from '@udecode/plate-basic-elements/react';
import {
  FontBackgroundColorPlugin,
  FontColorPlugin,
} from '@udecode/plate-font/react';

import {
  BasicMarksPlugin,
  BoldPlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  UnderlinePlugin,
} from '@udecode/plate-basic-marks/react';
import {
  ParagraphPlugin,
  PlateElement,
  PlateLeaf,
  usePlateEditor,
} from '@udecode/plate-common/react';
import {MarkdownPlugin} from '@udecode/plate-markdown'
import { linkPlugin } from './plugins/link-plugin';
import { FilePlugin, ImagePlugin, MediaEmbedPlugin, PlaceholderPlugin, VideoPlugin } from '@udecode/plate-media/react';
import { LinkPlugin } from '@udecode/plate-link/react';
import { AlignPlugin } from '@udecode/plate-alignment/react';
import { TogglePlugin } from '@udecode/plate-toggle/react';
import { IndentListPlugin } from '@udecode/plate-indent-list/react';
import { MediaUploadToast } from '../plate-ui/media-upload-toast';
import { SelectOnBackspacePlugin } from '@udecode/plate-select';
import { ImageElement } from '../plate-ui/image-element';
import { CaptionPlugin } from '@udecode/plate-caption/react';
export const useCreateEditor = () => {
  return usePlateEditor({
    override: {
      components: {
        [BoldPlugin.key]: withProps(PlateLeaf, { as: 'strong' }),
        [ItalicPlugin.key]: withProps(PlateLeaf, { as: 'em' }),
        [ParagraphPlugin.key]: withProps(PlateElement, {
          as: 'p',
          className: 'mb-4',
        }),
        [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: 's' }),
        [UnderlinePlugin.key]: withProps(PlateLeaf, { as: 'u' }),
        blockquote: withProps(PlateElement, {
          as: 'blockquote',
          className: 'mb-4 border-l-4 border-[#d0d7de] pl-4 text-[#636c76]',
        }),
        h1: withProps(PlateElement, {
          as: 'h1',
          className:
            'mb-4 mt-6 text-3xl font-semibold tracking-tight lg:text-4xl',
        }),
        h2: withProps(PlateElement, {
          as: 'h2',
          className: 'mb-4 mt-6 text-2xl font-semibold tracking-tight',
        }),
        h3: withProps(PlateElement, {
          as: 'h3',
          className: 'mb-4 mt-6 text-xl font-semibold tracking-tight',
        }),
        [LinkPlugin.key]: withProps(PlateElement,{as:'a', className:'underline'}),
        [ImagePlugin.key] : ImageElement,
      },

    },
    plugins: [BasicElementsPlugin, BasicMarksPlugin ,
       linkPlugin,FontBackgroundColorPlugin, FontColorPlugin, 
        MediaEmbedPlugin, VideoPlugin, ImagePlugin,AlignPlugin,TogglePlugin, IndentListPlugin,FilePlugin,CaptionPlugin, MarkdownPlugin
        ,PlaceholderPlugin.configure({
          options: { disableEmptyPlaceholder: true },
          render: { afterEditable: MediaUploadToast },
        }),
        SelectOnBackspacePlugin.configure({
          options: {
            query: {
              allow: [ImagePlugin.key, VideoPlugin.key, FilePlugin.key, MediaEmbedPlugin.key],
            },
          },
        }),

      ],
    value: [
    ],
  });
};
