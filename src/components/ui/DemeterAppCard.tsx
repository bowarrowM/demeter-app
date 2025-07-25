'use client';

import { useIntl } from 'react-intl';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { FC } from 'react';

const DemeterAppCard: FC = () => {
    const intl = useIntl();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full"
        >
            <div className="bg-gradient-to-br from-emerald-50 to-amber-50 rounded-2xl shadow-xl overflow-hidden border border-emerald-100 transition-all hover:shadow-2xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-emerald-600 to-amber-700 p-4">
                    <div className="flex items-center justify-center space-x-3">
                        <div className="bg-emerald-500/20 p-2 rounded-full">
                            <SparklesIcon className="h-8 w-8 text-emerald-100" />
                        </div>
                        <h3 className="text-xl font-bold text-white">
                            {intl.formatMessage({ id: 'welcome.demeter.title' })}
                        </h3>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
      

                    <div className="space-y-4 mb-6">
                        <div className="flex items-start">
                            <div className="bg-emerald-100 p-1.5 rounded-full mr-3 mt-0.5">
                                <div className="bg-emerald-500 w-2 h-2 rounded-full"></div>
                            </div>
                            <p className="text-gray-700 flex-1">
                                {intl.formatMessage({ id: 'welcome.demeter.description1' })}
                            </p>
                        </div>

                        <div className="flex items-start">
                            <div className="bg-amber-100 p-1.5 rounded-full mr-3 mt-0.5">
                                <div className="bg-amber-500 w-2 h-2 rounded-full"></div>
                            </div>
                            <p className="text-gray-700 flex-1">
                                {intl.formatMessage({ id: 'welcome.demeter.description2' })}
                            </p>
                        </div>

                        <div className="flex items-start">
                            <div className="bg-emerald-100 p-1.5 rounded-full mr-3 mt-0.5">
                                <div className="bg-emerald-500 w-2 h-2 rounded-full"></div>
                            </div>
                            <p className="text-gray-700 flex-1">
                                {intl.formatMessage({ id: 'welcome.demeter.description3' })}
                            </p>
                        </div>
                    </div>

                    {/* Stats Panel */}
                    <div className="mt-6 bg-gradient-to-r from-emerald-100 to-amber-100 rounded-xl p-1 border border-emerald-200">
                        <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="p-2">
                                <div className="text-emerald-700 font-bold text-lg">98%</div>
                                <div className="text-emerald-600 text-xs">Efficiency</div>
                            </div>
                            <div className="p-2">
                                <div className="text-amber-700 font-bold text-lg">24/7</div>
                                <div className="text-amber-600 text-xs">Monitoring</div>
                            </div>
                            <div className="p-2">
                                <div className="text-emerald-700 font-bold text-lg">100+</div>
                                <div className="text-emerald-600 text-xs">Features</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default DemeterAppCard;