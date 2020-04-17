
//keep this in format app name/module/const;
export const ACT_GET_ITEMS = 'APP_NAME/MODULE/GET_ITEMS';

export default reqResReducer = (state = { reqResItems : [] }, action) => {
  switch (action.type) {
      case `${ACT_GET_ITEMS}`:
          return { ...state, loading: true };
      default:
          return state;
  }
}

export function reqResGetItems() {
  return {
    type: ACT_GET_ITEMS,
    payload: {
      request: {
        url: `/unknown`
      }
    }
  };
}
