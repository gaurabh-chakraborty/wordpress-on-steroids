
import React, { useState } from 'react';
import { User, Settings, Shield, CreditCard, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export const UserAccountPlugin = () => {
  const [userStats, setUserStats] = useState({
    totalUsers: 2451,
    activeUsers: 1834,
    newUsers: 127,
    premiumUsers: 456
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>User Account Management</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">{userStats.totalUsers}</p>
                    <p className="text-sm text-gray-600">Total Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">{userStats.activeUsers}</p>
                    <p className="text-sm text-gray-600">Active Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-2xl font-bold">{userStats.newUsers}</p>
                    <p className="text-sm text-gray-600">New This Month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-2xl font-bold">{userStats.premiumUsers}</p>
                    <p className="text-sm text-gray-600">Premium Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="authentication">Auth</TabsTrigger>
              <TabsTrigger value="subscriptions">Billing</TabsTrigger>
              <TabsTrigger value="permissions">Roles</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">User Profile Configuration</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="profile-photos" defaultChecked />
                    <Label htmlFor="profile-photos">Enable Profile Photos</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="public-profiles" />
                    <Label htmlFor="public-profiles">Public User Profiles</Label>
                  </div>

                  <Separator />

                  <div>
                    <Label>Required Profile Fields</Label>
                    <div className="mt-2 space-y-2">
                      {['First Name', 'Last Name', 'Email', 'Phone', 'Address', 'Company'].map((field) => (
                        <div key={field} className="flex items-center space-x-2">
                          <Switch id={`field-${field.toLowerCase()}`} defaultChecked={['First Name', 'Email'].includes(field)} />
                          <Label htmlFor={`field-${field.toLowerCase()}`}>{field}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label htmlFor="profile-completion">Profile Completion Rewards</Label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="completion-rewards" />
                        <Label htmlFor="completion-rewards">Enable Completion Rewards</Label>
                      </div>
                      <Input placeholder="Reward points for complete profile" />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="authentication" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Authentication Settings</h3>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Login Methods</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="email-login" defaultChecked />
                        <Label htmlFor="email-login">Email & Password</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="social-google" />
                        <Label htmlFor="social-google">Google OAuth</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="social-facebook" />
                        <Label htmlFor="social-facebook">Facebook Login</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="social-github" />
                        <Label htmlFor="social-github">GitHub OAuth</Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Password Requirements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="min-length">Minimum Length</Label>
                        <Select defaultValue="8">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="6">6 characters</SelectItem>
                            <SelectItem value="8">8 characters</SelectItem>
                            <SelectItem value="10">10 characters</SelectItem>
                            <SelectItem value="12">12 characters</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="complexity">Complexity</Label>
                        <Select defaultValue="medium">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Letters only</SelectItem>
                            <SelectItem value="medium">Letters + Numbers</SelectItem>
                            <SelectItem value="high">Letters + Numbers + Symbols</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="two-factor" />
                        <Label htmlFor="two-factor">Enable Two-Factor Authentication</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="email-verification" defaultChecked />
                        <Label htmlFor="email-verification">Require Email Verification</Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="subscriptions" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Subscription & Billing</h3>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Subscription Plans</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {[
                        { name: 'Free', price: '$0', features: 'Basic features' },
                        { name: 'Pro', price: '$19', features: 'Advanced features' },
                        { name: 'Enterprise', price: '$99', features: 'All features' }
                      ].map((plan) => (
                        <div key={plan.name} className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <h4 className="font-medium">{plan.name}</h4>
                            <p className="text-sm text-gray-600">{plan.features}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{plan.price}/month</p>
                            <Button variant="outline" size="sm">Edit</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button>Add New Plan</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Payment Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Payment Processor</Label>
                      <Select defaultValue="stripe">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="stripe">Stripe</SelectItem>
                          <SelectItem value="paypal">PayPal</SelectItem>
                          <SelectItem value="square">Square</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="trial-period" />
                        <Label htmlFor="trial-period">Enable Free Trial</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="proration" defaultChecked />
                        <Label htmlFor="proration">Prorate Upgrades/Downgrades</Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="permissions" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">User Roles & Permissions</h3>
                
                <div className="space-y-3">
                  {[
                    { role: 'Administrator', users: 3, color: 'bg-red-500' },
                    { role: 'Editor', users: 12, color: 'bg-blue-500' },
                    { role: 'Author', users: 45, color: 'bg-green-500' },
                    { role: 'Subscriber', users: 2391, color: 'bg-gray-500' }
                  ].map((role) => (
                    <Card key={role.role}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${role.color}`}></div>
                            <div>
                              <h4 className="font-medium">{role.role}</h4>
                              <p className="text-sm text-gray-600">{role.users} users</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Edit Permissions</Button>
                            <Button variant="outline" size="sm">Manage Users</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Button>Create New Role</Button>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">General Settings</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="user-registration" defaultChecked />
                    <Label htmlFor="user-registration">Allow User Registration</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="admin-approval" />
                    <Label htmlFor="admin-approval">Require Admin Approval for New Users</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="user-deletion" />
                    <Label htmlFor="user-deletion">Allow Users to Delete Their Account</Label>
                  </div>

                  <Separator />

                  <div>
                    <Label htmlFor="default-role">Default Role for New Users</Label>
                    <Select defaultValue="subscriber">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="subscriber">Subscriber</SelectItem>
                        <SelectItem value="author">Author</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="session-timeout">Session Timeout (hours)</Label>
                    <Select defaultValue="24">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 hour</SelectItem>
                        <SelectItem value="8">8 hours</SelectItem>
                        <SelectItem value="24">24 hours</SelectItem>
                        <SelectItem value="168">1 week</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
