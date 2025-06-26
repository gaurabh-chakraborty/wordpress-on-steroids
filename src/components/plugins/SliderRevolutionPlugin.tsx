
import React, { useState } from 'react';
import { Settings, Play, Pause, RotateCcw, ImageIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const SliderRevolutionPlugin = () => {
  const [sliders, setSliders] = useState([
    {
      id: '1',
      name: 'Homepage Hero Slider',
      slides: 3,
      autoplay: true,
      duration: 5000,
      transition: 'fade'
    }
  ]);

  const [selectedSlider, setSelectedSlider] = useState(sliders[0]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Play className="w-5 h-5" />
            <span>Slider Revolution</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Create stunning responsive sliders with advanced animations and effects.
          </p>

          <Tabs defaultValue="sliders" className="w-full">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="sliders">Sliders</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="animations">Animations</TabsTrigger>
            </TabsList>

            <TabsContent value="sliders" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Your Sliders</h3>
                <Button>
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Create New Slider
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sliders.map((slider) => (
                  <Card key={slider.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-sm">{slider.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>Slides: {slider.slides}</p>
                        <p>Duration: {slider.duration}ms</p>
                        <p>Transition: {slider.transition}</p>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="outline">Preview</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="slider-name">Slider Name</Label>
                  <Input id="slider-name" value={selectedSlider.name} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="slide-duration">Duration (ms)</Label>
                    <Input id="slide-duration" type="number" value={selectedSlider.duration} />
                  </div>
                  <div>
                    <Label htmlFor="transition-type">Transition</Label>
                    <Select value={selectedSlider.transition}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fade">Fade</SelectItem>
                        <SelectItem value="slide">Slide</SelectItem>
                        <SelectItem value="zoom">Zoom</SelectItem>
                        <SelectItem value="cube">Cube</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="autoplay" checked={selectedSlider.autoplay} />
                  <Label htmlFor="autoplay">Enable Autoplay</Label>
                </div>

                <div>
                  <Label>Navigation Arrows</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="show-arrows" />
                      <Label htmlFor="show-arrows">Show Navigation Arrows</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="show-dots" />
                      <Label htmlFor="show-dots">Show Pagination Dots</Label>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="animations" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Animation Effects</h3>
                
                <div>
                  <Label>Slide In Animation</Label>
                  <Select defaultValue="slideInLeft">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="slideInLeft">Slide In Left</SelectItem>
                      <SelectItem value="slideInRight">Slide In Right</SelectItem>
                      <SelectItem value="fadeIn">Fade In</SelectItem>
                      <SelectItem value="zoomIn">Zoom In</SelectItem>
                      <SelectItem value="bounceIn">Bounce In</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Animation Speed</Label>
                  <div className="mt-2">
                    <Slider defaultValue={[1000]} max={3000} min={300} step={100} />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>Fast</span>
                      <span>Slow</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="parallax" />
                    <Label htmlFor="parallax">Enable Parallax Effect</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="ken-burns" />
                    <Label htmlFor="ken-burns">Ken Burns Effect</Label>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
