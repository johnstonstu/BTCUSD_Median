const axios = require('axios');
// const price = require('./btc_price.js');

const config = {
  orderLimit: 10,
  btc: 1,
  tradeFee: 10,
};

const urls = {
  orderbook: `https://api.hitbtc.com/api/2/public/orderbook/BTCDAI?limit=${
    config.orderLimit
  }`,
};

let order = {
  ammountDai: 0,
  avgRate: [],
};

// ask == selling
// bid == buying
let askArr,
  bidArr = [];

axios
  .get(urls.orderbook)
  .then(function(response) {
    askArr = response.data.ask;
    bidArr = response.data.bid;

    for (i = 0; i < askArr.length; i++) {
      for (x = 0; x < config.btc; x++) {
        config.btc = config.btc - askArr[i].size;

        order.ammountDai = askArr[i].size * askArr[i].price;

        order.avgRate.push(askArr[i]);

        console.log(order);
      }
    }
  })
  .catch(function(error) {
    console.log(error);
  });
