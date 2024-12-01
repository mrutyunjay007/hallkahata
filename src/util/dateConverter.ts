const months = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec",
};

// date converter
export function dateConverter(date: string) {
  const trimedDate = date.split("T")[0]; // remove time
  const [year, month, day] = trimedDate.split("-"); // split date to year, month and day

  return `${day} ${months[month as keyof typeof months]}, ${year}`; // return date in dd month, yyyy format
}

export function dateUrrengerForCalendar(date: string) {
  const [year, month, day] = date.split("-");

  return `${months[month as keyof typeof months]} ${day} ${year}`;
}

export function dateReverserConverterForCalendar(date: string) {
  // split date to year, month and day by space
  const [month, day, year] = date.split(" ");

  // find month number from months object by month name
  const monthNumber = Object.keys(months).find(
    (key) => months[key as keyof typeof months] === month
  );

  return `${year}-${monthNumber as string}-${day}`; // return date in yyyy-mm-dd format
}
