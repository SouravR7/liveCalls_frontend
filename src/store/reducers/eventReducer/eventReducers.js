import { ACTIONS } from "../../actions";

/**
 * Reducer specific to handeling all event data
 */

const initialState = {
  all_data: [],
  event_data: [],
};

export function allEventsData(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case ACTIONS.GET_ALL_EVENTS:
      return {
        ...newState,
        all_data: [...action.payload],
        event_data: [...action.payload],
      };

    case ACTIONS.GET_FILTERED_EVENTS:
      let allEvents = newState.all_data;
      let filter = action.payload;

      let filteredEvents = allEvents.filter(
        (item) => item.sports_type === filter
      );
      return {
        ...newState,
        event_data: filter === "none" ? [...allEvents] : [...filteredEvents],
      };

    case ACTIONS.GET_SEARCHED_EVENTS:
      let events = newState.all_data;
      let searched = action.payload;

      let searchedEvents = events.filter(
        (item) => item.title.toLowerCase().indexOf(searched.toLowerCase()) > -1
      );
      return {
        ...newState,
        event_data: [...searchedEvents],
      };

    default:
      return state;
  }
}
