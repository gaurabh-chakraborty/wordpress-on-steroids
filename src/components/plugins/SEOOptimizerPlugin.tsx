
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Search, CheckCircle, AlertCircle, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const SEOOptimizerPlugin = () => {
  const { toast } = useToast();
  const [seoSettings, setSeoSettings] = useState({
    autoOptimize: true,
    keywordDensity: 2.5,
    enableSitemap: true,
    metaDescriptions: true,
    imageAlt: true
  });

  const [seoAnalysis] = useState({
    overallScore: 85,
    issues: [
      { type: 'warning', message: 'Some images missing alt text', count: 3 },
      { type: 'error', message: 'Meta description too long on 2 pages', count: 2 },
      { type: 'success', message: 'All pages have title tags', count: 12 }
    ],
    recommendations: [
      'Add meta descriptions to remaining pages',
      'Optimize image file sizes',
      'Improve internal linking structure'
    ]
  });

  const handleOptimize = () => {
    toast({
      title: "SEO Optimization Started",
      description: "Analyzing and optimizing your content for search engines...",
    });

    setTimeout(() => {
      toast({
        title: "SEO Optimization Complete",
        description: "Successfully optimized 12 pages and generated sitemap.xml",
      });
    }, 2000);
  };

  const generateSitemap = () => {
    toast({
      title: "Sitemap Generated",
      description: "sitemap.xml has been created and submitted to search engines",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <span>SEO Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">{seoAnalysis.overallScore}</div>
              <div className="text-sm text-gray-600">SEO Score</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">12</div>
              <div className="text-sm text-gray-600">Pages Optimized</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">5</div>
              <div className="text-sm text-gray-600">Issues Found</div>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            {seoAnalysis.issues.map((issue, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                {issue.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
                {issue.type === 'warning' && <AlertCircle className="w-5 h-5 text-yellow-500" />}
                {issue.type === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
                <span className="flex-1">{issue.message}</span>
                <Badge variant={issue.type === 'error' ? 'destructive' : issue.type === 'warning' ? 'outline' : 'default'}>
                  {issue.count}
                </Badge>
              </div>
            ))}
          </div>

          <Button onClick={handleOptimize} className="w-full">
            <Zap className="w-4 h-4 mr-2" />
            Run SEO Optimization
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SEO Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium">Auto-optimize content</label>
              <p className="text-sm text-gray-600">Automatically optimize new content for SEO</p>
            </div>
            <Switch 
              checked={seoSettings.autoOptimize}
              onCheckedChange={(checked) => setSeoSettings(prev => ({...prev, autoOptimize: checked}))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium">Generate XML Sitemap</label>
              <p className="text-sm text-gray-600">Automatically generate and update sitemap.xml</p>
            </div>
            <Switch 
              checked={seoSettings.enableSitemap}
              onCheckedChange={(checked) => setSeoSettings(prev => ({...prev, enableSitemap: checked}))}
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Target Keyword Density (%)</label>
            <Input
              type="number"
              value={seoSettings.keywordDensity}
              onChange={(e) => setSeoSettings(prev => ({...prev, keywordDensity: parseFloat(e.target.value)}))}
              step="0.1"
              min="1"
              max="5"
            />
          </div>

          <Button onClick={generateSitemap} variant="outline" className="w-full">
            Generate Sitemap Now
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {seoAnalysis.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <span className="text-sm">{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
