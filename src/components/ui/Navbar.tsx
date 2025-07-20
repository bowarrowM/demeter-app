'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setLocale } from '@/store/slices/localeSlice';
import {
  HomeIcon,
  CloudIcon,
  SparklesIcon,
  GlobeAltIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/24/outline';

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const intl = useIntl();
  const dispatch = useDispatch();
  const currentLocale = useSelector((state: RootState) => state.locale.current);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const toggleLanguage = () => {
    const newLocale = currentLocale === 'en' ? 'tr' : 'en';
    dispatch(setLocale(newLocale));
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/welcome" className="flex items-center space-x-2">
              <SparklesIcon className="h-8 w-8 text-green-600" />
              <span className="font-bold text-xl text-gray-800">
                AgriWeather
              </span>
            </Link>

            <div className="hidden md:flex space-x-6">
              <Link
                href="/welcome"
                className="flex items-center space-x-1 text-gray-600 hover:text-green-600 transition duration-300"
              >
                <HomeIcon className="h-5 w-5" />
                <span>{intl.formatMessage({ id: 'nav.welcome' })}</span>
              </Link>

              <Link
                href="/weather"
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition duration-300"
              >
                <CloudIcon className="h-5 w-5" />
                <span>{intl.formatMessage({ id: 'nav.weather' })}</span>
              </Link>

              <Link
                href="/produce"
                className="flex items-center space-x-1 text-gray-600 hover:text-yellow-600 transition duration-300"
              >
                <SparklesIcon className="h-5 w-5" />
                <span>{intl.formatMessage({ id: 'nav.produce' })}</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition duration-300"
            >
              <GlobeAltIcon className="h-5 w-5" />
              <span className="uppercase font-medium">{currentLocale}</span>
            </button>

            <div className="text-gray-700">{session?.user?.name}</div>

            <button
              onClick={handleSignOut}
              className="flex items-center space-x-1 text-red-600 hover:text-red-800 transition duration-300"
            >
              <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
              <span>{intl.formatMessage({ id: 'auth.signout' })}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
