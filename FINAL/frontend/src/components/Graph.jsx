import { useEffect } from 'react';
import Axios from 'axios';
import Chart from 'chart.js/auto';

const Graph = () => {
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await Axios.get('http://localhost:3000/cost'); // Assuming your backend API endpoint is '/cost'
      renderChart(response.data);
    } catch (error) {
      console.error('Error fetching division costs:', error);
    }
  };

  const renderChart = (data) => {
    const labels = data.map(division => division.Div_Name.toUpperCase());
    const totalSpent = data.map(division => division.total_spent);

    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
      type: 'line', // Change the chart type to 'line'
      data: {
        labels: labels,
        datasets: [{
          label: 'Total Spent Amount by Division',
          data: totalSpent,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

  return (
    <div className="container mt-5">
      <canvas id="myChart" width="800" height="400"></canvas>
    </div>
  );
};

export default Graph;
