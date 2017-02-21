// let nextTodoId = 0
// export const addTodo = (text) => ({
//   type: 'ADD_TODO',
//   id: nextTodoId++,
//   text
// })

export const setMenu = (menu) => ({
  type: 'SET_MENU',
  menu
});

export const toggleFlowLine = (id) => ({
  type: 'TOGGLE_FLOW_LINE',
  id
});

// export const getTimeRange = () => ();