const schedule = require('node-schedule');
const axios = require('axios');
const math = require('mathjs');

const config = {
  fetchInterval: 5, // in seconds
};

// api urls
const URLS = {
  coinbase: 'https://api.pro.coinbase.com/products/BTC-USD/ticker',
  kraken: 'https://api.kraken.com/0/public/Ticker?pair=xbtusd',
  bitstamp: 'https://www.bitstamp.net/api/v2/ticker/btcusd',
  gemini: 'https://api.gemini.com/v1/pubticker/btcusd',
  itbit: 'https://api.itbit.com/v1/markets/XBTUSD/ticker',
};

let prices = {
  coinbase: 0,
  kraken: 0,
  bitstamp: 0,
  gemini: 0,
  itBit: 0,
};

let priceArr = [];

// main loop, schedule that runs every interval, set in config
var main = schedule.scheduleJob(
  `*/${config.fetchInterval} * * * * *`,
  function() {
    //   console.log('this runs every 5 seconds');
    priceArr = [];
    data();
  },
);

// api get function
function getExhange(exchange) {
  try {
    return axios.get(exchange);
  } catch (error) {
    console.error(error);
  }
}

// data resolvers
const coinbaseData = async () => {
  const exchange = await getExhange(URLS.coinbase);
  if (exchange.data) {
    return exchange.data.price;
  }
};

const krakenData = async () => {
  const exchange = await getExhange(URLS.kraken);

  if (exchange.data) {
    return exchange.data.result.XXBTZUSD.c[0];
  }
};

const bitstampData = async () => {
  const exchange = await getExhange(URLS.bitstamp);
  if (exchange.data) {
    return exchange.data.last;
  }
};

const geminiData = async () => {
  const exchange = await getExhange(URLS.gemini);
  if (exchange.data) {
    return exchange.data.last;
  }
};

const itbitData = async () => {
  const exchange = await getExhange(URLS.itbit);
  if (exchange.data) {
    return exchange.data.lastPrice;
  }
};

const getData = async () => {
  await coinbaseData().then(response => {
    prices.coinbase = response;
    priceArr.push(response);
  });
  await krakenData().then(response => {
    prices.kraken = response;
    priceArr.push(response);
  });
  await bitstampData().then(response => {
    prices.bitstamp = response;
    priceArr.push(response);
  });
  await geminiData().then(response => {
    prices.gemini = response;
    priceArr.push(response);
  });
  await itbitData().then(response => {
    prices.itBit = response;
    priceArr.push(response);
  });
};

const data = async () => {
  await getData().then(response => {
    console.log(prices);
    console.log('median:', math.median(priceArr));
  });
};

data();
