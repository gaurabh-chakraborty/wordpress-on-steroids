import { Grid, Monitor, Briefcase, Camera, FileText, ShoppingCart, Mail } from 'lucide-react';
import { Category, Type } from './types';

export const categories: Category[] = [
  { id: 'all', label: 'All Categories', icon: Grid },
  { id: 'landing', label: 'Landing Pages', icon: Monitor },
  { id: 'business', label: 'Business', icon: Briefcase },
  { id: 'portfolio', label: 'Portfolio', icon: Camera },
  { id: 'blog', label: 'Blog', icon: FileText },
  { id: 'ecommerce', label: 'E-commerce', icon: ShoppingCart },
  { id: 'contact', label: 'Contact', icon: Mail }
];

export const types: Type[] = [
  { id: 'all', label: 'All Types' },
  { id: 'full-page', label: 'Full Pages' },
  { id: 'section', label: 'Sections' },
  { id: 'component', label: 'Components' }
];