import React from 'react';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import { AdminSidebar } from './AdminSidebar';
import { Dashboard } from './Dashboard';
import { PostManager } from './PostManager';
import { PageManager } from './PageManager';
import { PluginManager } from './PluginManager';
import { VisualBuilder } from './VisualBuilder';
import { UserManager } from './UserManager';
import { MediaLibrary } from './MediaLibrary';
import { Settings } from './Settings';
import { WidgetManager } from './WidgetManager';
import { MenuManager } from './MenuManager';
import { SystemManager } from './SystemManager';
import { AdminAuth } from './AdminAuth';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { ThemeManager } from './ThemeManager';
import { OrderManager } from './OrderManager';
import { CustomerManager } from './CustomerManager';
import { PaymentManager } from './PaymentManager';
import { ProductManager } from './ProductManager';

const AdminContent = () => {
  const { activeSection, isAuthenticated, login } = useAdmin();

  if (!isAuthenticated) {
    return <AdminAuth onLogin={login} />;
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'posts':
        return <PostManager />;
      case 'pages':
        return <PageManager />;
      case 'users':
        return <UserManager />;
      case 'media':
        return <MediaLibrary />;
      case 'plugins':
        return <PluginManager />;
      case 'visual-builder':
        return <VisualBuilder />;
      case 'widgets':
        return <WidgetManager />;
      case 'menus':
        return <MenuManager />;
      case 'system':
        return <SystemManager />;
      case 'settings':
        return <Settings />;
      case 'themes':
        return <ThemeManager />;
      case 'products':
        return <ProductManager />;
      case 'orders':
        return <OrderManager />;
      case 'customers':
        return <CustomerManager />;
      case 'payments':
        return <PaymentManager />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:hidden">
            <SidebarTrigger />
          </div>
          {renderContent()}
        </main>
      </div>
    </SidebarProvider>
  );
};

export const AdminPanel = () => {
  return (
    <AdminProvider>
      <AdminContent />
    </AdminProvider>
  );
};
