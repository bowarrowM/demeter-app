'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import Navbar from '@/components/ui/Navbar';
import WeatherCard from '@/components/weather/WeatherCard';
import YearlyWeatherChart from '@/components/weather/YearlyWeatherChart';
import LocationSelector from '@/components/weather/LocationFilter';

export default function WeatherPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const intl = useIntl();
  const [viewType, setViewType] = useState<'today' | 'week'>('today');

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth/login');
    }
  }, [session, status, router]);

  if (status === 'loading') return <div>Loading...</div>;
  if (!session) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex justify-end">
            <LocationSelector />
          </div>

          <div className="flex justify-center">
            <WeatherCard viewType={viewType} onViewTypeChange={setViewType} />
          </div>

          <div className="flex justify-center">
            <YearlyWeatherChart />
          </div>
        </div>
      </main>
    </div>
  );
}
