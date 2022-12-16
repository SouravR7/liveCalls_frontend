import { combineReducers } from "redux";
import { userData } from "./userReducer/userDataReducers";
import { allEventsData } from "./eventReducer/eventReducers";
import { appliedEventsData } from "./appliledEventReducer/appliedEventReducer";

const RootReducer = combineReducers({
  userData: userData,
  eventData: allEventsData,
  appliedEvent: appliedEventsData,
});

export default RootReducer;
