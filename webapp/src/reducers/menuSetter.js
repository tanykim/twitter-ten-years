const menuSetter = (state = 'TIMELINE', action) => {
  switch (action.type) {
    case 'SET_MENU':
      return action.menu
    default:
      return state;
  }
};

export default menuSetter
