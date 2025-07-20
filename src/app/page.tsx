'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { useIntl } from 'react-intl';

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const intl = useIntl();

  useEffect(() => {
    if (status === 'loading') return;

    if (session) {
      router.push('/welcome');
    } else {
      router.push('/auth/login');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          {intl.formatMessage({ id: 'app.title' })}
        </h1>
        <div className="space-x-4">
          <Link
            href="/auth/login"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            {intl.formatMessage({ id: 'auth.signin' })}
          </Link>
          <Link
            href="/auth/signup"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            {intl.formatMessage({ id: 'auth.signup' })}
          </Link>
        </div>
      </div>
    </div>
  );
}
