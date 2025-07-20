'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import Navbar from '@/components/ui/Navbar';
import ProduceCard from '@/components/produce/ProduceCard';

const seasonalProduce = [
  {
    id: 1,
    name: 'Domates',
    latinName: 'Solanum lycopersicum',
    season: 'summer',
    region: 'Mediterranean',
    imageUrl: '/images/tomato.jpg',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Tomato',
  },
  {
    id: 2,
    name: 'Elma',
    latinName: 'Malus domestica',
    season: 'autumn',
    region: 'Central Anatolia',
    imageUrl: '/images/apple.jpg',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Apple',
  },
  {
    id: 3,
    name: 'Üzüm',
    latinName: 'Vitis vinifera',
    season: 'autumn',
    region: 'Aegean',
    imageUrl: '/images/grape.jpg',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Grape',
  },
  {
    id: 4,
    name: 'Zeytin',
    latinName: 'Olea europaea',
    season: 'autumn',
    region: 'Mediterranean',
    imageUrl: '/images/olive.jpg',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Olive',
  },
];

export default function ProducePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const intl = useIntl();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth/signin');
    }
  }, [session, status, router]);

  if (status === 'loading') return <div>Loading...</div>;
  if (!session) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {intl.formatMessage({ id: 'produce.title' })}
          </h1>
          <p className="text-gray-600 text-lg">
            {intl.formatMessage({ id: 'produce.subtitle' })}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {seasonalProduce.map(produce => (
            <ProduceCard key={produce.id} produce={produce} />
          ))}
        </div>
      </main>
    </div>
  );
}
