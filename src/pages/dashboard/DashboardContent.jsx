// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // State for tracking donations, recipients, and food waste
  const [totalDonations, setTotalDonations] = useState(0);
  const [totalRecipients, setTotalRecipients] = useState(0);
  const [totalWasteReduced, setTotalWasteReduced] = useState(0);

  // Dummy data for the chart
  const [chartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Total Donations',
        data: [30, 50, 70, 90, 110],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  });

  // Simulate fetching data from an API or database
  useEffect(() => {
    // Simulated fetch function for donations, recipients, and food waste
    const fetchData = () => {
      setTotalDonations(1200);
      setTotalRecipients(900);
      setTotalWasteReduced(5000); // in kg
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container" style={{ padding: '20px', backgroundColor: '#f4f4f9' }}>
      <h1>Welcome to Your Dashboard</h1>
      
      {/* Overview Section */}
      <section style={{ marginBottom: '30px' }}>
        <h2>Overview</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '8px', textAlign: 'center', flex: 1 }}>
            <h3>Total Donations</h3>
            <p style={{ fontSize: '1.5rem' }}>{totalDonations}</p>
          </div>
          <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '8px', textAlign: 'center', flex: 1 }}>
            <h3>Total Recipients</h3>
            <p style={{ fontSize: '1.5rem' }}>{totalRecipients}</p>
          </div>
          <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '8px', textAlign: 'center', flex: 1 }}>
            <h3>Total Waste Reduced</h3>
            <p style={{ fontSize: '1.5rem' }}>{totalWasteReduced} kg</p>
          </div>
        </div>
      </section>

      {/* Donation Table Section */}
      <section style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '8px', marginBottom: '30px' }}>
        <h2>Recent Donations</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Donor Name</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Food Type</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Quantity</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Donation Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '12px' }}>Shamitha M</td>
              <td style={{ padding: '12px' }}>Rice</td>
              <td style={{ padding: '12px' }}>30 kg</td>
              <td style={{ padding: '12px' }}>Jan 30, 2025</td>
            </tr>
            <tr>
              <td style={{ padding: '12px' }}>Prarthana</td>
              <td style={{ padding: '12px' }}>Vegetables</td>
              <td style={{ padding: '12px' }}>50 kg</td>
              <td style={{ padding: '12px' }}>Jan 29, 2025</td>
            </tr>
            <tr>
              <td style={{ padding: '12px' }}>Shreya</td>
              <td style={{ padding: '12px' }}>fruits</td>
              <td style={{ padding: '12px' }}>45 kg</td>
              <td style={{ padding: '12px' }}>Jan 31, 2025</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Donation Trends Chart Section */}
      <section style={{ marginBottom: '30px' }}>
        <h2>Donation Trends</h2>
        <Line data={chartData} />
      </section>
    </div>
  );
};

export default Dashboard;
