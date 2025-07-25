'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useIntl } from 'react-intl'
import Navbar from '@/components/ui/Navbar'
import DemeterCard from '@/components/ui/DemeterCard'
import DemeterAppCard from '@/components/ui/DemeterAppCard'
import NewsCard from '@/components/ui/NewsCard'
import DemeterPics from '@/components/ui/DemeterPics'

export default function WelcomePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const intl = useIntl()

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/auth/signin')
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    )
  }

  if (!session) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar />

      <main className="container mx-auto px-6 py-8 min-h-[calc(100vh-64px)]">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            {intl.formatMessage(
              { id: 'welcome.greeting' },
              { name: session.user?.name || 'User' }
            )}
          </h1>
        </div>

        {/* Custom Grid */}
        <div className="grid grid-cols-[2fr_1fr] gap-8 items-start">
          {/* Left column: stacked AppCard + Pics */}
          <div className="flex flex-col gap-8">
            <DemeterAppCard />
            <DemeterPics />
          </div>

          {/* Right column: News */}
          <div>
            <NewsCard />
          </div>
        </div>
      </main>
    </div>
  )
}
