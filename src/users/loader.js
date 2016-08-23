/**
 * Created by alexander on 23.08.16.
 */


import { makeRequest } from "../core/request";
import { buildUrl } from "../wg-public-api";


const USERS_PATH = "/account/list/";


export default function(userName) {
    let url = buildUrl(USERS_PATH, {search: userName});
    return makeRequest(url);
};
