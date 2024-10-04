const calculateMovingAverage = (prices, period) => {
  if (prices.length < period) return null;
  const slice = prices.slice(-period);
  const sum = slice.reduce((acc, price) => acc + price, 0);
  return sum / period;
};

module.exports = {
  calculateMovingAverage,
};
