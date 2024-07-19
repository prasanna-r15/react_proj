import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import style from './scss/dashboard.module.scss';

const PieChart = () => {
  const data = {
    labels: ['Acquisition', 'Purchase', 'Retention'],
    datasets: [
      {
        data: [10, 50, 30], // You can adjust the data values as needed
        backgroundColor: ['#5596ff', '#3b59ff', '#fbc167'],
        hoverBackgroundColor: ['#5596ff', '#3b59ff', '#fbc167'],
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: '70%',
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'center',
        labels: {
          boxWidth: 10,
          boxHeight: 10,
          usePointStyle: true,
        },
      },
    },
  };

  return (
    <div style={{ width: '300px', height: '300px' }}>
      <Doughnut data={data} options={options} className={style.doughnut}/>
    </div>
  );
};

export default PieChart;
