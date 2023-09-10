const storage = {
  get: (key: string) => {
    return localStorage.getItem(key);
  },

  set: (key: string, value: unknown) => {
    localStorage.setItem(key, String(value));
  },

  remove: (key: string) => {
    localStorage.removeItem(key);
  },

  clear: () => {
    localStorage.clear();
  },
};

export default storage;
