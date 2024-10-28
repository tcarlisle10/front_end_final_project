import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../NavBar';

function OrderForm() {
  const [orderData, setOrderData] = useState({
    date: '',
    customer_id: '',
  });
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://127.0.0.1:5000/orders', orderData);
      alert('Order placed successfully!');
      navigate('/customers');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div>
      <NavBar />
      <h1>Place Order</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="orderDate">
          <Form.Label>Order Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={orderData.date}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="orderCustomer">
          <Form.Label>Customer</Form.Label>
          <Form.Control
            as="select"
            name="customer_id"
            value={orderData.customer_id}
            onChange={handleChange}
            required
          >
            <option value="">Select a customer</option>
            {customers.map((customer) => (
              <option key={customer.customer_id} value={customer.customer_id}>
                {customer.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="outline-success" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default OrderForm;