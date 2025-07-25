'use client'

import { useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { ClockIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import { FC } from 'react'

interface NewsItem {
  id: number
  title: string
  content: string
  date: string
}

const NewsCard: FC = () => {
  const intl = useIntl()
  const [news, setNews] = useState<NewsItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [direction, setDirection] = useState(1) // 1 for forward, -1 for backward

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/news')
        const data: NewsItem[] = await res.json()
        setNews(data)
      } catch (err) {
        console.error('Failed to fetch news:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex(prev => 
        news.length <= 2 ? 0 : (prev + 2) % news.length
      )
    }, 8000)

    return () => clearInterval(interval)
  }, [news])

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex(prev => 
      prev === 0 ? news.length - (news.length % 2 || 2) : prev - 2
    )
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex(prev => 
      prev >= news.length - 2 ? 0 : prev + 2
    )
  }

  const visibleNews = news.slice(currentIndex, currentIndex + 2)

  // Loading skeleton
  if (loading) {
    return (
      <div className="flex flex-col items-center gap-8 py-6">
        <h2 className="text-2xl font-bold text-center text-emerald-800 bg-gradient-to-r from-emerald-600 to-amber-700 bg-clip-text text-transparent">
          {intl.formatMessage({ 
            id: 'welcome.demeter.newsTitle', 
            defaultMessage: 'Latest News' 
          })}
        </h2>
        
        <div className="flex justify-center gap-8 flex-wrap w-full">
          {[1, 2].map(id => (
            <div 
              key={id}
              className="bg-gradient-to-br from-emerald-50 to-amber-50 rounded-2xl shadow-lg p-6 max-w-md w-full border border-emerald-100"
            >
              <div className="animate-pulse">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-4 bg-emerald-200 rounded w-1/4"></div>
                </div>
                <div className="h-6 bg-emerald-300 rounded w-3/4 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-emerald-200 rounded w-full"></div>
                  <div className="h-4 bg-emerald-200 rounded w-5/6"></div>
                  <div className="h-4 bg-emerald-200 rounded w-4/6"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (news.length === 0) {
    return (
      <div className="flex flex-col items-center gap-6 py-8">
        <h2 className="text-2xl font-bold text-center text-emerald-800">
          {intl.formatMessage({ 
            id: 'welcome.demeter.newsTitle', 
            defaultMessage: 'Latest News' 
          })}
        </h2>
        <div className="bg-gradient-to-br from-emerald-50 to-amber-50 rounded-2xl shadow-lg p-8 max-w-md w-full border border-emerald-100 text-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-16 w-16 mx-auto text-emerald-400 mb-4"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
          <p className="text-emerald-700">
            {intl.formatMessage({
              id: 'news.error',
              defaultMessage: 'No news available at the moment'
            })}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-8 py-6">
      <h2 className="text-2xl font-bold text-center text-emerald-800 bg-gradient-to-r from-emerald-600 to-amber-700 bg-clip-text text-transparent">
        {intl.formatMessage({ 
          id: 'welcome.demeter.newsTitle', 
          defaultMessage: 'Latest News' 
        })}
      </h2>
      
      <div className="relative w-full max-w-4xl">
        <div className="flex justify-center gap-8 flex-wrap">
          <AnimatePresence mode="wait" custom={direction}>
            {visibleNews.map((item, index) => (
              <motion.div
                key={`${item.id}-${currentIndex}`}
                custom={direction}
                initial={{ 
                  opacity: 0, 
                  x: direction * 100 * (index === 0 ? -1 : 1)
                }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ 
                  opacity: 0, 
                  x: direction * -100 * (index === 0 ? -1 : 1)
                }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-emerald-50 to-amber-50 rounded-2xl shadow-lg p-6 max-w-md w-full border border-emerald-100 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                    <ClockIcon className="w-4 h-4" />
                    {new Date(item.date).toLocaleDateString(intl.locale, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <span className="text-xs text-amber-700 bg-amber-100 px-2 py-1 rounded-full">
                    #{item.id}
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-3 text-emerald-800">{item.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{item.content}</p>
                
                <div className="mt-4 pt-4 border-t border-emerald-100 flex justify-end">
                  <button className="text-sm text-emerald-600 hover:text-emerald-800 font-medium flex items-center">
                    {intl.formatMessage({ id: 'news.readMore' })}
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 ml-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M14 5l7 7m0 0l-7 7m7-7H3" 
                      />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {news.length > 2 && (
          <div className="flex justify-center mt-8 gap-4">
            <button 
              onClick={handlePrev}
              className="p-2 rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors"
              aria-label="Previous news"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 19l-7-7 7-7" 
                />
              </svg>
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.ceil(news.length / 2) }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx * 2)}
                  className={`w-3 h-3 rounded-full ${
                    currentIndex === idx * 2 
                      ? 'bg-emerald-600' 
                      : 'bg-emerald-200'
                  }`}
                  aria-label={`Go to news page ${idx + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={handleNext}
              className="p-2 rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors"
              aria-label="Next news"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default NewsCard