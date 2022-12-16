import axios from "axios";
import { dev_base_url } from "../utils/configUrl";

const login = (payload) => {
  return axios
    .post(`${dev_base_url}/auth/login`, payload)
    .then((response) => response)
    .catch((e) => e.response);
};

const register = (payload) => {
  return axios
    .post(`${dev_base_url}/auth/register`, payload)
    .then((response) => response)
    .catch((e) => e.response);
};

const applyOnEvent = (payload) => {
  return axios
    .post(`${dev_base_url}/auth/applyEvent`, payload)
    .then((response) => response)
    .catch((e) => e.response);
};

const getAppliedEvent = (payload) => {
  return axios
    .post(`${dev_base_url}/auth/getAppliedEvents`, payload)
    .then((response) => response)
    .catch((e) => e.response);
};

export { login, register, applyOnEvent, getAppliedEvent };
