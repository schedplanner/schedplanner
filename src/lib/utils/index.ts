export const fmtShift = (date_string: string): string => {
  const [hours, minutes, _] = date_string.split(":");

  return `${hours}:${minutes}`;
};

export const getRandomId = (prefix?: string): string => {
  const id = Math.random().toString(16).slice(2);
  return prefix ? `${prefix}_` + id : id;
};
