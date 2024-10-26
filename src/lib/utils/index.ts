export const fmtShift = (date_string: string): string => {
  const [hours, minutes, _] = date_string.split(":");

  return `${hours}:${minutes}`;
};

export class DefaultDict {
  constructor(defaultValueFn) {
    const handler = {
      get: (obj, prop) => {
        if (!(prop in obj)) obj[prop] = defaultValueFn();
        return obj[prop];
      },
    };
    return new Proxy({}, handler);
  }
}
