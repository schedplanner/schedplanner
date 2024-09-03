export const fmtShift = (date_string: string): string => {
  const [hours, minutes, _] = date_string.split(":");

  return `${hours}:${minutes}`;
};
