'use client';

import { useEffect } from 'react';
import { init } from '@noriginmedia/norigin-spatial-navigation';

export default function SpatialNavigationInit() {
  useEffect(() => {
    init({
      debug: false,
      visualDebug: false
    });
  }, []);

  return null;
}
