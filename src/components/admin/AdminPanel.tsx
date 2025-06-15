
import React from 'react';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import { AdminSidebar } from './AdminSidebar';
import { Dashboard } from './Dashboard';
import { PostManager } from './PostManager';
import { PluginManager } from './PluginManager';
import { VisualBuilder } from './VisualBuilder';
import { UserManager } from './UserManager';
import { MediaLibrary } from './MediaLibrary';
import { Settings } from './Settings';

const AdminContent = () => {
  const { activeSection } = useAdmin();

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'posts':
        return <PostManager />;
      case 'pages':
        return <PostManager />; // Pages use similar interface
      case 'users':
        return <UserManager />;
      case 'media':
        return <MediaLibrary />;
      case 'plugins':
        return <PluginManager />;
      case 'visual-builder':
        return <VisualBuilder />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export const AdminPanel = () => {
  return (
    <AdminProvider>
      <AdminContent />
    </AdminProvider>
  );
};
