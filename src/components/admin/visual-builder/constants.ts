
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
  Smartphone
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
  { type: 'heading', label: 'Heading', icon: Type },
  { type: 'text', label: 'Text', icon: Type },
  { type: 'image', label: 'Image', icon: Image },
  { type: 'button', label: 'Button', icon: Square },
  { type: 'link', label: 'Link', icon: Link },
  { type: 'container', label: 'Container', icon: Layout },
  { type: 'video', label: 'Video', icon: Video },
  { type: 'divider', label: 'Divider', icon: Grid3X3 },
  { type: 'spacer', label: 'Spacer', icon: Move },
  { type: 'column', label: 'Column', icon: Columns },
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
    type: 'heading',
    content: 'Welcome to Our Amazing Website',
    styles: { 
      fontSize: '48px', 
      fontWeight: 'bold', 
      color: '#1f2937',
      textAlign: 'center',
      padding: '20px',
      fontFamily: 'Roboto, sans-serif'
    },
    position: { x: 50, y: 50 },
    size: { width: 600, height: 80 }
  },
  {
    id: '2',
    type: 'text',
    content: 'Discover innovative solutions that transform your business and drive success in the digital age.',
    styles: { 
      fontSize: '18px', 
      color: '#6b7280',
      textAlign: 'center',
      padding: '15px',
      lineHeight: '1.6',
      fontFamily: 'Open Sans, sans-serif'
    },
    position: { x: 50, y: 150 },
    size: { width: 600, height: 60 }
  },
  {
    id: '3',
    type: 'button',
    content: 'Get Started Today',
    styles: { 
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      fontSize: '16px',
      fontWeight: '600',
      padding: '15px 30px',
      borderRadius: '8px',
      textAlign: 'center',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    position: { x: 300, y: 240 },
    size: { width: 200, height: 50 },
    link: 'https://example.com/signup'
  },
  {
    id: '4',
    type: 'image',
    content: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
    styles: { 
      borderRadius: '12px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
    },
    position: { x: 50, y: 320 },
    size: { width: 300, height: 200 },
    alt: 'Modern office workspace'
  }
];
