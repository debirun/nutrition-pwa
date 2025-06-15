// src/components/NutritionGraph.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

ChartJS.register(BarElement, CategoryScale, LinearScale, annotationPlugin);

const NutritionGraph = ({ results, intake }) => {
  if (!results || !intake) return null;

  const labels = ['月', '火', '水', '木', '金', '土', '日'];
  const intakeValues = [
    parseFloat(intake.protein),
    parseFloat(intake.protein),
    parseFloat(intake.protein),
    parseFloat(intake.protein),
    parseFloat(intake.protein),
    parseFloat(intake.protein),
    parseFloat(intake.protein)
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'タンパク質の摂取量 (g)',
        data: intakeValues,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: results.proteinDay * 2
      }
    },
    plugins: {
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            yMin: results.proteinDay,
            yMax: results.proteinDay,
            borderColor: 'red',
            borderWidth: 2,
            label: {
              content: '必要量',
              enabled: true,
              position: 'end'
            }
          }
        }
      }
    }
  };

  return <Bar data={data} options={options} />;
};

export default NutritionGraph;
