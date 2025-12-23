'use client';
import React, { useEffect } from 'react';

function ClickjackingFixed({ children }: any) {
  useEffect(() => {
    const windowTop = window.top as Window;
    const windowSelf = window.self;
    if (windowTop !== windowSelf) {
      windowTop.location.href = windowSelf.location.href;
    }
  }, []);

  return <>{children}</>;
}

export default ClickjackingFixed;
