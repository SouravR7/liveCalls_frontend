import { ACTIONS } from "../../actions";

/**
 * Reducer specific to handeling all applied event data
 */

const initialState = {
  applied_event_data: [],
};

export function appliedEventsData(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case ACTIONS.GET_APPLIED_EVENTS:
      return {
        ...newState,
        applied_event_data: [...action.payload],
      };

    case ACTIONS.UPDATE_APPLIED_EVENTS:
      let applied = newState.applied_event_data;
      applied.push(action.payload);
      return {
        ...newState,
        applied_event_data: [...applied],
      };

    default:
      return state;
  }
}
