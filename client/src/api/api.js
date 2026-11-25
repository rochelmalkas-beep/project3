const BASE_URL = 'http://localhost:3000';
const TIMEOUT_MS = 8000;

const JSON_HEADERS = { 'Content-Type': 'application/json' };

const timeoutAfter = (ms) =>
  new Promise((_, reject) => {
    setTimeout(() => reject(new Error('TIMEOUT')), ms);
  });

async function sendRequest(url, options) {
  let response;
  try {
    response = await Promise.race([fetch(url, options), timeoutAfter(TIMEOUT_MS)]);
  } catch (error) {
    if (error.message === 'TIMEOUT') {
      throw new Error('הפעולה לא אושרה, בדקו ברשימה אם היא בוצעה לפני שתנסו שוב');
    }
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