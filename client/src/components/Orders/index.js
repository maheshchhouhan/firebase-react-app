import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrders } from '../../redux/actions/orderActions';
import Table from 'react-bootstrap/Table';
import List from './list';

const Orders = () => {
  const reduxDispatch = useDispatch();

  const { data: orders } = useSelector((state) => state.orders);

  useEffect(() => {
    if (!orders.length) reduxDispatch(getOrders());
  }, [reduxDispatch, orders]);

  const editOrder = (orderId) => {};

  const updateOrder = () => {};

  return (
    <>
      <h2>Orders</h2>
      <Table responsive='sm'>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Customer</th>
            <th>Address</th>
            <th>Booking Date</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {orders.length ? (
            orders.map((order) => <List key={order._id} order={order} />)
          ) : (
            <tr>
              <td colSpan='100%'>No orders found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default Orders;
