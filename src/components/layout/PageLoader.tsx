import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export function PageLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);
  useEffect(() => { onCompleteRef.current = onComplete; });

  useEffect(() => {
    // Deterministic: reach 100% in ~1.8 seconds, then dismiss
    const DURATION = 1800; // ms total
    const STEPS = 20;
    const INTERVAL = DURATION / STEPS;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const pct = Math.min(Math.round((step / STEPS) * 100), 100);
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => onCompleteRef.current(), 400);
      }
    }, INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0d0d0d]"
      exit={{ y: '-100%', opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="w-64">
        <div className="mb-2 flex justify-between font-mono text-xs uppercase tracking-widest text-neutral-400">
          <span>System Initializing</span>
          <span>{progress}%</span>
        </div>
        <div className="h-0.5 w-full bg-neutral-800">
          <motion.div
            className="h-full bg-blue-600"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'linear', duration: 0.1 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
