
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface ImageSliderProps {
  images?: string[];
  autoPlay?: boolean;
  styles?: React.CSSProperties;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({
  images = [
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'
  ],
  styles = {}
}) => {
  return (
    <div className="w-full h-full relative" style={styles}>
      <Carousel className="w-full h-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="w-full h-full">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
};
