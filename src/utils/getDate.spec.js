import { getDate } from "./getDate";

it("can convert datestring to year, month, date, and time", () => {
  const dateString = "2019-12-19T18:10:00+00:00";
  const { fullDate, year, month, date, time } = getDate(dateString);

  expect(fullDate).toBe("2019-12-19");
  expect(year).toBe("2019");
  expect(month).toBe("12");
  expect(date).toBe("19");
  expect(time).toBe("18:10:00");
});
