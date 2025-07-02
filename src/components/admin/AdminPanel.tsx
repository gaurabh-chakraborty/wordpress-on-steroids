
import React, { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { Dashboard } from './Dashboard';
import { PageManager } from './PageManager';
import { PageEditor } from './PageEditor';
import { PostManager } from './PostManager';
import { PostEditor } from './PostEditor';
import { ThemeManager } from './ThemeManager';
import { ThemeCustomizer } from './ThemeCustomizer';
import { PluginManager } from './PluginManager';
import { PluginSettings } from './PluginSettings';
import { UserManager } from './UserManager';
import { UserEditor } from './UserEditor';
import { Settings } from './Settings';
import { WidgetManager } from './WidgetManager';
import { MenuManager } from './MenuManager';
import { MediaLibrary } from './MediaLibrary';
import { SystemManager } from './SystemManager';
import { ProductManager } from './ProductManager';
import { OrderManager } from './OrderManager';
import { CustomerManager } from './CustomerManager';
import { PaymentManager } from './PaymentManager';
import { VisualBuilder } from './visual-builder/VisualBuilder';
import { useAdmin } from '@/context/AdminContext';

export const AdminPanel = () => {
  console.log('AdminPanel component loading...');
  
  const { isAuthenticated, activeSection } = useAdmin();

  if (!isAuthenticated) {
    console.log('User not authenticated, showing login...');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
          <p className="text-center text-gray-600">
            This is a demo admin panel. In a real application, you would implement proper authentication here.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Continue to Admin
          </button>
        </div>
      </div>
    );
  }

  console.log('Current active section:', activeSection);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'pages':
        return <PageManager />;
      case 'posts':
        return <PostManager />;
      case 'media':
        return <MediaLibrary />;
      case 'products':
        return <ProductManager />;
      case 'orders':
        return <OrderManager />;
      case 'customers':
        return <CustomerManager />;
      case 'payments':
        return <PaymentManager />;
      case 'themes':
        return <ThemeManager />;
      case 'menus':
        return <MenuManager />;
      case 'visual-builder':
        return <VisualBuilder />;
      case 'users':
        return <UserManager />;
      case 'plugins':
        return <PluginManager />;
      case 'system':
        return <SystemManager />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};
