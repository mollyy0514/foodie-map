import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { CoffeeShop } from '../types';

interface GoogleMapComponentProps {
  coffeeShops: CoffeeShop[];
}

const containerStyle = {
  width: '100%',
  height: '500px'
};

// Center on the average of all coffee shop locations, or default to a specific location
const getMapCenter = (coffeeShops: CoffeeShop[]) => {
  if (coffeeShops.length === 0) {
    return { lat: 47.6062, lng: -122.3321 }; // Default to Seattle
  }

  const totalLat = coffeeShops.reduce((sum, shop) => sum + shop.latitude, 0);
  const totalLng = coffeeShops.reduce((sum, shop) => sum + shop.longitude, 0);
  
  return {
    lat: totalLat / coffeeShops.length,
    lng: totalLng / coffeeShops.length
  };
};

// Check if the shop has the "有正餐" tag
const hasMealTag = (shop: CoffeeShop): boolean => {
  return shop.tags ? shop.tags.includes('有正餐') : false;
};

// Custom withMeals-colored marker for shops with meals
const withMealsMarkerIcon = {
  path: 'M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z',
  fillColor: '#88B04B', // withMeals color
  fillOpacity: 1,
  strokeWeight: 1,
  strokeColor: '#7bb074',
  scale: 2,
};

// Custom withoutMeals marker for other shops
const withoutMealsMarkerIcon = {
  path: 'M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z',
  fillColor: '#FABBCB', // withoutMeals color
  fillOpacity: 1,
  strokeWeight: 1,
  strokeColor: '#F8A7BC',
  scale: 2,
};

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ coffeeShops }) => {
  const [selectedShop, setSelectedShop] = useState<CoffeeShop | null>(null);
  
  // Replace with your actual Google Maps API key
  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';
  
  const center = getMapCenter(coffeeShops);

  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13} // Increased zoom level for better visibility
        options={{
          styles: [
            {
              featureType: "poi.business",
              stylers: [{ visibility: "on" }],
            },
          ],
        }}
      >
        {coffeeShops.map((shop) => (
          <Marker
            key={shop.id}
            position={{ lat: shop.latitude, lng: shop.longitude }}
            onClick={() => setSelectedShop(shop)}
            icon={hasMealTag(shop) ? withMealsMarkerIcon : withoutMealsMarkerIcon}
            title={shop.name}
          />
        ))}

        {selectedShop && (
          <InfoWindow
            position={{ lat: selectedShop.latitude, lng: selectedShop.longitude }}
            onCloseClick={() => setSelectedShop(null)}
          >
            <div className="info-window">
              <h3>{selectedShop.name}</h3>
              <p><strong>Address:</strong> {selectedShop.address}</p>
              <p><strong>Hours:</strong> {selectedShop.openingHours}</p>
              <p><strong>Thoughts:</strong> {selectedShop.thoughts}</p>
              
              {/* Display tags in the info window */}
              {selectedShop.tags && selectedShop.tags.length > 0 && (
                <div className="info-window-tags">
                  {selectedShop.tags.map((tag, index) => (
                    <span key={index} className="info-tag">#{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent; 