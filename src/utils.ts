const DAY_DATA = {
  3: [2, 5],
  4: [4],
};
const DATE_DATA = {
  1: ['2024-01-18', '2024-02-15', '2024-03-21'],
  2: ['2024-01-11', '2024-02-01', '2024-03-07'],
};

// 引数のdateより未来の日付で、指定された曜日の日付を返す
export function getDate(typeId: number, date: Date): Date | null {
  if (typeId === 3 || typeId === 4) {
    const day = DAY_DATA[typeId];
    const targetDate = new Date(date);
    console.log({ day, targetDate, targetDay: targetDate.getDay() });

    while (!day.includes(targetDate.getDay())) {
      targetDate.setDate(targetDate.getDate() + 1);
    }
    return targetDate;
  } else if (typeId === 1 || typeId === 2) {
    const dates = DATE_DATA[typeId];
    const targetDate = dates.find((d) => new Date(d) >= date);
    if (targetDate) {
      return new Date(targetDate);
    }
  }
  return null;
}
