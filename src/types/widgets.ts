
export interface Widget {
  id: string;
  type: string;
  title: string;
  content: any;
  position: string;
  order: number;
  isActive: boolean;
  settings: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface WidgetType {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  defaultContent: any;
  settingsSchema: WidgetSetting[];
}

export interface WidgetSetting {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'boolean' | 'select' | 'color' | 'image';
  defaultValue: any;
  options?: Array<{ value: any; label: string }>;
  required?: boolean;
  description?: string;
}

export interface MenuWidget extends Widget {
  content: {
    items: MenuItem[];
    style: 'horizontal' | 'vertical' | 'dropdown';
    theme: 'light' | 'dark';
  };
}

export interface MenuItem {
  id: string;
  label: string;
  url: string;
  type: 'custom' | 'page' | 'post' | 'category';
  target: '_self' | '_blank';
  children?: MenuItem[];
  order: number;
  isActive: boolean;
}
