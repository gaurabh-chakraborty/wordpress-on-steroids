
import React from 'react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  backgroundImage?: string;
  styles?: React.CSSProperties;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Welcome to Our Platform",
  subtitle = "Create amazing experiences with our powerful tools and services",
  buttonText = "Get Started",
  backgroundImage,
  styles = {}
}) => {
  return (
    <div 
      className="w-full h-full flex items-center justify-center text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        ...styles
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative z-10 max-w-4xl px-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">{title}</h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">{subtitle}</p>
        <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
          {buttonText}
        </Button>
      </div>
    </div>
  );
};
