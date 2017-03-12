//props triggered by user interaction

const selectedFriend = (state = 0, action) => {
  if (action.type === 'SET_FLOW_FRIEND_ID') {
    console.log(action.id);
    return action.id;
  } else {
    return state;
  }
}

export { selectedFriend }