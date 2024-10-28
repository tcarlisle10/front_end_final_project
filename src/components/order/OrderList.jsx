import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ListGroup, Button } from 'react-bootstrap';
import NavBar from '../NavBar'; 

function OrderList() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/orders/${orderId}`);
      alert('Order deleted successfully!');
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Failed to delete order. Please try again.');
    }
  };
  
  return (
    <div>
        <NavBar />
      <div>
        <h1>
          Order Lists
        </h1>
      </div>
      {orders.length === 0 ? (
        <p>Not  available.</p>
      ) : (
        <ListGroup>
          {orders.map((order) => (
            <ListGroup.Item key={order.order_id}>
              <div>
                <div>
                  <h3>Order ID: {order.name}</h3>
                  <p>Date: {order.date}</p>
                  <p>Customer ID: {order.customer_id}</p>
                </div>
                <div>
                  <Button variant="outline-danger" onClick={() => handleDeleteOrder(order.order_id)}>
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
export default OrderList;