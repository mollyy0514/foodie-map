import React from 'react';
import { CoffeeShop } from '../types';
import '../styles/CoffeeShopList.css';

interface CoffeeShopListProps {
  coffeeShops: CoffeeShop[];
  onSelectShop: (shop: CoffeeShop) => void;
  selectedShop: CoffeeShop | null;
}

const CoffeeShopList: React.FC<CoffeeShopListProps> = ({ 
  coffeeShops,
  onSelectShop,
  selectedShop
}) => {
  return (
    <div className="coffee-shop-list">
      <h2>My Favorite Coffee Shops</h2>
      <div className="shop-cards">
        {coffeeShops.map((shop) => (
          <div 
            key={shop.id} 
            className={`shop-card ${selectedShop?.id === shop.id ? 'selected' : ''}`}
            onClick={() => onSelectShop(shop)}
          >
            <h3>{shop.name}</h3>
            <p><strong>Address:</strong> {shop.address}</p>
            <p><strong>Hours:</strong> {shop.openingHours}</p>
            <p className="thoughts">{shop.thoughts}</p>
            
            {/* Display tags as hashtags */}
            {shop.tags && shop.tags.length > 0 && (
              <div className="shop-tags">
                {shop.tags.map((tag, index) => (
                  <span key={index} className="tag">#{tag}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoffeeShopList; 