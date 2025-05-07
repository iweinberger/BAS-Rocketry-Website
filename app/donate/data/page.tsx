'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function DonationForm() {
  const searchParams = useSearchParams()
  const [iframeUrl, setIframeUrl] = useState<string>('')

  useEffect(() => {
    const handleDonation = async () => {
      if (!searchParams) return

      const tdv = searchParams.get('tdv')
      const un = searchParams.get('un')
      const ue = searchParams.get('ue')
      const goods = searchParams.get('goods')

      if (!tdv || !un || !ue || !goods) {
        console.error('Missing required parameters')
        return
      }

      const formData = new URLSearchParams({
        'donation[subtitle]': '',
        'donation[name]': un,
        'donation[email]': ue,
        'donation[message]': '',
        'donation[amount]': tdv,
        'donation[goods]': goods,
        'donation[anonymous]': '0',
        'donation[utm_source]': 'basrocketry.com',
        'donation[utm_medium]': '',
        'donation[utm_campaign]': 'donation-page',
        'donation[utm_term]': '',
        'donation[utm_content]': '',
        'donation[referrer]': '',
        'commit': 'Continue →'
      })

      try {
        const response = await fetch('https://hcb.hackclub.com/donations/start/bas-rocketry', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData.toString()
        })

        if (response.ok) {
          setIframeUrl(response.url)
        } else {
          console.error('Failed to process donation')
        }
      } catch (error) {
        console.error('Error processing donation:', error)
      }
    }

    handleDonation()
  }, [searchParams])

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      {iframeUrl && (
        <iframe
          src={iframeUrl}
          style={{
            width: '100%',
            height: '100%',
            border: 'none'
          }}
          title="Donation Form"
        />
      )}
    </div>
  )
}

export default function DonationData() {
  return (
    <Suspense fallback={
      <div style={{ 
        width: '100%', 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f5f5f5'
      }}>
        <div style={{ 
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          Loading donation form...
        </div>
      </div>
    }>
      <DonationForm />
    </Suspense>
  )
} 