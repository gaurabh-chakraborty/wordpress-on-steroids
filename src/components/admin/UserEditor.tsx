
import React, { useState } from 'react';
import { ArrowLeft, Save, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAdmin } from '@/context/AdminContext';
import { User as UserType } from '@/types/admin';
import { useToast } from '@/hooks/use-toast';

interface UserEditorProps {
  user?: UserType;
  onBack: () => void;
}

export const UserEditor = ({ user, onBack }: UserEditorProps) => {
  const { createUser, updateUser, mockApiCall } = useAdmin();
  const { toast } = useToast();
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [role, setRole] = useState<'admin' | 'editor' | 'author' | 'subscriber'>(user?.role || 'subscriber');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!username.trim() || !email.trim()) {
      toast({
        title: "Validation Error",
        description: "Username and email are required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const userData = {
        username,
        email,
        role,
        avatar: avatar || undefined,
        createdAt: user?.createdAt || new Date().toISOString(),
        lastLogin: user?.lastLogin
      };

      if (user) {
        updateUser(user.id, userData);
        // Simulate API call
        await mockApiCall(`/api/users/${user.id}`, userData);
        toast({
          title: "User Updated",
          description: `${username} has been successfully updated.`,
        });
      } else {
        createUser(userData);
        // Simulate API call
        await mockApiCall('/api/users', userData);
        toast({
          title: "User Created",
          description: `${username} has been successfully created.`,
        });
      }
      
      onBack();
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while saving the user.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Users
          </Button>
          <h1 className="text-2xl font-bold">
            {user ? 'Edit User' : 'Create New User'}
          </h1>
        </div>
        <Button onClick={handleSave} disabled={isLoading}>
          <Save className="w-4 h-4 mr-2" />
          {isLoading ? 'Saving...' : 'Save User'}
        </Button>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>User Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Username *</label>
                <Input
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <Input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Role</label>
              <Select value={role} onValueChange={(value: any) => setRole(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="subscriber">Subscriber - Can read content</SelectItem>
                  <SelectItem value="author">Author - Can create and edit own posts</SelectItem>
                  <SelectItem value="editor">Editor - Can edit all posts and pages</SelectItem>
                  <SelectItem value="admin">Administrator - Full access</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Avatar URL (optional)</label>
              <Input
                placeholder="https://example.com/avatar.jpg"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
              />
              {avatar && (
                <div className="mt-2">
                  <img 
                    src={avatar} 
                    alt="Avatar preview" 
                    className="w-16 h-16 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            {user && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <label className="block text-sm font-medium mb-2">Created</label>
                  <div className="text-sm text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Login</label>
                  <div className="text-sm text-gray-600">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
