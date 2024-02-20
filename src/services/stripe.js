import client from './main-client';

export const payment = data =>
  client({
    'Content-Type': 'application/json',
  }).post('/payment', data);
