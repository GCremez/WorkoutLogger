import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function DailySummaryChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/stats/daily')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(setData)
      .catch(console.error);
  }, []);

  const chartData = {
    labels: data.map(d => d.date),
    datasets: [
      {
        label: 'Total Exercises',
        data: data.map(d => d.totalExercises),
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Daily Workout Summary' },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
}
