import moment from 'moment';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import editIcon from '../../edit-icon.svg';

const List = ({ order, editOrder }) => {
  const renderTooltip = (props) => (
    <Tooltip id='button-tooltip' {...props}>
      Edit Order
    </Tooltip>
  );

  return (
    <tr key={order._id}>
      <td>1</td>
      <td>{order.title}</td>
      <td>{order.customer ? order.customer.name : 'N/A'}</td>
      <td>
        {order.address
          ? `${order.address.street} ${order.address.city} ${order.address.country} ${order.address.zip}`
          : 'N/A'}
      </td>
      <td>
        {typeof order.bookingDate === 'string'
          ? order.bookingDate
          : order.bookingDate._seconds
          ? moment(order.bookingDate._seconds).format('m/d/Y')
          : moment(order.bookingDate).format('m/d/Y')}
      </td>
      <td>
        <OverlayTrigger
          placement='right'
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          <img
            onClick={() => editOrder(order._id)}
            src={editIcon}
            alt='edit-icon'
            style={{ maxWidth: 30, cursor: 'pointer' }}
          />
        </OverlayTrigger>
        ,
      </td>
    </tr>
  );
};

export default List;
