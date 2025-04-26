let lastFocusedKey: string | null = null;

export const setLastFocusedKey = (key: string) => {
  lastFocusedKey = key;
};

export const getLastFocusedKey = () => lastFocusedKey;
