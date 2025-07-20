'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { RootState } from '@/store';
import { setLocation } from '@/store/slices/weatherSlice';
import { MapPinIcon } from '@heroicons/react/24/outline';

const cities = [
  { city: 'Istanbul', country: 'Turkey' },
  { city: 'Ankara', country: 'Turkey' },
  { city: 'Izmir', country: 'Turkey' },
  { city: 'Antalya', country: 'Turkey' },
  { city: 'London', country: 'UK' },
  { city: 'New York', country: 'USA' },
  { city: 'Paris', country: 'France' },
  { city: 'Tokyo', country: 'Japan' },
];

export default function LocationFilter() {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { selectedCity, selectedCountry } = useSelector(
    (state: RootState) => state.weather
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleLocationChange = (city: string, country: string) => {
    dispatch(setLocation({ city, country }));
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white rounded-lg shadow-md px-4 py-2 hover:shadow-lg transition duration-300"
      >
        <MapPinIcon className="h-5 w-5 text-gray-600" />
        <span className="text-gray-800 font-medium">
          {selectedCity}, {selectedCountry}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
          {cities.map(({ city, country }) => (
            <button
              key={`${city}-${country}`}
              onClick={() => handleLocationChange(city, country)}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition duration-300 ${
                selectedCity === city && selectedCountry === country
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-800'
              }`}
            >
              {city}, {country}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
