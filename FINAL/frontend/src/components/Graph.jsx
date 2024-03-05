import { useEffect } from 'react';
import Axios from 'axios';
import Chart from 'chart.js/auto';

const Graph = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await Axios.get('http://localhost:3000/cost'); // Assuming your backend API endpoint is '/cost'
        renderChart(data);
      } catch (error) {
        console.error('Error fetching division costs:', error);
      }
    };

    fetchData();
  }, []);

  const renderChart = (data) => {
    const labels = data.map(division => division.Div_Name.toUpperCase());
    const totalSpent = data.map(division => division.total_spent);

    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
      type: 'pie', // Change the chart type to 'pie'
      data: {
        labels: labels,
        datasets: [{
          label: 'Total Spent Amount by Division',
          data: totalSpent,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
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
    <div className="container mt-5" style={{ display: 'flex', justifyContent: 'center' }}>
      <canvas id="myChart" style={{ maxWidth: '500px', maxHeight: '500px' }}></canvas>
    </div>
  );
};

export default Graph;
