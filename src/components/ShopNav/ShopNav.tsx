import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './ShopNav.module.css';
// MUI imports
import { InputBase, IconButton, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface ShopNavProps {
  onSearch?: (query: string) => void;
}

const ShopNav: React.FC<ShopNavProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };
  
  return (
    <nav className={styles.shopNav}>
      <div className={styles.navContainer}>
        <Paper 
          component="form" 
          className={styles.searchBar}
          onSubmit={handleSearchSubmit}
          elevation={0}
        >
          <InputBase
            className={styles.searchInput}
            placeholder="Search products..."
            inputProps={{ 'aria-label': 'search products' }}
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <IconButton 
            type="submit" 
            aria-label="search"
            className={styles.searchButton}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
        
        <div className={styles.cartLink}>
          <NavLink 
            to="/shop/cart" 
            className={({ isActive }) => 
              isActive ? styles.activeLink : styles.navLink
            }
          >
            <svg className={styles.cartIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default ShopNav;
