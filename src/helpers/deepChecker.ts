const deepSameKeys = (o1: any, o2: any) => {
  // Both nulls = same
  if (o1 === null && o2 === null) {
    return true;
  }

  // Get the keys of each object
  const o1keys = o1 === null ? new Set() : new Set(Object.keys(o1));
  const o2keys = o2 === null ? new Set() : new Set(Object.keys(o2));
  if (o1keys.size !== o2keys.size) {
    // Different number of own properties = not the same
    return false;
  }

  // Look for differences, recursing as necessary
  for (const key of o1keys) {
    if (!o2keys.has(key)) {
      // Different keys
      return false;
    }

    // Get the values and their types
    // @ts-ignore
    const v1 = o1[key];
    // @ts-ignore
    const v2 = o2[key];
    const t1 = typeof v1;
    const t2 = typeof v2;
    if (t1 === "object") {
      if (t2 === "object" && !deepSameKeys(v1, v2)) {
        return false;
      }
    } else if (t2 === "object") {
      // We know `v1` isn't an object
      return false;
    }
  }

  // No differences found
  return true;
};

export { deepSameKeys };
