import client from './main-client';

export const getUsers = data => client().post('/users', data);
