// // components/LocalePicker.tsx
// 'use client';

// import { usePathname, useRouter } from 'next/navigation';
// import { GlobeAltIcon } from '@heroicons/react/24/outline';
// import { useEffect, useState } from 'react';

// const LocalePicker = () => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [selectedLocale, setSelectedLocale] = useState('en');

//   useEffect(() => {
//     // Extracts the locale from pathname
//     const pathLocale = pathname.split('/')[1];
//     if (pathLocale === 'en' || pathLocale === 'tr') {
//       setSelectedLocale(pathLocale);
//     }
//   }, [pathname]);

//   const changeLocale = (locale: string) => {

//     const segments = pathname.split('/');
//     segments[1] = locale; // Replaces the locale segment
//     const newPath = segments.join('/');
    
//     router.replace(newPath);
//     // Refreshes the page to apply new translations
//     setTimeout(() => router.refresh(), 100);
//   };

//   return (
//     <div className="absolute top-4 right-4 flex items-center gap-2">
//       <GlobeAltIcon className="h-5 w-5 text-emerald-600" />
//       <select
//         value={selectedLocale}
//         onChange={(e) => changeLocale(e.target.value)}
//         className="bg-transparent border border-emerald-300 rounded-lg px-2 py-1 text-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-500"
//       >
//         <option value="en">English</option>
//         <option value="tr">Türkçe</option>
//       </select>
//     </div>
//   );
// };

// export default LocalePicker;