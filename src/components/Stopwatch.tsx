import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Lap {
  id: number;
  time: number;
  lapTime: number;
}

export function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  const [lastLapTime, setLastLapTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (centiseconds: number) => {
    const totalSeconds = Math.floor(centiseconds / 100);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const cs = centiseconds % 100;
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
  };

  const toggleStopwatch = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    setLastLapTime(0);
  };

  const addLap = () => {
    if (time > 0) {
      const lapTime = time - lastLapTime;
      const newLap: Lap = {
        id: laps.length + 1,
        time: time,
        lapTime: lapTime
      };
      setLaps(prev => [newLap, ...prev]);
      setLastLapTime(time);
    }
  };

  const fastestLap = laps.length > 0 ? Math.min(...laps.map(l => l.lapTime)) : 0;
  const slowestLap = laps.length > 0 ? Math.max(...laps.map(l => l.lapTime)) : 0;

  const getLapStyle = (lapTime: number) => {
    if (laps.length < 2) return '';
    if (lapTime === fastestLap) return 'text-accent';
    if (lapTime === slowestLap) return 'text-destructive';
    return '';
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="card-glow border-border/50">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl gradient-text">Stopwatch</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Timer Display */}
          <div className="text-center space-y-4">
            <div className={`timer-display text-7xl font-bold transition-colors duration-300 ${
              isRunning ? 'gradient-text pulse-glow' : 'text-muted-foreground'
            }`}>
              {formatTime(time)}
            </div>
            
            <div className="text-sm text-muted-foreground uppercase tracking-wider">
              Minutes : Seconds . Centiseconds
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4">
            <Button
              onClick={toggleStopwatch}
              size="lg"
              variant={isRunning ? "secondary" : "default"}
              className={`px-8 py-4 text-lg font-semibold transition-all duration-300 ${
                isRunning ? 'bg-gradient-secondary' : 'bg-gradient-primary'
              } hover:scale-105`}
            >
              {isRunning ? (
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
              onClick={addLap}
              variant="outline"
              size="lg"
              className="px-6 py-4"
              disabled={time === 0}
            >
              <Flag className="mr-2 h-5 w-5" />
              Lap
            </Button>
            
            <Button
              onClick={reset}
              variant="outline"
              size="lg"
              className="px-6 py-4"
              disabled={time === 0 && laps.length === 0}
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Laps */}
      {laps.length > 0 && (
        <Card className="card-glow border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Lap Times</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64">
              <div className="space-y-2">
                {laps.map((lap) => (
                  <div
                    key={lap.id}
                    className="flex justify-between items-center p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-medium text-muted-foreground">
                      Lap {lap.id}
                    </span>
                    <div className="text-right space-y-1">
                      <div className={`timer-display font-bold ${getLapStyle(lap.lapTime)}`}>
                        {formatTime(lap.lapTime)}
                      </div>
                      <div className="text-xs text-muted-foreground timer-display">
                        Total: {formatTime(lap.time)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            {laps.length > 1 && (
              <div className="mt-4 pt-4 border-t border-border flex justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Flag className="h-4 w-4 text-accent" />
                  <span>Fastest: <span className="timer-display font-bold text-accent">{formatTime(fastestLap)}</span></span>
                </div>
                <div className="flex items-center space-x-2">
                  <Flag className="h-4 w-4 text-destructive" />
                  <span>Slowest: <span className="timer-display font-bold text-destructive">{formatTime(slowestLap)}</span></span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}