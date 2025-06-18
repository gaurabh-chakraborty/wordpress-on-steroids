
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  sku: string;
  stock: number;
  category: string;
  tags: string[];
  images: string[];
  status: 'active' | 'inactive' | 'draft';
  type: 'simple' | 'variable';
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  attributes?: ProductAttribute[];
  variants?: ProductVariant[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductAttribute {
  id: string;
  name: string;
  values: string[];
  variation: boolean;
  visible: boolean;
}

export interface ProductVariant {
  id: string;
  attributes: Record<string, string>;
  price: number;
  salePrice?: number;
  sku: string;
  stock: number;
  image?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerEmail: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  billingAddress: Address;
  shippingAddress: Address;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  variantId?: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export interface Address {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  billingAddress?: Address;
  shippingAddress?: Address;
  orders: string[];
  totalSpent: number;
  createdAt: string;
  lastOrderAt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parent?: string;
  count: number;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'fixed' | 'percentage';
  amount: number;
  description?: string;
  minAmount?: number;
  maxAmount?: number;
  usageLimit?: number;
  usedCount: number;
  expiryDate?: string;
  isActive: boolean;
  createdAt: string;
}
