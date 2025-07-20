'use client';

import { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Sun, Cloud, CloudRain, Snowflake } from 'lucide-react';

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

  useEffect(() => {
    //

    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        const type = viewType === 'today' ? 'current' : 'weekly';
        const response = await fetch(
          `/api/weather?city=${selectedCity}&type=${type}`
        );
        const data = await response.json();

        if (viewType === 'today') {
          setWeatherData({
            temperature: Math.round(data.main.temp),
            description: data.weather[0].description,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            icon: data.weather[0].icon,
          });
        } else {
          // Process weekly forecast data
          // added item type details, any caused eslint format issues
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
      } finally {
        setLoading(false);
      }
    };
    fetchWeatherData();
  }, [selectedCity, viewType]);

  const getWeatherIcon = (iconCode: string) => {
    if (iconCode.includes('01'))
      return <Sun className="h-8 w-8 text-yellow-500" />;
    if (
      iconCode.includes('02') ||
      iconCode.includes('03') ||
      iconCode.includes('04')
    )
      return <Cloud className="h-8 w-8 text-gray-500" />;
    if (iconCode.includes('09') || iconCode.includes('10'))
      return <CloudRain className="h-8 w-8 text-blue-500" />;
    if (iconCode.includes('13'))
      return <Snowflake className="h-8 w-8 text-blue-300" />;
    return <Sun className="h-8 w-8 text-yellow-500" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">
          {intl.formatMessage({ id: 'weather.title' })} - {selectedCity},{' '}
          {selectedCountry}
        </h3>

        <div className="flex space-x-2">
          <button
            onClick={() => onViewTypeChange('today')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition duration-300 ${
              viewType === 'today'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {intl.formatMessage({ id: 'weather.today' })}
          </button>
          <button
            onClick={() => onViewTypeChange('week')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition duration-300 ${
              viewType === 'week'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {intl.formatMessage({ id: 'weather.week' })}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div>
          {viewType === 'today' && weatherData ? (
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {getWeatherIcon(weatherData.icon)}
              </div>
              <div className="text-4xl font-bold text-gray-800 mb-2">
                {weatherData.temperature}°C
              </div>
              <div className="text-gray-600 capitalize mb-6">
                {weatherData.description}
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="font-semibold text-gray-800">
                    {intl.formatMessage({ id: 'weather.humidity' })}
                  </div>
                  <div className="text-gray-600">{weatherData.humidity}%</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="font-semibold text-gray-800">
                    {intl.formatMessage({ id: 'weather.wind' })}
                  </div>
                  <div className="text-gray-600">
                    {weatherData.windSpeed} m/s
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-7 gap-2">
              {weeklyData.map((day, index) => (
                <div key={index} className="text-center p-3 bg-gray-50 rounded">
                  <div className="text-xs text-gray-600 mb-2">
                    {new Date(
                      Date.now() + index * 24 * 60 * 60 * 1000
                    ).toLocaleDateString(intl.locale, { weekday: 'short' })}
                  </div>
                  <div className="flex justify-center mb-2">
                    {getWeatherIcon(day.icon)}
                  </div>
                  <div className="text-sm font-semibold">
                    {day.temperature}°C
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
