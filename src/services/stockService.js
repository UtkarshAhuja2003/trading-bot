const { calculateMovingAverage } = require('../utils/math');
const portfolio = require('../models/portfolio');

async function getStockPrices() {
  try {
    const response = await fetch('http://localhost:3000/mockData/stocks.json');
    const data = await response.json();
    return data.stocks;
  } catch (error) {
    throw error;
  }
}

const evaluateTrade = (price, shortTermAvg, longTermAvg, timestamp, symbol) => {
  if (shortTermAvg && longTermAvg) {
    if (shortTermAvg > longTermAvg && portfolio.canBuy(price)) {
      portfolio.buyStock(price, timestamp, symbol);
    } else if (shortTermAvg < longTermAvg && portfolio.canSell(symbol)) {
      portfolio.sellStock(price, timestamp, symbol);
    }
  }
};

const monitorStocks = async () => {
  const stockPrices = await getStockPrices();
  const priceHistory = {};

  stockPrices.forEach(stock => {
    const { price, timestamp, symbol } = stock;
    if (!priceHistory[symbol]) priceHistory[symbol] = [];
    priceHistory[symbol].push(price);

    const shortTermAvg = calculateMovingAverage(priceHistory[symbol], 5);
    const longTermAvg = calculateMovingAverage(priceHistory[symbol], 30);

    evaluateTrade(price, shortTermAvg, longTermAvg, timestamp, symbol);
  });

  return stockPrices;
};

module.exports = {
  monitorStocks,
};
