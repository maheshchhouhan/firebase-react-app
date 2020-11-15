const { admin, functions } = require('../config/db');

const getOrders = functions.https.onRequest(async (req, res) => {
  try {
    const orders = await admin.firestore().collection('orders').get();
    const orderData = [];
    orders.forEach((order) => {
      const { title, address, bookingDate, customer } = order.data();
      console.log(order.data());
      if (title && bookingDate) {
        orderData.push({
          _id: order.id,
          title,
          address,
          bookingDate,
          customer,
        });
      }
    });
    // console.log({ orderData });
    return res.json(orderData);
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ msg: e.message });
  }
});

const createOrder = functions.https.onRequest(async (req, res) => {
  try {
    if (req.method !== 'POST') {
      return res.status(400).json({ error: 'Method not allowed' });
    }
    const newOrder = {
      title: req.body.title,
      bookingDate: admin.firestore.Timestamp.fromDate(
        new Date(req.body.bookingDate)
      ),
    };

    await admin.firestore().collection('orders').add(newOrder);
    res.json({ msg: 'Order added successfully' });
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
});

const updateOrder = functions.https.onRequest(async (req, res) => {
  try {
    if (req.method !== 'PUT') {
      return res.status(400).json({ error: 'Method not allowed' });
    }
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
});

module.exports = {
  getOrders,
  createOrder,
  updateOrder,
};
