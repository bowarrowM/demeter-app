'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import Navbar from '@/components/ui/Navbar';
import WeatherCard from '@/components/weather/WeatherCard';
import YearlyWeatherChart from '@/components/weather/YearlyWeatherChart';
import LocationSelector from '@/components/weather/LocationFilter';
import { motion } from 'framer-motion';

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

  if (status === 'loading') return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (!session) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            {intl.formatMessage({ id: 'weather.forecast' })}
          </h1>
          <p className="text-gray-600 mt-2 max-w-2xl">
            {intl.formatMessage({ id: 'weather.forecastDescription' })}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Weather card and location selector */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {intl.formatMessage({ id: 'weather.selectLocation' })}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    {intl.formatMessage({ id: 'weather.selectLocationHint' })}
                  </p>
                </div>
                <LocationSelector />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <WeatherCard viewType={viewType} onViewTypeChange={setViewType} />
            </motion.div>
          </div>

          {/* Right column - Yearly chart and additional info */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="h-full"
            >
              <YearlyWeatherChart />
            </motion.div>
            
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl shadow-lg p-6 mt-8 text-white"
            >
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {intl.formatMessage({ id: '' })}
                  </h3>
                  <p className="text-blue-100 text-sm">
                    {intl.formatMessage({ id: '' })}
                  </p>
                </div> 
              </div>
            </motion.div> */}
          </div>
        </div>
      </main>
      
      <footer className="mt-12 py-6 border-t border-blue-100 text-center text-gray-600 text-sm">
        <p>{intl.formatMessage({ id: 'weather.footerText' })}</p>
      </footer>
    </div>
  );
}