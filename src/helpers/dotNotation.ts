const dotNotationToObject = <T>(obj: T, path: string, value: any) => {
  const keys = path.split(".");
  const lastKey = keys.pop();
  // @ts-ignore
  const lastObj = keys.reduce((obj, key) => (obj[key] = obj[key] || {}), obj);
  // @ts-ignore
  lastObj[lastKey] = value;
  return obj;
};

export { dotNotationToObject };
