
import React from 'react';
import { 
  Plate, 
  PlateProvider,
  createPlugins
} from '@udecode/plate-common';
import { createParagraphPlugin } from '@udecode/plate-paragraph';
import { createBoldPlugin, createItalicPlugin, createUnderlinePlugin } from '@udecode/plate-basic-marks';
import { createListPlugin } from '@udecode/plate-list';
import { createLinkPlugin } from '@udecode/plate-link';
import { Card } from '@/components/ui/card';

interface PlateEditorProps {
  value?: any[];
  onChange?: (value: any[]) => void;
  placeholder?: string;
}

const plugins = createPlugins([
  createParagraphPlugin(),
  createBoldPlugin(),
  createItalicPlugin(),
  createUnderlinePlugin(),
  createListPlugin(),
  createLinkPlugin(),
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
