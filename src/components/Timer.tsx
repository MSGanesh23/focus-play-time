import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Timer() {
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes default
  const [initialTime, setInitialTime] = useState(5 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsRunning(false);
            setIsComplete(true);
            // Simple notification
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('Timer Complete!', {
                body: 'Your focus session is finished.',
                icon: '/favicon.ico'
              });
            }
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    if (isComplete) {
      reset();
      return;
    }
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
    setIsComplete(false);
  };

  const adjustTime = (minutes: number) => {
    if (isRunning) return;
    const newTime = Math.max(60, initialTime + (minutes * 60)); // Minimum 1 minute
    setInitialTime(newTime);
    setTimeLeft(newTime);
    setIsComplete(false);
  };

  const progress = ((initialTime - timeLeft) / initialTime) * 100;

  const presets = [
    { label: '5 min', value: 5 },
    { label: '15 min', value: 15 },
    { label: '25 min', value: 25 },
    { label: '45 min', value: 45 },
  ];

  const setPreset = (minutes: number) => {
    if (isRunning) return;
    const newTime = minutes * 60;
    setInitialTime(newTime);
    setTimeLeft(newTime);
    setIsComplete(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="card-glow border-border/50">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl gradient-text">Focus Timer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Timer Display */}
          <div className="text-center space-y-4">
            <div className={`timer-display text-7xl font-bold transition-colors duration-300 ${
              isComplete ? 'text-accent' : 
              isRunning ? 'gradient-text' : 'text-muted-foreground'
            }`}>
              {formatTime(timeLeft)}
            </div>
            
            {/* Progress Ring */}
            <div className="relative w-32 h-32 mx-auto">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-muted/30"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="transparent"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={`transition-all duration-1000 ${
                    isComplete ? 'text-accent' :
                    isRunning ? 'text-primary' : 'text-secondary'
                  }`}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="transparent"
                  strokeDasharray="100, 100"
                  strokeDashoffset={100 - progress}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4">
            <Button
              onClick={toggleTimer}
              size="lg"
              variant={isComplete ? "default" : isRunning ? "secondary" : "default"}
              className={`px-8 py-4 text-lg font-semibold transition-all duration-300 ${
                isComplete ? 'bounce-gentle bg-gradient-accent' :
                isRunning ? 'bg-gradient-secondary' : 'bg-gradient-primary'
              } hover:scale-105`}
            >
              {isComplete ? (
                <>
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Reset
                </>
              ) : isRunning ? (
                <>
                  <Pause className="mr-2 h-5 w-5" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="mr-2 h-5 w-5" />
                  Start
                </>
              )}
            </Button>
            
            <Button
              onClick={reset}
              variant="outline"
              size="lg"
              className="px-6 py-4"
              disabled={!isRunning && timeLeft === initialTime}
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
          </div>

          {/* Time Adjustment */}
          {!isRunning && (
            <div className="space-y-4">
              <div className="flex justify-center items-center space-x-4">
                <Button
                  onClick={() => adjustTime(-5)}
                  variant="outline"
                  size="sm"
                  disabled={initialTime <= 60}
                >
                  <Minus className="h-4 w-4 mr-1" />
                  5 min
                </Button>
                <span className="text-muted-foreground font-medium">
                  {Math.floor(initialTime / 60)} minutes
                </span>
                <Button
                  onClick={() => adjustTime(5)}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  5 min
                </Button>
              </div>

              {/* Presets */}
              <div className="flex justify-center space-x-2">
                {presets.map((preset) => (
                  <Button
                    key={preset.value}
                    onClick={() => setPreset(preset.value)}
                    variant={initialTime === preset.value * 60 ? "default" : "outline"}
                    size="sm"
                    className="text-xs"
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}