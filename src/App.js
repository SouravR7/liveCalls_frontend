import React from "react";
import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { useLocation } from "react-router";
import { createBrowserHistory } from "history";
import Signin from "./Component/Auth/Signin";
import Signup from "./Component/Auth/Register";
import Dashboard from "./Component/Dashboard/dashboard";
import CreateEvent from "./Component/Events/createNewEvents";
import MyEvents from "./Component/Events/myEvents";
import EventDetails from "./Component/Events/eventsDetails";

function App() {
  const history = createBrowserHistory();
  //const location = useLocation();

  console.log(history);
  return (
    <Router history={history}>
      <Routes>
        <Route exact path="/" element={<Signin />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/createEvent" element={<CreateEvent />} />
        <Route exact path="/myEvents" element={<MyEvents />} />
        <Route exact path="/eventDetails" element={<EventDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
