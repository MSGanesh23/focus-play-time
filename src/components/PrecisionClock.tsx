import { useState, useEffect } from 'react';

export function PrecisionClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 10); // Update every 10ms for smooth millisecond display

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const milliseconds = Math.floor(date.getMilliseconds() / 10).toString().padStart(2, '0');
    
    return { hours, minutes, seconds, milliseconds };
  };

  const { hours, minutes, seconds, milliseconds } = formatTime(time);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold text-muted-foreground">Current Time</h2>
        
        <div className="card-glow rounded-2xl p-8 border border-border/50">
          <div className="timer-display text-6xl md:text-8xl font-bold text-center">
            <span className="gradient-text">
              {hours}:{minutes}:{seconds}
            </span>
            <span className="text-3xl md:text-4xl text-muted-foreground ml-2">
              .{milliseconds}
            </span>
          </div>
          
          <div className="flex justify-center mt-6 space-x-8 text-sm text-muted-foreground uppercase tracking-wider">
            <div className="text-center">
              <div className="font-semibold">Hours</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">Minutes</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">Seconds</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">MS</div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center space-y-2">
        <p className="text-muted-foreground">
          Precision timing with millisecond accuracy
        </p>
        <p className="text-sm text-muted-foreground/70">
          {new Date().toLocaleDateString(undefined, { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>
    </div>
  );
}