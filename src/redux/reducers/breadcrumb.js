export const breadcrumb = (state = [], action) => {
  switch (action.type) {
    case 'ADD_CRUMB':
      return [
        ...state,
        action.crumb
      ]

    case 'REMOVE_CRUMB':
      const newState = state.filter(crumb => 
        crumb.codigo === action.crumbCode
      )
      return newState
    
    case 'REMOVE_ALL_CRUMBS':
      return []

    default:
      return state
  }
}