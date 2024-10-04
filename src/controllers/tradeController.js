const express = require('express');
const router = express.Router();
const { monitorStocks } = require('../services/stockService');
const portfolio = require('../models/portfolio');
const fs = require('fs');
const path = require('path');

const botStatePath = path.join(__dirname, '../../mockData/botState.json');
const tradesPath = path.join(__dirname, '../../mockData/trades.json');

router.get('/monitor', async (req, res) => {
  try {
    const stockPrices = await monitorStocks();
    const currentPrices = stockPrices.reduce((acc, stock) => {
      acc[stock.symbol] = stock.price;
      return acc;
    }, {});
    const profitLoss = portfolio.getProfitLoss(currentPrices);
    res.json({ message: 'Stock monitoring complete', profitLoss: profitLoss.toFixed(2) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to monitor stocks' });
  }
});

router.get('/summary', async (req, res) => {
  try {
    const stockPrices = await monitorStocks();
    const currentPrices = stockPrices.reduce((acc, stock) => {
      acc[stock.symbol] = stock.price;
      return acc;
    }, {});
    const summary = portfolio.getSummary(currentPrices);
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve summary' });
  }
});

router.get('/botState', (req, res) => {
  try {
    const botState = JSON.parse(fs.readFileSync(botStatePath));
    res.json(botState);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get bot state' });
  }
});

router.put('/botState', (req, res) => {
  try {
    const botState = req.body;
    fs.writeFileSync(botStatePath, JSON.stringify(botState, null, 2));
    res.json({ message: 'Bot state updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update bot state' });
  }
});

router.get('/trades', (req, res) => {
  try {
    const trades = JSON.parse(fs.readFileSync(tradesPath));
    res.json(trades);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get trades' });
  }
});

router.put('/trades', (req, res) => {
  try {
    const trades = req.body;
    fs.writeFileSync(tradesPath, JSON.stringify(trades, null, 2));
    res.json({ message: 'Trades updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update trades' });
  }
});

module.exports = router;
