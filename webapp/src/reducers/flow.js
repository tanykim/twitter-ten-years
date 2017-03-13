//props triggered by user interaction

const selectedFriend = (state = 0, action) => {
  if (action.type === 'SET_FLOW_FRIEND') {
    return action.id;
  } else {
    return state;
  }
}

export { selectedFriend }