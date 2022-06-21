export const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem('persistedState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('persistedState', serializedState);
  } catch (error) {
    console.log('Could not save state to session storage.')
  }
}