import React from 'react';
import { connect } from 'react-redux';

import Notifications from 'react-notification-system-redux';
import { AppState } from '../../store';

interface Props {
  notifications: any;
}

const NotificationsComponent: React.FC<Props> = ({ notifications }) => (
  <Notifications notifications={notifications} />
);

export default connect((state: AppState) => ({
  notifications: state.notifications
}))(NotificationsComponent);
