'use client';

import { useEffect } from 'react';

export default function JotformEmbed() {
  useEffect(() => {
    // Optional: Log or trigger something once iframe loads
  }, []);

  return (
    <iframe
      id="JotFormIFrame-251188477753267"
      title="Donation Form"
      src="https://bas-rocketry.pages.dev/forms"
      frameBorder="0"
      scrolling="no"
      style={{
        width: '1px',
        minWidth: '100%',
        height: '1200px',
        border: 'none',
      }}
    />
  );
}
