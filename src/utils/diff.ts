/**
 * Checks if a specific field has changed between two objects
 * @param obj1 Original object
 * @param obj2 New object
 * @param key Field name to check
 * @returns boolean
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const hasFieldChanged = <T>(obj1: T, obj2: any, key: keyof T): boolean => {
  if (!obj1) return true;
  return obj1[key] !== obj2[key];
};

/**
 * Checks if any of the specified fields have changed
 * @param obj1 Original object
 * @param obj2 New object
 * @param keys Array of field names to check
 * @returns boolean
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const haveFieldsChanged = <T>(obj1: T, obj2: any, keys: (keyof T)[]): boolean => {
  if (!obj1) return true;
  return keys.some(key => obj1[key] !== obj2[key]);
};
