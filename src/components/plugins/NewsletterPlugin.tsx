
import React, { useState } from 'react';
import { Mail, Users, BarChart3, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export const NewsletterPlugin = () => {
  const [subscribers, setSubscribers] = useState(1247);
  const [campaigns, setCampaigns] = useState([
    { id: '1', name: 'Welcome Series', status: 'active', subscribers: 856 },
    { id: '2', name: 'Product Updates', status: 'draft', subscribers: 1200 },
    { id: '3', name: 'Weekly Newsletter', status: 'scheduled', subscribers: 1247 }
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="w-5 h-5" />
            <span>Newsletter Management</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">{subscribers}</p>
                    <p className="text-sm text-gray-600">Total Subscribers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">24.5%</p>
                    <p className="text-sm text-gray-600">Open Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-sm text-gray-600">Active Campaigns</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="campaigns" className="w-full">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
              <TabsTrigger value="forms">Signup Forms</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="campaigns" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Email Campaigns</h3>
                <Button>Create Campaign</Button>
              </div>

              <div className="space-y-3">
                {campaigns.map((campaign) => (
                  <Card key={campaign.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{campaign.name}</h4>
                          <p className="text-sm text-gray-600">{campaign.subscribers} subscribers</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={
                            campaign.status === 'active' ? 'default' :
                            campaign.status === 'scheduled' ? 'secondary' : 'outline'
                          }>
                            {campaign.status}
                          </Badge>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="forms" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Signup Form Builder</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Form Style</Label>
                    <Select defaultValue="inline">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inline">Inline Form</SelectItem>
                        <SelectItem value="popup">Popup Modal</SelectItem>
                        <SelectItem value="sidebar">Sidebar Widget</SelectItem>
                        <SelectItem value="footer">Footer Bar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Button Color</Label>
                    <Input type="color" defaultValue="#3b82f6" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="form-title">Form Title</Label>
                  <Input id="form-title" defaultValue="Subscribe to our newsletter" />
                </div>

                <div>
                  <Label htmlFor="form-description">Description</Label>
                  <Textarea id="form-description" defaultValue="Get the latest updates and news delivered to your inbox." />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="double-optin" />
                    <Label htmlFor="double-optin">Enable Double Opt-in</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="gdpr-compliance" />
                    <Label htmlFor="gdpr-compliance">GDPR Compliance Checkbox</Label>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="templates" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Email Templates</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {['Welcome', 'Newsletter', 'Product Update', 'Event Invitation'].map((template) => (
                    <Card key={template} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="h-32 bg-gray-100 rounded mb-3 flex items-center justify-center">
                          <Mail className="w-8 h-8 text-gray-400" />
                        </div>
                        <h4 className="font-medium">{template}</h4>
                        <p className="text-sm text-gray-600">Professional template</p>
                        <Button variant="outline" size="sm" className="w-full mt-2">Use Template</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Newsletter Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sender-name">Sender Name</Label>
                    <Input id="sender-name" defaultValue="Your Company" />
                  </div>
                  <div>
                    <Label htmlFor="sender-email">Sender Email</Label>
                    <Input id="sender-email" type="email" defaultValue="newsletter@yourcompany.com" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="reply-to">Reply-To Email</Label>
                  <Input id="reply-to" type="email" defaultValue="support@yourcompany.com" />
                </div>

                <div className="space-y-2">
                  <Label>Email Service Provider</Label>
                  <Select defaultValue="mailchimp">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mailchimp">Mailchimp</SelectItem>
                      <SelectItem value="sendgrid">SendGrid</SelectItem>
                      <SelectItem value="convertkit">ConvertKit</SelectItem>
                      <SelectItem value="mailgun">Mailgun</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
