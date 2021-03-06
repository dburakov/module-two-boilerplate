/**
 * Created by alexander on 23.08.16.
 */


import { makeRequest } from "../core/request";
import buildUrl from "../wg-public-api";


const USERS_PATH = "/account/info/";


export default function (accountId) {
  const url = buildUrl(USERS_PATH, { account_id: accountId });
  return makeRequest(url);
}
