export const fmtShift = (date_string) => {
  const [hours, minutes, seconds] = date_string.split(":");

  return `${hours}:${minutes}`;
};
