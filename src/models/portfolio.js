class Portfolio {
  constructor() {
    this.cash = 9000;
    this.holdings = {};
    this.tradeHistory = [];
    this.initialCapital = 0;
  }

  async loadState() {
    try {
      const response = await fetch('http://localhost:3000/api/trade/botState');
      const data = await response.json();
      this.cash = data.cash;
      this.holdings = data.holdings;
      this.initialCapital = data.initialCapital;
    } catch (error) {
      throw new Error('Failed to load bot state');
    }
  }

  async saveState() {
    try {
      const botState = {
        cash: this.cash,
        holdings: this.holdings,
        initialCapital: this.initialCapital,
      };
      await fetch('http://localhost:3000/api/trade/botState', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(botState),
      });
    } catch (error) {
      throw new Error('Failed to save bot state');
    }
  }

  async loadTrades() {
    try {
      const response = await fetch('http://localhost:3000/api/trade/trades');
      const data = await response.json();
      this.tradeHistory = data;
    } catch (error) {
      throw new Error('Failed to load trades');
    }
  }

  async saveTrades() {
    try {
      await fetch('http://localhost:3000/api/trade/trades', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.tradeHistory),
      });
    } catch (error) {
      throw new Error('Failed to save trades');
    }
  }

  canBuy(price) {
    return this.cash >= price;
  }

  canSell(symbol) {
    return this.holdings[symbol] && this.holdings[symbol].quantity > 0;
  }

  async buyStock(price, timestamp, symbol) {
    if (this.canBuy(price)) {
      if (!this.holdings[symbol]) {
        this.holdings[symbol] = { quantity: 0, averageBuyPrice: 0 };
      }

      const stock = this.holdings[symbol];
      const totalCost = stock.quantity * stock.averageBuyPrice + price;
      stock.quantity += 1;
      stock.averageBuyPrice = totalCost / stock.quantity;

      this.cash -= price;
      this.tradeHistory.push({ type: 'BUY', price, timestamp, symbol });

      await this.saveState();
      await this.saveTrades();
    }
  }

  async sellStock(price, timestamp, symbol) {
    if (this.canSell(symbol)) {
      const stock = this.holdings[symbol];
      this.cash += price;
      stock.quantity -= 1;

      if (stock.quantity === 0) {
        delete this.holdings[symbol];
      }

      this.tradeHistory.push({ type: 'SELL', price, timestamp, symbol });

      await this.saveState();
      await this.saveTrades();
    }
  }

  getProfitLoss(currentPrices) {
    let holdingsValue = 0;
    for (const symbol in this.holdings) {
      holdingsValue += this.holdings[symbol].quantity * currentPrices[symbol];
    }
    const profitLoss = this.cash + holdingsValue - this.initialCapital;
    return profitLoss;
  }

  getSummary(currentPrices) {
    const profitLoss = this.getProfitLoss(currentPrices);
    const holdingsSummary = Object.keys(this.holdings).map(symbol => ({
      symbol,
      quantity: this.holdings[symbol].quantity,
      averageBuyPrice: this.holdings[symbol].averageBuyPrice.toFixed(2),
      currentPrice: currentPrices[symbol].toFixed(2),
    }));

    return {
      cash: this.cash.toFixed(2),
      holdings: holdingsSummary,
      profitLoss: profitLoss.toFixed(2),
      tradeHistory: this.tradeHistory,
    };
  }
}

module.exports = new Portfolio();
