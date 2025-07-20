'use client';

import { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import {
  Chart as ChartJS,
  ChartData,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
  // Legend
);

export default function YearlyWeatherChart() {
  const intl = useIntl();
  const [chartData, setChartData] = useState<ChartData<'line'> | null>(null);

  useEffect(() => {
    // Generate mock yearly data -> replace with actual API call
    const months = Array.from({ length: 12 }, (_, i) =>
      new Date(2024, i).toLocaleDateString(intl.locale, { month: 'short' })
    );

    const dayTemperatures = [5, 8, 12, 18, 24, 28, 30, 28, 24, 20, 19, 10];
    const nightTemperatures = [-2, 0, 4, 8, 12, 16, 15, 14, 13, 8, 4, 0];

    setChartData({
      labels: months,
      datasets: [
        {
          label: intl.formatMessage({ id: 'weather.dayTemp' }),
          data: dayTemperatures,
          borderColor: 'rgb(255, 206, 84)',
          backgroundColor: 'rgba(255, 206, 84, 0.2)',
          tension: 0.4,
        },
        {
          label: intl.formatMessage({ id: 'weather.nightTemp' }),
          data: nightTemperatures,
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          tension: 0.4,
        },
      ],
    });
  }, [intl]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: intl.formatMessage({ id: 'weather.yearlyChart' }),
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: intl.formatMessage({ id: 'weather.temperature' }) + ' (°C)',
        },
      },
    },
  };
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
      <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
        {intl.formatMessage({ id: 'weather.yearlyTitle' })}
      </h3>

      {chartData ? (
        <div className="h-80">
          <Line data={chartData} options={options} />
        </div>
      ) : (
        <div className="flex justify-center items-center h-80">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
    </div>
  );
}
