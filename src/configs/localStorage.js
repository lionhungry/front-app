export const getAccessToken = () => {
  try {
    const serializedState = localStorage.getItem('token');
    if (serializedState === null) return undefined;
    // eslint-disable-next-line no-console
    return serializedState;
  } catch (e) {
    return undefined;
  }
};
