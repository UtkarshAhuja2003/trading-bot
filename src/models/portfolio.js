class Portfolio {
  constructor() {
    this.cash = 0;
    this.holdings = {};
    this.tradeHistory = [];
    this.initialCapital = 0;
  }
}

module.exports = new Portfolio();
