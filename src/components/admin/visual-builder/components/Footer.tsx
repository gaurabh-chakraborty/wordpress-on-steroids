
import React from 'react';

interface FooterProps {
  companyName?: string;
  links?: string[];
  styles?: React.CSSProperties;
}

export const Footer: React.FC<FooterProps> = ({
  companyName = "Your Company",
  links = ["About", "Services", "Contact", "Privacy"],
  styles = {}
}) => {
  return (
    <footer 
      className="w-full bg-gray-800 text-white py-12 px-6"
      style={styles}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">{companyName}</h3>
            <p className="text-gray-300 mb-4">
              Building amazing experiences for our customers with innovative solutions and exceptional service.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {links.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="text-gray-300 space-y-2">
              <p>email@company.com</p>
              <p>+1 (555) 123-4567</p>
              <p>123 Main St, City, State</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 {companyName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
