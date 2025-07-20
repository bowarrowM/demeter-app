// mock - dummy data
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const mockNews = [
      {
        id: 1,
        title: 'Soğan fiyatlarında artış',
        content: 'Kötü hava koşulları soğanı vurdu',
        date: new Date().toISOString(),
      },
      {
        id: 2,
        title: 'Biber fiyatlarında artış',
        content: 'Kötü hava koşulları biberi vurdu',
        date: new Date().toISOString(),
      },
    ];

    return NextResponse.json(mockNews);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
