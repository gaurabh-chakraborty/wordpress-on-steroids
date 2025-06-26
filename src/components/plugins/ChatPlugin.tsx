
import React, { useState } from 'react';
import { MessageCircle, Users, Bot, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export const ChatPlugin = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [chatStats, setChatStats] = useState({
    activeChats: 12,
    totalMessages: 1847,
    responseTime: '2.5 min',
    satisfaction: '94%'
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5" />
            <span>Live Chat System</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">{chatStats.activeChats}</p>
                    <p className="text-sm text-gray-600">Active Chats</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">{chatStats.totalMessages}</p>
                    <p className="text-sm text-gray-600">Total Messages</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Bot className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-2xl font-bold">{chatStats.responseTime}</p>
                    <p className="text-sm text-gray-600">Avg Response</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-2xl font-bold">{chatStats.satisfaction}</p>
                    <p className="text-sm text-gray-600">Satisfaction</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="widget" className="w-full">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="widget">Chat Widget</TabsTrigger>
              <TabsTrigger value="automation">Automation</TabsTrigger>
              <TabsTrigger value="agents">Agents</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="widget" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Chat Widget Configuration</h3>
                  <div className="flex items-center space-x-2">
                    <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
                    <Label>Enable Chat Widget</Label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="widget-position">Widget Position</Label>
                    <Select defaultValue="bottom-right">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bottom-right">Bottom Right</SelectItem>
                        <SelectItem value="bottom-left">Bottom Left</SelectItem>
                        <SelectItem value="top-right">Top Right</SelectItem>
                        <SelectItem value="top-left">Top Left</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="widget-color">Primary Color</Label>
                    <Input id="widget-color" type="color" defaultValue="#3b82f6" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="welcome-message">Welcome Message</Label>
                  <Textarea 
                    id="welcome-message" 
                    defaultValue="Hi there! 👋 How can we help you today?"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="offline-message">Offline Message</Label>
                  <Textarea 
                    id="offline-message" 
                    defaultValue="We're currently offline. Leave us a message and we'll get back to you!"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="show-agent-photos" />
                    <Label htmlFor="show-agent-photos">Show Agent Photos</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="sound-notifications" />
                    <Label htmlFor="sound-notifications">Sound Notifications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="file-uploads" />
                    <Label htmlFor="file-uploads">Allow File Uploads</Label>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="automation" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Chat Automation & Bots</h3>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Auto-Response Rules</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="greeting-delay">Greeting Delay (seconds)</Label>
                      <Input id="greeting-delay" type="number" defaultValue="3" />
                    </div>

                    <div>
                      <Label htmlFor="auto-responses">Common Auto-Responses</Label>
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">"What are your hours?" → "We're open 9 AM - 6 PM EST"</span>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                        <div className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">"How can I contact support?" → "You can reach us at..."</span>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                    </div>

                    <Button>Add New Auto-Response</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">AI Chatbot Integration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="enable-ai" />
                      <Label htmlFor="enable-ai">Enable AI Assistant</Label>
                    </div>

                    <div>
                      <Label htmlFor="ai-provider">AI Provider</Label>
                      <Select defaultValue="openai">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="openai">OpenAI GPT</SelectItem>
                          <SelectItem value="anthropic">Anthropic Claude</SelectItem>
                          <SelectItem value="google">Google Bard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="ai-instructions">AI Instructions</Label>
                      <Textarea 
                        id="ai-instructions" 
                        placeholder="Provide instructions for how the AI should respond..."
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="agents" className="space-y-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Chat Agents</h3>
                  <Button>Add Agent</Button>
                </div>

                <div className="space-y-3">
                  {[
                    { name: 'Sarah Johnson', status: 'online', chats: 3 },
                    { name: 'Mike Chen', status: 'away', chats: 1 },
                    { name: 'Emma Davis', status: 'offline', chats: 0 }
                  ].map((agent, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                              {agent.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <h4 className="font-medium">{agent.name}</h4>
                              <p className="text-sm text-gray-600">{agent.chats} active chats</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={
                              agent.status === 'online' ? 'default' :
                              agent.status === 'away' ? 'secondary' : 'outline'
                            }>
                              {agent.status}
                            </Badge>
                            <Button variant="outline" size="sm">Manage</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Chat Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="business-hours-start">Business Hours Start</Label>
                    <Input id="business-hours-start" type="time" defaultValue="09:00" />
                  </div>
                  <div>
                    <Label htmlFor="business-hours-end">Business Hours End</Label>
                    <Input id="business-hours-end" type="time" defaultValue="18:00" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="EST">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EST">Eastern Standard Time</SelectItem>
                      <SelectItem value="PST">Pacific Standard Time</SelectItem>
                      <SelectItem value="CST">Central Standard Time</SelectItem>
                      <SelectItem value="MST">Mountain Standard Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="email-transcripts" />
                    <Label htmlFor="email-transcripts">Email Chat Transcripts</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="visitor-info" />
                    <Label htmlFor="visitor-info">Collect Visitor Information</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="chat-ratings" />
                    <Label htmlFor="chat-ratings">Enable Chat Ratings</Label>
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
