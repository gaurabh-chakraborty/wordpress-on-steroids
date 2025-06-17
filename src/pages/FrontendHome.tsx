
import React from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '@/context/AdminContext';

export const FrontendHome = () => {
  const { pages, activeTheme } = useAdmin();
  
  const publishedPages = pages.filter(page => page.status === 'published');

  const getThemeStyles = () => {
    if (!activeTheme) return {};
    
    return {
      '--primary-color': activeTheme.customization.colors.primary,
      '--secondary-color': activeTheme.customization.colors.secondary,
      '--accent-color': activeTheme.customization.colors.accent,
      '--heading-font': activeTheme.customization.typography.headingFont,
      '--body-font': activeTheme.customization.typography.bodyFont,
      '--container-width': activeTheme.customization.layout.containerWidth,
    } as React.CSSProperties;
  };

  return (
    <div className="min-h-screen" style={getThemeStyles()}>
      {/* Header */}
      <header className="py-6 border-b" style={{ 
        backgroundColor: 'var(--primary-color)', 
        color: 'white' 
      }}>
        <div className="container mx-auto px-4" style={{ maxWidth: 'var(--container-width)' }}>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--heading-font)' }}>
              My Website
            </h1>
            <nav className="space-x-6">
              <Link to="/" className="hover:opacity-80">Home</Link>
              {publishedPages.map(page => (
                <Link 
                  key={page.id} 
                  to={`/page/${page.slug}`}
                  className="hover:opacity-80"
                  style={{ fontFamily: 'var(--body-font)' }}
                >
                  {page.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20" style={{ 
        background: `linear-gradient(135deg, var(--primary-color), var(--accent-color))`,
        color: 'white'
      }}>
        <div className="container mx-auto px-4 text-center" style={{ maxWidth: 'var(--container-width)' }}>
          <h1 className="text-5xl font-bold mb-6" style={{ fontFamily: 'var(--heading-font)' }}>
            Welcome to My Website
          </h1>
          <p className="text-xl mb-8 opacity-90" style={{ fontFamily: 'var(--body-font)' }}>
            Discover amazing content and explore our pages with the active theme: {activeTheme?.name}
          </p>
          <button 
            className="bg-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            style={{ color: 'var(--primary-color)' }}
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Pages Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4" style={{ maxWidth: 'var(--container-width)' }}>
          <h2 className="text-3xl font-bold text-center mb-12" style={{ 
            color: 'var(--primary-color)',
            fontFamily: 'var(--heading-font)' 
          }}>
            Explore Our Pages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedPages.map(page => (
              <div key={page.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-3" style={{ 
                  color: 'var(--primary-color)',
                  fontFamily: 'var(--heading-font)' 
                }}>
                  {page.title}
                </h3>
                <p className="text-gray-600 mb-4" style={{ fontFamily: 'var(--body-font)' }}>
                  {page.content.substring(0, 100)}...
                </p>
                <Link 
                  to={`/page/${page.slug}`}
                  className="inline-block px-4 py-2 rounded text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: 'var(--primary-color)' }}
                >
                  Read More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-white" style={{ backgroundColor: 'var(--secondary-color)' }}>
        <div className="container mx-auto px-4 text-center" style={{ maxWidth: 'var(--container-width)' }}>
          <p style={{ fontFamily: 'var(--body-font)' }}>
            © 2024 My Website. Powered by {activeTheme?.name} theme.
          </p>
        </div>
      </footer>
    </div>
  );
};
