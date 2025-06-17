import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAdmin } from '@/context/AdminContext';

export const PageViewer = () => {
  const { slug } = useParams();
  const { pages, activeTheme } = useAdmin();
  
  const page = pages.find(p => p.slug === slug && p.status === 'published');
  
  if (!page) {
    return <Navigate to="/404" replace />;
  }

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

  const getTemplateStyles = (template: string) => {
    switch (template) {
      case 'full-width':
        return 'container-fluid px-0';
      case 'landing':
        return 'min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100';
      case 'contact':
        return 'bg-gray-50 min-h-screen';
      default:
        return 'container mx-auto px-4 py-8';
    }
  };

  const renderContactTemplate = () => (
    <div className="min-h-screen bg-gray-50 py-12" style={getThemeStyles()}>
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6" style={{ 
            color: 'var(--primary-color)', 
            fontFamily: 'var(--heading-font)' 
          }}>
            {page.title}
          </h1>
          <div className="prose prose-lg mb-8" style={{ fontFamily: 'var(--body-font)' }}>
            {page.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-600">{paragraph}</p>
            ))}
          </div>
          
          <form className="space-y-6" onSubmit={(e) => {
            e.preventDefault();
            alert('Contact form submitted! (This is a demo)');
          }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent"
                  placeholder="Your first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent"
                  placeholder="Your last name"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent"
                placeholder="your.email@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent"
                placeholder="Tell us how we can help you..."
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-6 rounded-md text-white font-medium hover:opacity-90 transition-opacity"
              style={{ backgroundColor: 'var(--primary-color)' }}
            >
              Send Message
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" 
                     style={{ backgroundColor: `${activeTheme?.customization.colors.primary}20` }}>
                  <svg className="w-6 h-6" style={{ color: 'var(--primary-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Address</h3>
                <p className="text-gray-600 text-sm">123 Main Street<br />New York, NY 10001</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                     style={{ backgroundColor: `${activeTheme?.customization.colors.primary}20` }}>
                  <svg className="w-6 h-6" style={{ color: 'var(--primary-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Phone</h3>
                <p className="text-gray-600 text-sm">(555) 123-4567</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                     style={{ backgroundColor: `${activeTheme?.customization.colors.primary}20` }}>
                  <svg className="w-6 h-6" style={{ color: 'var(--primary-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Email</h3>
                <p className="text-gray-600 text-sm">hello@company.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLandingTemplate = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100" style={getThemeStyles()}>
      <div className="relative py-24">
        <div className="container mx-auto px-4 text-center" style={{ maxWidth: 'var(--container-width)' }}>
          <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ 
            color: 'var(--primary-color)', 
            fontFamily: 'var(--heading-font)' 
          }}>
            {page.title}
          </h1>
          <div className="text-xl mb-8 max-w-3xl mx-auto" style={{ 
            color: 'var(--secondary-color)',
            fontFamily: 'var(--body-font)' 
          }}>
            {page.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
          <div className="space-x-4">
            <button className="text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: 'var(--primary-color)' }}>
              Get Started
            </button>
            <button className="px-8 py-4 rounded-lg font-semibold border hover:opacity-90 transition-opacity"
                    style={{ 
                      color: 'var(--primary-color)', 
                      borderColor: 'var(--primary-color)',
                      backgroundColor: 'white'
                    }}>
              Learn More
            </button>
          </div>
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="container mx-auto px-4" style={{ maxWidth: 'var(--container-width)' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Fast Performance', desc: 'Lightning-fast loading times and optimal performance.' },
              { title: 'Secure & Reliable', desc: 'Enterprise-grade security with 99.9% uptime guarantee.' },
              { title: '24/7 Support', desc: 'Round-the-clock customer support whenever you need help.' }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                     style={{ backgroundColor: `${activeTheme?.customization.colors.primary}20` }}>
                  <div className="w-8 h-8 rounded" style={{ backgroundColor: 'var(--primary-color)' }}></div>
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ 
                  color: 'var(--primary-color)',
                  fontFamily: 'var(--heading-font)' 
                }}>{feature.title}</h3>
                <p className="text-gray-600" style={{ fontFamily: 'var(--body-font)' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDefaultTemplate = () => (
    <div className={getTemplateStyles(page.template)} style={getThemeStyles()}>
      <div className="container mx-auto px-4 py-8" style={{ maxWidth: 'var(--container-width)' }}>
        <article className="prose prose-lg max-w-none">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4" style={{ 
              color: 'var(--primary-color)',
              fontFamily: 'var(--heading-font)' 
            }}>{page.title}</h1>
          </header>
          <div className="leading-relaxed" style={{ 
            color: 'var(--secondary-color)',
            fontFamily: 'var(--body-font)' 
          }}>
            {page.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-6">{paragraph}</p>
            ))}
          </div>
        </article>
      </div>
    </div>
  );

  const renderFullWidthTemplate = () => (
    <div className="w-full" style={getThemeStyles()}>
      <div className="text-white py-20" style={{ 
        background: `linear-gradient(to right, var(--primary-color), var(--accent-color))` 
      }}>
        <div className="container mx-auto px-4 text-center" style={{ maxWidth: 'var(--container-width)' }}>
          <h1 className="text-5xl font-bold mb-6" style={{ fontFamily: 'var(--heading-font)' }}>
            {page.title}
          </h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12" style={{ maxWidth: 'var(--container-width)' }}>
        <div className="prose prose-lg max-w-none">
          {page.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-6" style={{ 
              color: 'var(--secondary-color)',
              fontFamily: 'var(--body-font)' 
            }}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {page.template === 'contact' && renderContactTemplate()}
      {page.template === 'landing' && renderLandingTemplate()}
      {page.template === 'full-width' && renderFullWidthTemplate()}
      {page.template === 'default' && renderDefaultTemplate()}
    </div>
  );
};
