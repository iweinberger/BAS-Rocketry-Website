'use client';
 
 import { useEffect } from 'react';
 
  import { useSearchParams } from 'next/navigation'

  export default function MyComponent() {
    const searchParams = useSearchParams()

    const myValue = searchParams.get('finalDonationValue') // gets the value of ?myKey=...
    alert(myValue)
    return <div>{myValue}</div>
  }


 export default function JotformEmbed() {
   useEffect(() => {
     // Optional: Log or trigger something once iframe loads
   }, []);
 
   return (
     <iframe
       id="JotFormIFrame-251237733687263"
       title="Donation Form"
       allow="geolocation; microphone; camera"
       src="https://www.jotform.com/251237733687263"
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

