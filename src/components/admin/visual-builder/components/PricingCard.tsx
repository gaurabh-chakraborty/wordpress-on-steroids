
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface PricingCardProps {
  title?: string;
  price?: string;
  period?: string;
  features?: string[];
  buttonText?: string;
  popular?: boolean;
  styles?: React.CSSProperties;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  title = "Basic Plan",
  price = "$9",
  period = "month",
  features = ["Feature 1", "Feature 2", "Feature 3", "Email Support"],
  buttonText = "Get Started",
  popular = false,
  styles = {}
}) => {
  return (
    <Card 
      className={`w-full h-full relative ${popular ? 'border-blue-500 border-2' : ''}`}
      style={styles}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}
      
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <div className="mt-4">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-gray-600">/{period}</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          className={`w-full ${popular ? 'bg-blue-500' : ''}`}
          variant={popular ? 'default' : 'outline'}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};
