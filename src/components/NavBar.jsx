import React from 'react';
import { NavLink } from 'react-router-dom';


function NavBar() {
  return (
    <nav className="navbar" style={{ backgroundColor: '#333', padding: '10px', width: '100%', position: 'fixed', top: 0, left: 0 }}>
      <ul className="navbar-row" style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex', justifyContent: 'center', width: '100%' }}>
        <li className="nav-item" style={{ marginRight: '10px' }}>
          <NavLink to="/customers" className="nav-link" style={{ color: 'white', textDecoration: 'none', padding: '5px 10px', borderRadius: '5px' }}>
            Add Customer
          </NavLink>
        </li>
        <li className="nav-item" style={{ marginRight: '10px' }}>
          <NavLink to="/products" className="nav-link" style={{ color: 'white', textDecoration: 'none', padding: '5px 10px', borderRadius: '5px' }}>
            Add Product
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/orders" className="nav-link" style={{ color: 'white', textDecoration: 'none', padding: '5px 10px', borderRadius: '5px' }}>
            Add Order
          </NavLink>
        </li>
      </ul>
      <ul className="navbar-row" style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex', justifyContent: 'center', width: '100%' }}>
        <li className="nav-item" style={{ marginRight: '10px' }}>
          <NavLink to="/customers-list" className="nav-link" style={{ color: 'white', textDecoration: 'none', padding: '5px 10px', borderRadius: '5px' }}>
            Customers
          </NavLink>
        </li>
        <li className="nav-item" style={{ marginRight: '10px' }}>
          <NavLink to="/products-list" className="nav-link" style={{ color: 'white', textDecoration: 'none', padding: '5px 10px', borderRadius: '5px' }}>
            Products
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/orders-list" className="nav-link" style={{ color: 'white', textDecoration: 'none', padding: '5px 10px', borderRadius: '5px' }}>
            Orders
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;