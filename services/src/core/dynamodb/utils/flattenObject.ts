export default function flattenObject(
  obj: Record<string, any>,
  parentKey = '',
  result: Record<string, any> = {},
): Record<string, any> {
  for (const [key, value] of Object.entries(obj)) {
    const newKey = parentKey
      ? parentKey + key.charAt(0).toUpperCase() + key.slice(1)
      : key;

    if (
      value === null ||
      ['string', 'number', 'boolean'].includes(typeof value)
    ) {
      result[newKey] = value;
    } else if (value instanceof Date) {
      result[newKey] = value.toISOString();
    } else if (Array.isArray(value)) {
      // store arrays as JSON strings or flatten index if needed
      result[newKey] = value.map((v) =>
        v instanceof Date ? v.toISOString() : v,
      );
    } else if (typeof value === 'object') {
      flattenObject(value, newKey, result); // recursive flatten
    } else {
      throw new Error(`Unsupported type: ${typeof value} for key ${newKey}`);
    }
  }

  return result;
}
