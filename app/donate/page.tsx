import { useState, useEffect, useRef } from 'react';

export default function Home() {
  // ... (rest of your state and hooks)

  return (
    <>
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <title>BAS Rocketry - Our Team</title>
      </head>
      <main>

        {/* ✅ Jotform Embed */}
        <section>
          <iframe
            id="JotFormIFrame-251188477753267"
            title="Donation Form"
            onLoad={() => window?.parent?.scrollTo(0, 0)}
            allow="geolocation; microphone; camera; fullscreen"
            src="https://form.jotform.com/251188477753267"
            frameBorder="0"
            scrolling="no"
            style={{
              minWidth: '100%',
              maxWidth: '100%',
              height: '539px',
              border: 'none'
            }}
          />
          <script src="https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.jotformEmbedHandler("iframe[id='JotFormIFrame-251188477753267']", "https://form.jotform.com/");
              `
            }}
          />
        </section>

        <footer>
          <div className="footer-content">
            <div className="footer-section">
              <h3>BAS ROCKETRY</h3>
              <p>Don't over think it - we already did</p>
            </div>
            <div className="footer-section">
              <h3>QUICK LINKS</h3>
              <div className="footer-links">
                <a href="/">Home</a>
                <a href="/#about">About</a>
                <a href="/team">Team</a>
                <a href="/projects">Projects</a>
                <a href="/contact">Contact</a>
                <a href="/sponsors">Sponsors</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
