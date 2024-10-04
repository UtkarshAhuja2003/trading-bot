const express = require('express');
const tradeController = require('./controllers/tradeController');

const app = express();
app.use(express.json());

app.use('/api/trade', tradeController);

app.use('/mockData', express.static('mockData'));

app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
