import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ListGroup, Button } from 'react-bootstrap';
import NavBar from '../NavBar';

function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handlePlaceOrder = (product) => {
    navigate('/place-order', { state: { product } });
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/products/${productId}`);
      alert('Product deleted successfully!');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    }
  };

  const handleUpdateProduct = (productId) => {
    navigate(`/edit-product/${productId}`);
    fetchProducts();
  };
  
  return (
    <div>
      <NavBar />
      <div>
        <h1>
          Product Lists
        </h1>
      </div>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ListGroup>
          {products.map((product) => (
            <ListGroup.Item key={product.product_id}>
              <div>
                <div>
                  <h2>{product.name}</h2>
                  <p>Price: ${product.price}</p>
                </div>
                <div>
                  <Button variant="outline-success" onClick={() => handlePlaceOrder(product)} className="me-2">
                    Place Order
                  </Button>
                  <Button variant="outline-primary" onClick={() => handleUpdateProduct(product.product_id)} className="me-2">
                    Update Price
                  </Button>
                  <Button variant="outline-danger" onClick={() => handleDeleteProduct(product.product_id)}>
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
export default ProductList;