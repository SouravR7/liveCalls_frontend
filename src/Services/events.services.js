import axios from "axios";
import { dev_base_url } from "../utils/configUrl";

const getAllEvents = (payload) => {
  return axios
    .get(`${dev_base_url}/events/allEvents`, payload)
    .then((response) => response)
    .catch((e) => e.response);
};

const createEvent = (payload) => {
  return axios
    .post(`${dev_base_url}/events/create`, payload)
    .then((response) => response)
    .catch((e) => e.response);
};

const getMyEvents = (payload) => {
  return axios
    .post(`${dev_base_url}/auth/userEvent`, payload)
    .then((response) => response)
    .catch((e) => e.response);
};

export { getAllEvents, createEvent, getMyEvents };
