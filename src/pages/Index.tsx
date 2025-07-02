
import { AdminPanel } from '@/components/admin/AdminPanel';
import { FrontendHome } from './FrontendHome';

const Index = () => {
  const showAdmin = new URLSearchParams(window.location.search).has('admin');
  
  if (showAdmin) {
    return <AdminPanel />;
  }
  
  // Show the frontend website by default
  return <FrontendHome />;
};

export default Index;
