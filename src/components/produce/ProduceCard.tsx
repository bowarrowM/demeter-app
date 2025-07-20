'use client';

import { useIntl } from 'react-intl';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
interface Produce {
  id: number;
  name: string;
  latinName: string;
  season: string;
  region: string;
  imageUrl: string;
  wikipediaUrl: string;
}

interface ProduceCardProps {
  produce: Produce;
}

export default function ProduceCard({ produce }: ProduceCardProps) {
  const intl = useIntl();

  const handleClick = () => {
    window.open(produce.wikipediaUrl, '_blank', 'noopener,noreferrer');
  };

  const getSeasonColor = (season: string) => {
    switch (season) {
      case 'spring':
        return 'bg-green-100 text-green-800';
      case 'summer':
        return 'bg-yellow-100 text-yellow-800';
      case 'autumn':
        return 'bg-orange-100 text-orange-800';
      case 'winter':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer transform hover:scale-105"
    >
      <div className="relative h-48 bg-gray-200">
        <Image
          src={produce.imageUrl}
          alt={produce.name}
          fill
          className="object-cover"
          onError={e => {
            e.currentTarget.src = `https://via.placeholder.com/300x200/e5e7eb/6b7280?text=${encodeURIComponent(produce.name)}`;
          }}
        />
        <div className="absolute top-2 right-2">
          <ExternalLink className="h-5 w-5 text-white drop-shadow-lg" />
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800">{produce.name}</h3>
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${getSeasonColor(produce.season)}`}
          >
            {intl.formatMessage({ id: `season.${produce.season}` })}
          </span>
        </div>

        <p className="text-sm text-gray-600 italic mb-2">{produce.latinName}</p>

        <div className="text-xs text-gray-500">
          <p className="mb-1">
            <span className="font-medium">
              {intl.formatMessage({ id: 'produce.region' })}:
            </span>{' '}
            {produce.region}
          </p>
        </div>

        <div className="mt-3 flex items-center text-blue-600 text-sm font-medium">
          <span>{intl.formatMessage({ id: 'produce.learnMore' })}</span>
          <ExternalLink className="h-4 w-4 ml-1" />
        </div>
      </div>
    </div>
  );
}
