import { useState, useRef } from 'react';

interface Position {
  x: number;
  y: number;
}

const DEFAULT_POSITION = { x: 0, y: 0 };

export function useDragController() {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState<Position>(DEFAULT_POSITION);
  const [dragStart, setDragStart] = useState<Position>(DEFAULT_POSITION);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleReset = () => {
    setPosition(DEFAULT_POSITION);
    setIsDragging(false)
  };

  return {
    isDragging,
    position,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleReset
  };
}