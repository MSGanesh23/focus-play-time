import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Plus, Target } from 'lucide-react';

const SchedulePage = () => {
  const upcomingTasks = [
    { id: 1, title: 'Morning Focus Session', time: '9:00 AM', duration: '25 min', type: 'pomodoro' },
    { id: 2, title: 'Team Meeting', time: '10:30 AM', duration: '30 min', type: 'timer' },
    { id: 3, title: 'Deep Work Block', time: '2:00 PM', duration: '90 min', type: 'pomodoro' },
    { id: 4, title: 'Review & Planning', time: '4:30 PM', duration: '20 min', type: 'timer' },
  ];

  return (
    <div className="container mx-auto max-w-4xl space-y-6">
      <Card className="card-glow border-border/50">
        <CardHeader>
          <CardTitle className="text-2xl gradient-text flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            Focus Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Today's Schedule</h3>
              <p className="text-muted-foreground">
                {new Date().toLocaleDateString(undefined, { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <Button className="bg-gradient-primary">
              <Plus className="h-4 w-4 mr-2" />
              Add Session
            </Button>
          </div>

          <div className="space-y-3">
            {upcomingTasks.map((task) => (
              <Card key={task.id} className="border-border/30 hover:bg-muted/20 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${
                        task.type === 'pomodoro' ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'
                      }`}>
                        {task.type === 'pomodoro' ? <Target className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                      </div>
                      <div>
                        <h4 className="font-semibold">{task.title}</h4>
                        <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                          <span>{task.time}</span>
                          <span>•</span>
                          <span>{task.duration}</span>
                          <span>•</span>
                          <span className="capitalize">{task.type}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Start
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="card-glow border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Target className="h-6 w-6" />
              <span>25 min Focus</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Clock className="h-6 w-6" />
              <span>Custom Timer</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Calendar className="h-6 w-6" />
              <span>Schedule Block</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Plus className="h-6 w-6" />
              <span>New Session</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchedulePage;