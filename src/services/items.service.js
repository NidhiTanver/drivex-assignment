import configUrl from "../helpers/config";
import { fetchWrapper } from "../helpers/fetch-wrapper";

const baseUrl = `${configUrl.apiBaseUrl}`;

function getItems() {
  return fetchWrapper.get(`${baseUrl}`);
}

function getItemById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}

export const itemsServices = { getItems, getItemById };
