<imports>

<initialState>

export default function <name> (state = initialState, action) {
  switch (action.type) {
    case LOAD_REPOSITORIES_START:
      return {
        ...state,
        loading: true,
        error: initialState.error
      };
    case LOAD_REPOSITORIES_SUCCESS:
      return {
        ...state,
        repositories: action.response,
        loading: false
      };
    case LOAD_REPOSITORIES_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}
