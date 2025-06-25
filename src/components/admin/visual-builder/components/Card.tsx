
import React from 'react';
import { Card as UICard, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CustomCardProps {
  title?: string;
  content?: string;
  buttonText?: string;
  imageUrl?: string;
  styles?: React.CSSProperties;
}

export const CustomCard: React.FC<CustomCardProps> = ({
  title = "Card Title",
  content = "This is the card content. You can customize this text to fit your needs.",
  buttonText = "Learn More",
  imageUrl,
  styles = {}
}) => {
  return (
    <UICard className="w-full h-full" style={styles}>
      {imageUrl && (
        <div className="w-full h-48 overflow-hidden rounded-t-lg">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600">{content}</p>
        <Button variant="outline" className="w-full">
          {buttonText}
        </Button>
      </CardContent>
    </UICard>
  );
};
