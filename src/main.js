var schedule = require('node-schedule');
const axios = require('axios');
const math = require('mathjs');

// api urls
const URLS = {
  coinbase: 'https://api.pro.coinbase.com/products/BTC-USD/ticker',
  kraken: 'https://api.kraken.com/0/public/Ticker?pair=xbtusd',
  bitstamp: 'https://www.bitstamp.net/api/v2/ticker/btcusd',
  gemini: 'https://api.gemini.com/v1/pubticker/btcusd',
  itbit: 'https://api.itbit.com/v1/markets/XBTUSD/ticker',
};
let arr = [];
// main loop, schedule that runs every 30 sec
var main = schedule.scheduleJob('*/5 * * * * *', function() {
  //   console.log('this runs every 5 seconds');
  coinbaseData().then(response => {
    arr.push(response);
  });
  krakenData().then(response => {
    arr.push(response);
  });
  bitstampData().then(response => {
    arr.push(response);
  });
  geminiData().then(response => {
    arr.push(response);
  });
  itbitData().then(response => {
    arr.push(response);
  });
  if (arr.length > 0) {
    console.log('median:', math.median(arr));
  }
});

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
