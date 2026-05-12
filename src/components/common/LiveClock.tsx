'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface LiveClockProps {
  className?: string;
  showIcon?: boolean;
}

export default function LiveClock({ className, showIcon = true }: LiveClockProps) {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!time) return null;

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {showIcon && <Clock size={16} />}
      <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>
        {time.toLocaleTimeString('vi-VN')}
      </span>
      <span style={{ fontSize: '0.8em', opacity: 0.8 }}>
        {time.toLocaleDateString('vi-VN')}
      </span>
    </div>
  );
}
