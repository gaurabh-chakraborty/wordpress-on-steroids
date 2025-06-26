
import { AdminPanel } from '@/components/admin/AdminPanel';
import { FrontendHome } from './FrontendHome';

const Index = () => {
  const showAdmin = new URLSearchParams(window.location.search).has('admin');
  
  if (showAdmin) {
    return <AdminPanel />;
  }
  
  // Default to AdminPanel for now since this appears to be an admin-focused application
  return <AdminPanel />;
};

export default Index;
