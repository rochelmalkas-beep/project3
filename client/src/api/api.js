export async function getItems(resource, params = {}) {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${BASE_URL}/${resource}?${query}`);
  if (!response.ok) {
    throw new Error('שגיאה בטעינת הנתונים מהשרת');
  }
  return response.json();
}