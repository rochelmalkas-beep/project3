export function filterItems(items, field, text) {
  if (!field || text === '') return items;

  const search = text.toLowerCase();

  return items.filter((item) => {
    const value = item[field];
    if (value === undefined || value === null) return false;

    // טקסט: חיפוש חלקי, בלי הבדל בין אותיות גדולות לקטנות
    if (typeof value === 'string') {
      return value.toLowerCase().includes(search);
    }

    // מספר או בוליאני: התאמה מדויקת (מחרוזת מול מחרוזת)
    return String(value) === text;
  });
}

export function sortItems(items, field) {
  if (!field) return items;

  return [...items].sort((a, b) => {
    const first = a[field];
    const second = b[field];

    if (typeof first === 'string' && typeof second === 'string') {
      return first.localeCompare(second, 'he');
    }

    // מספרים, ובוליאנים (false לפני true)
    return Number(first) - Number(second);
  });
}

// הרשאה יכולה להגיע כ-true/false או כפונקציה שמקבלת פריט (כמו isMine ב-Posts)
export const resolvePermission = (permission, item) =>
  typeof permission === 'function' ? permission(item) : permission;

// האם הפריט צריך להיות מודגש (בוחרים בפונקציה כמו isItemSelected ב-Posts)
export const isItemSelected = (checkSelection, item) =>
  typeof checkSelection === 'function' ? checkSelection(item) : false;