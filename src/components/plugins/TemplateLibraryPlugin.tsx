import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Download, 
  Eye, 
  Star, 
  Filter,
  Grid,
  Layout,
  Smartphone,
  Monitor,
  ShoppingCart,
  Users,
  FileText,
  Mail,
  Camera,
  Briefcase
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Template {
  id: string;
  name: string;
  category: 'landing' | 'business' | 'portfolio' | 'blog' | 'ecommerce' | 'contact';
  type: 'full-page' | 'section' | 'component';
  preview: string;
  elements: any[];
  tags: string[];
  isPro: boolean;
}

const templates: Template[] = [
  {
    id: '1',
    name: 'Hero Section - Modern',
    category: 'landing',
    type: 'section',
    preview: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
    tags: ['hero', 'modern', 'gradient'],
    isPro: false,
    elements: [
      {
        id: 'hero-1',
        type: 'hero',
        content: JSON.stringify({
          title: 'Build Amazing Websites',
          subtitle: 'Create stunning web experiences with our drag-and-drop builder',
          buttonText: 'Get Started Free'
        }),
        styles: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          textAlign: 'center',
          padding: '80px 20px'
        },
        position: { x: 0, y: 0 },
        size: { width: 800, height: 400 }
      }
    ]
  },
  {
    id: '2',
    name: 'Pricing Cards Set',
    category: 'business',
    type: 'section',
    preview: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
    tags: ['pricing', 'cards', 'business'],
    isPro: false,
    elements: [
      {
        id: 'pricing-1',
        type: 'pricing',
        content: JSON.stringify({
          title: 'Starter',
          price: '$9',
          period: 'month',
          features: ['5 Projects', '10GB Storage', 'Email Support'],
          buttonText: 'Get Started'
        }),
        styles: {},
        position: { x: 50, y: 50 },
        size: { width: 300, height: 400 }
      },
      {
        id: 'pricing-2',
        type: 'pricing',
        content: JSON.stringify({
          title: 'Professional',
          price: '$29',
          period: 'month',
          features: ['Unlimited Projects', '100GB Storage', 'Priority Support', 'Advanced Analytics'],
          buttonText: 'Most Popular'
        }),
        styles: {
          border: '2px solid #3b82f6',
          transform: 'scale(1.05)'
        },
        position: { x: 400, y: 30 },
        size: { width: 300, height: 420 }
      }
    ]
  },
  {
    id: '3',
    name: 'Portfolio Gallery',
    category: 'portfolio',
    type: 'section',
    preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    tags: ['portfolio', 'gallery', 'creative'],
    isPro: true,
    elements: [
      {
        id: 'gallery-1',
        type: 'slider',
        content: JSON.stringify({
          images: [
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800',
            'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'
          ]
        }),
        styles: {
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        },
        position: { x: 100, y: 100 },
        size: { width: 600, height: 400 }
      }
    ]
  },
  {
    id: '4',
    name: 'Contact Form Section',
    category: 'contact',
    type: 'section',
    preview: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
    tags: ['contact', 'form', 'business'],
    isPro: false,
    elements: [
      {
        id: 'contact-1',
        type: 'card',
        content: JSON.stringify({
          title: 'Get In Touch',
          content: 'We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.'
        }),
        styles: {
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        },
        position: { x: 100, y: 100 },
        size: { width: 600, height: 300 }
      }
    ]
  },
  {
    id: '5',
    name: 'Complete Landing Page',
    category: 'landing',
    type: 'full-page',
    preview: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
    tags: ['landing', 'complete', 'business'],
    isPro: true,
    elements: [
      // Navigation
      {
        id: 'nav-1',
        type: 'navigation',
        content: JSON.stringify({
          logo: 'Your Brand',
          menuItems: ['Home', 'About', 'Services', 'Contact']
        }),
        styles: {},
        position: { x: 0, y: 0 },
        size: { width: 800, height: 80 }
      },
      // Hero
      {
        id: 'hero-complete',
        type: 'hero',
        content: JSON.stringify({
          title: 'Welcome to the Future',
          subtitle: 'Transform your business with our innovative solutions',
          buttonText: 'Start Your Journey'
        }),
        styles: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        },
        position: { x: 0, y: 80 },
        size: { width: 800, height: 400 }
      },
      // CTA
      {
        id: 'cta-complete',
        type: 'cta',
        content: JSON.stringify({
          title: 'Ready to Get Started?',
          subtitle: 'Join thousands of satisfied customers',
          primaryButtonText: 'Start Free Trial',
          secondaryButtonText: 'Learn More'
        }),
        styles: {},
        position: { x: 0, y: 480 },
        size: { width: 800, height: 200 }
      }
    ]
  },
  {
    id: '6',
    name: 'About Us Section',
    category: 'business',
    type: 'section',
    preview: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop',
    tags: ['about', 'team', 'business'],
    isPro: false,
    elements: [
      {
        id: 'about-1',
        type: 'container',
        content: 'About Us Container',
        styles: { padding: '60px 20px', backgroundColor: '#f8fafc' },
        position: { x: 0, y: 0 },
        size: { width: 800, height: 400 },
        children: [
          {
            id: 'about-title',
            type: 'heading',
            content: 'About Our Company',
            styles: { fontSize: '48px', fontWeight: 'bold', textAlign: 'center', marginBottom: '30px' },
            position: { x: 0, y: 0 },
            size: { width: 800, height: 60 }
          },
          {
            id: 'about-text',
            type: 'text',
            content: 'We are a team of passionate professionals dedicated to delivering exceptional results. Our mission is to help businesses grow and succeed in the digital age.',
            styles: { fontSize: '18px', textAlign: 'center', color: '#64748b', maxWidth: '600px', margin: '0 auto' },
            position: { x: 100, y: 80 },
            size: { width: 600, height: 100 }
          }
        ]
      }
    ]
  },
  {
    id: '7',
    name: 'Feature Cards Grid',
    category: 'business',
    type: 'section',
    preview: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    tags: ['features', 'grid', 'services'],
    isPro: false,
    elements: [
      {
        id: 'features-1',
        type: 'card',
        content: JSON.stringify({
          title: 'Fast Performance',
          content: 'Lightning-fast loading times and optimized performance for the best user experience.',
          icon: 'zap'
        }),
        styles: { padding: '30px', textAlign: 'center' },
        position: { x: 50, y: 50 },
        size: { width: 250, height: 300 }
      },
      {
        id: 'features-2',
        type: 'card',
        content: JSON.stringify({
          title: 'Secure & Reliable',
          content: 'Enterprise-grade security with 99.9% uptime guarantee for your peace of mind.',
          icon: 'shield'
        }),
        styles: { padding: '30px', textAlign: 'center' },
        position: { x: 320, y: 50 },
        size: { width: 250, height: 300 }
      },
      {
        id: 'features-3',
        type: 'card',
        content: JSON.stringify({
          title: '24/7 Support',
          content: 'Round-the-clock customer support to help you whenever you need assistance.',
          icon: 'headphones'
        }),
        styles: { padding: '30px', textAlign: 'center' },
        position: { x: 590, y: 50 },
        size: { width: 250, height: 300 }
      }
    ]
  },
  {
    id: '8',
    name: 'Team Section',
    category: 'business',
    type: 'section',
    preview: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop',
    tags: ['team', 'people', 'about'],
    isPro: true,
    elements: [
      {
        id: 'team-1',
        type: 'card',
        content: JSON.stringify({
          title: 'John Smith',
          content: 'CEO & Founder',
          imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop'
        }),
        styles: { textAlign: 'center', padding: '20px' },
        position: { x: 100, y: 100 },
        size: { width: 200, height: 300 }
      },
      {
        id: 'team-2',
        type: 'card',
        content: JSON.stringify({
          title: 'Sarah Johnson',
          content: 'CTO',
          imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b278?w=300&h=300&fit=crop'
        }),
        styles: { textAlign: 'center', padding: '20px' },
        position: { x: 350, y: 100 },
        size: { width: 200, height: 300 }
      },
      {
        id: 'team-3',
        type: 'card',
        content: JSON.stringify({
          title: 'Mike Davis',
          content: 'Lead Designer',
          imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop'
        }),
        styles: { textAlign: 'center', padding: '20px' },
        position: { x: 600, y: 100 },
        size: { width: 200, height: 300 }
      }
    ]
  },
  {
    id: '9',
    name: 'Newsletter Signup',
    category: 'contact',
    type: 'component',
    preview: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
    tags: ['newsletter', 'signup', 'email'],
    isPro: false,
    elements: [
      {
        id: 'newsletter-1',
        type: 'newsletter-form',
        content: JSON.stringify({
          title: 'Stay Updated',
          subtitle: 'Get the latest news and updates delivered to your inbox.',
          placeholder: 'Enter your email address',
          buttonText: 'Subscribe'
        }),
        styles: {
          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
          color: 'white',
          padding: '50px',
          textAlign: 'center',
          borderRadius: '12px'
        },
        position: { x: 100, y: 100 },
        size: { width: 600, height: 300 }
      }
    ]
  },
  {
    id: '10',
    name: 'Blog Post Card',
    category: 'blog',
    type: 'component',
    preview: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=300&fit=crop',
    tags: ['blog', 'post', 'article'],
    isPro: false,
    elements: [
      {
        id: 'blog-card-1',
        type: 'card',
        content: JSON.stringify({
          title: 'How to Build Amazing Websites',
          content: 'Discover the secrets to creating stunning, high-performing websites that engage users and drive results.',
          imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=200&fit=crop',
          buttonText: 'Read More',
          author: 'Jane Doe',
          date: 'March 15, 2024'
        }),
        styles: { borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' },
        position: { x: 100, y: 100 },
        size: { width: 350, height: 450 }
      }
    ]
  },
  {
    id: '11',
    name: 'E-commerce Product Card',
    category: 'ecommerce',
    type: 'component',
    preview: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    tags: ['product', 'ecommerce', 'shop'],
    isPro: false,
    elements: [
      {
        id: 'product-1',
        type: 'card',
        content: JSON.stringify({
          title: 'Premium Headphones',
          content: 'High-quality wireless headphones with noise cancellation',
          price: '$199.99',
          originalPrice: '$249.99',
          imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
          buttonText: 'Add to Cart',
          rating: 4.5
        }),
        styles: { borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0' },
        position: { x: 100, y: 100 },
        size: { width: 280, height: 400 }
      }
    ]
  },
  {
    id: '12',
    name: 'Testimonials Slider',
    category: 'business',
    type: 'section',
    preview: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
    tags: ['testimonials', 'reviews', 'slider'],
    isPro: true,
    elements: [
      {
        id: 'testimonials-1',
        type: 'testimonial',
        content: JSON.stringify({
          quote: 'This service exceeded all our expectations. Highly recommended!',
          author: 'Alex Thompson',
          role: 'Marketing Director',
          company: 'TechCorp',
          rating: 5
        }),
        styles: { textAlign: 'center', padding: '40px' },
        position: { x: 100, y: 100 },
        size: { width: 600, height: 300 }
      }
    ]
  },
  {
    id: '13',
    name: 'FAQ Section',
    category: 'business',
    type: 'section',
    preview: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop',
    tags: ['faq', 'questions', 'help'],
    isPro: false,
    elements: [
      {
        id: 'faq-1',
        type: 'container',
        content: 'FAQ Container',
        styles: { padding: '60px 20px' },
        position: { x: 0, y: 0 },
        size: { width: 800, height: 500 },
        children: [
          {
            id: 'faq-title',
            type: 'heading',
            content: 'Frequently Asked Questions',
            styles: { fontSize: '36px', fontWeight: 'bold', textAlign: 'center', marginBottom: '40px' },
            position: { x: 0, y: 0 },
            size: { width: 800, height: 50 }
          }
        ]
      }
    ]
  },
  {
    id: '14',
    name: 'Stats Counter Section',
    category: 'business',
    type: 'section',
    preview: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
    tags: ['statistics', 'numbers', 'achievements'],
    isPro: false,
    elements: [
      {
        id: 'stats-1',
        type: 'container',
        content: 'Stats Container',
        styles: {
          background: 'linear-gradient(135deg, #1e40af 0%, #3730a3 100%)',
          color: 'white',
          padding: '60px 20px',
          textAlign: 'center'
        },
        position: { x: 0, y: 0 },
        size: { width: 800, height: 300 }
      }
    ]
  },
  {
    id: '15',
    name: 'Services Grid',
    category: 'business',
    type: 'section',
    preview: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
    tags: ['services', 'grid', 'business'],
    isPro: true,
    elements: [
      {
        id: 'services-1',
        type: 'card',
        content: JSON.stringify({
          title: 'Web Design',
          content: 'Custom website design tailored to your brand',
          icon: 'palette'
        }),
        styles: { padding: '30px', textAlign: 'center', border: '1px solid #e2e8f0', borderRadius: '8px' },
        position: { x: 50, y: 50 },
        size: { width: 350, height: 250 }
      },
      {
        id: 'services-2',
        type: 'card',
        content: JSON.stringify({
          title: 'Development',
          content: 'Full-stack development with modern technologies',
          icon: 'code'
        }),
        styles: { padding: '30px', textAlign: 'center', border: '1px solid #e2e8f0', borderRadius: '8px' },
        position: { x: 450, y: 50 },
        size: { width: 350, height: 250 }
      }
    ]
  },
  {
    id: '16',
    name: 'Image Gallery Grid',
    category: 'portfolio',
    type: 'section',
    preview: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=300&fit=crop',
    tags: ['gallery', 'images', 'portfolio'],
    isPro: true,
    elements: [
      {
        id: 'gallery-grid-1',
        type: 'container',
        content: 'Gallery Grid',
        styles: { padding: '40px 20px' },
        position: { x: 0, y: 0 },
        size: { width: 800, height: 600 }
      }
    ]
  },
  {
    id: '17',
    name: 'Video Background Hero',
    category: 'landing',
    type: 'section',
    preview: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    tags: ['hero', 'video', 'modern'],
    isPro: true,
    elements: [
      {
        id: 'video-hero-1',
        type: 'hero',
        content: JSON.stringify({
          title: 'Innovation Starts Here',
          subtitle: 'Transforming ideas into digital reality',
          buttonText: 'Discover More',
          hasVideo: true
        }),
        styles: {
          background: 'rgba(0,0,0,0.6)',
          color: 'white',
          textAlign: 'center',
          padding: '100px 20px'
        },
        position: { x: 0, y: 0 },
        size: { width: 800, height: 500 }
      }
    ]
  },
  {
    id: '18',
    name: 'Footer Complete',
    category: 'business',
    type: 'section',
    preview: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
    tags: ['footer', 'complete', 'links'],
    isPro: false,
    elements: [
      {
        id: 'footer-1',
        type: 'footer',
        content: JSON.stringify({
          companyName: 'Your Company',
          links: ['About', 'Services', 'Contact', 'Privacy Policy']
        }),
        styles: {},
        position: { x: 0, y: 0 },
        size: { width: 800, height: 300 }
      }
    ]
  }
];

export const TemplateLibraryPlugin = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Categories', icon: Grid },
    { id: 'landing', label: 'Landing Pages', icon: Monitor },
    { id: 'business', label: 'Business', icon: Briefcase },
    { id: 'portfolio', label: 'Portfolio', icon: Camera },
    { id: 'blog', label: 'Blog', icon: FileText },
    { id: 'ecommerce', label: 'E-commerce', icon: ShoppingCart },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  const types = [
    { id: 'all', label: 'All Types' },
    { id: 'full-page', label: 'Full Pages' },
    { id: 'section', label: 'Sections' },
    { id: 'component', label: 'Components' }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesType = selectedType === 'all' || template.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const handleImportTemplate = (template: Template) => {
    // In a real implementation, this would integrate with the visual builder
    toast({
      title: "Template Imported",
      description: `${template.name} has been added to your canvas.`,
    });
  };

  const handlePreviewTemplate = (template: Template) => {
    toast({
      title: "Preview Mode",
      description: `Previewing ${template.name}`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Template Library</h2>
          <p className="text-gray-600 mt-1">Professional templates and components for your website</p>
        </div>
        <Badge variant="secondary" className="px-3 py-1">
          {filteredTemplates.length} Templates
        </Badge>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex space-x-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                {types.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="group hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={template.preview}
                alt={template.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              {template.isPro && (
                <Badge className="absolute top-2 right-2 bg-yellow-500">
                  <Star className="w-3 h-3 mr-1" />
                  Pro
                </Badge>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handlePreviewTemplate(template)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleImportTemplate(template)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{template.name}</h3>
                <Badge variant="outline" className="text-xs">
                  {template.type}
                </Badge>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {template.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 capitalize">
                  {template.category}
                </span>
                <Button
                  size="sm"
                  onClick={() => handleImportTemplate(template)}
                  className="ml-auto"
                >
                  Import
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Layout className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or browse different categories.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
