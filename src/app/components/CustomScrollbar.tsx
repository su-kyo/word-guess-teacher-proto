import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';

export const SCROLL_THUMB_HEIGHT = 145;

export function useFigmaScrollbar(topBottomOffset = 0) {
  const scrollableRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [thumbTop, setThumbTop] = useState(topBottomOffset);
  const [isScrollable, setIsScrollable] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollable = scrollableRef.current;

    if (!scrollable) {
      return;
    }

    const maxScroll = scrollable.scrollHeight - scrollable.clientHeight;
    if (maxScroll <= 0) {
      setIsScrollable(false);
      setThumbTop(topBottomOffset);
      return;
    }

    setIsScrollable(true);

    const track = trackRef.current;
    if (!track) {
      return;
    }

    const effectiveTrackHeight = Math.max(
      0,
      track.clientHeight - topBottomOffset * 2 - SCROLL_THUMB_HEIGHT
    );

    setThumbTop(topBottomOffset + (scrollable.scrollTop / maxScroll) * effectiveTrackHeight);
  }, [topBottomOffset]);

  useEffect(() => {
    const scrollable = scrollableRef.current;

    if (!scrollable) {
      return;
    }

    handleScroll();

    const resizeObserver = new ResizeObserver(() => {
      handleScroll();
    });

    resizeObserver.observe(scrollable);
    if (trackRef.current) {
      resizeObserver.observe(trackRef.current);
    }
    window.addEventListener('resize', handleScroll);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll, isScrollable]);

  return { scrollableRef, trackRef, thumbTop, handleScroll, isScrollable };
}

interface FigmaScrollTrackProps {
  trackRef: RefObject<HTMLDivElement>;
  thumbTop: number;
}

export function FigmaScrollTrack({ trackRef, thumbTop }: FigmaScrollTrackProps) {
  return (
    <div ref={trackRef} className="pointer-events-none relative h-full shrink-0 px-[8px]">
      <div
        className="absolute left-[8px] rounded-[16px] bg-white/65"
        style={{
          top: thumbTop,
          width: '4px',
          height: `${SCROLL_THUMB_HEIGHT}px`,
          transition: 'top 0.08s linear',
        }}
      />
    </div>
  );
}
