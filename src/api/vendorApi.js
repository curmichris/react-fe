import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/vendors/";

export function getVendors() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
