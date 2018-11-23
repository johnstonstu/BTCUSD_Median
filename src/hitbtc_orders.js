const axios = require('axios');
const price = require('./btc_price.js');

// TODO: get price from btc_price
// build function simulate with different order.ammountBtc [1,10,1000..]
// determine basepoint loss / gain
// get btc->eth->dai started

const config = {
  orderLimit: 25,
  tradeFee: 10,
  btcPrice: price,
};

const urls = {
  orderbook: `https://api.hitbtc.com/api/2/public/orderbook/BTCDAI?limit=${
    config.orderLimit
  }`,
};

let order = {
  amountBtc: 1,
  amountDai: 0,
  avgRate: [],
};

// ask == people selling BTC for DAI
// bid == people looking to buy BTC with DAI
let askArr,
  bidArr = [];

axios
  .get(urls.orderbook)
  .then(function(response) {
    bidArr = response.data.bid;

    while (order.amountBtc > 0) {
      for (i = 0; i < bidArr.length; i++) {
        if (order.amountBtc > bidArr[i].size) {
          order.amountBtc = order.amountBtc - bidArr[i].size;
          order.amountDai = bidArr[i].size * bidArr[i].price;
        } else {
          order.amountDai = order.amountBtc * bidArr[i].price;
          order.amountBtc = 0;
          i = bidArr.length;
        }
      }
    }
    console.log(order);
    console.log(config);
  })
  .catch(function(error) {
    console.log(error);
  });

function getVolPrice(numBTC) {}
