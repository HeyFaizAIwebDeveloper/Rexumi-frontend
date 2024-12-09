import { useState, useCallback } from 'react';

export function useZoom(initialZoom: number = 1, minZoom: number = 0.5, maxZoom: number = 2) {
  const [zoom, setZoom] = useState(initialZoom);

  const handleZoomIn = useCallback(() => 
    setZoom(prev => Math.min(prev * 1.2, maxZoom))
  , [maxZoom]);

  const handleZoomOut = useCallback(() => 
    setZoom(prev => Math.max(prev / 1.2, minZoom))
  , [minZoom]);

  const handleResetZoom = useCallback(() => 
    setZoom(initialZoom)
  , [initialZoom]);

  return { zoom, handleZoomIn, handleZoomOut, handleResetZoom };
}

