# FoodieMap - Coffee Edition

A React application that displays a map of your favorite coffee shops using Google Maps API.

## Features

- Interactive Google Map showing coffee shop locations
- List of coffee shops with details
- Click on a map marker to see more information about a coffee shop
- Responsive design for desktop and mobile devices

## Prerequisites

Before you begin, ensure you have:

- Node.js installed (v14.0.0 or later recommended)
- npm or yarn installed
- A Google Maps API key

## Setup Instructions

1. Clone the repository
```
git clone <repository-url>
cd foodie-map
```

2. Install dependencies
```
npm install
```

3. Set up your Google Maps API key
   - Rename `.env.example` to `.env` (or create a new `.env` file)
   - Replace `YOUR_GOOGLE_MAPS_API_KEY_HERE` with your actual Google Maps API key

4. Start the development server
```
npm start
```

5. Open your browser and navigate to `http://localhost:3000`

## How to Get a Google Maps API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Library"
4. Search for and enable the following APIs:
   - Maps JavaScript API
   - Places API (if you want to add more features like searching)
5. Go to "APIs & Services" > "Credentials"
6. Click "Create Credentials" > "API Key"
7. Copy the key and add it to your `.env` file

## Project Structure

```
foodie-map/
├── public/
├── src/
│   ├── components/             # React components
│   │   ├── CoffeeShopList.tsx  # List of coffee shops
│   │   └── GoogleMap.tsx       # Google Maps component
│   ├── data/
│   │   └── coffeeShops.json    # Coffee shop data
│   ├── styles/                 # CSS files
│   │   ├── App.css
│   │   └── CoffeeShopList.css
│   ├── types/                  # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx                 # Main app component
│   └── index.tsx               # Entry point
├── .env                        # Environment variables
└── tsconfig.json               # TypeScript configuration
```

## Customizing Coffee Shop Data

To add or modify coffee shops, edit the `src/data/coffeeShops.json` file. Each entry should include:

- `id`: A unique identifier
- `name`: The name of the coffee shop
- `address`: The physical address
- `openingHours`: Hours of operation
- `longitude`: Geographic longitude
- `latitude`: Geographic latitude
- `thoughts`: Your personal notes or review

## Technologies Used

- React
- TypeScript
- Google Maps API
- CSS Grid and Flexbox for responsive layout

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Coffee shops data is fictional and for demonstration purposes only
- Icon provided by Feather Icons
