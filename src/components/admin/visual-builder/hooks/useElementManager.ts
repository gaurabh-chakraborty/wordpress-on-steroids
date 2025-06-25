
import { useState, useCallback } from 'react';
import { Element } from '../types';
import { useToast } from '@/hooks/use-toast';

export const useElementManager = () => {
  const { toast } = useToast();
  const [elements, setElements] = useState<Element[]>([]);
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [history, setHistory] = useState<Element[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const addToHistory = useCallback((newElements: Element[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newElements);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const getDefaultContent = (type: Element['type']): string => {
    switch (type) {
      case 'text': return 'Sample text';
      case 'heading': return 'Heading';
      case 'button': return 'Button';
      case 'image': return 'https://via.placeholder.com/200x100';
      case 'video': return 'https://www.youtube.com/embed/dQw4w9WgXcQ';
      case 'link': return 'Link text';
      case 'list': return 'List item';
      case 'quote': return 'Quote text';
      case 'hero': return JSON.stringify({
        title: 'Welcome to Our Platform',
        subtitle: 'Create amazing experiences with our tools',
        buttonText: 'Get Started'
      });
      case 'navigation': return JSON.stringify({
        logo: 'Brand',
        menuItems: ['Home', 'About', 'Services', 'Contact']
      });
      case 'footer': return JSON.stringify({
        companyName: 'Your Company',
        links: ['About', 'Services', 'Contact', 'Privacy']
      });
      case 'card': return JSON.stringify({
        title: 'Card Title',
        content: 'Card description goes here',
        buttonText: 'Learn More'
      });
      case 'cta': return JSON.stringify({
        title: 'Ready to Get Started?',
        subtitle: 'Join us today and transform your business',
        primaryButtonText: 'Start Now',
        secondaryButtonText: 'Learn More'
      });
      case 'testimonial': return JSON.stringify({
        quote: 'This service exceeded our expectations!',
        author: 'John Smith',
        role: 'CEO',
        company: 'Tech Corp',
        rating: 5
      });
      case 'pricing': return JSON.stringify({
        title: 'Basic Plan',
        price: '$9',
        period: 'month',
        features: ['Feature 1', 'Feature 2', 'Feature 3'],
        buttonText: 'Get Started'
      });
      case 'slider': return JSON.stringify({
        images: [
          'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800',
          'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'
        ]
      });
      default: return '';
    }
  };

  const getDefaultSize = (type: Element['type']): { width: number; height: number } => {
    switch (type) {
      case 'hero': return { width: 800, height: 400 };
      case 'navigation': return { width: 800, height: 80 };
      case 'footer': return { width: 800, height: 300 };
      case 'card': return { width: 300, height: 350 };
      case 'cta': return { width: 600, height: 200 };
      case 'testimonial': return { width: 400, height: 250 };
      case 'pricing': return { width: 300, height: 400 };
      case 'slider': return { width: 500, height: 300 };
      default: return { width: 200, height: 100 };
    }
  };

  const addElement = useCallback((type: Element['type']) => {
    const defaultSize = getDefaultSize(type);
    const newElement: Element = {
      id: Date.now().toString(),
      type,
      content: getDefaultContent(type),
      styles: {},
      position: { x: 50, y: 50 },
      size: defaultSize,
    };

    const newElements = [...elements, newElement];
    setElements(newElements);
    addToHistory(newElements);
    setSelectedElement(newElement);

    toast({
      title: "Element Added",
      description: `${type} element has been added to your design.`,
    });
  }, [elements, addToHistory, toast]);

  const updateElement = useCallback((id: string, updates: Partial<Element>) => {
    const newElements = elements.map(el => 
      el.id === id ? { ...el, ...updates } : el
    );
    setElements(newElements);
    addToHistory(newElements);
    
    if (selectedElement?.id === id) {
      setSelectedElement(prev => prev ? { ...prev, ...updates } : null);
    }
  }, [elements, selectedElement, addToHistory]);

  const deleteElement = useCallback((id: string) => {
    const newElements = elements.filter(el => el.id !== id);
    setElements(newElements);
    addToHistory(newElements);
    setSelectedElement(null);

    toast({
      title: "Element Deleted",
      description: "The element has been removed from your design.",
    });
  }, [elements, addToHistory, toast]);

  const handleElementClick = useCallback((elementId: string) => {
    const element = elements.find(el => el.id === elementId);
    if (element) {
      setSelectedElement(element);
    }
  }, [elements]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setElements(history[historyIndex - 1]);
      setSelectedElement(null);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setElements(history[historyIndex + 1]);
      setSelectedElement(null);
    }
  }, [history, historyIndex]);

  return {
    elements,
    selectedElement,
    setSelectedElement,
    addElement,
    updateElement,
    deleteElement,
    handleElementClick,
    undo,
    redo,
    historyIndex,
    historyLength: history.length
  };
};
