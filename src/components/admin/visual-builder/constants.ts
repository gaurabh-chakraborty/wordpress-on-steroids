
import { 
  Type, 
  Image, 
  Square, 
  Layout, 
  Video, 
  Grid3X3, 
  Move, 
  Columns, 
  List, 
  Quote, 
  Star, 
  Link,
  Monitor,
  Tablet,
  Smartphone,
  Menu,
  Home,
  CreditCard,
  MessageSquare,
  Phone,
  Play,
  Users
} from 'lucide-react';
import { Element, ResizeHandle } from './types';

export const resizeHandles: ResizeHandle[] = [
  { position: 'top-left', cursor: 'nw-resize' },
  { position: 'top-right', cursor: 'ne-resize' },
  { position: 'bottom-left', cursor: 'sw-resize' },
  { position: 'bottom-right', cursor: 'se-resize' },
  { position: 'top', cursor: 'n-resize' },
  { position: 'bottom', cursor: 's-resize' },
  { position: 'left', cursor: 'w-resize' },
  { position: 'right', cursor: 'e-resize' }
];

export const mockImages = [
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'
];

export const fontFamilies = [
  'Arial, sans-serif',
  'Georgia, serif',
  'Times New Roman, serif',
  'Helvetica, sans-serif',
  'Verdana, sans-serif',
  'Roboto, sans-serif',
  'Open Sans, sans-serif',
  'Lato, sans-serif'
];

export const elementTypes = [
  // Basic Elements
  { type: 'heading', label: 'Heading', icon: Type },
  { type: 'text', label: 'Text', icon: Type },
  { type: 'image', label: 'Image', icon: Image },
  { type: 'button', label: 'Button', icon: Square },
  { type: 'link', label: 'Link', icon: Link },
  
  // Layout Elements
  { type: 'container', label: 'Container', icon: Layout },
  { type: 'divider', label: 'Divider', icon: Grid3X3 },
  { type: 'spacer', label: 'Spacer', icon: Move },
  { type: 'column', label: 'Column', icon: Columns },
  
  // Website Components
  { type: 'hero', label: 'Hero Section', icon: Home },
  { type: 'navigation', label: 'Navigation', icon: Menu },
  { type: 'footer', label: 'Footer', icon: Layout },
  { type: 'card', label: 'Card', icon: Square },
  { type: 'cta', label: 'Call to Action', icon: Phone },
  { type: 'testimonial', label: 'Testimonial', icon: MessageSquare },
  { type: 'pricing', label: 'Pricing Card', icon: CreditCard },
  { type: 'slider', label: 'Image Slider', icon: Play },
  
  // Content Elements
  { type: 'video', label: 'Video', icon: Video },
  { type: 'list', label: 'List', icon: List },
  { type: 'quote', label: 'Quote', icon: Quote },
  { type: 'icon', label: 'Icon', icon: Star }
];

export const viewportSizes = [
  { key: 'desktop', label: 'Desktop', icon: Monitor },
  { key: 'tablet', label: 'Tablet', icon: Tablet },
  { key: 'mobile', label: 'Mobile', icon: Smartphone }
];

export const defaultElements: Element[] = [
  {
    id: '1',
    type: 'hero',
    content: JSON.stringify({
      title: 'Welcome to Our Amazing Platform',
      subtitle: 'Create, build, and grow your business with our powerful tools',
      buttonText: 'Get Started Today'
    }),
    styles: {},
    position: { x: 0, y: 0 },
    size: { width: 800, height: 400 }
  },
  {
    id: '2',
    type: 'navigation',
    content: JSON.stringify({
      logo: 'Your Brand',
      menuItems: ['Home', 'About', 'Services', 'Contact']
    }),
    styles: {},
    position: { x: 0, y: 0 },
    size: { width: 800, height: 80 }
  }
];
