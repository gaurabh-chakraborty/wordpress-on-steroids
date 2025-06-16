
import React, { useState } from 'react';
import { ArrowLeft, Save, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAdmin } from '@/context/AdminContext';
import { User as UserType } from '@/types/admin';

interface UserEditorProps {
  user?: UserType;
  onBack: () => void;
}

export const UserEditor = ({ user, onBack }: UserEditorProps) => {
  const { createUser, updateUser } = useAdmin();
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [role, setRole] = useState<'admin' | 'editor' | 'author' | 'subscriber'>(user?.role || 'subscriber');
  const [avatar, setAvatar] = useState(user?.avatar || '');

  const handleSave = () => {
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
    } else {
      createUser(userData);
    }
    
    onBack();
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
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Save User
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
                <label className="block text-sm font-medium mb-2">Username</label>
                <Input
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  <SelectItem value="subscriber">Subscriber</SelectItem>
                  <SelectItem value="author">Author</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
