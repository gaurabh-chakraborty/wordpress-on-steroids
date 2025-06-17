
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Server, 
  Database, 
  Shield, 
  Bell, 
  Mail, 
  Globe, 
  HardDrive,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { useToast } from '@/hooks/use-toast';

export const SystemManager = () => {
  const { mockApiCall } = useAdmin();
  const { toast } = useToast();
  
  const [systemStatus] = useState({
    server: 'healthy',
    database: 'healthy',
    storage: 'warning',
    backups: 'healthy'
  });

  const [systemStats] = useState({
    uptime: '99.9%',
    responseTime: '245ms',
    memoryUsage: '67%',
    diskUsage: '42%',
    activeUsers: 1247,
    totalPageViews: 45623
  });

  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'warning',
      title: 'Storage Usage High',
      message: 'Storage usage is at 85%. Consider cleaning up old files.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      isRead: false
    },
    {
      id: '2',
      type: 'success',
      title: 'Backup Completed',
      message: 'Daily backup completed successfully.',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      isRead: true
    },
    {
      id: '3',
      type: 'info',
      title: 'System Update Available',
      message: 'A new system update is available for installation.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      isRead: false
    }
  ]);

  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [cacheEnabled, setCacheEnabled] = useState(true);

  const handleSystemAction = async (action: string) => {
    toast({ title: `${action} initiated...` });
    await mockApiCall(`/api/system/${action.toLowerCase()}`);
    
    setTimeout(() => {
      toast({ 
        title: `${action} completed successfully!`,
        description: "System operation finished."
      });
    }, 2000);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <Bell className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">System Manager</h1>
        <p className="text-gray-600">Monitor and manage system health and settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>System Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(systemStatus).map(([service, status]) => (
              <div key={service} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {service === 'server' && <Server className="w-4 h-4" />}
                  {service === 'database' && <Database className="w-4 h-4" />}
                  {service === 'storage' && <HardDrive className="w-4 h-4" />}
                  {service === 'backups' && <Shield className="w-4 h-4" />}
                  <span className="capitalize">{service}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(status)}
                  <Badge variant={status === 'healthy' ? 'default' : status === 'warning' ? 'secondary' : 'destructive'}>
                    {status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* System Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Uptime</p>
                <p className="text-2xl font-bold text-green-600">{systemStats.uptime}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Response Time</p>
                <p className="text-2xl font-bold">{systemStats.responseTime}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Memory Usage</p>
                <p className="text-2xl font-bold">{systemStats.memoryUsage}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Disk Usage</p>
                <p className="text-2xl font-bold">{systemStats.diskUsage}</p>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Active Users</p>
                  <p className="text-xl font-semibold">{systemStats.activeUsers.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Page Views</p>
                  <p className="text-xl font-semibold">{systemStats.totalPageViews.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              onClick={() => handleSystemAction('Clear Cache')}
              className="w-full"
              variant="outline"
            >
              Clear Cache
            </Button>
            <Button 
              onClick={() => handleSystemAction('Run Backup')}
              className="w-full"
              variant="outline"
            >
              Run Backup
            </Button>
            <Button 
              onClick={() => handleSystemAction('Optimize Database')}
              className="w-full"
              variant="outline"
            >
              Optimize Database
            </Button>
            <Button 
              onClick={() => handleSystemAction('Update System')}
              className="w-full"
            >
              Update System
            </Button>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle>System Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Maintenance Mode</h4>
                <p className="text-sm text-gray-600">Put site in maintenance mode</p>
              </div>
              <Switch
                checked={maintenanceMode}
                onCheckedChange={(checked) => {
                  setMaintenanceMode(checked);
                  toast({ 
                    title: checked ? "Maintenance mode enabled" : "Maintenance mode disabled",
                    variant: checked ? "destructive" : "default"
                  });
                }}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Debug Mode</h4>
                <p className="text-sm text-gray-600">Enable debug logging</p>
              </div>
              <Switch
                checked={debugMode}
                onCheckedChange={setDebugMode}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Cache Enabled</h4>
                <p className="text-sm text-gray-600">Enable system caching</p>
              </div>
              <Switch
                checked={cacheEnabled}
                onCheckedChange={setCacheEnabled}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>System Notifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.map(notification => (
                <div 
                  key={notification.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    notification.isRead ? 'bg-gray-50' : 'bg-blue-50 border-blue-200'
                  }`}
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <h4 className={`font-medium ${!notification.isRead ? 'text-blue-900' : ''}`}>
                        {notification.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(notification.timestamp).toLocaleString()}
                      </p>
                    </div>
                    {!notification.isRead && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
