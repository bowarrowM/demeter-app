import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  console.log('Weather API route called');

  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city') || 'Istanbul';
  const type = searchParams.get('type') || 'current';

  console.log('Parameters:', { city, type });

  try {
    const apiKey = process.env.WEATHER_KEY || process.env.OPENWEATHER_API_KEY;

    console.log('API Key exists:', !!apiKey);

    if (!apiKey) {
      console.error('No API key found in environment variables');
      return NextResponse.json(
        { error: 'Weather API key is not configured' },
        { status: 500 }
      );
    }

    let url = '';

    if (type === 'current') {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    } else if (type === 'weekly') {
      url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    } else {
      return NextResponse.json(
        { error: 'Invalid type parameter. Use "current" or "weekly"' },
        { status: 400 }
      );
    }

    console.log('Fetching from OpenWeather API...');

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Weather-App/1.0'
      }
    });

    console.log('OpenWeather API response status:', response.status);

    if (!response.ok) {
      let errorMessage = 'Failed to fetch weather data';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
        console.error('OpenWeather API error:', errorData);
      } catch (e) {
        console.error('Failed to parse error response');
      }

      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Successfully fetched weather data');

    return NextResponse.json(data);

  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}