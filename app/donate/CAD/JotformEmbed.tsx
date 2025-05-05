'use client'

import { useSearchParams } from 'next/navigation'

export default function JotformEmbed() {
  const searchParams = useSearchParams()
  const finalDonationValue = searchParams.get('finalDonationValue')

  const jotformUrl = `https://www.jotform.com/251237733687263?typeA=${encodeURIComponent(finalDonationValue || '')}`

  return (
    <iframe
      id="JotFormIFrame-251237733687263"
      title="Donation Form"
      allow="geolocation; microphone; camera"
      src={jotformUrl}
      frameBorder="0"
      scrolling="no"
      style={{
        width: '1px',
        minWidth: '100%',
        height: '1500px',
        border: 'none',
      }}
    />
  )
}
