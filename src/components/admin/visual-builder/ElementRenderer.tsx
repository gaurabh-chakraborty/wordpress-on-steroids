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

  switch (element.type) {
    case 'hero':
      const heroProps = parseContent(element.content);
      return <HeroSection {...heroProps} styles={element.styles} />;
    
    case 'navigation':
      const navProps = parseContent(element.content);
      return <Navigation {...navProps} styles={element.styles} />;
    
    case 'footer':
      const footerProps = parseContent(element.content);
      return <Footer {...footerProps} styles={element.styles} />;
    
    case 'card':
      const cardProps = parseContent(element.content);
      return <CustomCard {...cardProps} styles={element.styles} />;
    
    case 'cta':
      const ctaProps = parseContent(element.content);
      return <CallToAction {...ctaProps} styles={element.styles} />;
    
    case 'testimonial':
      const testimonialProps = parseContent(element.content);
      return <Testimonial {...testimonialProps} styles={element.styles} />;
    
    case 'pricing':
      const pricingProps = parseContent(element.content);
      return <PricingCard {...pricingProps} styles={element.styles} />;
    
    case 'slider':
      const sliderProps = parseContent(element.content);
      return <ImageSlider {...sliderProps} styles={element.styles} />;

    case 'text':
      return (
        <div style={{ ...element.styles, width: '100%', height: '100%', overflow: 'hidden' }}>
          {element.content}
        </div>
      );
    
    case 'heading':
      return (
        <h1 style={{ ...element.styles, width: '100%', height: '100%', margin: 0, overflow: 'hidden' }}>
          {element.content}
        </h1>
      );
    
    case 'button':
      return (
        <button 
          className="w-full h-full rounded transition-colors hover:opacity-90"
          style={element.styles}
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
          style={{ ...element.styles, textDecoration: 'underline' }}
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
          className="w-full h-full object-cover"
          style={element.styles}
        />
      );
    
    case 'container':
      return (
        <div 
          className="w-full h-full border-2 border-dashed border-gray-300"
          style={element.styles}
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
          className="w-full h-full"
          style={element.styles}
          frameBorder="0"
          allowFullScreen
        />
      );

    case 'quote':
      return (
        <blockquote style={{ ...element.styles, width: '100%', height: '100%', margin: 0 }}>
          "{element.content}"
        </blockquote>
      );

    case 'list':
      return (
        <ul style={{ ...element.styles, width: '100%', height: '100%', margin: 0, padding: '20px' }}>
          {element.listItems?.map((item, index) => (
            <li key={index} style={{ marginBottom: '8px' }}>{item}</li>
          ))}
        </ul>
      );

    case 'divider':
      return (
        <hr 
          className="w-full border-gray-300"
          style={element.styles}
        />
      );

    case 'spacer':
      return (
        <div 
          className="w-full bg-gray-100 border border-dashed border-gray-300"
          style={element.styles}
        />
      );

    case 'icon':
      return (
        <div 
          className="flex items-center justify-center w-full h-full"
          style={element.styles}
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
