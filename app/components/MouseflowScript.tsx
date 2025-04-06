'use client';

import { useEffect } from 'react';

export default function MouseflowScript() {
  useEffect(() => {
    window._mfq = window._mfq || [];
    
    (function() {
      var mf = document.createElement("script");
      mf.type = "text/javascript";
      mf.defer = true;
      mf.src = "//cdn.mouseflow.com/projects/ee5128fc-9845-4a1e-8f16-3960fa1e22dd.js";
      document.getElementsByTagName("head")[0].appendChild(mf);
    })();
  }, []);

  return null;
} 