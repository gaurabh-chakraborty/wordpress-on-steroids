
import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Image, 
  Puzzle, 
  Settings, 
  PenTool,
  BookOpen,
  BarChart3,
  Palette
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAdmin } from '@/context/AdminContext';

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'posts', label: 'Posts', icon: FileText },
  { id: 'pages', label: 'Pages', icon: BookOpen },
  { id: 'media', label: 'Media Library', icon: Image },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'plugins', label: 'Plugins', icon: Puzzle },
  { id: 'visual-builder', label: 'Visual Builder', icon: Palette },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const AdminSidebar = () => {
  const { activeSection, setActiveSection, currentUser } = useAdmin();

  return (
    <div className="w-64 bg-slate-900 text-white h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <PenTool className="w-4 h-4" />
          </div>
          <div>
            <h1 className="font-bold text-lg">Admin Panel</h1>
            <p className="text-xs text-slate-400">WordPress-like CMS</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          {currentUser.avatar ? (
            <img 
              src={currentUser.avatar} 
              alt={currentUser.username}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          )}
          <div>
            <p className="font-medium text-sm">{currentUser.username}</p>
            <p className="text-xs text-slate-400 capitalize">{currentUser.role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-3">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={cn(
                    "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200",
                    activeSection === item.id
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
