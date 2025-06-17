
import React, { useState } from 'react';
import { Users, Plus, Search, Edit, Trash2, Shield, Mail, Filter, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAdmin } from '@/context/AdminContext';
import { UserEditor } from './UserEditor';
import { User } from '@/types/admin';
import { useToast } from '@/hooks/use-toast';

export const UserManager = () => {
  const { users, deleteUser, mockApiCall } = useAdmin();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-700 border-red-200';
      case 'editor': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'author': return 'bg-green-100 text-green-700 border-green-200';
      case 'subscriber': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'admin': return 'Full system access';
      case 'editor': return 'Can edit all content';
      case 'author': return 'Can create and edit own posts';
      case 'subscriber': return 'Can read content';
      default: return '';
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setEditingUser(null);
    setIsEditing(true);
  };

  const handleDelete = async (userId: string, username: string) => {
    if (confirm(`Are you sure you want to delete user "${username}"? This action cannot be undone.`)) {
      try {
        deleteUser(userId);
        await mockApiCall(`/api/users/${userId}`, { method: 'DELETE' });
        toast({
          title: "User Deleted",
          description: `${username} has been successfully deleted.`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "An error occurred while deleting the user.",
          variant: "destructive"
        });
      }
    }
  };

  const handleExport = async () => {
    try {
      await mockApiCall('/api/users/export');
      toast({
        title: "Export Started",
        description: "User data export has been initiated. You'll receive an email when ready.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "An error occurred while exporting user data.",
        variant: "destructive"
      });
    }
  };

  const userStats = {
    total: users.length,
    admins: users.filter(u => u.role === 'admin').length,
    editors: users.filter(u => u.role === 'editor').length,
    authors: users.filter(u => u.role === 'author').length,
    subscribers: users.filter(u => u.role === 'subscriber').length,
    activeThisWeek: users.filter(u => u.lastLogin && 
      new Date(u.lastLogin) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ).length
  };

  if (isEditing) {
    return (
      <UserEditor 
        user={editingUser || undefined}
        onBack={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600 mt-1">Manage user accounts and permissions.</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleAddNew}>
            <Plus className="w-4 h-4 mr-2" />
            Add New User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{userStats.total}</div>
            <div className="text-sm text-gray-600">Total Users</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{userStats.admins}</div>
            <div className="text-sm text-gray-600">Admins</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{userStats.editors}</div>
            <div className="text-sm text-gray-600">Editors</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{userStats.authors}</div>
            <div className="text-sm text-gray-600">Authors</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-600">{userStats.subscribers}</div>
            <div className="text-sm text-gray-600">Subscribers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{userStats.activeThisWeek}</div>
            <div className="text-sm text-gray-600">Active This Week</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admins</SelectItem>
                  <SelectItem value="editor">Editors</SelectItem>
                  <SelectItem value="author">Authors</SelectItem>
                  <SelectItem value="subscriber">Subscribers</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <div className="grid gap-4">
        {filteredUsers.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Users className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or add a new user.</p>
            </CardContent>
          </Card>
        ) : (
          filteredUsers.map((user) => (
            <Card key={user.id} className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.username}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">{user.username}</h3>
                        <Badge className={getRoleColor(user.role)}>
                          {user.role}
                        </Badge>
                        {user.lastLogin && 
                          new Date(user.lastLogin) > new Date(Date.now() - 24 * 60 * 60 * 1000) && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Online
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-gray-600 space-y-1 sm:space-y-0">
                        <div className="flex items-center space-x-1">
                          <Mail className="w-4 h-4" />
                          <span>{user.email}</span>
                        </div>
                        <span className="hidden sm:inline">•</span>
                        <span>{getRoleDescription(user.role)}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                        {user.lastLogin && (
                          <>
                            <span className="hidden sm:inline">•</span>
                            <span>Last seen {new Date(user.lastLogin).toLocaleDateString()}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEdit(user)}
                      title="Edit user"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      title="Manage permissions"
                    >
                      <Shield className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDelete(user.id, user.username)}
                      title="Delete user"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
