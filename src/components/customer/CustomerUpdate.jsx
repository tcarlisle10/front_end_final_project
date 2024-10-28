import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import NavBar from '../NavBar';

function CustomerUpdate() {
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const { customerId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomerDetails();
  }, []);

  const fetchCustomerDetails = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/customers/${customerId}`);
      setCustomerData(response.data);
    } catch (error) {
      console.error('Error fetching customer details:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:5000/customers/${customerId}`, customerData);
      alert('Customer updated successfully!');
      navigate('/customers');
    } catch (error) {
      console.error('Error updating customer:', error);
      alert('Failed to update customer. Please try again.');
    }
  };

  return (
    <div>
      <NavBar />
      <div>
        <h1>
          Update Customer
        </h1>
      </div>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="customerName" label="Customer Name" className="mb-3">
          <Form.Control
            type="text"
            name="name"
            value={customerData.name}
            onChange={handleChange}
            placeholder="Enter customer name"
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="customerEmail" label="Email">
          <Form.Control
            type="email"
            name="email"
            value={customerData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="customerPhone" label="Phone">
          <Form.Control
            type="phone"
            name="phone"
            value={customerData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
          />
        </FloatingLabel>
        <Button variant="outline-success" type="submit" className="mt-3">
          Update Customer
        </Button>
      </Form>
    </div>
  );
}
export default CustomerUpdate;