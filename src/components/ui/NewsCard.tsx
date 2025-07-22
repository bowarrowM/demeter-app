'use client'

import { useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { NewspaperIcon, ClockIcon } from '@heroicons/react/24/outline'

interface NewsItem {
    id: number
    title: string
    content: string
    date: string
}

export default function NewsCard() {
    const intl = useIntl()
    const [news, setNews] = useState<NewsItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true)
            try {
                // Simulate fetching news data
                const fakeNews: NewsItem[] = [
                    {
                        id: 1,
                        title: intl.formatMessage({ id: 'news.sampleTitle1' }),
                        content: intl.formatMessage({ id: 'news.sampleContent1' }),
                        date: new Date().toISOString().split('T')[0],
                    },
                    {
                        id: 2,
                        title: intl.formatMessage({ id: 'news.sampleTitle2' }),
                        content: intl.formatMessage({ id: 'news.sampleContent2' }),
                        date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
                    },
                ]

                // Simulate network delay
                setTimeout(() => {
                    setNews(fakeNews)
                    setLoading(false)
                }, 1000)
            } catch (err) {
                console.error('Failed to fetch news:', err)
                setLoading(false)
            }
        }

        fetchNews()
    }, [intl])

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
                <div className="text-center text-gray-500">Loading news...</div>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
            <div className="flex items-center mb-4">
                <NewspaperIcon className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">
                    {intl.formatMessage({ id: 'news.title' })}
                </h2>
            </div>

            <div className="space-y-4">
                {news.map((item) => (
                    <div key={item.id} className="border-b pb-4">
                        <div className="flex items-center text-sm text-gray-500 mb-1">
                            <ClockIcon className="h-4 w-4 mr-1" />
                            <span>{item.date}</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-700 mb-1">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.content}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
