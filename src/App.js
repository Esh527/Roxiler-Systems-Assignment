
import React, { useState, useEffect } from 'react';
import TransactionsTable from './Components/TransactionsTableComponent/TransactionsTable';
import Statistics from './Components/StatisticsComponent/Statistics';
import BarChart from './Components/BarChartComponent/BarChart';
import PieChart from './Components/PieChartComponent/PieChart';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState('January');
  

  useEffect(() => {
    setLoading(true);
    fetch('/api/roxiler.com/product_transaction.json')
      .then(response => response.json())
      .then(data => {
        console.log("Fetched Data:", data);
        setData(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching data:', error));
      setLoading(false);
  }, []);

  return (
    <div className="app">
      <header >
        <div ><h1 >Transactions Dashboard</h1></div>
        <div className="select-menu"> <select className="select-menu-inner"value={month} onChange={e => setMonth(e.target.value)}>
          {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            .map(m => <option key={m} value={m}>{m}</option>)}
        </select></div>
      </header>
      <div className="content">
      <TransactionsTable data={data} month={month} loading={loading} />
        <Statistics data={data} month={month} />
        <BarChart data={data} month={month} />
        <PieChart data={data} month={month} />
        
      </div>
    </div>
  );
};

export default App;
