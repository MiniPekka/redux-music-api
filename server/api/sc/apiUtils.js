import url from 'url';
import qs from 'querystring';

// Return a promise
export function onResponseSuccess(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
}

// Construct fetch url with baseURL in current config, given endpoint and queryParams
export function constructFetchUrl(baseUrl, endpoint, queryParams) {
    const finalUrl = url.resolve(baseUrl, endpoint);
    const queryStr = qs.stringify(queryParams); // queryStr will be "" if queryParams is undefined
    if (queryStr.length !== 0) {
        return `${finalUrl}?${queryStr}`;
    }
    return finalUrl;
}

// Simple wrapper of fetch
// https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
export function makeRequest(fetchUrl) {
    return fetch(fetchUrl)
          .then(onResponseSuccess);
}
