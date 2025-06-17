
import React, { createContext, useContext, useEffect } from 'react';
import { useAdmin } from './AdminContext';

interface ThemeContextType {
  applyThemeStyles: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { activeTheme } = useAdmin();

  const applyThemeStyles = () => {
    if (!activeTheme) return;

    const root = document.documentElement;
    
    // Apply theme colors as CSS custom properties
    root.style.setProperty('--theme-primary', activeTheme.customization.colors.primary);
    root.style.setProperty('--theme-secondary', activeTheme.customization.colors.secondary);
    root.style.setProperty('--theme-accent', activeTheme.customization.colors.accent);
    
    // Apply typography
    root.style.setProperty('--theme-heading-font', activeTheme.customization.typography.headingFont);
    root.style.setProperty('--theme-body-font', activeTheme.customization.typography.bodyFont);
    
    // Apply layout settings
    root.style.setProperty('--theme-container-width', activeTheme.customization.layout.containerWidth);

    console.log('Theme styles applied:', activeTheme.name);
  };

  useEffect(() => {
    applyThemeStyles();
  }, [activeTheme]);

  return (
    <ThemeContext.Provider value={{ applyThemeStyles }}>
      {children}
    </ThemeContext.Provider>
  );
};
