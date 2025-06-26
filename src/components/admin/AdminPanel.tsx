
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
import { VisualBuilder } from './visual-builder/VisualBuilder';
import { useAdmin } from '@/context/AdminContext';
import { Page, Post, User, Plugin, Theme } from '@/types/admin';

export const AdminPanel = () => {
  console.log('AdminPanel component loading...');
  
  const [activeView, setActiveView] = useState('dashboard');
  const [editingPage, setEditingPage] = useState<Page | undefined>();
  const [editingPost, setEditingPost] = useState<Post | undefined>();
  const [editingUser, setEditingUser] = useState<User | undefined>();
  const [selectedPlugin, setSelectedPlugin] = useState<Plugin | undefined>();
  const [customizingTheme, setCustomizingTheme] = useState<Theme | undefined>();

  const { isAuthenticated } = useAdmin();

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

  console.log('Current active view:', activeView);

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'pages':
        return (
          <PageManager
            onEdit={(page) => {
              setEditingPage(page);
              setActiveView('page-editor');
            }}
            onNew={() => {
              setEditingPage(undefined);
              setActiveView('page-editor');
            }}
          />
        );
      case 'page-editor':
        return (
          <PageEditor
            page={editingPage}
            onBack={() => {
              setEditingPage(undefined);
              setActiveView('pages');
            }}
          />
        );
      case 'posts':
        return (
          <PostManager
            onEdit={(post) => {
              setEditingPost(post);
              setActiveView('post-editor');
            }}
            onNew={() => {
              setEditingPost(undefined);
              setActiveView('post-editor');
            }}
          />
        );
      case 'post-editor':
        return (
          <PostEditor
            post={editingPost}
            onBack={() => {
              setEditingPost(undefined);
              setActiveView('posts');
            }}
          />
        );
      case 'visual-builder':
        return <VisualBuilder />;
      case 'themes':
        return (
          <ThemeManager
            onCustomize={(theme) => {
              setCustomizingTheme(theme);
              setActiveView('theme-customizer');
            }}
          />
        );
      case 'theme-customizer':
        return (
          <ThemeCustomizer
            theme={customizingTheme}
            onBack={() => {
              setCustomizingTheme(undefined);
              setActiveView('themes');
            }}
          />
        );
      case 'plugins':
        return (
          <PluginManager
            onSettings={(plugin) => {
              setSelectedPlugin(plugin);
              setActiveView('plugin-settings');
            }}
          />
        );
      case 'plugin-settings':
        return selectedPlugin ? (
          <PluginSettings
            plugin={selectedPlugin}
            onBack={() => {
              setSelectedPlugin(undefined);
              setActiveView('plugins');
            }}
          />
        ) : null;
      case 'users':
        return (
          <UserManager
            onEdit={(user) => {
              setEditingUser(user);
              setActiveView('user-editor');
            }}
            onNew={() => {
              setEditingUser(undefined);
              setActiveView('user-editor');
            }}
          />
        );
      case 'user-editor':
        return (
          <UserEditor
            user={editingUser}
            onBack={() => {
              setEditingUser(undefined);
              setActiveView('users');
            }}
          />
        );
      case 'widgets':
        return <WidgetManager />;
      case 'menus':
        return <MenuManager />;
      case 'media':
        return <MediaLibrary />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar activeView={activeView} onViewChange={setActiveView} />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};
