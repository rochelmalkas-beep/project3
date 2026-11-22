const BASE_URL = 'http://localhost:3000';

const JSON_HEADERS = { 'Content-Type': 'application/json' };

async function sendRequest(url, options) {
  let response;
  try {
    response = await fetch(url, options);
  } catch {
    throw new Error('השרת אינו זמין, נסו שוב מאוחר יותר');
  }
  if (!response.ok) {
    throw new Error('שגיאה בתקשורת עם השרת');
  }
  return response.json();
}

export const getItems = (resource, params = {}) =>
  sendRequest(`${BASE_URL}/${resource}?${new URLSearchParams(params)}`);

export const addItem = (resource, data) =>
  sendRequest(`${BASE_URL}/${resource}`, {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(data),
  });

export const updateItem = (resource, id, data) =>
  sendRequest(`${BASE_URL}/${resource}/${id}`, {
    method: 'PATCH',
    headers: JSON_HEADERS,
    body: JSON.stringify(data),
  });

export const deleteItem = (resource, id) =>
  sendRequest(`${BASE_URL}/${resource}/${id}`, { method: 'DELETE' });