
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Mail, Plus, Settings, Eye, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ContactFormPlugin = () => {
  const { toast } = useToast();
  const [forms, setForms] = useState([
    {
      id: '1',
      name: 'Main Contact Form',
      shortcode: '[contact-form id="1"]',
      submissions: 24,
      isActive: true
    },
    {
      id: '2',
      name: 'Newsletter Signup',
      shortcode: '[contact-form id="2"]',
      submissions: 67,
      isActive: true
    }
  ]);

  const [formSettings, setFormSettings] = useState({
    enableCaptcha: true,
    emailNotifications: true,
    saveSubmissions: true,
    autoResponse: false,
    notificationEmail: 'admin@example.com'
  });

  const [recentSubmissions] = useState([
    { id: '1', name: 'John Doe', email: 'john@example.com', date: '2024-01-15 14:30', form: 'Main Contact Form' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', date: '2024-01-15 12:15', form: 'Newsletter Signup' },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com', date: '2024-01-14 16:45', form: 'Main Contact Form' }
  ]);

  const createNewForm = () => {
    const newForm = {
      id: Date.now().toString(),
      name: 'New Contact Form',
      shortcode: `[contact-form id="${Date.now()}"]`,
      submissions: 0,
      isActive: true
    };
    setForms(prev => [...prev, newForm]);
    toast({
      title: "New Form Created",
      description: "Your new contact form has been created successfully",
    });
  };

  const toggleForm = (formId: string) => {
    setForms(prev => prev.map(form => 
      form.id === formId ? { ...form, isActive: !form.isActive } : form
    ));
  };

  const copyShortcode = (shortcode: string) => {
    navigator.clipboard.writeText(shortcode);
    toast({
      title: "Shortcode Copied",
      description: "The shortcode has been copied to your clipboard",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Mail className="w-5 h-5" />
            <span>Contact Forms</span>
          </CardTitle>
          <Button onClick={createNewForm}>
            <Plus className="w-4 h-4 mr-2" />
            New Form
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {forms.map((form) => (
              <div key={form.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium">{form.name}</h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <code 
                      className="text-xs bg-gray-200 px-2 py-1 rounded cursor-pointer hover:bg-gray-300 transition-colors"
                      onClick={() => copyShortcode(form.shortcode)}
                    >
                      {form.shortcode}
                    </code>
                    <Badge variant="outline">{form.submissions} submissions</Badge>
                    <Badge variant={form.isActive ? 'default' : 'secondary'}>
                      {form.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="ghost">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Switch 
                    checked={form.isActive}
                    onCheckedChange={() => toggleForm(form.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Global Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium">Enable CAPTCHA</label>
              <p className="text-sm text-gray-600">Protect forms from spam with CAPTCHA</p>
            </div>
            <Switch 
              checked={formSettings.enableCaptcha}
              onCheckedChange={(checked) => setFormSettings(prev => ({...prev, enableCaptcha: checked}))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium">Email Notifications</label>
              <p className="text-sm text-gray-600">Send email when new submission is received</p>
            </div>
            <Switch 
              checked={formSettings.emailNotifications}
              onCheckedChange={(checked) => setFormSettings(prev => ({...prev, emailNotifications: checked}))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium">Save Submissions</label>
              <p className="text-sm text-gray-600">Store form submissions in database</p>
            </div>
            <Switch 
              checked={formSettings.saveSubmissions}
              onCheckedChange={(checked) => setFormSettings(prev => ({...prev, saveSubmissions: checked}))}
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Notification Email</label>
            <Input
              type="email"
              value={formSettings.notificationEmail}
              onChange={(e) => setFormSettings(prev => ({...prev, notificationEmail: e.target.value}))}
              placeholder="admin@example.com"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentSubmissions.map((submission) => (
              <div key={submission.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{submission.name}</div>
                  <div className="text-sm text-gray-600">{submission.email}</div>
                  <div className="text-xs text-gray-500">{submission.form}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">{submission.date}</div>
                  <Button size="sm" variant="ghost">View</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
