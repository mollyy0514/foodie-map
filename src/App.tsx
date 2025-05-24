import React, { useState, useEffect } from 'react';
import GoogleMapComponent from './components/GoogleMap';
import CoffeeShopList from './components/CoffeeShopList';
import { CoffeeShop } from './types';
import coffeeShopsData from './data/coffeeShops.json';
import './styles/App.css';

// For TypeScript to recognize the JSON import
const typedCoffeeShops = coffeeShopsData as CoffeeShop[];

function App() {
  const [coffeeShops, setCoffeeShops] = useState<CoffeeShop[]>([]);
  const [selectedShop, setSelectedShop] = useState<CoffeeShop | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, you might fetch this data from an API
    setCoffeeShops(typedCoffeeShops);
    setIsLoading(false);
  }, []);

  const handleSelectShop = (shop: CoffeeShop) => {
    setSelectedShop(shop);
  };

  if (isLoading) {
    return <div className="app loading">Loading...</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
          <line x1="6" y1="1" x2="6" y2="4"></line>
          <line x1="10" y1="1" x2="10" y2="4"></line>
          <line x1="14" y1="1" x2="14" y2="4"></line>
        </svg>
        <h1>Sip&Savor: Coffee Edition</h1>
      </header>

      <div className="map-container">
        <GoogleMapComponent coffeeShops={coffeeShops} />
        {/* Map Legend */}
        <div className="map-legend">
          <div className="legend-item">
            <div className="legend-color withMeals-color"></div>
            <span>#有正餐</span>
          </div>
        </div>
      </div>

      <CoffeeShopList 
        coffeeShops={coffeeShops} 
        onSelectShop={handleSelectShop} 
        selectedShop={selectedShop}
      />

      <footer className="footer">
        <p>© {new Date().getFullYear()} KilliMilli. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
