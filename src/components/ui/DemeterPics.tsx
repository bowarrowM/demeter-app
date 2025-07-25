'use client';

import { motion } from 'framer-motion';
import { FC } from 'react';

const DemeterPics: FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className=" w-full"
        >
            <div className="bg-gradient-to-br from-emerald-50 to-amber-50 rounded-2xl shadow-xl overflow-hidden border border-emerald-100 transition-all hover:shadow-2xl">
                {/* Image container */}
                <div className="relative">
                    {/* Decorative corner elements */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-emerald-500 z-10"></div>
                    <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-emerald-500 z-10"></div>
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-amber-500 z-10"></div>
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-amber-500 z-10"></div>

                    {/* Nature-themed image placeholder */}
                    <div className="aspect-w-16 aspect-h-10 bg-gradient-to-br from-emerald-100 to-amber-100">
                        <div className="w-full h-auto flex flex-col items-center justify-center p-8 text-center">
                            {/* <div className="mb-5">
                                <div className="relative inline-block">
                                    <div className="absolute -inset-2 bg-emerald-400/30 rounded-full blur-sm"></div>
                                    <div className="bg-gradient-to-r from-emerald-500 to-amber-500 p-5 rounded-full relative">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div> */}

                            <h3 className="text-xl font-bold text-emerald-800 mb-2">Demeter's Blessing</h3>
                            <p className="text-emerald-600 max-w-xs">
                                Goddess of harvest and agriculture, nourisher of life
                            </p>

                            {/* Decorative elements */}
                            <div className="flex space-x-8 mt-6 opacity-60">
                                <svg className="h-8 w-8 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
                                </svg>
                                <svg className="h-8 w-8 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Caption */}
                <div className="p-4 bg-gradient-to-r from-emerald-600 to-amber-700">
             
                </div>
            </div>
        </motion.div>
    );
};

export default DemeterPics;