import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import NavBar from '../NavBar';

function CustomerDetails() { 
  const { customerId } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomerData();
  }, [customerId]);

  const fetchCustomerData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/customers/${customerId}`);
      console.log('Customer data:', response.data);
      setCustomer(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  };

  return (
    <div>
      <NavBar />
      <Container className="mt-4">
        {loading ? (
            <span className="sr-only">Loading...</span>
        ) : customer ? (
          <>
            <h1>{customer.name}'s Details</h1>
            <Card>
              <Card.Body>
                <Card.Title>
                  <strong>Email:</strong> {customer.email}
                  </Card.Title>
                  <Card.Title>
                  <strong>Phone:</strong> {customer.phone}
                  </Card.Title>
              </Card.Body>
            </Card>
          </>
        ) : (
          <p>No details found for this customer.</p>
        )}
      </Container>
    </div>
  );
}

export default CustomerDetails;