import { HANDLE_VISIBLE } from "../actions/type";

const initialState = {
  visible: false,
};

const visibilityReducer = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_VISIBLE:
      return {
        ...state,
        visible: action.visible,
      };
    default:
      return state;
  }
};
export default visibilityReducer;
