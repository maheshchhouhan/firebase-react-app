const express = require('express');
const FBAuth = require('../middlewares/FBAuth');
const {
  getOrders,
  createOrder,
  updateOrder,
} = require('../controllers/orders');

const router = express.Router();

router.get('/', FBAuth, getOrders);

router.post('/', FBAuth, createOrder);

router.put('/', FBAuth, updateOrder);

module.exports = {
  routes: router,
};
