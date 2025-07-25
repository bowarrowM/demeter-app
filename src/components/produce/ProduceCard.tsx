'use client';

import { useState } from 'react';
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
  const [imgError, setImgError] = useState(false);

  const imageSrc = imgError
    ? `https://via.placeholder.com/300x200/e5e7eb/6b7280?text=${encodeURIComponent(produce.name)}`
    : produce.imageUrl;

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
      className="max-w-sm w-full bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer transform hover:scale-[1.03]"
    >
      <div className="relative h-48">
        <Image
          src={imageSrc}
          alt={produce.name}
          fill
          className="object-cover"
          onError={() => setImgError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-t-2xl"></div>
        <div className="absolute top-3 right-3 bg-black/50 p-1 rounded-full">
          <ExternalLink className="h-4 w-4 text-white" />
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{produce.name}</h3>
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${getSeasonColor(produce.season)}`}
          >
            {intl.formatMessage(
              { id: `season.${produce.season}`, defaultMessage: produce.season }
            )}
          </span>
        </div>

        <p className="text-sm text-gray-500 italic mb-2">{produce.latinName}</p>

        <div className="text-sm text-gray-600">
          <p>
            <span className="font-medium">
              {intl.formatMessage({ id: 'produce.region', defaultMessage: produce.region })}:
            </span>{' '}
            {produce.region}
          </p>
        </div>

        <div className="mt-4 flex items-center text-blue-600 text-sm font-medium hover:underline">
          <span>{intl.formatMessage({ id: 'produce.learnMore' })}</span>
          <ExternalLink className="h-4 w-4 ml-1" />
        </div>
      </div>
    </div>
  );
}
