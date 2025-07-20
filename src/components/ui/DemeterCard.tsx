'use client';

import { useIntl } from 'react-intl';
import { SparklesIcon } from '@heroicons/react/24/outline';

export default function DemeterCard() {
  const intl = useIntl();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
      <div className="flex items-center justify-center mb-4">
        <SparklesIcon className="h-12 w-12 text-green-600" />
      </div>

      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
        {intl.formatMessage({ id: 'demeter.title' })}
      </h3>

      <div className="text-gray-600 space-y-3">
        <p className="text-sm leading-relaxed">
          {intl.formatMessage({ id: 'demeter.description1' })}
        </p>
        <p className="text-sm leading-relaxed">
          {intl.formatMessage({ id: 'demeter.description2' })}
        </p>
        <p className="text-sm leading-relaxed">
          {intl.formatMessage({ id: 'demeter.description3' })}
        </p>
      </div>

      <div className="mt-6 p-3 bg-green-50 rounded-md">
        <p className="text-xs text-green-700 italic text-center">
          {intl.formatMessage({ id: 'demeter.quote' })}
        </p>
      </div>
    </div>
  );
}
