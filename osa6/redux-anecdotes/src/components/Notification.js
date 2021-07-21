import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  console.log(notification);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  return (
    <React.Fragment>
      {notification.show && <div style={style}>{notification.message}</div>}
    </React.Fragment>
  );
};

export default Notification;
