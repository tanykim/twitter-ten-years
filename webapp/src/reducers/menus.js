const menu = (state, action) => {
  switch (action.type) {
    case 'SET_MENU':
      return {
        page: action.page
      }
    default:
      return state
  }
}

const menus = (state = [], action) => {
  switch (action.type) {
    case 'SET_MENU':
      return [
        ...state,
        menu(undefined, action)
      ]
    default:
      return state
  }
}

export default menus
