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

  return `${day} ${months[month as keyof typeof months]}, ${year}`;
}
