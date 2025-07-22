'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import Navbar from '@/components/ui/Navbar'
import DemeterCard from '@/components/ui/DemeterCard'
import NewsCard from '@/components/ui/NewsCard'

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
    return <div>Loading...</div>
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {intl.formatMessage({ id: 'welcome.greeting' }, { name: session.user?.name || 'User' })}
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="flex justify-center">
            <DemeterCard />
          </div>
          <div className="flex justify-center">
            <NewsCard />
          </div>
        </div>
      </main>
    </div>
  )
}
