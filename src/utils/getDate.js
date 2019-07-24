export const getDate = dateString => {
  const regex = /((\d\d\d\d)-(\d\d)-(\d\d))T(\d\d:\d\d:\d\d)/;
  const [, fullDate, year, month, date, time] = regex.exec(dateString);
  return { fullDate, year, month, date, time };
};
