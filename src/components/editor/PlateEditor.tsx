
import React from 'react';
import { 
  Plate, 
  PlateProvider,
  createPlugins
} from '@udecode/plate-common';
import { ParagraphPlugin } from '@udecode/plate-paragraph';
import { BoldPlugin, ItalicPlugin, UnderlinePlugin } from '@udecode/plate-basic-marks';
import { ListPlugin } from '@udecode/plate-list';
import { LinkPlugin } from '@udecode/plate-link';
import { Card } from '@/components/ui/card';

interface PlateEditorProps {
  value?: any[];
  onChange?: (value: any[]) => void;
  placeholder?: string;
}

const plugins = createPlugins([
  ParagraphPlugin,
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
  ListPlugin,
  LinkPlugin,
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
