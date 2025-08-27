import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type PomodoroPhase = 'work' | 'shortBreak' | 'longBreak';

interface PomodoroSettings {
  work: number;
  shortBreak: number;
  longBreak: number;
  longBreakInterval: number;
}

export function Pomodoro() {
  const [settings] = useState<PomodoroSettings>({
    work: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
    longBreakInterval: 4
  });

  const [currentPhase, setCurrentPhase] = useState<PomodoroPhase>('work');
  const [timeLeft, setTimeLeft] = useState(settings.work);
  const [isRunning, setIsRunning] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsRunning(false);
            setIsComplete(true);
            handlePhaseComplete();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handlePhaseComplete = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const messages = {
        work: 'Work session complete! Time for a break.',
        shortBreak: 'Break complete! Ready for another work session?',
        longBreak: 'Long break complete! Ready to get back to work?'
      };
      new Notification('Pomodoro Complete!', {
        body: messages[currentPhase],
        icon: '/favicon.ico'
      });
    }

    if (currentPhase === 'work') {
      setCompletedPomodoros(prev => prev + 1);
    }
  };

  const startNextPhase = () => {
    let nextPhase: PomodoroPhase;
    let nextDuration: number;

    if (currentPhase === 'work') {
      const shouldTakeLongBreak = (completedPomodoros + 1) % settings.longBreakInterval === 0;
      nextPhase = shouldTakeLongBreak ? 'longBreak' : 'shortBreak';
      nextDuration = shouldTakeLongBreak ? settings.longBreak : settings.shortBreak;
    } else {
      nextPhase = 'work';
      nextDuration = settings.work;
    }

    setCurrentPhase(nextPhase);
    setTimeLeft(nextDuration);
    setIsComplete(false);
    setIsRunning(true);
  };

  const reset = () => {
    setIsRunning(false);
    setCurrentPhase('work');
    setTimeLeft(settings.work);
    setIsComplete(false);
  };

  const toggle = () => {
    if (isComplete) {
      startNextPhase();
    } else {
      setIsRunning(!isRunning);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentPhaseDuration = () => {
    switch (currentPhase) {
      case 'work': return settings.work;
      case 'shortBreak': return settings.shortBreak;
      case 'longBreak': return settings.longBreak;
    }
  };

  const progress = ((getCurrentPhaseDuration() - timeLeft) / getCurrentPhaseDuration()) * 100;

  const phaseConfig = {
    work: {
      title: 'Focus Time',
      icon: Target,
      color: 'text-primary',
      bgColor: 'bg-gradient-primary'
    },
    shortBreak: {
      title: 'Short Break',
      icon: Coffee,
      color: 'text-secondary',
      bgColor: 'bg-gradient-secondary'
    },
    longBreak: {
      title: 'Long Break',
      icon: Coffee,
      color: 'text-accent',
      bgColor: 'bg-gradient-accent'
    }
  };

  const currentConfig = phaseConfig[currentPhase];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="card-glow border-border/50">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl gradient-text flex items-center justify-center gap-2">
            <currentConfig.icon className="h-6 w-6" />
            Pomodoro Timer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Phase Indicator */}
          <div className="text-center space-y-2">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${currentConfig.bgColor} text-white font-semibold`}>
              <currentConfig.icon className="h-4 w-4" />
              {currentConfig.title}
            </div>
            <div className="text-sm text-muted-foreground">
              Session {completedPomodoros + (currentPhase === 'work' ? 1 : 0)} 
              {currentPhase === 'work' && ` • Next break in ${settings.longBreakInterval - (completedPomodoros % settings.longBreakInterval)} sessions`}
            </div>
          </div>

          {/* Timer Display */}
          <div className="text-center space-y-6">
            <div className={`timer-display text-7xl font-bold transition-colors duration-300 ${
              isComplete ? 'text-accent bounce-gentle' : 
              isRunning ? currentConfig.color : 'text-muted-foreground'
            }`}>
              {formatTime(timeLeft)}
            </div>
            
            {/* Progress Bar */}
            <div className="space-y-2">
              <Progress 
                value={progress} 
                className={`h-3 ${isRunning ? 'pulse-glow' : ''}`}
              />
              <div className="text-xs text-muted-foreground">
                {Math.round(progress)}% complete
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4">
            <Button
              onClick={toggle}
              size="lg"
              className={`px-8 py-4 text-lg font-semibold transition-all duration-300 ${
                isComplete ? 'bg-gradient-accent bounce-gentle' :
                isRunning ? 'bg-gradient-secondary' : currentConfig.bgColor
              } hover:scale-105 text-white`}
            >
              {isComplete ? (
                <>
                  <Play className="mr-2 h-5 w-5" />
                  {currentPhase === 'work' ? 'Start Break' : 'Start Focus'}
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
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <Card className="card-glow border-border/50">
        <CardContent className="pt-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">{completedPomodoros}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-secondary">{Math.floor(completedPomodoros / settings.longBreakInterval)}</div>
              <div className="text-sm text-muted-foreground">Long Breaks</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-accent">{Math.floor(completedPomodoros * 25 / 60)}h</div>
              <div className="text-sm text-muted-foreground">Focus Time</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}