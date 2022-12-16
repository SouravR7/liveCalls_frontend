import { ACTIONS } from "../../actions";

/**
 * Reducer specific to handeling all user data
 */

const initialState = {
  data: { email: "", name: "" },
};

export function userData(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case "LOGOUT":
      return initialState;

    case ACTIONS.GET_USER_DATA:
      return {
        ...newState,
        data: {
          ...action.payload,
        },
      };

    case ACTIONS.UPDATE_USER_DATA:
      console.log(action.payload);
      return {
        ...newState,
        data: {
          ...action.payload,
        },
      };

    default:
      return state;
  }
}
