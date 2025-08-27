import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Palette, Moon, Sun, Monitor } from 'lucide-react';

const ThemesPage = () => {
  const colorThemes = [
    { name: 'Purple Focus', primary: '280 100% 70%', secondary: '240 100% 70%', accent: '195 100% 60%' },
    { name: 'Ocean Breeze', primary: '195 100% 50%', secondary: '220 100% 60%', accent: '142 76% 40%' },
    { name: 'Forest Flow', primary: '142 76% 50%', secondary: '120 60% 50%', accent: '280 100% 70%' },
    { name: 'Sunset Glow', primary: '25 100% 60%', secondary: '350 100% 65%', accent: '195 100% 60%' },
  ];

  return (
    <div className="container mx-auto max-w-4xl space-y-6">
      <Card className="card-glow border-border/50">
        <CardHeader>
          <CardTitle className="text-2xl gradient-text flex items-center gap-2">
            <Palette className="h-6 w-6" />
            Customize Your Experience
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Theme Mode */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Appearance Mode</h3>
            <div className="grid grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Sun className="h-6 w-6" />
                <span>Light</span>
              </Button>
              <Button variant="default" className="h-20 flex-col space-y-2 bg-gradient-primary">
                <Moon className="h-6 w-6" />
                <span>Dark</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Monitor className="h-6 w-6" />
                <span>System</span>
              </Button>
            </div>
          </div>

          {/* Color Themes */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Color Themes</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {colorThemes.map((theme, index) => (
                <Card key={theme.name} className={`cursor-pointer transition-all duration-200 hover:scale-105 ${index === 0 ? 'ring-2 ring-primary' : ''}`}>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex space-x-2">
                      <div 
                        className="w-6 h-6 rounded-full" 
                        style={{ backgroundColor: `hsl(${theme.primary})` }}
                      />
                      <div 
                        className="w-6 h-6 rounded-full" 
                        style={{ backgroundColor: `hsl(${theme.secondary})` }}
                      />
                      <div 
                        className="w-6 h-6 rounded-full" 
                        style={{ backgroundColor: `hsl(${theme.accent})` }}
                      />
                    </div>
                    <div className="text-sm font-medium">{theme.name}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Preview</h3>
            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="timer-display text-4xl font-bold gradient-text">25:00</div>
                  <div className="flex space-x-2">
                    <Button className="bg-gradient-primary">Start Focus</Button>
                    <Button variant="outline">Reset</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Advanced Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Advanced Settings</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <label className="text-muted-foreground">Focus Duration</label>
                <div className="text-lg font-semibold">25 minutes</div>
              </div>
              <div className="space-y-2">
                <label className="text-muted-foreground">Break Duration</label>
                <div className="text-lg font-semibold">5 minutes</div>
              </div>
              <div className="space-y-2">
                <label className="text-muted-foreground">Long Break</label>
                <div className="text-lg font-semibold">15 minutes</div>
              </div>
              <div className="space-y-2">
                <label className="text-muted-foreground">Sound Alerts</label>
                <div className="text-lg font-semibold">Enabled</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemesPage;