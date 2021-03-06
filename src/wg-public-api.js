/**
 * Created by alexander on 23.08.16.
 */

import { buildQueryStr } from "./core/request";

const API_PROXY_URL = "http://188.166.73.133/wg-api";
const GAME = "wot";


export default function (path, queryParams) {
  const queryStr = buildQueryStr(queryParams);
  return `${API_PROXY_URL}/${GAME}${path}${queryStr}`;
}
