import { isNil, isEmpty, mergeDeepRight } from 'ramda';

const contentTypeJSON = 'application/json';

export const railsAPI = 'https://thedoolist-api.onrender.com';

// Accepts only JSON from any GET
const DEFAULT_OPTIONS = {
  method: 'GET',
  headers: {
    accept: contentTypeJSON,
  },
  urlParams: {},
  jsonOutput: true,
};

// Simple function for header configuration left for possibility of scaling
const headerConfig = (options = {}) => {
  const header = {};
  return mergeDeepRight(header, options);
};

export const deleteOptions = (body, methodName = 'DELETE') => ({
  method: methodName,
  mode: 'cors',
  cache: 'no-cache',
  headers: {
    ...(!isNil(body) && !isEmpty(body) && { 'Content-Type': contentTypeJSON }),
    Accept: 'application/json',
  },
  redirect: 'follow',
  referer: 'no-referrer',
  body: JSON.stringify(body),
});

// Function to post to api
export const postOptions = (body, methodName = 'POST') => ({
  method: methodName,
  mode: 'cors',
  cache: 'no-cache',
  headers: {
    ...(!isNil(body) && !isEmpty(body) && { 'Content-Type': contentTypeJSON }),
    Accept: 'application/json',
  },
  redirect: 'follow',
  referer: 'no-referrer',
  body: JSON.stringify(body),
});

// Function to allow for patch operations
export const patchOptions = (
  body,
  methodName = 'PATCH',
  jsonOutput = true
) => ({
  method: methodName,
  mode: 'cors',
  cache: 'no-cache',
  headers: {
    ...(!isNil(body) && !isEmpty(body) && { 'Content-Type': contentTypeJSON }),
    Accept: 'application/json',
  },
  redirect: 'follow',
  referer: 'no-referrer',
  body: JSON.stringify(body),
  jsonOutput,
});

// Function to check the status of the fetch request
export async function checkStatus(fetchResponse) {
  // Fetch was okay. Yay!
  if (fetchResponse.ok) {
    return fetchResponse;
  }
  // Data retrieval
  const data = await fetchResponse.json();
  const error = new Error(
    `${fetchResponse.status}: "${fetchResponse.statusText}"`
  );

  throw {
    error,
    data,
  };
}

// Create
export async function doFetch(route, options = {}) {
  const fetchOptions = mergeDeepRight(DEFAULT_OPTIONS, headerConfig(options));
  try {
    const response = await fetch(route, fetchOptions);
    const fetchResponse = await checkStatus(response);
    return await fetchResponse.json();
  } catch (error) {
    const errorMessage = `${DEFAULT_OPTIONS.method} ${route} failed with ${error?.data?.messageDetails}`;
    const errorCode = error?.data?.status || 400;

    console.log(errorMessage);

    return { status: errorCode, data: { stuff: 'empty' }, ...error };
  }
}
