
import React from 'react';
import { Card } from '@/components/ui/card';

interface PlateEditorProps {
  value?: any[];
  onChange?: (value: any[]) => void;
  placeholder?: string;
}

export const PlateEditor: React.FC<PlateEditorProps> = ({
  value = [{ type: 'p', children: [{ text: '' }] }],
  onChange,
  placeholder = 'Start typing...'
}) => {
  const [content, setContent] = React.useState('');

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    
    if (onChange) {
      onChange([{ type: 'p', children: [{ text: newContent }] }]);
    }
  };

  return (
    <Card className="p-4">
      <textarea
        value={content}
        onChange={handleContentChange}
        placeholder={placeholder}
        className="min-h-[200px] w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      />
    </Card>
  );
};
