
import { AdminPanel } from '@/components/admin/AdminPanel';
import { FrontendHome } from './FrontendHome';

const Index = () => {
  // For now, let's show the frontend home. You can add a toggle later
  const showAdmin = new URLSearchParams(window.location.search).get('admin') === 'true';
  
  if (showAdmin) {
    return <AdminPanel />;
  }
  
  return <FrontendHome />;
};

export default Index;
