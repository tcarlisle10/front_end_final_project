import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import NavBar from '../NavBar';

function OrderDetails() {
  const { customerId } = useParams();
  const [orders, setOrders] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomerData();
  }, [customerId]);

  const fetchCustomerData = async () => {
    try {
      const [ordersResponse, customerResponse] = await Promise.all([
        axios.get(`http://127.0.0.1:5000/orders/${customerId}`),
        axios.get(`http://127.0.0.1:5000/customers/${customerId}`)
      ]);

      setOrders(ordersResponse.data);
      setCustomerName(customerResponse.data.name);
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
        ) : (
          <>
            <h1>{customerName}'s Orders</h1>
            {orders.length === 0 ? (
              <p>No orders found for this customer.</p>
            ) : (
              <div>
                {orders.map((order) => (
                  <Card key={order.order_id} className="mb-3">
                    <Card.Body>
                      <Card.Title>Order ID: {order.order_id}</Card.Title>
                      <Card.Title>Date: {order.date}</Card.Title>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
}

export default OrderDetails;