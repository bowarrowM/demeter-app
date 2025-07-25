'use client';

import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { RootState } from '@/store';
import { setLocation } from '@/store/slices/weatherSlice';
import { MapPinIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const cities = [
  { city: 'Istanbul', country: 'Turkey', lat: 41.0082, lon: 28.9784 },
  { city: 'Ankara', country: 'Turkey', lat: 39.9334, lon: 32.8597 },
  { city: 'Izmir', country: 'Turkey', lat: 38.4237, lon: 27.1428 },
  { city: 'Antalya', country: 'Turkey', lat: 36.8969, lon: 30.7133 },
  { city: 'London', country: 'UK', lat: 51.5074, lon: -0.1278 },
  { city: 'New York', country: 'USA', lat: 40.7128, lon: -74.0060 },
  { city: 'Paris', country: 'France', lat: 48.8566, lon: 2.3522 },
  { city: 'Tokyo', country: 'Japan', lat: 35.6762, lon: 139.6503 },
];

export default function LocationFilter() {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { selectedCity, selectedCountry } = useSelector(
    (state: RootState) => state.weather
  );
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLocationChange = (city: string, country: string) => {
    dispatch(setLocation({ city, country }));
    setIsOpen(false);
    setSearchTerm('');
  };

  const filteredCities = cities.filter(
    ({ city, country }) =>
      city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedLocation = cities.find(
    c => c.city === selectedCity && c.country === selectedCountry
  );

  return (
    <div className="relative w-full max-w-xs" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full bg-white rounded-xl shadow-sm px-4 py-3 hover:shadow-md transition-all duration-300 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <MapPinIcon className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-left">
            <div className="font-medium text-gray-900">{selectedCity}</div>
            <div className="text-xs text-gray-500">{selectedCountry}</div>
          </div>
        </div>
        <ChevronDownIcon
          className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-2 w-full bg-white rounded-xl shadow-lg z-10 overflow-hidden border border-gray-200"
          >
            <div className="p-3 border-b border-gray-100">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={intl.formatMessage({ id: 'weather.searchLocation' })}
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="max-h-60 overflow-y-auto">
              {filteredCities.length > 0 ? (
                filteredCities.map(({ city, country, lat, lon }) => (
                  <button
                    key={`${city}-${country}`}
                    onClick={() => handleLocationChange(city, country)}
                    className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors duration-200 flex items-center ${selectedCity === city && selectedCountry === country
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-800'
                      }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{city}</div>
                      <div className="text-xs text-gray-500 truncate">{country}</div>
                    </div>
                    <div className="text-xs text-gray-400 ml-2">
                      {lat.toFixed(2)},{lon.toFixed(2)}
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-4 py-6 text-center text-gray-500 text-sm">
                  {intl.formatMessage({ id: 'weather.noLocations' })}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}