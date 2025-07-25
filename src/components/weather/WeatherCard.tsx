'use client';

import { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Sun, Cloud, CloudRain, Snowflake, Droplet, Wind, AlertCircle } from 'lucide-react';

interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

interface WeatherCardProps {
  viewType: 'today' | 'week';
  onViewTypeChange: (type: 'today' | 'week') => void;
}

export default function WeatherCard({
  viewType,
  onViewTypeChange,
}: WeatherCardProps) {
  const intl = useIntl();
  const { selectedCity, selectedCountry } = useSelector(
    (state: RootState) => state.weather
  );
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [weeklyData, setWeeklyData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);

      try {
        const type = viewType === 'today' ? 'current' : 'weekly';
        const response = await fetch(
          `/api/weather?city=${encodeURIComponent(selectedCity)}&type=${type}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch weather data');
        }

        if (viewType === 'today') {
          // Check if the response has the expected structure
          if (!data.main || !data.weather || !data.wind) {
            throw new Error('Invalid weather data format');
          }

          setWeatherData({
            temperature: Math.round(data.main.temp),
            description: data.weather[0].description,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            icon: data.weather[0].icon,
          });
        } else {
          // Check if the response has the expected structure for weekly data
          if (!data.list || !Array.isArray(data.list)) {
            throw new Error('Invalid weekly weather data format');
          }

          const processedWeekly = data.list
            .slice(0, 7)
            .map(
              (item: {
                main: { temp: number; humidity: number };
                weather: { description: string; icon: string }[];
                wind: { speed: number };
              }) => ({
                temperature: Math.round(item.main.temp),
                description: item.weather[0].description,
                humidity: item.main.humidity,
                windSpeed: item.wind.speed,
                icon: item.weather[0].icon,
              })
            );
          setWeeklyData(processedWeekly);
        }
      } catch (error) {
        console.error('Failed to fetch weather:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    if (selectedCity) {
      fetchWeatherData();
    }
  }, [selectedCity, viewType]);

  const getWeatherIcon = (iconCode: string) => {
    if (iconCode.includes('01'))
      return <Sun className="h-10 w-10 text-yellow-500" />;
    if (
      iconCode.includes('02') ||
      iconCode.includes('03') ||
      iconCode.includes('04')
    )
      return <Cloud className="h-10 w-10 text-gray-500" />;
    if (iconCode.includes('09') || iconCode.includes('10'))
      return <CloudRain className="h-10 w-10 text-blue-500" />;
    if (iconCode.includes('13'))
      return <Snowflake className="h-10 w-10 text-blue-300" />;
    return <Sun className="h-10 w-10 text-yellow-500" />;
  };

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg p-6 w-full max-w-2xl border border-blue-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            {intl.formatMessage({ id: 'weather.title' })}
          </h3>
          <p className="text-gray-600 mt-1">
            {selectedCity}, {selectedCountry}
          </p>
        </div>

        <div className="flex space-x-2 bg-blue-50 p-1 rounded-lg">
          <button
            onClick={() => onViewTypeChange('today')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${viewType === 'today'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-blue-600'
              }`}
          >
            {intl.formatMessage({ id: 'weather.today' })}
          </button>
          <button
            onClick={() => onViewTypeChange('week')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${viewType === 'week'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-blue-600'
              }`}
          >
            {intl.formatMessage({ id: 'weather.thisWeek' })}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-48 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <p className="text-red-600 font-medium mb-2">Weather data unavailable</p>
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      ) : (
        <div>
          {viewType === 'today' && weatherData ? (
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-xl p-6">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="bg-white/20 p-4 rounded-full">
                    {getWeatherIcon(weatherData.icon)}
                  </div>
                  <div>
                    <div className="text-5xl font-bold">
                      {weatherData.temperature}°C
                    </div>
                    <div className="text-xl capitalize mt-2 font-medium">
                      {weatherData.description}
                    </div>
                  </div>
                </div>

                <div className="flex gap-6 mt-6 md:mt-0">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2">
                      <Droplet className="h-5 w-5 text-blue-100" />
                      <span className="font-medium">
                        {intl.formatMessage({ id: 'weather.humidity' })}
                      </span>
                    </div>
                    <div className="text-2xl font-bold mt-1">
                      {weatherData.humidity}%
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2">
                      <Wind className="h-5 w-5 text-blue-100" />
                      <span className="font-medium">
                        {intl.formatMessage({ id: 'weather.windSpeed' })}
                      </span>
                    </div>
                    <div className="text-2xl font-bold mt-1">
                      {weatherData.windSpeed} m/s
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3">
              {weeklyData.map((day, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-3 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="text-sm font-medium text-gray-600 mb-3">
                    {new Date(
                      Date.now() + index * 24 * 60 * 60 * 1000
                    ).toLocaleDateString(intl.locale, { weekday: 'short' })}
                  </div>
                  <div className="flex justify-center mb-3">
                    {getWeatherIcon(day.icon)}
                  </div>
                  <div className="text-lg font-bold text-gray-800">
                    {day.temperature}°C
                  </div>
                  <div className="text-xs text-gray-500 mt-1 capitalize">
                    {day.description}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}