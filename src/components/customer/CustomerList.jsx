import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ListGroup, Button } from 'react-bootstrap';
import NavBar from '../NavBar';

function CustomerList() {
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

  const handleEditCustomer = (customerId) => {
    navigate(`/edit-customer/${customerId}`);
  };

  const handleDeleteCustomer = async (customerId) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/customers/${customerId}`);
      alert('Customer deleted successfully!');
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
      alert('Failed to delete customer. Please try again.');
    }
  };

  return (
    <div>
      <NavBar />
      <div>
        <h1>
          Customer Lists
        </h1>
      </div>
      {customers.length === 0 ? (
        <p>No customers available.</p>
      ) : (
        <ListGroup>
          {customers.map((customer) => (
            <ListGroup.Item key={customer.customer_id}>
              <div>
                <div>
                  <h3>{customer.name}</h3>
                  <p>ID: {customer.customer_id}</p>
                  <p>Email: {customer.email}</p>
                  <p>Phone Number: {customer.phone}</p>
                </div>
                <div>
                  <Button variant="outline-primary" onClick={() => handleEditCustomer(customer.customer_id)} className="me-2">
                    Edit
                  </Button>
                  <Button variant="outline-danger" onClick={() => handleDeleteCustomer(customer.customer_id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}
export default CustomerList;