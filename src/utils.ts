const DAY_DATA = {
  3: [2, 5],
  4: [4],
};
const DATE_DATA = {
  1: [
    '2024-01-18',
    '2024-02-15',
    '2024-03-21',
    '2024-04-18',
    '2024-05-16',
    '2024-06-20',
    '2024-07-18',
    '2024-08-15',
    '2024-09-19',
    '2024-10-17',
    '2024-11-21',
    '2024-12-19',
    '2025-01-23',
    '2025-02-20',
    '2025-03-27',
  ],
  2: [
    '2024-01-11',
    '2024-02-01',
    '2024-03-07',
    '2024-04-04',
    '2024-05-02',
    '2024-06-06',
    '2024-07-04',
    '2024-08-01',
    '2024-09-05',
    '2024-10-03',
    '2024-11-07',
    '2024-12-05',
    '2025-01-09',
    '2025-02-06',
    '2025-03-06',
  ],
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
