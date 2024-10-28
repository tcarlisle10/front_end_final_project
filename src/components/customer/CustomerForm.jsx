import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar';



function CustomerForm() {
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const navigate = useNavigate();
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
      await axios.post('http://127.0.0.1:5000/ customerData', customerData);
      alert('Customer added successfully!');
      navigate('/customers');
    }
    catch (error) {
      console.error('Error adding customer:', error);
      alert('Failed to add customer. Please try again.');
    }
  }  

  return (  
    <div>
      <NavBar />
      <div>
        <h1>
          Add Customer
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
        <FloatingLabel controlId="customerEmail" label="Email" className="mb-3">
          <Form.Control
            type="email"
            name="email"
            value={customerData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="customerPhone" label="Phone" className="mb-3">
          <Form.Control
            type="tel"
            name="phone"
            value={customerData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
          />
        </FloatingLabel>
        <Button type="submit">Add Customer</Button>
      </Form>
    </div>
  );
}

export default CustomerForm;

