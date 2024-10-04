
# Stock Trading Bot

## Overview

This project implements a stock trading bot that monitors stock prices, evaluates trading opportunities, and manages a portfolio. It is designed to simulate trading strategies using real-time data and basic trading principles. The bot makes buy/sell decisions based on moving averages and keeps track of trades and portfolio performance.

## Features

- **Real-Time Stock Monitoring**: Continuously fetches stock prices and evaluates trading opportunities.
- **Portfolio Management**: Tracks cash, shares owned, and total portfolio value.
- **Trading History**: Records all buy and sell transactions with timestamps for auditing purposes.
- **Moving Average Calculation**: Utilizes short-term and long-term moving averages to make informed trading decisions.
- **Mock Data**: Simulates stock prices and trading activities using JSON files for easy testing and development.

## Tech Stack

- **Node.js**: JavaScript runtime for building scalable server-side applications.
- **Express.js**: Web framework for building RESTful APIs.
- **Fetch API**: For making HTTP requests to retrieve stock prices and mock data.
- **JSON**: Data format for representing stock prices, trades, and portfolio information.
- **Math Utilities**: For calculating moving averages and other numerical functions.



## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/UtkarshAhuja2003/trading-bot.git
   ```

2. Navigate to the project directory:
    ``` bash
    cd trading-bot
    ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
    ``` bash
    npm start
    ```
5. To start in development mode
    ```bash
    npm run dev
    ```
6. Access the API at http://localhost:3000/api/trade/.

# Folder Structure:
```bash
stock-trading-bot/
├── controllers/
│   └── tradeController.js
├── models/
│   └── portfolio.js
├── services/
│   └── stockService.js
├── utils/
│   └── math.js
├── mockData/
│   ├── stockPrices.json
│   ├── trades.json
│   └── botState.json
├── config/
│   └── index.js
├── server.js
├── package.json
└── README.md
```

# API Endpoints

## Monitor Stocks
- **Endpoint:** `GET /api/trade/monitor`
- **Description:** Monitors stock prices and evaluates trading opportunities.
- **Response:** Returns a message indicating completion and the current profit/loss.

## Portfolio Summary
- **Endpoint:** `GET /api/trade/summary`
- **Description:** Retrieves the current portfolio summary, including cash, shares owned, and total value.
- **Response:** Returns the portfolio summary in JSON format.


# Mock Data Structure
## Stock Prices
Stock prices are stored in mockData/stockPrices.json in the following format:
```bash
{ 
  "id": 1, 
  "symbol": "AAPL", 
  "price": 150.00, 
  "timestamp": "2024-10-04T10:00:00Z" 
}
```

## Trades
Trade records are stored in mockData/trades.json using the following structure:
```bash
{ 
  "id": 1, 
  "stockSymbol": "AAPL", 
  "action": "BUY", 
  "price": 147.00, 
  "quantity": 10, 
  "timestamp": "2024-10-04T10:05:00Z" 
}
```

## Portfolio
The portfolio model is structured as follows:
```bash
{
  "portfolioId": 1,
  "owner": "John Doe",
  "cash": 0.00,
  "stocks": [
    { "symbol": "AAPL", "quantity": 10, "currentPrice": 150.00, "totalValue": 1500.00 },
    { "symbol": "TSLA", "quantity": 5, "currentPrice": 750.00, "totalValue": 3750.00 },
    { "symbol": "AMZN", "quantity": 2, "currentPrice": 3320.00, "totalValue": 6640.00 }
  ],
  "totalPortfolioValue": 11890.00
}
```

# Usage
- **Monitor Stocks:** Call the monitor endpoint to start monitoring stock prices and evaluate trades.
- **Check Portfolio Summary:** Call the summary endpoint to view the current state of your portfolio.
    