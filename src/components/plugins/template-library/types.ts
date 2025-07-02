export interface Template {
  id: string;
  name: string;
  category: 'landing' | 'business' | 'portfolio' | 'blog' | 'ecommerce' | 'contact';
  type: 'full-page' | 'section' | 'component';
  preview: string;
  elements: any[];
  tags: string[];
  isPro: boolean;
}

export interface Category {
  id: string;
  label: string;
  icon: any;
}

export interface Type {
  id: string;
  label: string;
}