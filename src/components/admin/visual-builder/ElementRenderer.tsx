import React from 'react';
import { Star } from 'lucide-react';
import { Element } from './types';
import { HeroSection } from './components/HeroSection';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { CustomCard } from './components/Card';
import { CallToAction } from './components/CallToAction';
import { Testimonial } from './components/Testimonial';
import { PricingCard } from './components/PricingCard';
import { ImageSlider } from './components/ImageSlider';

interface ElementRendererProps {
  element: Element;
}

export const ElementRenderer: React.FC<ElementRendererProps> = ({ element }) => {
  const parseContent = (content: string) => {
    try {
      return JSON.parse(content);
    } catch {
      return {};
    }
  };

  const baseStyles = {
    transition: 'all 0.2s ease-in-out',
    ...element.styles
  };

  switch (element.type) {
    case 'hero':
      const heroProps = parseContent(element.content);
      return <HeroSection {...heroProps} styles={baseStyles} />;
    
    case 'navigation':
      const navProps = parseContent(element.content);
      return <Navigation {...navProps} styles={baseStyles} />;
    
    case 'footer':
      const footerProps = parseContent(element.content);
      return <Footer {...footerProps} styles={baseStyles} />;
    
    case 'card':
      const cardProps = parseContent(element.content);
      return <CustomCard {...cardProps} styles={baseStyles} />;
    
    case 'cta':
      const ctaProps = parseContent(element.content);
      return <CallToAction {...ctaProps} styles={baseStyles} />;
    
    case 'testimonial':
      const testimonialProps = parseContent(element.content);
      return <Testimonial {...testimonialProps} styles={baseStyles} />;
    
    case 'pricing':
      const pricingProps = parseContent(element.content);
      return <PricingCard {...pricingProps} styles={baseStyles} />;
    
    case 'slider':
      const sliderProps = parseContent(element.content);
      return <ImageSlider {...sliderProps} styles={baseStyles} />;

    // Enhanced plugin-integrated elements
    case 'newsletter-form':
      return (
        <div style={{ ...baseStyles, width: '100%', height: '100%' }} className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Subscribe to our Newsletter</h3>
          <div className="flex space-x-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-3 py-2 border rounded-md"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      );

    case 'chat-widget':
      return (
        <div style={{ ...baseStyles, width: '100%', height: '100%' }} className="bg-blue-600 text-white p-4 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-sm">We're online</span>
          </div>
          <p className="text-sm mb-3">Hi! How can we help you today?</p>
          <button className="w-full text-left text-sm bg-white/10 rounded p-2 hover:bg-white/20 transition-colors">
            Start a conversation...
          </button>
        </div>
      );

    case 'user-profile':
      return (
        <div style={{ ...baseStyles, width: '100%', height: '100%' }} className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-lg font-semibold">JD</span>
            </div>
            <div>
              <h4 className="font-medium">John Doe</h4>
              <p className="text-sm text-gray-600">Premium Member</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Account Status:</span>
              <span className="text-green-600">Active</span>
            </div>
            <div className="flex justify-between">
              <span>Member Since:</span>
              <span>Jan 2024</span>
            </div>
          </div>
        </div>
      );

    case 'text':
      return (
        <div style={{ ...baseStyles, width: '100%', height: '100%', overflow: 'hidden' }}>
          {element.content}
        </div>
      );
    
    case 'heading':
      return (
        <h1 style={{ ...baseStyles, width: '100%', height: '100%', margin: 0, overflow: 'hidden' }}>
          {element.content}
        </h1>
      );
    
    case 'button':
      return (
        <button 
          className="w-full h-full rounded transition-all duration-200 hover:opacity-90 hover:transform hover:scale-105"
          style={baseStyles}
          onClick={(e) => {
            e.preventDefault();
            if (element.link) {
              window.open(element.link, '_blank');
            }
          }}
        >
          {element.content}
        </button>
      );
    
    case 'link':
      return (
        <a 
          href={element.link || '#'}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...baseStyles, textDecoration: 'underline' }}
          onClick={(e) => e.preventDefault()}
        >
          {element.content}
        </a>
      );
    
    case 'image':
      return (
        <img
          src={element.content || 'https://via.placeholder.com/300x200'}
          alt={element.alt || 'Image'}
          className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
          style={baseStyles}
        />
      );
    
    case 'container':
      return (
        <div 
          className="w-full h-full border-2 border-dashed border-gray-300 transition-all duration-200 hover:border-blue-400"
          style={baseStyles}
        >
          <div className="flex items-center justify-center h-full text-gray-500">
            Container
          </div>
        </div>
      );

    case 'video':
      return (
        <iframe
          src={element.content}
          className="w-full h-full rounded-lg"
          style={baseStyles}
          frameBorder="0"
          allowFullScreen
        />
      );

    case 'quote':
      return (
        <blockquote style={{ ...baseStyles, width: '100%', height: '100%', margin: 0 }}>
          "{element.content}"
        </blockquote>
      );

    case 'list':
      return (
        <ul style={{ ...baseStyles, width: '100%', height: '100%', margin: 0, padding: '20px' }}>
          {element.listItems?.map((item, index) => (
            <li key={index} style={{ marginBottom: '8px' }}>{item}</li>
          ))}
        </ul>
      );

    case 'divider':
      return (
        <hr 
          className="w-full border-gray-300"
          style={baseStyles}
        />
      );

    case 'spacer':
      return (
        <div 
          className="w-full bg-gray-100 border border-dashed border-gray-300"
          style={baseStyles}
        />
      );

    case 'icon':
      return (
        <div 
          className="flex items-center justify-center w-full h-full"
          style={baseStyles}
        >
          <Star className="w-8 h-8" />
        </div>
      );

    default:
      return (
        <div className="flex items-center justify-center w-full h-full border-2 border-dashed border-gray-300 text-gray-500">
          {element.type}
        </div>
      );
  }
};
