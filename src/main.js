var schedule = require('node-schedule');
const axios = require('axios');

// api urls
const URLS = {
  coinbase: 'https://api.pro.coinbase.com/products/BTC-USD/ticker',
  kraken: 'https://api.kraken.com/0/public/Ticker?pair=xbtusd',
  bitstamp: 'https://www.bitstamp.net/api/v2/ticker/btcusd',
  gemini: 'https://api.gemini.com/v1/pubticker/btcusd',
  itbit: 'https://api.itbit.com/v1/markets/XBTUSD/ticker',
};

// main loop, schedule that runs every 30 sec
var main = schedule.scheduleJob('*/30 * * * * *', function() {
  console.log('this runs every 30 seconds');
  coinbaseData();
  krakenData();
  bitstampData();
  geminiData();
  itbitData();
});

// api get function
async function getExhange(exchange) {
  try {
    return await axios.get(exchange);
  } catch (error) {
    console.error(error);
  }
}

// data resolvers
const coinbaseData = async () => {
  const exchange = await getExhange(URLS.coinbase);
  if (exchange.data) {
    console.log('Coinbase:', exchange.data.price);
  }
};

const krakenData = async () => {
  const exchange = await getExhange(URLS.kraken);
  if (exchange.data) {
    console.log('Kraken:', exchange.data.result.XXBTZUSD.c[0]);
  }
};

const bitstampData = async () => {
  const exchange = await getExhange(URLS.bitstamp);
  if (exchange.data) {
    console.log('Bitstamp:', exchange.data.last);
  }
};

const geminiData = async () => {
  const exchange = await getExhange(URLS.gemini);
  if (exchange.data) {
    console.log('Bitstamp:', exchange.data.last);
  }
};

const itbitData = async () => {
  const exchange = await getExhange(URLS.itbit);
  if (exchange.data) {
    console.log('itBit:', exchange.data.lastPrice);
  }
};
