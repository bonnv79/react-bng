import { SERVER_URL } from "../constants"

export const getUrl = (path) => {
  return `${SERVER_URL}${path}`;
}