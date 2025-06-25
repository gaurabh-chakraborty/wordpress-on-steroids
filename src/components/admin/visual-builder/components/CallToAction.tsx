
import React from 'react';
import { Button } from '@/components/ui/button';

interface CallToActionProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  styles?: React.CSSProperties;
}

export const CallToAction: React.FC<CallToActionProps> = ({
  title = "Ready to Get Started?",
  subtitle = "Join thousands of satisfied customers and transform your business today.",
  primaryButtonText = "Start Free Trial",
  secondaryButtonText = "Learn More",
  styles = {}
}) => {
  return (
    <div 
      className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center text-center py-16 px-8"
      style={styles}
    >
      <div className="max-w-4xl">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
        <p className="text-xl mb-8 opacity-90">{subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            {primaryButtonText}
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
            {secondaryButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
};
