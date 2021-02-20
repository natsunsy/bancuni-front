import React from 'react';
import { Redirect } from 'react-router-dom';
import withAuthentication from 'hocs/withAuthentication';
import { DashboardLayout, ErrorLayout } from 'layout';
import { PublicPage } from 'pages';
import TransferView from './pages/dashboard/transfer/TransferView';
import ConfirmTransfer from './pages/dashboard/transfer/ConfirmTransferView';

import DashboardHome from 'pages/dashboard/Account';

const routes = [
  {
    path: '/error',
    component: ErrorLayout,
    routes: [
      {
        path: '/error/401',
        exact: true,
        component: () => <div>Error 401</div>,
      },
      {
        path: '/error/404',
        exact: true,
        component: () => <div>Error 404</div>,
      },
      {
        component: () => <Redirect to="/error/404" />,
      },
    ],
  },
  {
    path: '/',
    exact: true,
    component: PublicPage,
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    routes: [
      {
        path: '/dashboard',
        exact: true,
        component: () => <Redirect to="/dashboard/account" />,
      },
      {
        path: '/dashboard/account',
        exact: true,
        component: withAuthentication(DashboardHome), //
      },
      {
        path: '/dashboard/transfers',
        exact: true,
        component: withAuthentication(TransferView),
      },
    ],
  },
  {
    component: () => <Redirect to="/error/404" />,
  },
];

export default routes;
