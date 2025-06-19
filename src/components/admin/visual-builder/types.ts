
export interface ElementStyle {
  width?: string;
  height?: string;
  backgroundColor?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  padding?: string;
  margin?: string;
  borderRadius?: string;
  border?: string;
  borderLeft?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;
  opacity?: number;
  transform?: string;
  boxShadow?: string;
  zIndex?: number;
  textDecoration?: string;
  fontFamily?: string;
  lineHeight?: string;
  letterSpacing?: string;
  cursor?: string;
  fontStyle?: string;
}

export interface Element {
  id: string;
  type: 'text' | 'image' | 'button' | 'container' | 'video' | 'divider' | 'spacer' | 'column' | 'heading' | 'list' | 'quote' | 'icon' | 'link';
  content: string;
  styles: ElementStyle;
  position: { x: number; y: number };
  size: { width: number; height: number };
  children?: Element[];
  link?: string;
  alt?: string;
  listItems?: string[];
}

export interface ResizeHandle {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top' | 'bottom' | 'left' | 'right';
  cursor: string;
}
