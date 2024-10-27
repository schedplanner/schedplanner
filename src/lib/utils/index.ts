import { unknown } from "astro:schema";

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

export const getCurrentGroup = async () => {
  console.log(sessionStorage.length);
  //   const response = await fetch("/api/groups/current");
  //   return await response.json();
  return undefined;
};
