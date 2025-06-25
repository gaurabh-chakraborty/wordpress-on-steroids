
import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Package, 
  Users, 
  CreditCard, 
  Settings, 
  TrendingUp,
  Tag,
  Truck,
  FileText,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export const WooCommercePlugin = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    enableCart: true,
    enableWishlist: false,
    enableReviews: true,
    enableCoupons: true,
    enableInventory: true,
    enableShipping: true,
    enableTax: false,
    currency: 'USD',
    paymentGateways: {
      stripe: false,
      paypal: false,
      cashOnDelivery: true
    },
    shippingMethods: {
      flatRate: true,
      freeShipping: false,
      localPickup: false
    }
  });

  const [stats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    lowStockProducts: 0
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleNestedSettingChange = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const saveSettings = () => {
    localStorage.setItem('woocommerce-settings', JSON.stringify(settings));
    toast({
      title: "Settings Saved",
      description: "WooCommerce settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">WooCommerce Settings</h3>
          <p className="text-gray-600">Configure your e-commerce store settings</p>
        </div>
        <Button onClick={saveSettings}>
          Save Settings
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Products</p>
                <p className="text-xl font-bold">{stats.totalProducts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Orders</p>
                <p className="text-xl font-bold">{stats.totalOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-6 h-6 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="text-xl font-bold">${stats.totalRevenue}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-6 h-6 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-xl font-bold">{stats.pendingOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-6 h-6 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Low Stock</p>
                <p className="text-xl font-bold">{stats.lowStockProducts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Store Currency</Label>
                  <Select 
                    value={settings.currency} 
                    onValueChange={(value) => handleSettingChange('currency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Shopping Cart</Label>
                    <p className="text-sm text-gray-600">Allow customers to add products to cart</p>
                  </div>
                  <Switch 
                    checked={settings.enableCart}
                    onCheckedChange={(checked) => handleSettingChange('enableCart', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Inventory Management</Label>
                    <p className="text-sm text-gray-600">Track product stock levels</p>
                  </div>
                  <Switch 
                    checked={settings.enableInventory}
                    onCheckedChange={(checked) => handleSettingChange('enableInventory', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Tax Calculations</Label>
                    <p className="text-sm text-gray-600">Calculate taxes on orders</p>
                  </div>
                  <Switch 
                    checked={settings.enableTax}
                    onCheckedChange={(checked) => handleSettingChange('enableTax', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Gateways</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-5 h-5" />
                    <div>
                      <Label>Stripe</Label>
                      <p className="text-sm text-gray-600">Accept credit card payments</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">Pro</Badge>
                    <Switch 
                      checked={settings.paymentGateways.stripe}
                      onCheckedChange={(checked) => handleNestedSettingChange('paymentGateways', 'stripe', checked)}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-5 h-5" />
                    <div>
                      <Label>PayPal</Label>
                      <p className="text-sm text-gray-600">Accept PayPal payments</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">Pro</Badge>
                    <Switch 
                      checked={settings.paymentGateways.paypal}
                      onCheckedChange={(checked) => handleNestedSettingChange('paymentGateways', 'paypal', checked)}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5" />
                    <div>
                      <Label>Cash on Delivery</Label>
                      <p className="text-sm text-gray-600">Accept cash payments on delivery</p>
                    </div>
                  </div>
                  <Switch 
                    checked={settings.paymentGateways.cashOnDelivery}
                    onCheckedChange={(checked) => handleNestedSettingChange('paymentGateways', 'cashOnDelivery', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Truck className="w-5 h-5" />
                    <div>
                      <Label>Flat Rate Shipping</Label>
                      <p className="text-sm text-gray-600">Fixed shipping cost for all orders</p>
                    </div>
                  </div>
                  <Switch 
                    checked={settings.shippingMethods.flatRate}
                    onCheckedChange={(checked) => handleNestedSettingChange('shippingMethods', 'flatRate', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Package className="w-5 h-5" />
                    <div>
                      <Label>Free Shipping</Label>
                      <p className="text-sm text-gray-600">Free shipping over certain amount</p>
                    </div>
                  </div>
                  <Switch 
                    checked={settings.shippingMethods.freeShipping}
                    onCheckedChange={(checked) => handleNestedSettingChange('shippingMethods', 'freeShipping', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5" />
                    <div>
                      <Label>Local Pickup</Label>
                      <p className="text-sm text-gray-600">Allow customers to pickup orders</p>
                    </div>
                  </div>
                  <Switch 
                    checked={settings.shippingMethods.localPickup}
                    onCheckedChange={(checked) => handleNestedSettingChange('shippingMethods', 'localPickup', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Store Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Product Reviews</Label>
                    <p className="text-sm text-gray-600">Allow customers to review products</p>
                  </div>
                  <Switch 
                    checked={settings.enableReviews}
                    onCheckedChange={(checked) => handleSettingChange('enableReviews', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Wishlist</Label>
                    <p className="text-sm text-gray-600">Allow customers to save favorite products</p>
                  </div>
                  <Switch 
                    checked={settings.enableWishlist}
                    onCheckedChange={(checked) => handleSettingChange('enableWishlist', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Discount Coupons</Label>
                    <p className="text-sm text-gray-600">Enable coupon codes for discounts</p>
                  </div>
                  <Switch 
                    checked={settings.enableCoupons}
                    onCheckedChange={(checked) => handleSettingChange('enableCoupons', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Shipping Calculations</Label>
                    <p className="text-sm text-gray-600">Calculate shipping costs</p>
                  </div>
                  <Switch 
                    checked={settings.enableShipping}
                    onCheckedChange={(checked) => handleSettingChange('enableShipping', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
              <Package className="w-6 h-6 mb-2" />
              <span>Add Product</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
              <Tag className="w-6 h-6 mb-2" />
              <span>Create Coupon</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
              <ShoppingCart className="w-6 h-6 mb-2" />
              <span>View Orders</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
              <BarChart3 className="w-6 h-6 mb-2" />
              <span>Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
