const STORAGE_KEY = 'data-cache';

const readStore = () => {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY)) ?? {};
  } catch {
    return {};
  }
};

const writeStore = (entries) => {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // מכסת האחסון מלאה — מנקים כדי לא להפיל את הדף
    sessionStorage.removeItem(STORAGE_KEY);
  }
};

const buildKey = (resource, params) =>
  `${resource}?${new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null)
  ).toString()}`;

export function createCache() {
  const entries = readStore();

  return {
    get(resource, params) {
      return entries[buildKey(resource, params)];
    },

    set(resource, params, data) {
      entries[buildKey(resource, params)] = data;
      writeStore(entries);
    },

    invalidate(resource) {
      Object.keys(entries).forEach((key) => {
        if (key.startsWith(`${resource}?`)) {
          delete entries[key];
        }
      });
      writeStore(entries);
    },
  };
}
