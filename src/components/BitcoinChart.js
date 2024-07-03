// components/BitcoinChart.js
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const BitcoinChart = () => {
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.coindesk.com/v1/bpi/historical/close.json?currency=BTC');
        const data = await response.json();
        const labels = Object.keys(data.bpi);
        const values = Object.values(data.bpi);

        // Create gradient
        const ctx = document.createElement('canvas').getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(75,192,192,1)');
        gradient.addColorStop(1, 'rgba(75,192,192,0.2)');

        setChartData({
          labels,
          datasets: [
            {
              label: 'Bitcoin Price',
              data: values,
              fill: true,
              backgroundColor: gradient,
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 2,
              pointRadius: 3,
              pointBackgroundColor: 'rgba(75,192,192,1)',
              pointBorderColor: '#fff',
              tension: 0.4, // Make the line smooth
            },
          ],
        });

        setChartOptions({
          responsive: true,
          maintainAspectRatio: false, // Allows the chart to be more flexible
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                color: '#333',
                font: {
                  size: 14,
                  weight: 'bold',
                },
              },
            },
            tooltip: {
              mode: 'index',
              intersect: false,
            },
          },
          interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false,
          },
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Date',
                color: '#333',
                font: {
                  size: 14,
                  weight: 'bold',
                },
              },
              ticks: {
                color: '#333',
                maxTicksLimit: 5, // Limit the number of ticks displayed for better readability on mobile
                maxRotation: 0, // No rotation
                autoSkip: true,
                autoSkipPadding: 50, // Increase padding to avoid overlap
                callback: function(value, index, values) {
                  // Display only certain dates based on screen size
                  if (window.innerWidth < 600) {
                    return value.length > 10 ? value.substr(5) : value;
                  }
                  return value;
                },
              },
              grid: {
                display: false,
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Price (USD)',
                color: '#333',
                font: {
                  size: 14,
                  weight: 'bold',
                },
              },
              ticks: {
                color: '#333',
              },
              grid: {
                color: 'rgba(75,192,192,0.2)',
              },
            },
          },
        });
      } catch (error) {
        console.error('Error fetching the Bitcoin data:', error);
      }
    };

    fetchData();
  }, []);

  if (!chartData) {
    return <p>Loading chart...</p>;
  }

  return (
    <div className="chart-container">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default BitcoinChart;
