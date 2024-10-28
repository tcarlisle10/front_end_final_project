import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import NavBar from '../NavBar';

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  const fetchProductData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/products/${productId}`);
      console.log('Product data:', response.data);
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  return (
    <div>
      <NavBar />
      <Container className="mt-4">
        {loading ? (
            <span className="sr-only">Loading...</span>
        ) : product ? (
          <>
            <h1>{product.name}'s Details</h1>
            <Card>
              <Card.Body>
                <Card.Title>
                  <strong>Product ID:</strong> {product.product_id}
                </Card.Title>
                <Card.Title>
                  <strong>Price:</strong> ${product.price}
                </Card.Title>
              </Card.Body>
            </Card>
          </>
        ) : (
          <p>No details found for this product.</p>
        )}
      </Container>
    </div>
  );
}

export default ProductDetails;