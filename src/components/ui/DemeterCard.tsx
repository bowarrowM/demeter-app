'use client';

import { useIntl } from 'react-intl';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { FC } from 'react';

const DemeterCard: FC = () => {
  const intl = useIntl();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="max-w-md w-full"
    >
      <div className="bg-gradient-to-br from-emerald-50 to-amber-50 rounded-2xl shadow-xl overflow-hidden border border-emerald-100 transition-all hover:shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 to-amber-800 p-5 text-center">
        </div>

        {/* Content */}
        <div className="p-6">
          {/* <div className="flex justify-center mb-5">
            <div className="bg-gradient-to-r from-amber-200 to-emerald-200 p-4 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
          </div> */}

          <div className="space-y-4 mb-6">
            <div className="flex items-start">
              <div className="bg-emerald-500 text-white p-1.5 rounded-full mr-3 flex items-center justify-center w-6 h-6">
                <span className="text-xs">1</span>
              </div>
              <p className="text-gray-700">
                {intl.formatMessage({ id: 'welcome.demeter.demeter1' })}
              </p>
            </div>

            <div className="flex items-start">
              <div className="bg-amber-500 text-white p-1.5 rounded-full mr-3 flex items-center justify-center w-6 h-6">
                <span className="text-xs">2</span>
              </div>
              <p className="text-gray-700">
                {intl.formatMessage({ id: 'welcome.demeter.demeter2' })}
              </p>
            </div>


          </div>

          {/* Quote Section */}
          <div className="mt-6 relative bg-gradient-to-r from-emerald-100 to-amber-100 rounded-xl p-5 border border-emerald-200">
            <div className="absolute top-3 left-3 text-emerald-400 text-3xl"></div>
            <div className="absolute bottom-3 right-3 text-amber-400 text-3xl rotate-180"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DemeterCard;