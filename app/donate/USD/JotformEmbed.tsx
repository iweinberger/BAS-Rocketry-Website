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
       allow="geolocation; microphone; camera"
       src="https://www.jotform.com/251188477753267"
       frameBorder="0"
       scrolling="no"
       style={{
         width: '1px',
         minWidth: '100%',
         height: '1500px',
         border: 'none',
       }}
     />
   );
 }

