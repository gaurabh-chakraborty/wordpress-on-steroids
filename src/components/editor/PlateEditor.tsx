
import React from 'react';
import { 
  Plate, 
  PlateProvider,
  createPlugins
} from '@udecode/plate-common';
import { createParagraphPlugin } from '@udecode/plate-paragraph';
import { BaseBoldPlugin, BaseItalicPlugin, BaseUnderlinePlugin } from '@udecode/plate-basic-marks';
import { BaseListPlugin } from '@udecode/plate-list';
import { BaseLinkPlugin } from '@udecode/plate-link';
import { Card } from '@/components/ui/card';

interface PlateEditorProps {
  value?: any[];
  onChange?: (value: any[]) => void;
  placeholder?: string;
}

const plugins = createPlugins([
  createParagraphPlugin(),
  BaseBoldPlugin,
  BaseItalicPlugin,
  BaseUnderlinePlugin,
  BaseListPlugin,
  BaseLinkPlugin,
]);

export const PlateEditor: React.FC<PlateEditorProps> = ({
  value = [{ type: 'p', children: [{ text: '' }] }],
  onChange,
  placeholder = 'Start typing...'
}) => {
  return (
    <Card className="p-4">
      <PlateProvider plugins={plugins} value={value} onChange={onChange}>
        <Plate
          editableProps={{
            placeholder,
            className: 'min-h-[200px] p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
          }}
        />
      </PlateProvider>
    </Card>
  );
};
