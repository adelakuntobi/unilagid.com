import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale, BarElement } from 'chart.js';

Chart.register(LinearScale, CategoryScale, BarElement);

const BarChart = () => {
  // Generate random data
  const max = 1000
  const labels = [  "Chemical Engineering",
  "Civil & Environmental",
  "Electrical & Electronics",
  "Mechanical Engineering",
  "Metallurgical & Materials",
  "Petroleum and Gas",
  "Surveying & Geo-Informatics",
  "Systems Engineering"];
  const data = [Math.random() * max,Math.random() * max,Math.random() * max,Math.random() * max,Math.random() * max,Math.random() * max,Math.random() * max,Math.random() * max,];

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Arts',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Bar color
        borderColor: 'rgba(75, 192, 192, 1)', // Border color
        borderWidth: 1,
      },
      {
        label: 'Science',
        data: data,
        backgroundColor: 'rgba(75, 192, 116, 0.6)', // Bar color
        borderColor: 'rgba(75, 192, 192, 1)', // Border color
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };  

  return (
      <Bar data={chartData} options={chartOptions} />
  );
};

export default BarChart;
