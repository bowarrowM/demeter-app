// app/api/news/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient, News as NewsModel } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  const acceptLang = req.headers.get('accept-language') || 'en'
  const locale = acceptLang.startsWith('tr') ? 'tr' : 'en'

  const news = await prisma.news.findMany({
    orderBy: { date: 'desc' },
  })

  const localizedNews = news.map((item: NewsModel) => ({
    id: item.id,
    title: locale === 'tr' ? item.title_tr : item.title_en,
    content: locale === 'tr' ? item.content_tr : item.content_en,
    date: item.date.toISOString().split('T')[0],
  }))

  return NextResponse.json(localizedNews)
}
