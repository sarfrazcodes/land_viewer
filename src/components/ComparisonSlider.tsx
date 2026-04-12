"use client";

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { ChevronsLeftRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
}

export default function ComparisonSlider({ beforeImage, afterImage }: ComparisonSliderProps) {
  const [position, setPosition] = useState(50);
  const [containerWidth, setContainerWidth] = useState(0);
  const [beforeLoaded, setBeforeLoaded] = useState(false);
  const [afterLoaded,  setAfterLoaded]  = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging   = useRef(false);

  const isReady = beforeLoaded && afterLoaded && containerWidth > 0;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setContainerWidth(el.offsetWidth));
    ro.observe(el);
    setContainerWidth(el.offsetWidth);
    return () => ro.disconnect();
  }, []);

  const getPercent = useCallback((clientX: number) => {
    if (!containerRef.current) return 50;
    const rect = containerRef.current.getBoundingClientRect();
    return Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 0), 100);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!isReady) return;
    e.preventDefault();
    isDragging.current = true;
    setPosition(getPercent(e.clientX));
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => { if (isDragging.current) setPosition(getPercent(e.clientX)); };
    const onUp   = () => { isDragging.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup',   onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, [getPercent]);

  const onTouchStart = (e: React.TouchEvent) => { if (isReady) setPosition(getPercent(e.touches[0].clientX)); };
  const onTouchMove  = (e: React.TouchEvent) => { if (isReady) setPosition(getPercent(e.touches[0].clientX)); };

  const clipW = containerWidth > 0 ? (containerWidth * position) / 100 : 0;

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video rounded-3xl overflow-hidden select-none bg-gray-900"
      style={{ cursor: isReady ? 'col-resize' : 'default' }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
    >
      {/* ── Premium Loading Overlay ── */}
      <AnimatePresence>
        {!isReady && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-6"
            style={{ background: "linear-gradient(135deg, #0f0c29, #1a1a4e, #0f0c29)" }}
          >
            {/* Shimmer skeleton images */}
            <div className="absolute inset-0 flex">
              <div className="w-1/2 h-full bg-gradient-to-r from-white/5 via-white/10 to-white/5 animate-pulse" />
              <div className="w-px bg-white/20" />
              <div className="w-1/2 h-full bg-gradient-to-r from-white/5 via-white/[0.07] to-white/5 animate-pulse" style={{ animationDelay: '0.3s' }} />
            </div>

            {/* Glow rings */}
            <div className="relative z-10 flex items-center justify-center">
              <div className="absolute w-24 h-24 rounded-full bg-indigo-500/20 animate-ping" style={{ animationDuration: '1.8s' }} />
              <div className="absolute w-16 h-16 rounded-full bg-cyan-500/30 animate-ping" style={{ animationDuration: '1.4s', animationDelay: '0.2s' }} />
              {/* Inner spinner */}
              <div className="relative w-14 h-14">
                <div className="absolute inset-0 rounded-full border-4 border-white/10" />
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-400 border-r-cyan-400 animate-spin" />
                <div className="absolute inset-[6px] rounded-full border-2 border-transparent border-b-purple-400 animate-spin" style={{ animationDuration: '0.7s', animationDirection: 'reverse' }} />
              </div>
            </div>

            {/* Text */}
            <div className="relative z-10 text-center">
              <p className="text-white font-semibold text-sm tracking-wide">Loading Comparison</p>
              <div className="flex items-center justify-center gap-1.5 mt-2">
                {[0, 0.2, 0.4].map((delay, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-indigo-400"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay }}
                  />
                ))}
              </div>
            </div>

            {/* Bottom label hints */}
            <div className="absolute bottom-5 inset-x-0 flex justify-between px-6 z-10">
              <span className="text-xs text-white/30 font-medium">BEFORE</span>
              <span className="text-xs text-white/30 font-medium">AFTER</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* After image */}
      <div className="absolute inset-0">
        <Image src={afterImage} alt="After" fill priority className="object-cover" sizes="(max-width: 768px) 100vw, 66vw" onLoad={() => setAfterLoaded(true)} />
        {isReady && (
          <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/20 z-10">
            <span className="text-white font-semibold text-sm">After</span>
          </div>
        )}
      </div>

      {/* Before image clipped */}
      {containerWidth > 0 && (
        <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: isReady ? clipW : 0 }}>
          <div className="absolute inset-y-0 left-0" style={{ width: containerWidth }}>
            <Image src={beforeImage} alt="Before" fill priority className="object-cover" sizes="(max-width: 768px) 100vw, 66vw" onLoad={() => setBeforeLoaded(true)} />
          </div>
          {isReady && (
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/20 z-10">
              <span className="text-white font-semibold text-sm">Before</span>
            </div>
          )}
        </div>
      )}

      {/* Divider + Handle */}
      {isReady && (
        <>
          <div className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)] z-20 pointer-events-none" style={{ left: `${position}%` }} />
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 pointer-events-none"
            style={{ left: `${position}%` }}
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-white/30 blur-md scale-150" />
              <div className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl border border-gray-100">
                <ChevronsLeftRight className="w-5 h-5 text-gray-700" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
