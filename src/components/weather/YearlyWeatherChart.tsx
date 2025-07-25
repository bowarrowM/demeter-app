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
  Filler, // filler bug fix
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend, 
  Filler // filler bug fix
);

export default function YearlyWeatherChart() {
  const intl = useIntl();
  const [chartData, setChartData] = useState<ChartData<'line'> | null>(null);
  const chartRef = useRef(null);

  useEffect(() => {
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
          borderColor: 'rgb(255, 159, 64)',
          backgroundColor: 'rgba(255, 159, 64, 0.1)',
          borderWidth: 3,
          pointBackgroundColor: 'white',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
          tension: 0.4,
          fill: true,
        },
        {
          label: intl.formatMessage({ id: 'weather.nightTemp' }),
          data: nightTemperatures,
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 0.1)',
          borderWidth: 3,
          pointBackgroundColor: 'white',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
          tension: 0.4,
          fill: true,
        },
      ],
    });
  }, [intl]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 14,
            family: "'Inter', sans-serif"
          },
          usePointStyle: true,
          padding: 20,
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1f2937',
        bodyColor: '#1f2937',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        titleFont: {
          size: 14,
          weight: 600
        },
        bodyFont: {
          size: 16,
          weight: 600
        },
        callbacks: {
          label: (context: any) => {
            return `${context.dataset.label}: ${context.parsed.y}°C`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          },
          color: '#6b7280'
        }
      },
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(229, 231, 235, 0.5)',
        },
        ticks: {
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          },
          color: '#6b7280',
          padding: 10,
          callback: (value: any) => `${value}°C`
        },
        title: {
          display: true,
          text: intl.formatMessage({ id: 'weather.temperature' }) + ' (°C)',
          font: {
            size: 13,
            family: "'Inter', sans-serif",
            weight: 500
          },
          color: '#4b5563',
          padding: {
            top: 10,
            bottom: 20
          }
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg p-6 w-full  border border-blue-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          {intl.formatMessage({ id: 'weather.yearlyChart' })}
        </h3>
        <div className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
          {new Date().getFullYear()}
        </div>
      </div>

      {chartData ? (
        <div className="h-80">
          <Line data={chartData} options={options} ref={chartRef} />
        </div>
      ) : (
        <div className="flex justify-center items-center h-80">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
}