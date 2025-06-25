
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

interface NavigationProps {
  logo?: string;
  menuItems?: string[];
  styles?: React.CSSProperties;
}

export const Navigation: React.FC<NavigationProps> = ({
  logo = "Logo",
  menuItems = ["Home", "About", "Services", "Contact"],
  styles = {}
}) => {
  return (
    <nav 
      className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-md"
      style={styles}
    >
      <div className="text-2xl font-bold text-gray-800">
        {logo}
      </div>
      
      <div className="hidden md:flex space-x-8">
        {menuItems.map((item, index) => (
          <a 
            key={index} 
            href="#" 
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            {item}
          </a>
        ))}
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" className="hidden md:block">Sign In</Button>
        <Button className="hidden md:block">Sign Up</Button>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </div>
    </nav>
  );
};
