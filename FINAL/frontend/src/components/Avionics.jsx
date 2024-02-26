import { useState } from 'react';
import axios from 'axios';

const Avionics = () => {
  const [formData, setFormData] = useState({
    student: {
      USN: '',
      Name: '',
      Div_Name: 'avionics' // Setting Div_Name to 'avionics' by default
    },
    component: {
      Component_ID: '',
      Description: ''
    }
    ,
    transaction: {
      Transaction_ID: '',
      Product_ID: ''
    },
    students: [],
    components: [],
    transactions: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        [value]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/avionics', formData);
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/avionics');
      const { students, components, transactions } = response.data;
      setFormData(prevState => ({
        ...prevState,
        students: students,
        components: components,
        transactions: transactions
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h2>Avionics Data Management</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Student USN:
          <input type="text" name="USN" value={formData.student.USN} onChange={handleChange} />
        </label>
        <label>
          Student Name:
          <input type="text" name="Name" value={formData.student.Name} onChange={handleChange} />
        </label>
        <label>
          Component ID:
          <input type="text" name="Component_ID" value={formData.component.Component_ID} onChange={handleChange} />
        </label>
        <label>
          Component Description:
          <input type="text" name="Description" value={formData.component.Description} onChange={handleChange} />
        </label>
        <label>
          Transaction ID:
          <input type="text" name="Transaction_ID" value={formData.transaction.Transaction_ID} onChange={handleChange} />
        </label>
        <label>
          Product ID:
          <input type="text" name="Product_ID" value={formData.transaction.Product_ID} onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>

      <button onClick={fetchData}>Fetch Data</button>

      <h3>Students</h3>
      <ul>
        {formData.students.map(student => (
          <li key={student.USN}>{student.Name}</li>
        ))}
      </ul>

      <h3>Components</h3>
      <ul>
        {formData.components.map(component => (
          <li key={component.Component_ID}>{component.Description}</li>
        ))}
      </ul>

      <h3>Transactions</h3>
      <ul>
        {formData.transactions.map(transaction => (
          <li key={transaction.Transaction_ID}>{transaction.Product_ID}</li>
        ))}
      </ul>
    </div>
  );
};

export default Avionics;
